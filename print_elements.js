var PrintElements = (function () {
    "use strict";

    var hideFromPrintClass = "pe-no-print";
    var preservePrintClass = "pe-preserve-print";
    var preserveAncestorClass = "pe-preserve-ancestor";
    var bodyElementName = "BODY";

    var _hide = function (element) {
        if (!element.classList.contains(preservePrintClass)) {
            element.classList.add(hideFromPrintClass);
        }
    };

    var _preserve = function (element, isStartingElement) {
        element.classList.remove(hideFromPrintClass);
        element.classList.add(preservePrintClass);
        if (!isStartingElement) {
            element.classList.add(preserveAncestorClass);
        }
    };

    var _clean = function (element) {
        element.classList.remove(hideFromPrintClass);
        element.classList.remove(preservePrintClass);
        element.classList.remove(preserveAncestorClass);
    };

    var _walkSiblings = function (element, callback) {
        var sibling = element.previousElementSibling;
        while (sibling) {
            callback(sibling);
            sibling = sibling.previousElementSibling;
        }
        sibling = element.nextElementSibling;
        while (sibling) {
            callback(sibling);
            sibling = sibling.nextElementSibling;
        }
    };

    var _attachPrintClasses = function (element, isStartingElement) {
        _preserve(element, isStartingElement);
        _walkSiblings(element, _hide);
    };

    var _cleanup = function (element, isStartingElement) {
        _clean(element);
        _walkSiblings(element, _clean);
    };

    var _walkTree = function (element, callback) {
        var currentElement = element;
        callback(currentElement, true);
        currentElement = currentElement.parentElement;
        while (currentElement && currentElement.nodeName !== bodyElementName) {
            callback(currentElement, false);
            currentElement = currentElement.parentElement;
        }
    };

    var _delayedCleanup = function (elements) {
      for (var i = 0; i < elements.length; i++) {
          _walkTree(elements[i], _cleanup);
      }
    }

    var _cleanAll = function() {
      const elements = document.querySelector(bodyElementName).querySelectorAll('*');
      for ( var currentElement of elements ) {
        if( currentElement && currentElement.nodeName !== bodyElementName ) {
            _clean( currentElement );
        }
      }
    }

    var _print = function (elements) {
        _cleanAll();
        for (var i = 0; i < elements.length; i++) {
            _walkTree(elements[i], _attachPrintClasses);
        }
        // The iPad does not pause on window.print() so we can not do cleanup right
        // after that call. Below are two attempts to delay this callback to avoid this,
        // but on iPad neither of these proved satisfactory, created a _cleanAll that is
        // called before a new print is set up or could be called externally
        // window.addEventListener('afterprint', function() { _delayedCleanup(elements) } );
        // setTimeout( function() { _delayedCleanup(elements) }, 10000 );
        window.print();
    };

    return {
        print: _print,
        cleanAll: _cleanAll
    };
})();
