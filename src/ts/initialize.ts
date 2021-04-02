function enableDarkMode(toggleState: boolean, animation: boolean = true): void {
  if(animation){
    document.documentElement.classList.add('better-slp-dark-mode-transitioning');
    setTimeout(() => {document.documentElement.classList.remove('better-slp-dark-mode-transitioning')}, 300);
  }

  if(!toggleState){
    document.documentElement.classList.remove('better-slp-dark-mode-container');
    return;
  }

  document.documentElement.classList.add('better-slp-dark-mode-container'); // Add dark mode link

}

enableDarkMode(true, false);