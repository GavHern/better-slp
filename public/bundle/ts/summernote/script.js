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
})({"ts/summernote/script.ts":[function(require,module,exports) {
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var url = new URL(window.location.href);
window.addEventListener('load', function () {
  var noteTaker = document.getElementById('summernote');
  if (noteTaker == null) return;
  var noteTakerOptions = {
    minHeight: 300,
    maxHeight: null,
    focus: true,
    lineHeights: ['0.3', '0.6', '1.0', '1.5', '2.0'],
    dialogsInBody: true,
    tabDisable: true,
    toolbar: [['main', ['style']], ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']], ['font', ['fontname', 'fontsize']], ['edit', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['misc', ['height']], ['insert', ['link', 'picture', 'table', 'hr']], ['history', ['undo', 'redo']], ['help', ['help']]]
  };
  $(noteTaker).summernote(noteTakerOptions);
  $(noteTaker).summernote('fontName', 'Arial');
  $(noteTaker).summernote('fullscreen.toggle');
  var id = url.searchParams.get("id");
  chrome.storage.local.get('note-doc-' + id, function (data) {
    var rawTextData = Object.values(data)[0];
    $('#summernote').summernote('code', rawTextData);
  });
});

if (url.searchParams.get("dark") === "true") {
  document.head.innerHTML += "<link href=\"../../lib/bootstrap/dark.css\" rel=\"stylesheet\">";
}

function saveDoc(callback) {
  var id = url.searchParams.get("id");
  var data = $('#summernote').summernote('code');
  chrome.storage.local.set(_defineProperty({}, 'note-doc-' + id, data), callback);
}

window.addEventListener('message', function (e) {
  if (e.data == "save") saveDoc(function () {
    window.top.postMessage('save-successful', '*');
  });
});
},{}]},{},["ts/summernote/script.ts"], null)
//# sourceMappingURL=/ts/summernote/script.js.map