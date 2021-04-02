function main(): void {
  // Main code to execute
}

if(document.querySelectorAll('#nprogress').length == 0) main(); // Initial load
document.querySelector('#nprogress')?.addEventListener('DOMNodeRemoved', () => {main()}); // Reload every pushstate