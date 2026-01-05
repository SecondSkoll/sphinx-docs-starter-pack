// overwrite links.js


// Replace oldDomain with newDomain
const oldDomain = 'canonical-rtd-testing.readthedocs-hosted.com';
const newDomain = 'staging.canonical.com/product_1';

// Logging for debugging purposes
console.stdlog = console.log.bind(console);
console.logs = [];

console.log = function() {
    // 1. Store the arguments in the logs array
    console.logs.push(Array.from(arguments));

    // 2. Call the original console.log to still output to the browser console
    console.stdlog.apply(console, arguments);
};

window.addEventListener('load', function() {
    const rtdflyout = this.document.querySelector('readthedocs-flyout');
    rtdflyout.addEventListener('click', function(e) {
        this.setTimeout(() => {
            // Access the shadow DOM of the 'readthedocs-flyout' element
            const shadowRoot = rtdflyout.shadowRoot;

            const anchors = shadowRoot.querySelectorAll('a');
            anchors.forEach(anchor => {
                console.log(`Checking URL for replacement: ${anchor.href}`);
                anchor.href = anchor.href.replace(new RegExp(oldDomain, 'g'), newDomain);
                console.log(`URL now: ${anchor.href}`);
            }
            );}, 1000);
        }
    );
}
);


// When the RTD flyout is clicked, the URLs refresh - so this doesn't quite work.

// // Replace oldDomain with newDomain
// const oldDomain = 'canonical-rtd-testing.readthedocs-hosted.com';
// const newDomain = 'staging.canonical.com/product_1';

// // Logging for debugging purposes
// console.stdlog = console.log.bind(console);
// console.logs = [];

// console.log = function() {
//     // 1. Store the arguments in the logs array
//     console.logs.push(Array.from(arguments));

//     // 2. Call the original console.log to still output to the browser console
//     console.stdlog.apply(console, arguments);
// };

// // On window load, find all relevant anchor tags and replace URLs
// window.addEventListener('load', function() {
//     this.setTimeout(() => {
//         // Access the shadow DOM of the 'readthedocs-flyout' element
//         const shadowHost = document.querySelector('readthedocs-flyout');
//         const shadowRoot = shadowHost.shadowRoot;

//         const anchors = shadowRoot.querySelectorAll('a');
//         anchors.forEach(anchor => {
//             console.log(`Checking URL for replacement: ${anchor.href}`);
//             anchor.href = anchor.href.replace(new RegExp(oldDomain, 'g'), newDomain);
//             console.log(`URL now: ${anchor.href}`);
//         }
//         );}, 2000);
//     }
// );
