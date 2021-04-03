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
function main() {
    appendDashboardSidenavLink();
}
if (document.querySelectorAll('#nprogress').length == 0)
    main(); // Initial load
(_a = document.querySelector('#nprogress')) === null || _a === void 0 ? void 0 : _a.addEventListener('DOMNodeRemoved', () => { main(); }); // Reload every pushstate
