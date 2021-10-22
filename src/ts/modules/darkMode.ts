export function enableDarkMode(toggleState: boolean, animation: boolean = true) {

  if(animation) { // Apply a css animation if needed
    document.documentElement.classList.add('better-slp-dark-mode-transitioning');
    setTimeout(() => {document.documentElement.classList.remove('better-slp-dark-mode-transitioning')}, 300);
  }

  if(!toggleState)
    return document.documentElement.removeAttribute('bslp-dark'); // Disable dark mode attribute on the html tag

  document.documentElement.setAttribute('bslp-dark', ''); // Enable dark mode attribute on the html tag

}