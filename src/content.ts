import "./dark-mode/index.styl";
import "./style.styl";

import init from "./init";
import year from "./routes/year/handler";
import focusarea from "./routes/focusArea/handler";
import progress from "./routes/progress/handler";
import announcements from "./routes/announcements/handler";

// Dummy element that does nothing other than prove that the injected content is still present
const appendInstanceValidator = () => {
  const container = document.querySelector(".app-body") ?? document.querySelector(".czi-editor-frame-body");

  const validator = document.createElement("div");
  validator.classList.add("bslp-route-specific");
  validator.id = "bslp-instance-verifier";
  validator.ariaHidden = "true";

  container.appendChild(validator);
};

// Check the route and load appropriate route handler
const injectContent = () => {
  document.querySelectorAll(".bslp-route-specific").forEach((element) => element.remove());
  appendInstanceValidator();

  const path = window.location.pathname;

  switch (true) {
    case /\/my\/(assessment_takes|math_unit_assessment)/.test(path): //! DO NOT RUN CODE IN CONTENT ASSESSMENTS OR MATH UNITS
      document.documentElement.removeAttribute("bslp-dark");
      return;
    case /\/my\/year\/\d+/.test(path):
      year();
      break;
    case /\/my\/focusareas\/\d+/.test(path):
      focusarea();
      break;
    case /\/my\/progress/.test(path):
      progress();
      break;
    case /\/my\/announcements/.test(path):
      announcements();
      break;
  }

  init();
};

// Only injects content if the content is missing
const safeInject = () => {
  if (document.querySelector("#bslp-instance-verifier") == null) {
    console.log("✅ Safe injection triggered");
    injectContent();
  } else {
    console.log("⚠️ Safe injection passed");
  }
};

//! ADD CONTENT TO PAGE:

// Inject code when the page initially loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM load detected");

  window.addEventListener("focus", safeInject);

  const observer = new MutationObserver((entries) => {
    entries.forEach((i) => {
      i.addedNodes.forEach((ii: any) => {
        if (ii.classList.contains("app")) {
          observer.disconnect();
          injectContent();

          if (window.localStorage.getItem("bslp-dark") == "true")
            document.documentElement.setAttribute("bslp-dark", "");
        }
      });
    });
  });

  const container = document.querySelector("#container-root");

  if (container) {
    observer.observe(container, { childList: true });
  }
});

// Run injections again when a new history state is pushed via react router
chrome.runtime.onMessage.addListener((request) => {
  safeInject();

  if (request.message !== "routerUpdate") return;

  const progressBar = document.querySelector("#nprogress");
  progressBar?.addEventListener("DOMNodeRemoved", injectContent);

  const observer = new MutationObserver(() => {
    observer.disconnect();
    safeInject();
    // progressBar?.removeEventListener("DOMNodeRemoved", injectContent);
  });

  const routerContainer = document.querySelector(".router-content");

  if (routerContainer) {
    observer.observe(routerContainer, { childList: true, subtree: true });
  }
});

window.addEventListener("popstate", () => {
  console.log("Location change!");
});
