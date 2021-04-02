function main(): void {
  
}

if(document.querySelectorAll('#nprogress').length == 0) main();
document.querySelector('#nprogress')?.addEventListener('DOMNodeRemoved', () => {main()});