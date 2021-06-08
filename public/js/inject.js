"use strict";
function openNoteTaker() {
    chrome.storage.sync.get('darkMode', items => {
        const mainContentContainer = document.querySelector('.claro-student-focusarea');
        mainContentContainer?.querySelector('.panel-body')?.classList.add('hidden');
        const focusAreaId = new URL(window.location.href).pathname.split('my/focusareas/')[1];
        const noteTakerEmbedURL = chrome.runtime.getURL(`html/notetaker.html?id=${focusAreaId}&dark=${items.darkMode}`);
        const noteTakerEmbed = document.createElement('iframe');
        noteTakerEmbed.src = noteTakerEmbedURL;
        noteTakerEmbed.className = 'better-slp-note-taker-embed';
        noteTakerEmbed.style.backgroundColor = "transparent";
        noteTakerEmbed.style.width = "100%";
        noteTakerEmbed.style.minHeight = "72vh";
        mainContentContainer?.appendChild(noteTakerEmbed);
    });
}
function closeNoteTaker() {
    const noteTakerInstance = document.querySelector('.better-slp-note-taker-embed');
    noteTakerInstance?.contentWindow?.postMessage('save', '*');
    window.addEventListener('message', e => {
        if (e.data == "save-successful") {
            noteTakerInstance?.remove();
            const mainContentContainer = document.querySelector('.claro-student-focusarea');
            mainContentContainer?.querySelector('.panel-body')?.classList.remove('hidden');
        }
    });
}
function appendNoteTaker() {
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
    document.querySelector('.app-body > .app-page-title > .app-page-title-row')?.appendChild(takeNotesButton);
}
function progressTab() {
    if (document.querySelectorAll('.better-slp-pie-chart-grid').length < 1)
        return;
}
function main() {
    const currentURL = window.location.href;
    switch (true) {
        case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/focusareas/.*').test(currentURL):
            appendNoteTaker();
            break;
        case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/progress(/.*)?').test(currentURL):
            progressTab();
            break;
    }
}
if (!document.documentElement.classList.contains('nprogress-busy'))
    main();
document.querySelector('#nprogress')?.addEventListener('DOMNodeRemoved', () => { main(); });
