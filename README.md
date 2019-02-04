## Print selected webpage elements 

This tiny ES6 Javascript module offers the possibility of printing selected HTML Element nodes from a webpage. It does that in a very flexible and non-intrusive way.

See the `examle` folder for a... well, example.

### Motivation

There are several solutions out there for the problem of how to print a part of an HTML page. I felt all of these approaches had a significant trade-off, so I've digged into this topic.

#### Solution 1. Media specific styles

This approach requires that you build your whole site print-aware. You'll have to statically assign classes for printable and non-printable sections of your HTML code.

#### Solution 2. Create a new page with the selected element's content

When adopting this approach, be ready to move around a lot of the DOM, and also to open a new window or tab in your browser.

## Benefits of this solution

* No need to statically declare what is printable and what is not
* No need to move around DOM nodes
* No new window or tab when printing
* Keeps all the styles for the selected elements

The solution involves a bit of DOM traversing, but I don't consider it as an issue - print is not a function that is called very frequently.




