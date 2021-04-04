"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
function appendDashboardSidenavLink() {
    var _a;
    if (document.querySelector('#better-slp-dashboard-link') != null)
        return;
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
    dashboardNavigationLink.addEventListener('click', function (e) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const applicationBody = document.querySelector('.app-body');
            if (applicationBody == null)
                return;
            window.history.pushState({}, "", "/my/dashboard");
            document.querySelectorAll('.page-menu .app-page-menu-body > ul.nav > li.active').forEach(navElement => {
                navElement.classList.remove('active');
            });
            (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('active');
            let newPageContents = yield fetch(chrome.runtime.getURL('html/dashboard.html'));
            applicationBody.innerHTML = yield newPageContents.text();
        });
    });
    (_a = document.querySelector('.page-menu .app-page-menu-body > ul.nav')) === null || _a === void 0 ? void 0 : _a.prepend(dashboardNavigationContainer);
}
function openNoteTaker() {
    var _a;
    const mainContentContainer = document.querySelector('.claro-student-focusarea');
    (_a = mainContentContainer === null || mainContentContainer === void 0 ? void 0 : mainContentContainer.querySelector('.panel-body')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    const focusAreaId = new URL(window.location.href).pathname.split('my/focusareas/')[1]; // Find ID of focus area based on the URL pathname
    const noteTakerEmbedURL = chrome.runtime.getURL(`html/notetaker.html?id=${focusAreaId}&dark=true`); // Get the chrome-extension url and add the id & theme as a parameter
    const noteTakerEmbed = document.createElement('iframe');
    noteTakerEmbed.src = noteTakerEmbedURL;
    noteTakerEmbed.className = 'better-slp-note-taker-embed';
    noteTakerEmbed.style.backgroundColor = "transparent";
    noteTakerEmbed.style.width = "100%";
    noteTakerEmbed.style.minHeight = "72vh";
    mainContentContainer === null || mainContentContainer === void 0 ? void 0 : mainContentContainer.appendChild(noteTakerEmbed);
}
function closeNoteTaker() {
    var _a;
    const noteTakerInstances = document.querySelectorAll('.better-slp-note-taker-embed');
    noteTakerInstances.forEach(instance => { instance.remove(); });
    const mainContentContainer = document.querySelector('.claro-student-focusarea');
    (_a = mainContentContainer === null || mainContentContainer === void 0 ? void 0 : mainContentContainer.querySelector('.panel-body')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
}
function appendNoteTaker() {
    var _a;
    const takeNotesButton = document.createElement('button');
    takeNotesButton.classList.add('better-slp-take-notes-button');
    takeNotesButton.addEventListener('click', function (e) {
        const noteTakerOpen = this.classList.contains('active');
        noteTakerOpen ? closeNoteTaker() : openNoteTaker();
        if (noteTakerOpen)
            this.classList.remove('active');
        else
            this.classList.add('active');
    });
    (_a = document.querySelector('.app-body > .app-page-title > .app-page-title-row')) === null || _a === void 0 ? void 0 : _a.appendChild(takeNotesButton);
}
function main() {
    appendDashboardSidenavLink();
    const currentURL = window.location.href;
    switch (true) {
        case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/focusareas/.*').test(currentURL):
            appendNoteTaker();
            break;
    }
}
if (!document.documentElement.classList.contains('nprogress-busy'))
    main(); // Initial load
(_a = document.querySelector('#nprogress')) === null || _a === void 0 ? void 0 : _a.addEventListener('DOMNodeRemoved', () => { main(); }); // Reload every state change
