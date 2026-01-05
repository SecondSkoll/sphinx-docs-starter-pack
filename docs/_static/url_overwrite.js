// overwrite links.js

console.stdlog = console.log.bind(console);
console.logs = [];

console.log = function() {
    // 1. Store the arguments in the logs array
    console.logs.push(Array.from(arguments));

    // 2. Call the original console.log to still output to the browser console
    console.stdlog.apply(console, arguments);
};

// Replace oldDomain with newDomain
const oldDomain = 'canonical-rtd-testing.readthedocs-hosted.com';
const newDomain = 'staging.canonical.com/product_1';

// Access the shadow DOM of the 'readthedocs-flyout' element
const shadowHost = document.querySelector('readthedocs-flyout');
const shadowRoot = shadowHost.shadowRoot;

console.log("logging...")

// if (shadowRoot) {
//     const anchors = shadowRoot.querySelectorAll('a');
//     for (let i = 0; i < anchors.length; i++) {
//         // Use a regular expression with the 'g' flag for global replacement
//         console.log(`Checking URL for replacement: ${anchors[i].href}`);
//         anchors[i].href = anchors[i].href.replace(new RegExp(oldDomain, 'g'), newDomain);
//         console.log(`URL now: ${anchors[i].href}`);
//     }
// }

window.addEventListener('load', function() {
    if (shadowRoot) {
        const anchors = shadowRoot.querySelectorAll('a');
        anchors.forEach(anchor => {
            // Use a regular expression with the 'g' flag for global replacement
            console.log(`Checking URL for replacement: ${anchor.href}`);
            anchor.href = anchor.href.replace(new RegExp(oldDomain, 'g'), newDomain);
            console.log(`URL now: ${anchor.href}`);
        }
        );
    }
}
);
