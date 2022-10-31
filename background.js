chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({"def_text_param": ";1.5;1.3;1.1;1;0.9;0.7;1.1;0;0;1;0;0;100;0;"});
    chrome.storage.local.set({"list_domain": ""});
});

function url_tab() {
    chrome.storage.local.get(['list_domain'], function(result) {
        chrome.tabs.query({ lastFocusedWindow: true, active: true }, function(tabs) {
            try {
                var cd = tabs[0].url.split(/\/+/)[1];
                if (tabs[0].url.includes("chrome://") || (tabs[0].url.includes("http://") == false && tabs[0].url.includes("https://") == false)) {
                    chrome.action.setIcon({ path: { "48": "/icons/icon_red.png" } });
                    chrome.action.setBadgeText({text: ""});
                    return;
                }
                if (result.list_domain.includes(";" + cd + ";") == true) {
                    chrome.action.setIcon({ path: { "48": "/icons/icon_green.png" } });
                } else {
                    chrome.action.setIcon({ path: { "48": "/icons/icon_blue.png" } });
                }
                chrome.tabs.getZoom(function (zoomFactor) {
                    chrome.action.setBadgeText({text: String(zoomFactor * 100)});
                }); 
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