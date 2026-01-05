// overwrite links.js

// Replace oldDomain with newDomain
const oldDomain = 'canonical-rtd-testing.readthedocs-hosted.com';
const newDomain = 'staging.canonical.com/product_1';

// Access the shadow DOM of the 'readthedocs-flyout' element
const shadowHost = document.querySelector('readthedocs-flyout');
const shadowRoot = shadowHost.shadowRoot;

if (shadowRoot) {
    var anchors = shadowRoot.querySelectorAll('a');
    for (var i = 0; i < anchors.length; i++) {
        // Use a regular expression with the 'g' flag for global replacement
        anchors[i].href = anchors[i].href.replace(new RegExp(oldDomain, 'g'), newDomain);
    }
}