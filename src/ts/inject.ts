function appendDashboardSidenavLink(): void {
  if(document.querySelector('#better-slp-dashboard-link') != null) return;

  const dashboardNavigationContainer = document.createElement('li');
  dashboardNavigationContainer.id = "better-slp-dashboard-link";
  dashboardNavigationContainer.setAttribute('role', 'presentation');

  const dashboardNavigationLink = dashboardNavigationContainer.appendChild(document.createElement('a'));
  dashboardNavigationLink.setAttribute('action', 'push');
  dashboardNavigationLink.setAttribute('href', '/my/dashboard');

  const dashboardNavigationIcon = dashboardNavigationLink.appendChild(document.createElement('i'));
  dashboardNavigationIcon.setAttribute('aria-hidden', 'true');

  ['material-icons', 'material-icons-v54', 'material-icons-default', 'app-nav-left-link-icon'].forEach(className => {
    dashboardNavigationIcon.classList.add(className);
  });

  dashboardNavigationIcon.innerHTML = "dashboard";

  dashboardNavigationLink.append("Dashboard");

  dashboardNavigationLink.addEventListener('click', async function(e) {
    e.preventDefault();

    const applicationBody = document.querySelector('.app-body');

    if(applicationBody == null) return;
    
    window.history.pushState({},"", "/my/dashboard");

    document.querySelectorAll('.page-menu .app-page-menu-body > ul.nav > li.active').forEach(navElement => {
      navElement.classList.remove('active')
    });

    this.parentElement?.classList.add('active');

    let newPageContents = await fetch(chrome.runtime.getURL('html/dashboard.html'));

    applicationBody.innerHTML = await newPageContents.text();
  })


  document.querySelector('.page-menu .app-page-menu-body > ul.nav')?.prepend(dashboardNavigationContainer);
}

function appendNoteTaker(): void {

}

function main(): void {
  appendDashboardSidenavLink();

  const currentURL = window.location.href;

  switch(true) {
    case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/focusareas/.*').test(currentURL):
      const takeNotesButton = document.createElement('button');
      takeNotesButton.classList.add('better-slp-take-notes-button');
      document.querySelector('.app-body > .app-page-title > .app-page-title-row')?.appendChild(takeNotesButton);
      
      break;
  }
}

if(document.querySelectorAll('#nprogress').length == 0) main(); // Initial load
document.querySelector('#nprogress')?.addEventListener('DOMNodeRemoved', () => {main()}); // Reload every pushstate