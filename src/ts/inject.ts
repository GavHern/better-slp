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

function openNoteTaker(): void {
  const mainContentContainer = document.querySelector('.claro-student-focusarea');
  mainContentContainer?.querySelector('.panel-body')?.classList.add('hidden');

  const noteTakerEmbedURL = chrome.runtime.getURL('html/notetaker.html');
  const noteTakerEmbed = document.createElement('iframe');

  noteTakerEmbed.src = noteTakerEmbedURL;
  noteTakerEmbed.className = 'better-slp-note-taker-embed';
  noteTakerEmbed.style.width = "100%";
  noteTakerEmbed.style.minHeight = "80vh";

  mainContentContainer?.appendChild(noteTakerEmbed);



}

function closeNoteTaker(): void {
  const noteTakerInstances = document.querySelectorAll('.better-slp-note-taker-embed');
  noteTakerInstances.forEach(instance => { instance.remove() })

  const mainContentContainer = document.querySelector('.claro-student-focusarea');
  mainContentContainer?.querySelector('.panel-body')?.classList.remove('hidden');
}

function appendNoteTaker(): void {
  const takeNotesButton = document.createElement('button');
  takeNotesButton.classList.add('better-slp-take-notes-button');
  takeNotesButton.addEventListener('click', function(e) {
    const noteTakerOpen = this.classList.contains('active');

    if(noteTakerOpen) closeNoteTaker();
    else openNoteTaker();

    if(noteTakerOpen) this.classList.remove('active');
    else this.classList.add('active');
  })
  document.querySelector('.app-body > .app-page-title > .app-page-title-row')?.appendChild(takeNotesButton);
}

function main(): void {
  appendDashboardSidenavLink();

  const currentURL = window.location.href;

  switch(true) {
    case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/focusareas/.*').test(currentURL):
      appendNoteTaker();
      break;
  }
}

if(!document.documentElement.classList.contains('nprogress-busy')) main(); // Initial load
document.querySelector('#nprogress')?.addEventListener('DOMNodeRemoved', () => {main()}); // Reload every state change