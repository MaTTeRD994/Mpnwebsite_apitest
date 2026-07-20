// ============================================================================
// MaTTeRPxiel Network (MPN) - KubeJS Network Class Filter Whitelist
// ============================================================================
// Place this file inside: kubejs/startup_scripts/allow_net.js
// This allows KubeJS server scripts to use Java network classes (URL, HttpURLConnection)
// so the real-time character sync script (mpn_live_sync.js) can send vitals!
// ============================================================================

if (typeof JavaEvents !== 'undefined' && JavaEvents.classFilter) {
    JavaEvents.classFilter(event => {
        event.allow('java.net.*');
        event.allow('java.io.*');
    });
}
