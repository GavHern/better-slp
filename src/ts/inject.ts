function enableDarkMode(toggleState: boolean): void {
  if(!toggleState){
    document.body.classList.remove('better-slp-dark-mode-container');
  }

  document.body.classList.add('better-slp-dark-mode-container');// Add dark mode link

}

function main(): void {
  
}

if(document.querySelectorAll('#nprogress').length == 0) main();
document.querySelector('#nprogress')?.addEventListener('DOMNodeRemoved', () => {main()});