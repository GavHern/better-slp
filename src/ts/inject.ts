import { appendNoteTaker } from './modules/noteTaker';
import { appendGPAEstimate } from './modules/gpaEstimate';
import { randomFocusArea } from './modules/randomFocusArea';

function progressTab() {
  //if(document.querySelectorAll('.better-slp-pie-chart-grid').length < 1) return;
  const existingGPAEstimates = document.querySelectorAll('.better-slp-gpa-estimate');
  existingGPAEstimates.forEach(e => e.remove());
  
  appendGPAEstimate();
}

function yearTab() {
	const yearPageAux = document.querySelector('.app-page-title-aux-items .app-page-title-aux');
	
	randomFocusArea(yearPageAux);
}

function main() {
  const currentURL = window.location.href;

  switch(true) {
    case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/focusareas/.*').test(currentURL): // Focus area page
      appendNoteTaker();
      break;
    case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/progress(/.*)?').test(currentURL): // Progress page
      progressTab();
      break;
    case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/year/.*').test(currentURL): // Year
			yearTab();
			break;
  }
}

if(!document.documentElement.classList.contains('nprogress-busy')) main(); // Initial load
document.querySelector('#nprogress')?.addEventListener('DOMNodeRemoved', main); // Reload every state change