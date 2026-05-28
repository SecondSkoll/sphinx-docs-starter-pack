// Replace RTDDomain with canonicalDomain
const RTDDomain = 'canonical-rtd-testing.readthedocs-hosted.com';
const canonicalDomain = 'staging.canonical.com/test_product/docs';

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function overwriteMatchingAnchorUrls(container) {
    if (!container) return;

    const anchors = container.querySelectorAll('a[href], link[href]');
    const RTDDomainRegex = new RegExp(escapeRegExp(RTDDomain), 'g');

    anchors.forEach(anchor => {
        anchor.href = anchor.href.replace(RTDDomainRegex, canonicalDomain);
    });
}

overwriteMatchingAnchorUrls(document.querySelector('head'));

// Use a MutationObserver to wait for the RTD flyout element to appear in the DOM
const observer = new MutationObserver(function(mutations, obs) {

    const rtdFlyout = document.querySelector('readthedocs-flyout');
    if (!rtdFlyout) return;

    obs.disconnect();

    rtdFlyout.addEventListener('click', function() {
        const shadowRoot = rtdFlyout.shadowRoot;
        if (!shadowRoot) return;

        overwriteMatchingAnchorUrls(shadowRoot);
    });
});

observer.observe(document.body, { childList: true, subtree: true });