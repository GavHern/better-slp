function enableDarkMode(toggleState: boolean, animation: boolean = true): void {
  if(animation){
    document.documentElement.classList.add('better-slp-dark-mode-transitioning');
    setTimeout(() => {document.documentElement.classList.remove('better-slp-dark-mode-transitioning')}, 300);
  }

  if(!toggleState){
    document.documentElement.setAttribute('better-slp-dark-mode', 'false');
    return;
  }

  document.documentElement.setAttribute('better-slp-dark-mode', 'true'); // Add dark mode link

}

enableDarkMode(true, false);