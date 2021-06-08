// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"inject.ts":[function(require,module,exports) {
"use strict";

var _document$querySelect2;

function openNoteTaker() {
  chrome.storage.sync.get('darkMode', function (items) {
    var _mainContentContainer;

    var mainContentContainer = document.querySelector('.claro-student-focusarea');
    mainContentContainer === null || mainContentContainer === void 0 ? void 0 : (_mainContentContainer = mainContentContainer.querySelector('.panel-body')) === null || _mainContentContainer === void 0 ? void 0 : _mainContentContainer.classList.add('hidden');
    var focusAreaId = new URL(window.location.href).pathname.split('my/focusareas/')[1];
    var noteTakerEmbedURL = chrome.runtime.getURL("html/notetaker.html?id=".concat(focusAreaId, "&dark=").concat(items.darkMode));
    var noteTakerEmbed = document.createElement('iframe');
    noteTakerEmbed.src = noteTakerEmbedURL;
    noteTakerEmbed.className = 'better-slp-note-taker-embed';
    noteTakerEmbed.style.backgroundColor = "transparent";
    noteTakerEmbed.style.width = "100%";
    noteTakerEmbed.style.minHeight = "72vh";
    mainContentContainer === null || mainContentContainer === void 0 ? void 0 : mainContentContainer.appendChild(noteTakerEmbed);
  });
}

function closeNoteTaker() {
  var _noteTakerInstance$co;

  var noteTakerInstance = document.querySelector('.better-slp-note-taker-embed');
  noteTakerInstance === null || noteTakerInstance === void 0 ? void 0 : (_noteTakerInstance$co = noteTakerInstance.contentWindow) === null || _noteTakerInstance$co === void 0 ? void 0 : _noteTakerInstance$co.postMessage('save', '*');
  window.addEventListener('message', function (e) {
    if (e.data == "save-successful") {
      var _mainContentContainer2;

      noteTakerInstance === null || noteTakerInstance === void 0 ? void 0 : noteTakerInstance.remove();
      var mainContentContainer = document.querySelector('.claro-student-focusarea');
      mainContentContainer === null || mainContentContainer === void 0 ? void 0 : (_mainContentContainer2 = mainContentContainer.querySelector('.panel-body')) === null || _mainContentContainer2 === void 0 ? void 0 : _mainContentContainer2.classList.remove('hidden');
    }
  });
}

function appendNoteTaker() {
  var _document$querySelect;

  var takeNotesButton = document.createElement('button');
  takeNotesButton.classList.add('better-slp-take-notes-button');
  takeNotesButton.addEventListener('click', function (e) {
    var noteTakerOpen = this.classList.contains('active');
    noteTakerOpen ? closeNoteTaker() : openNoteTaker();
    if (noteTakerOpen) this.classList.remove('active');else this.classList.add('active');
  });
  (_document$querySelect = document.querySelector('.app-body > .app-page-title > .app-page-title-row')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.appendChild(takeNotesButton);
}

function progressTab() {
  if (document.querySelectorAll('.better-slp-pie-chart-grid').length < 1) return;
}

function main() {
  var currentURL = window.location.href;

  switch (true) {
    case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/focusareas/.*').test(currentURL):
      appendNoteTaker();
      break;

    case new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/progress(/.*)?').test(currentURL):
      progressTab();
      break;
  }
}

if (!document.documentElement.classList.contains('nprogress-busy')) main();
(_document$querySelect2 = document.querySelector('#nprogress')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.addEventListener('DOMNodeRemoved', function () {
  main();
});
},{}]},{},["inject.ts"], null)
//# sourceMappingURL=/inject.js.map