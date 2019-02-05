/*jshint esversion: 6 */

const PrintElements = (function () {
    const hideFromPrintClass = "pe-no-print";
    const preservePrintClass = "pe-preserve-print";
    const preserveAncestorClass = "pe-preserve-ancestor";
    const bodyElementName = "BODY";

    const _hide = function (element) {
        if (!element.classList.contains(preservePrintClass)) {
            element.classList.add(hideFromPrintClass);
        }
    };

    const _preserve = function (element, isStartingElement) {
        element.classList.remove(hideFromPrintClass);
        element.classList.add(preservePrintClass);
        if (!isStartingElement) {
            element.classList.add(preserveAncestorClass);
        }
    };

    const _clean = function (element) {
        element.classList.remove(hideFromPrintClass);
        element.classList.remove(preservePrintClass);
        element.classList.remove(preserveAncestorClass);
    };

    const _walkSiblings = function (element, callback) {
        let sibling = element.previousElementSibling;
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

    const _attachPrintClasses = function (element, isStartingElement) {
        _preserve(element, isStartingElement);
        _walkSiblings(element, _hide);
    };

    const _cleanup = function (element, isStartingElement) {
        _clean(element);
        _walkSiblings(element, _clean);
    };

    const _walkTree = function (element, callback) {
        let currentElement = element;
        callback(currentElement, true);
        currentElement = currentElement.parentElement;
        while (currentElement && currentElement.nodeName !== bodyElementName) {
            callback(currentElement, false);
            currentElement = currentElement.parentElement;
        }
    };

    const _print = function (elements) {
        let iterableElements = Array.from(elements);
        for (const element of iterableElements) {
            _walkTree(element, _attachPrintClasses);
        }
        window.print();
        for (const element of iterableElements) {
            _walkTree(element, _cleanup);
        }
    };

    return {
        print: _print
    };
})();
