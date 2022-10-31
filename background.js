function url_tab() {
    chrome.storage.local.get(['list_domain'], function(result) {
        chrome.tabs.query({ lastFocusedWindow: true, active: true }, function(tabs) {
            try {
                var cd = tabs[0].url.split(/\/+/)[1];
                if (tabs[0].url.includes("chrome://") || (tabs[0].url.includes("http://") == false && tabs[0].url.includes("https://") == false)) {
                    chrome.action.setIcon({ path: { "48": "icon_red.png" } });
                    return;
                }
                if (result.list_domain.includes(";" + cd + ";") == true) {
                    chrome.action.setIcon({ path: { "48": "icon_green.png" } });
                } else {
                    chrome.action.setIcon({ path: { "48": "icon_blue.png" } });
                }
            } catch { return }
        });
    });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    setTimeout(function() {url_tab(); }, 300);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    setTimeout(function() {url_tab(); }, 300);
});

chrome.tabs.onRemoved.addListener((removeInfo) => {
    setTimeout(function() {url_tab(); }, 300);
});