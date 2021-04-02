function enableDarkMode(toggleState: boolean, animation: boolean = true): void {
  if(animation){
    document.body.classList.add('better-slp-dark-mode-transitioning');
    setTimeout(() => {document.body.classList.remove('better-slp-dark-mode-transitioning')}, 300);
  }

  if(!toggleState){
    document.body.classList.remove('better-slp-dark-mode-container');
    return;
  }

  document.body.classList.add('better-slp-dark-mode-container'); // Add dark mode link

}

enableDarkMode(true, false);