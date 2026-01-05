// overwrite_links_specific.js
document.addEventListener('DOMContentLoaded', function() {
    window.onload = function() {
        var anchors = document.getElementsByTagName("a");
        var oldDomain = "canonical-rtd-testing.readthedocs-hosted.com";
        var newDomain = "staging.canonical.com";

        for (var i = 0; i < anchors.length; i++) {
            // Use a regular expression with the 'g' flag for global replacement
            anchors[i].href = anchors[i].href.replace(new RegExp(oldDomain, 'g'), newDomain);
        }
    };
});
