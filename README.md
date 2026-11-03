# Super Duper Winner 🧮

A lightweight, no-dependency calculator built with vanilla JavaScript. It handles everyday arithmetic through a simple button-driven interface, with keyboard shortcuts for quick input.

> **Project status:** The repository currently contains the calculator logic in `script.js`. To run it as a complete web page, provide an HTML interface with the expected display and button data attributes (details below).

## Features

- Addition, subtraction, multiplication, and division
- Decimal input, with one decimal point allowed per number
- Clear and delete controls
- Keyboard support
- Error handling for invalid expressions and non-finite results
- Compact decimal results, rounded to at most 10 decimal places
- No framework, package installation, or build step required

## Getting started

The current repository does not include an HTML page, so `script.js` cannot be opened on its own. Add an HTML document that provides the calculator display and buttons, then load the script—for example, with a script tag near the end of the document body:

```html
<script src="script.js"></script>
```

The JavaScript looks for an element with `id="display"` and buttons with the `.btn` class. Give number, decimal, and operator buttons a `data-value` attribute; give clear, delete, and equals buttons a `data-action` attribute:

```html
<div id="display" aria-live="polite">0</div>
<button class="btn" data-value="7">7</button>
<button class="btn" data-value="+">+</button>
<button class="btn" data-action="clear">Clear</button>
<button class="btn" data-action="delete">Delete</button>
<button class="btn" data-action="equals">=</button>
```

This is a minimal wiring example, not a complete calculator layout. Add the remaining buttons and your preferred styling to build the full interface.

## Controls

| Action | Button | Keyboard |
| --- | --- | --- |
| Enter a digit | Number button | `0`–`9` |
| Enter a decimal point | `.` | `.` |
| Choose an operation | `+`, `−`, `×`, `÷` | `+`, `-`, `*`, `/` |
| Calculate | `=` | `Enter` or `=` |
| Delete the last character | Delete button | `Backspace` |
| Reset | Clear button | `Escape` |

## Project structure

```text
.
├── README.md
└── script.js
```

## Notes

- The script expects its display and buttons to exist in the page before it runs.
- Division by zero and invalid expressions display `Error`.
- Results that are not integers are rounded to 10 decimal places to avoid long floating-point tails.

## Contributing

Ideas and improvements are welcome. If you extend the calculator, keep the button `data-value` and `data-action` conventions in sync with the event handling in `script.js`.
