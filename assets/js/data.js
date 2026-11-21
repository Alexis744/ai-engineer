/*
  Site content. Edit this file to update the text shown on the page.
*/

export const profile = {
  name: "Alexis Grédelue",
  shortName: "Alexis Grédelue",
  tagline: "Machine Learning Engineer",
  email: "alexis.gre74@gmail.com",
  emailNote: "Open to Machine Learning Engineer roles. CV available in English and French.",
  github: "https://github.com/Alexis744?tab=repositories",
  linkedin: "https://www.linkedin.com/in/alexis-gr%C3%A9delue/",
  cv: "assets/docs/cv_en.pdf",
  cvFr: "assets/docs/cv.pdf"
};

export const navigation = [
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Contact", "#contact"]
];

export const heroSignals = [
  "Engineering degree in Physics + MSc Universe & Particles + University Diploma in Data Science",
  "6-month machine-learning internship within the CERN ATLAS Collaboration (LPCA)",
  "Benchmarked Random Forest, Neural Network and XGBoost models on 1M+ simulated events",
  "International research experience: Kumamoto University, Japan",
  "1st prize — Clermont Auvergne PEPITE Hackathon 2024"
];

export const quickLinks = [
  { label: "CV", href: "assets/docs/cv_en.pdf" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export const experiences = [
  {
    meta: "Feb 2026 – Jul 2026 · LPCA Clermont-Ferrand · CERN ATLAS Collaboration",
    title: "Machine Learning Research Intern",
    body: "Built machine-learning surrogate models to reinterpret an ATLAS search for long-lived particles without full detector simulation. " +
          "Benchmarked Random Forests, calibrated Random Forests, Neural Networks and XGBoost, built the end-to-end Python pipeline " +
          "and validated it on independent simulated samples. Presented progress to the ATLAS team every two weeks."
  },
  {
    meta: "Feb 2025 – Aug 2025 · TIPEE platform, La Rochelle",
    title: "R&D Engineer Intern — Numerical Modelling & Python",
    body: "Built a Python simulation tool predicting the temperature of road materials from their environment " +
          "(heat equation solved with the Crank–Nicolson method, meteorological and geospatial data with GeoPandas). " +
          "Reached R² = 0.96 against a CEREMA reference model over one year, and handed it over to the industrial partner with an Excel interface."
  },
  {
    meta: "Apr 2024 – Jul 2024 · Kumamoto University, Japan",
    title: "Research Intern — Cosmology",
    body: "Analysed Type Ia supernova datasets in Python and fitted cosmological parameters by minimising residuals with observations, " +
          "producing confidence regions supporting the existence of dark energy. Weekly presentations in English."
  }
];

export const projects = [
  {
    title: "ML surrogate models replacing full detector simulation (CERN / ATLAS)",
    area: "Machine learning · Model validation · Particle physics",
    problem: "Reproducing the results of an ATLAS search normally requires full detector simulation and event reconstruction, which is slow and not available outside the collaboration.",
    method: "Trained and benchmarked Random Forest (with and without probability calibration), Neural Network and XGBoost classifiers on 1M+ simulated events to predict event categories from generator-level features. Rebuilt signal yields and exclusion limits, validated the full pipeline on independent MadGraph5 / Pythia8 samples, and stress-tested interpolation (unseen masses) and extrapolation (unseen signal types).",
    results: "Selected XGBoost: a 1.44 MB model (vs 112 MB for the neural network and 210–591 MB for Random Forests), trained in 34 s (vs 30 min for the neural network), with a net yield bias of +0.01% on a 349k-event held-out test set. Reproduced the official ATLAS limits across several benchmark models and documented where the surrogate stops being reliable.",
    artifacts: "Public code repository and full 52-page technical report.",
    status: "CERN / ATLAS · 2026",
    technologies: ["Python", "XGBoost", "PyTorch", "scikit-learn", "ROOT / uproot", "Model validation", "Calibration"],
    github: "https://github.com/Alexis744/ATLAS-Machine-Learning-Surrogate-Model",
    paper: "assets/docs/ATLAS_internship_report.pdf"
  }
];

export const skillGroups = [
  {
    title: "Machine learning",
    items: [
      "scikit-learn, XGBoost, PyTorch",
      "Random Forests, gradient boosting, neural networks",
      "Probability calibration and weighted metrics",
      "Model benchmarking: accuracy, size, training and inference time"
    ]
  },
  {
    title: "Data and scientific computing",
    items: [
      "Python, NumPy, SciPy, pandas, Matplotlib",
      "ROOT / uproot and HepMC data processing",
      "Monte Carlo simulation data (MadGraph5, Pythia8)",
      "Statistical inference and parameter estimation"
    ]
  },
  {
    title: "Modelling and validation",
    items: [
      "Generalisation tests on unseen parameters and data",
      "Interpolation and extrapolation limits",
      "Numerical physical modelling",
      "Feature engineering and data preprocessing"
    ]
  },
  {
    title: "Engineering and tooling",
    items: [
      "Linux, Git, GitHub, VS Code, Docker",
      "Modular, reproducible Python pipelines",
      "Local LLMs and automation: Ollama, n8n",
      "Technical reporting (LaTeX) and presentations"
    ]
  }
];
