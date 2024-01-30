const isTouchCapable = 'ontouchstart' in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch) ||
    navigator.maxTouchPoints > 0 ||
    window.navigator.msMaxTouchPoints > 0;
let startEv;
let endEv;
if (isTouchCapable) {
    startEv = 'touchstart';
    endEv = 'touchend';
} else {
    startEv = 'mousedown';
    endEv = 'mouseup';
}
const rippleEffect = {
    elements: ".r,button,[r]",
    color: "rgba(0,0,0,.1)",
    transitionDuration: 1,

    initialize: () => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
      ${rippleEffect.elements} {
        -webkit-tap-highlight-color: transparent;
        position: relative;
        cursor: pointer;
        user-select:none;
        overflow: hidden;
      }
      :root{
          --rippleColor:${rippleEffect.color}
      }
      .rs {
        position: absolute;
        background: var(--rippleColor);
        pointer-events: none;
        width: 5px;
        height: 5px;
        transform: translate(-50%, -50%);
        border-radius: 100%;
      }
      @keyframes rippleAnimation {
        0% {
          opacity: 0;
        }
        15% {
          opacity: 1;
        }
        50%, 100% {
          opacity: 1;
          width: var(--ms);
          height: var(--ms);
        }
      }
    `;
        document.head.append(styleElement);

        const elements = document.querySelectorAll(rippleEffect.elements);

        function addRippleEffect(element) {
            element.classList.add("rd");

            element.addEventListener(startEv, (event) => {
                let tchData;
                if (isTouchCapable) {
                    tchData = event.touches[0];
                } else {
                    tchData = event;
                }
                const ripple = document.createElement("div");
                const y = tchData.clientY - element.getBoundingClientRect().top;
                const x = tchData.clientX - element.getBoundingClientRect().left;
                const scaleY = Math.max(element.clientHeight - y, y) * 2.5;
                const scaleX = Math.max(element.clientWidth - x, x) * 2.5;
                const rippleSize = Math.max(scaleY, scaleX) * 3 / 2;
                const transitionDuration = Math.max(rippleSize / 1250, 0.2) + rippleEffect.transitionDuration;

                ripple.style.cssText = `
          transition: ${transitionDuration}s;
          transition-delay:.1s;
          animation: rippleAnimation forwards ${transitionDuration / 1.2}s;
          top: ${y}px;
          left: ${x}px;
          --ms: ${rippleSize}px;
        `;
                ripple.classList.add('rs');

                function removeRipple() {
                    ripple.style.background = 'transparent';
                    setTimeout(() => {
                        ripple.remove()
                    }, transitionDuration * 1000)
                }

                element.addEventListener(endEv, removeRipple, false);


                element.insertAdjacentElement('beforeend', ripple);
            }, false);
        }

        elements.forEach(addRippleEffect);
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((addedNode) => {
                    if (addedNode.nodeType === 1 && addedNode.matches(rippleEffect.elements)) {
                        addRippleEffect(addedNode);
                    }
                });
            });
        });
        observer.observe(document.body, {childList: true, subtree: true});
    }
};
window.addEventListener('DOMContentLoaded', () => {
    rippleEffect.initialize()
}, false)
