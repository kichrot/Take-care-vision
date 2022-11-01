tabId = -1;

function displayZoomLevel(level) {
    var percentZoom = parseFloat(level) * 100;
    var zoom_percent_str = percentZoom.toFixed(0) + '%';
    document.getElementById('Zoom_proc').textContent = zoom_percent_str;
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true }, function(tabs) {
        tabId = tabs[0].id;
        chrome.tabs.getZoomSettings(tabId, function(zoomSettings) {
            var modeRadios = document.getElementsByName('modeRadio');
            for (var i = 0; i < modeRadios.length; i++) {
                if (modeRadios[i].value == zoomSettings.mode)
                    modeRadios[i].checked = true;
            }
            var scopeRadios = document.getElementsByName('scopeRadio');
            for (var i = 0; i < scopeRadios.length; i++) {
                if (scopeRadios[i].value == zoomSettings.scope)
                    scopeRadios[i].checked = true;
            }
            var percentDefaultZoom =
                parseFloat(zoomSettings.defaultZoomFactor) * 100;
            document.getElementById('defaultLabel').textContent =
                chrome.i18n.getMessage("Default") + " " + percentDefaultZoom.toFixed(0) + '%';
        });
        chrome.tabs.getZoom(tabId, displayZoomLevel);
    });
    document.getElementById('Zoom_increaseButton_10').onclick = doZoomIn_10;
    document.getElementById('Zoom_decreaseButton_10').onclick = doZoomOut_10;
    document.getElementById('Zoom_increaseButton_1').onclick = doZoomIn_1;
    document.getElementById('Zoom_decreaseButton_1').onclick = doZoomOut_1;
    document.getElementById('Zoom_defaultButton').onclick = doZoomDefault;
});

function zoomChangeListener(zoomChangeInfo) {
    displayZoomLevel(zoomChangeInfo.newZoomFactor);
}

chrome.tabs.onZoomChange.addListener(zoomChangeListener);

function changeZoomByFactorDelta(factorDelta) {
    if (tabId == -1)
        return;
    chrome.tabs.getZoom(tabId, function(zoomFactor) {
        var newZoomFactor = factorDelta + zoomFactor;
        chrome.tabs.setZoom(tabId, newZoomFactor, function() {
            if (chrome.runtime.lastError) console.log(chrome.runtime.lastError.message);
        });
    });
}

function doZoomIn_1() {
    changeZoomByFactorDelta(0.01);
}

function doZoomIn_10() {
    changeZoomByFactorDelta(0.1);
}

function doZoomOut_1() {
    changeZoomByFactorDelta(-0.01);
}

function doZoomOut_10() {
    changeZoomByFactorDelta(-0.1);
}

function doZoomDefault() {
    if (tabId == -1) return;
    chrome.tabs.setZoom(tabId, 0, function() {
        if (chrome.runtime.lastError)
            console.log(chrome.runtime.lastError.message);
    });
}

function doSetMode() {
    if (tabId == -1) return;
    var modeVal;
    var modeRadios = document.getElementsByName('modeRadio');
    for (var i = 0; i < modeRadios.length; i++) {
        if (modeRadios[i].checked)
            modeVal = modeRadios[i].value;
    }
    var scopeVal;
    var scopeRadios = document.getElementsByName('scopeRadio');
    for (var i = 0; i < scopeRadios.length; i++) {
        if (scopeRadios[i].checked)
            scopeVal = scopeRadios[i].value;
    }
    if (!modeVal || !scopeVal) { return; }
    chrome.tabs.setZoomSettings(tabId, { mode: modeVal, scope: scopeVal },
        function() {
            if (chrome.runtime.lastError) {
                console.log('doSetMode() error: ' + chrome.runtime.lastError.message);
            }
        });
}