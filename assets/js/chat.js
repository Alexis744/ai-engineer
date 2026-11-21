/*
  Profile assistant widget.
  Sends questions to an n8n webhook (n8n + Ollama running on my own machine, exposed with ngrok).
  If the assistant is offline, it falls back to a small static FAQ so the widget never looks broken.
*/

const HISTORY_TURNS = 6;
const TIMEOUT_MS = 45000;

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const normalize = (text) =>
  text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const matchFaq = (faq, question) => {
  const q = normalize(question);
  let best = null;
  let bestScore = 0;
  for (const item of faq) {
    const score = item.keywords.filter((k) => q.includes(normalize(k))).length;
    if (score > bestScore) { best = item; bestScore = score; }
  }
  return best;
};

export const initChat = ({ endpoint, suggestions = [], faq = [], email = "" }) => {
  if (!endpoint) return;

  const history = [];
  let offline = false;
  let busy = false;

  const launcher = el("button", "chat-launcher", "Ask about my profile");
  launcher.type = "button";
  launcher.setAttribute("aria-expanded", "false");
  launcher.setAttribute("aria-controls", "chat-panel");

  const panel = el("section", "chat-panel");
  panel.id = "chat-panel";
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Profile assistant");

  const header = el("header", "chat-panel__header");
  const titleBox = el("div");
  titleBox.append(el("strong", "", "Profile assistant"), el("small", "", "n8n + Ollama · running on my own machine"));
  const close = el("button", "chat-panel__close", "×");
  close.type = "button";
  close.setAttribute("aria-label", "Close assistant");
  header.append(titleBox, close);

  const log = el("div", "chat-log");
  log.setAttribute("aria-live", "polite");

  const chips = el("div", "chat-suggestions");
  suggestions.forEach((s) => {
    const chip = el("button", "chat-chip", s);
    chip.type = "button";
    chip.addEventListener("click", () => send(s));
    chips.append(chip);
  });

  const form = el("form", "chat-form");
  const input = el("input", "chat-input");
  input.type = "text";
  input.maxLength = 600;
  input.placeholder = "Ask a question about my experience…";
  input.setAttribute("aria-label", "Your question");
  const submit = el("button", "chat-send", "Send");
  submit.type = "submit";
  form.append(input, submit);

  const disclaimer = el(
    "p",
    "chat-disclaimer",
    "AI-generated answers based only on my CV and this website. They may be imperfect: contact me for anything important. Questions may be logged anonymously to improve the assistant."
  );

  panel.append(header, log, chips, form, disclaimer);
  document.body.append(launcher, panel);

  const addMessage = (role, text, extraClass = "") => {
    const bubble = el("div", `chat-msg chat-msg--${role} ${extraClass}`.trim(), text);
    log.append(bubble);
    log.scrollTop = log.scrollHeight;
    return bubble;
  };

  addMessage("bot", "Hi! I answer recruiters' questions about Alexis's experience, projects and skills. What would you like to know?");

  const offlineAnswer = (question) => {
    const hit = matchFaq(faq, question);
    const intro = "The AI assistant is offline right now (it runs on my own computer). ";
    return hit ? intro + hit.answer : `${intro}You can find everything in the CV, or contact me at ${email}.`;
  };

  async function send(text) {
    const question = text.trim();
    if (!question || busy) return;
    busy = true;
    submit.disabled = true;
    chips.hidden = true;
    input.value = "";
    addMessage("user", question);

    if (offline) {
      addMessage("bot", offlineAnswer(question), "chat-msg--offline");
      busy = false; submit.disabled = false;
      return;
    }

    const typing = addMessage("bot", "Typing…", "chat-msg--typing");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "1" },
        body: JSON.stringify({ message: question, history: history.slice(-HISTORY_TURNS) }),
        signal: controller.signal
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data || typeof data.answer !== "string") throw new Error("bad payload");
      typing.remove();
      addMessage("bot", data.answer);
      history.push({ role: "user", content: question }, { role: "assistant", content: data.answer });
    } catch (error) {
      typing.remove();
      offline = true;
      addMessage("bot", offlineAnswer(question), "chat-msg--offline");
    } finally {
      clearTimeout(timer);
      busy = false;
      submit.disabled = false;
      input.focus();
    }
  }

  const toggle = (open) => {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
    launcher.classList.toggle("is-hidden", open);
    if (open) input.focus(); else launcher.focus();
  };

  launcher.addEventListener("click", () => toggle(true));
  close.addEventListener("click", () => toggle(false));
  panel.addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
  form.addEventListener("submit", (e) => { e.preventDefault(); send(input.value); });
};
