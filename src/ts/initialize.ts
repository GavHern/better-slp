function enableDarkMode(toggleState: boolean, animation: boolean = true): void {

  if(animation){ // Apply a css animation if needed
    document.documentElement.classList.add('better-slp-dark-mode-transitioning');
    setTimeout(() => {document.documentElement.classList.remove('better-slp-dark-mode-transitioning')}, 300);
  }

  if(!toggleState){
    document.documentElement.setAttribute('better-slp-dark-mode', 'false'); // Disable dark mode attribute on the html tag
    return;
  }

  document.documentElement.setAttribute('better-slp-dark-mode', 'true'); // Enable dark mode attribute on the html tag

}

enableDarkMode(true, false);