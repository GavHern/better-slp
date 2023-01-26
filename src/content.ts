import "./dark-mode/index.styl";

import init from "./init";
import year from "./routes/year/handler";
import focusarea from "./routes/focusArea/handler";
import progress from "./routes/progress/handler";
import announcements from "./routes/announcements/handler";

// Check the route and load appropriate route handler
const injectContent = () => {
  init();

  document.querySelectorAll(".bslp-route-specific").forEach((element) => element.remove());

  const path = window.location.pathname;

  switch (true) {
    case /\/my\/(assessment_takes|math_unit_assessment)/.test(path): //! DO NOT RUN CODE IN CONTENT ASSESSMENTS OR MATH UNITS
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
};

// Inject code when the page initially loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM load detected");
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

  const container: any = document.querySelector("#container-root");

  observer.observe(container, { childList: true });
});

// Run injections again when a new history state is pushed via react router
chrome.runtime.onMessage.addListener((request) => {
  if (request.message !== "routerUpdate") return;

  const observer = new MutationObserver(() => {
    observer.disconnect();
    injectContent();
  });

  const routerContainer = document.querySelector(".router-content .app");

  observer.observe(routerContainer, { childList: true, subtree: true });
});
