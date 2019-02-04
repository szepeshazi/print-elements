/*jshint esversion: 6 */

const PrintElements = (function () {
    const hideFromPrintClass = "pe-no-print";
    const preservePrintClass = "pe-preserve-print";
    const bodyElementName = "BODY";

    const _hide = function(element) {
        if (!element.classList.contains(preservePrintClass)) {
            element.classList.add(hideFromPrintClass);
        }
    };

    const _preserve = function(element) {
        element.classList.remove(hideFromPrintClass);
        element.classList.add(preservePrintClass);
    };

    const _clean = function(element) {
        element.classList.remove(hideFromPrintClass);
        element.classList.remove(preservePrintClass);
    };

    const _attachPrintClasses = function (element) {
        _preserve(element);
        let sibling = element.previousElementSibling;
        while (sibling) {
            _hide(sibling);
            sibling = sibling.previousElementSibling;
        }
        sibling = element.nextElementSibling;
        while (sibling) {
            _hide(sibling);
            sibling = sibling.nextElementSibling;
        }
    };

    const _cleanup = function (element) {
        _clean(element);
        let sibling = element.previousElementSibling;
        while (sibling) {
            _clean(sibling);
            sibling = sibling.previousElementSibling;
        }
        sibling = element.nextElementSibling;
        while (sibling) {
            _clean(sibling);
            sibling = sibling.nextElementSibling;
        }
    };

    const _walkTree = function(element, callback) {
        let currentElement = element;
        callback(currentElement);
        currentElement = currentElement.parentElement;
        while (currentElement && currentElement.nodeName !== bodyElementName) {
            callback(currentElement);
            currentElement = currentElement.parentElement;
        }
    };

    const _print = function(elements) {
        for (const element of Array.from(elements)) {
            _walkTree(element, _attachPrintClasses);
        }
        window.print();
        for (const element of Array.from(elements)) {
            _walkTree(element, _cleanup);
        }
    };

    return {
        print: _print
    };
})();
