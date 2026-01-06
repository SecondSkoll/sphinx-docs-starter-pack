// overwrite links.js

// Replace oldDomain with newDomain
const oldDomain = 'canonical-rtd-testing.readthedocs-hosted.com';
const newDomain = 'staging.canonical.com/product_1/docs';

// // Logging for debugging purposes - DISABLED
// console.stdlog = console.log.bind(console);
// console.logs = [];

// console.log = function() {
//     // 1. Store the arguments in the logs array
//     console.logs.push(Array.from(arguments));

//     // 2. Call the original console.log to still output to the browser console
//     console.stdlog.apply(console, arguments);
// };

const rtdFlyout = document.querySelector('readthedocs-flyout');

rtdFlyout.addEventListener('load', function() {
    setTimeout(() => {
    rtdFlyout.addEventListener('click', function(e) {
        // Access the shadow DOM of the 'readthedocs-flyout' element
        const shadowRoot = rtdFlyout.shadowRoot;
        const anchors = shadowRoot.querySelectorAll('a');
        anchors.forEach(anchor => {
            console.log(`Checking URL for replacement: ${anchor.href}`);
            anchor.href = anchor.href.replace(new RegExp(oldDomain, 'g'), newDomain);
            console.log(`URL now: ${anchor.href}`);
        }
        )
        }
    );}, 1000);
}
);