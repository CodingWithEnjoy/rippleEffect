# rippleEffect

**A lightweight JavaScript library for adding ripple effects to elements.**

The `rippleEffect` library allows you to easily incorporate ripple effects into your web application, enhancing the user experience when interacting with elements such as buttons or elements with the "r" class.

## Features

- Simple integration: Just include the script and call the `initialize` function.
- Customizable: Adjust the color, duration, and targeted elements for the ripple effect.

## Usage

### Installation

Include the `rippleEffect` script in your HTML file:

```html
<script src="https://cdn.jsdelivr.net/gh/zhmidd/rippleEffect@main/ripple.js"></script>
```

### Initialization

Initialize the ripple effect by calling the `initialize` function:

```javascript
window.addEventListener('DOMContentLoaded', () => {
    rippleEffect.initialize();
}, false);
```

### Configuration

Customize the ripple effect by modifying the `rippleEffect` object:

```javascript
rippleEffect = {
    elements: ".r,button",  // Specify the elements that trigger the ripple effect
    color: "rgba(0,0,0,.1)", // Set the color of the ripple
    transitionDuration: 1,   // Adjust the duration of the ripple animation
    // ... (other properties and methods)
};
```

### Custom Styling

You can further customize the appearance of the ripple effect by modifying the associated CSS:

```css

/* Deine the ripple animation */
.rs {
    /* Your ripple animation styles */
}

@keyframes rippleAnimation {
    /* Your keyframes for the ripple animation */
}
```

## Examples

```html
<button class="r">Click me</button>
<div class="r">Another element</div>
```

## Advanced Usage

The library includes automatic support for dynamically added elements via the MutationObserver. Elements added after the initial page load will also have the ripple effect applied.
