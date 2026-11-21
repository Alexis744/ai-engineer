# Alexis Grédelue — Machine Learning Engineer

Personal portfolio website: machine-learning projects, experience and skills.

**Live site:** https://alexis744.github.io/ai-engineer/

## Highlights

- ML surrogate models for the CERN ATLAS Collaboration: Random Forest, Neural Network and XGBoost benchmarked on 1M+ simulated events; final XGBoost model of 1.44 MB with a +0.01% net yield bias on a 349k-event held-out set.
- Engineering degree in Physics, MSc Universe & Particles, University Diploma in Data Science.

## Structure

```
index.html            Page layout
assets/js/data.js     All page content (edit text here)
assets/js/main.js     Rendering entry point
assets/css/styles.css Styles
assets/docs/          CV and technical report
scripts/build.js      Static build to dist/
```

## Local development

```bash
npm run build      # copies the site to dist/
npm run serve      # serves the site locally
```

Deployment to GitHub Pages runs automatically on every push to `main` (`.github/workflows/deploy.yml`).
