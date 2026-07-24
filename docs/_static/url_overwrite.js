// Replaces rtd-address with new-address in links

const rtd_address = 'canonical-rtd-testing.readthedocs-hosted.com';
const new_address = 'staging.canonical.com/product_1/docs';
const new_path = '/' + new_address.split('/').slice(1).join('/');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function overwriteMatchingAnchorUrls(container) {
  if (!container) return;

  const rtd_addressRegex = new RegExp(escapeRegExp(rtd_address), 'g');
  container.querySelectorAll('a[href], link[href]').forEach((anchor) => {
    anchor.href = anchor.href.replace(rtd_addressRegex, new_address);
  });
}

function prependPathToAnchorUrls(container, path) {
  if (!container) return;

  container.querySelectorAll('a[href], link[href]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (href && !href.startsWith(path)) {
      anchor.setAttribute('href', path + href);
    }
  });
}

function patchFlyout() {
  const rtdFlyout = document.querySelector('readthedocs-flyout');
  if (!rtdFlyout) return false;

  overwriteMatchingAnchorUrls(rtdFlyout);
  overwriteMatchingAnchorUrls(rtdFlyout.shadowRoot);

  rtdFlyout.addEventListener('click', () => {
    overwriteMatchingAnchorUrls(rtdFlyout);
    overwriteMatchingAnchorUrls(rtdFlyout.shadowRoot);
  });

  return true;
}

function patchNotification() {
  const rtdNotification = document.querySelector('readthedocs-notification');
  if (!rtdNotification) return false;

  overwriteMatchingAnchorUrls(rtdNotification);
  overwriteMatchingAnchorUrls(rtdNotification.shadowRoot);

  rtdNotification.addEventListener('click', () => {
    overwriteMatchingAnchorUrls(rtdNotification);
    overwriteMatchingAnchorUrls(rtdNotification.shadowRoot);
  });

  return true;
}

function patchSearch() {
  const rtdSearch = document.querySelector('readthedocs-search');
  if (!rtdSearch) return false;

  prependPathToAnchorUrls(rtdSearch, new_path);
  prependPathToAnchorUrls(rtdSearch.shadowRoot, new_path);

  rtdSearch.addEventListener('click', () => {
    prependPathToAnchorUrls(rtdSearch, new_path);
    prependPathToAnchorUrls(rtdSearch.shadowRoot, new_path);
  });

  return true;
}

function init() {
  overwriteMatchingAnchorUrls(document.querySelector('header'));

  if (patchFlyout()) return;
  if (patchNotification()) return;
  if (patchSearch()) return;

  const observer = new MutationObserver(() => {
    if (patchFlyout() || patchNotification() || patchSearch()) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.body) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}