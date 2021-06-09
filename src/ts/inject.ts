import { appendNoteTaker } from './modules/noteTaker';
import { appendGPAEstimate } from './modules/gpaAverage';

function progressTab(): void {
  //if(document.querySelectorAll('.better-slp-pie-chart-grid').length < 1) return;
  const existingGPAEstimates = document.querySelectorAll('.better-slp-gpa-estimate');
  existingGPAEstimates.forEach(e => e.remove());
  
  appendGPAEstimate();
}

function main(): void {
  const currentURL = window.location.href;

  switch(true) {
    case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/focusareas/.*').test(currentURL): // Focus area page
      appendNoteTaker();
      break;
    case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/progress(/.*)?').test(currentURL): // Progress page
      progressTab();
      break;
  }
}

if(!document.documentElement.classList.contains('nprogress-busy')) main(); // Initial load
document.querySelector('#nprogress')?.addEventListener('DOMNodeRemoved', () => {main()}); // Reload every state change