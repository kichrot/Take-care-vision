﻿"use strict";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ "def_text_param": ";1.5;1.3;1.1;1;0.9;0.7;1.1;0;0;1;0;0;100;0;0;0;" });
    chrome.storage.local.set({ "list_domain": "" });
    chrome.storage.local.set({ "interface_param": "1;0;100;100;" });
    chrome.storage.local.set({ "font_param": "0;0;0;0;0;0;0;0;;" });
});

function url_tab() {
    chrome.storage.local.get(['list_domain', 'interface_param'], function(result) {
        chrome.tabs.query({ lastFocusedWindow: true, active: true }, function(tabs) {
            try {
                let arr = result.interface_param.split(";");
                var cd = tabs[0].url.split(/\/+/)[1];
                if (tabs[0].url.includes("chrome://") || (tabs[0].url.includes("http://") == false && tabs[0].url.includes("https://") == false)) {
                    chrome.action.setIcon({ path: { "48": "/icons/icon_red.png" } });
                    chrome.action.setBadgeText({ text: '' });
                    return;
                }
                if (Number(arr[0]) == 1) {
                    var dom_list = (result.list_domain).replace(/\s+/g, '');
                    var k = dom_list.indexOf(";" + cd + ";");
                    if (k !== -1) {
                        var arr2 = (dom_list.slice(k, dom_list.indexOf("|", k))).split(";");
                        chrome.tabs.getZoom(function(zoomFactor) {
                            if (Number(arr2[18]) !== zoomFactor) {
                                chrome.tabs.setZoom(Number(arr2[18]));
                            }
                        });
                        chrome.action.setIcon({ path: { "48": "/icons/icon_green.png" } });
                    } else {
                        chrome.action.setIcon({ path: { "48": "/icons/icon_blue.png" } });
                    }
                }
                if (Number(arr[1]) == 1) {
                    chrome.tabs.getZoom(function(zoomFactor) {
                        chrome.action.setBadgeText({ text: String(Math.round(zoomFactor * 100)) });
                    });
                }
            } catch { return }
        });
    });
}

function zoomChangeListener(zoomChangeInfo) {
    setTimeout(function() { url_tab(); }, 300);
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    setTimeout(function() { url_tab(); }, 300);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    setTimeout(function() { url_tab(); }, 300);
});

chrome.tabs.onRemoved.addListener((removeInfo) => {
    setTimeout(function() { url_tab(); }, 300);
});

chrome.tabs.onZoomChange.addListener(zoomChangeListener);

chrome.storage.onChanged.addListener(zoomChangeListener);