function enableDarkMode(toggleState: boolean): void {
  if(!toggleState){
    document.body.classList.remove('better-slp-dark-mode-container');
  }

  document.body.classList.add('better-slp-dark-mode-container');// Add dark mode link

}

function main(): void {
  enableDarkMode(true)
}

document.querySelector('#nprogress')?.addEventListener('DOMNodeRemoved', () => {main()});
main();