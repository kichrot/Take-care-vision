"use strict";

var domain_list;
var text_param_start = "1.5;1.3;1.1;1;0.9;0.7;1.1;0;0;1;0;0;";
var text_param_def;
var brauzer_font_size_def;
var size_font_def;
var title_coeff_h1;
var title_coeff_h2;
var title_coeff_h3;
var title_coeff_h4;
var title_coeff_h5;
var title_coeff_h6;
var line_height;
var line_height_on_off;
var text_param_on_off;
var page_css_zoom;
var page_X_shift;
var page_Y_shift;

var title_coeff_h1_def;
var title_coeff_h2_def;
var title_coeff_h3_def;
var title_coeff_h4_def;
var title_coeff_h5_def;
var title_coeff_h6_def;
var line_height_def;
var line_height_on_off_def;
var text_param_on_off_def;
var page_css_zoom_def;
var page_X_shift_def;
var page_Y_shift_def;

/* определяем размер шрифта браузера по умолчанию */
brauzer_font_size_def = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');
brauzer_font_size_def = Number(brauzer_font_size_def.replace("px", ""));

function display_options(id, level) {
    document.getElementById(id).textContent = String(level);
}

function clean_domain_list() {
    if (typeof domain_list !== 'undefined') {
        let arr = domain_list.split("|");
        for (let i = 0; i < arr.length; i += 1) {
            let arr_2 = arr[i].split(";");
            if (Number(arr_2[2]) == size_font_def && Number(arr_2[3]) == title_coeff_h1_def && Number(arr_2[4]) == title_coeff_h2_def && Number(arr_2[5]) == title_coeff_h3_def && Number(arr_2[6]) == title_coeff_h4_def && Number(arr_2[7]) == title_coeff_h5_def && Number(arr_2[8]) == title_coeff_h6_def && Number(arr_2[9]) == line_height_def && Number(arr_2[10]) == line_height_on_off_def && Number(arr_2[11]) == text_param_on_off_def && Number(arr_2[12]) == page_css_zoom_def && Number(arr_2[13]) == page_X_shift_def && Number(arr_2[14]) == page_Y_shift_def) {
                arr.splice(i, 1);
            }
        }
        let str = arr.join("|");
        domain_list = str;
    }
}

function load_data() {

    chrome.storage.local.get(['list_domain', 'def_text_param'], function(result) {
        var fsd = 1 / (screen.width / 100) * brauzer_font_size_def;
        fsd = Number(fsd.toFixed(2))
        if (typeof result.def_text_param !== 'undefined') {
            domain_list = result.list_domain;
            text_param_def = result.def_text_param;
            let arr = text_param_def.split(";");
            size_font_def = Number(arr[0]);
            title_coeff_h1 = Number(arr[1]);
            title_coeff_h2 = Number(arr[2]);
            title_coeff_h3 = Number(arr[3]);
            title_coeff_h4 = Number(arr[4]);
            title_coeff_h5 = Number(arr[5]);
            title_coeff_h6 = Number(arr[6]);
            line_height = Number(arr[7]);
            line_height_on_off = Number(arr[8]);
            text_param_on_off = Number(arr[9]);
            page_css_zoom = Number(arr[10]);
            page_X_shift = Number(arr[11]);
            page_Y_shift = Number(arr[11]);
        } else {
            text_param_def = String(fsd) + ";" + text_param_start;
            chrome.storage.local.set({ "def_text_param": text_param_def });
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        }
        display_options("default_browser_font_size", "In browser: " + String(fsd) + "vw" + "(" + brauzer_font_size_def + "px" + ")");
        display_options("def_text_size", size_font_def);
        display_options("def_h1", title_coeff_h1);
        display_options("def_h2", title_coeff_h2);
        display_options("def_h3", title_coeff_h3);
        display_options("def_h4", title_coeff_h4);
        display_options("def_h5", title_coeff_h5);
        display_options("def_h6", title_coeff_h6);
        display_options("line_height", line_height);
        if (line_height_on_off == 1) document.getElementById('line_height_checkbox').checked = true;
        if (line_height_on_off == 0) document.getElementById('line_height_checkbox').checked = false;
        if (text_param_on_off == 1) document.getElementById('blacklist_checkbox').checked = true;
        if (text_param_on_off == 0) document.getElementById('blacklist_checkbox').checked = false;
    });
}

function Save() {
    if (confirm("Attention! \nYour individual settings, for specific domains, will be reset to the default new settings. \nYou agree?")) {
        size_font_def = Number(document.getElementById("def_text_size").textContent);
        title_coeff_h1 = Number(document.getElementById("def_h1").textContent);
        title_coeff_h2 = Number(document.getElementById("def_h2").textContent);
        title_coeff_h3 = Number(document.getElementById("def_h3").textContent);
        title_coeff_h4 = Number(document.getElementById("def_h4").textContent);
        title_coeff_h5 = Number(document.getElementById("def_h5").textContent);
        title_coeff_h6 = Number(document.getElementById("def_h6").textContent);
        line_height = Number(document.getElementById("line_height").textContent);
        var tpd = size_font_def + ";" + title_coeff_h1 + ";" + title_coeff_h2 + ";" + title_coeff_h3 + ";" + title_coeff_h4 + ";" + title_coeff_h5 + ";" + title_coeff_h6 + ";" + line_height + ";" + line_height_on_off + ";" + text_param_on_off + ";" + page_css_zoom + ";" + page_X_shift + ";" + page_Y_shift + ";";
        chrome.storage.local.set({ "def_text_param": tpd });
        if (tpd !== text_param_def) {
            domain_list = "";
            chrome.storage.local.set({ "list_domain": domain_list });
        }
    }
}

function StartDefaultData() {
    if (confirm("Attention! \nAll extension settings will be reset to the initial settings. Your individual settings for certain domains will be reset to the new default settings. \nYou agree?")) {
        var fsd = 1 / (screen.width / 100) * brauzer_font_size_def;
        fsd = Number(fsd.toFixed(2))
        text_param_def = String(fsd) + ";" + text_param_start;
        chrome.storage.local.set({ "def_text_param": text_param_def });
        chrome.storage.local.set({ "list_domain": "" });
        setTimeout(load_data, 300);
    }
}

function doZoom_size(dif, Id, discharge) {
    document.getElementById(Id).textContent =
        String((Number(document.getElementById(Id).textContent) + dif).toFixed(discharge));
}

function doZoomIn_001() {
    doZoom_size(0.01, 'def_text_size', 2);
}

function doZoomOut_001() {
    doZoom_size(-0.01, 'def_text_size', 2);
}

function doZoomIn_01() {
    doZoom_size(0.1, 'def_text_size', 2);
}

function doZoomOut_01() {
    doZoom_size(-0.1, 'def_text_size', 2);
}

function doZoomIn_h1() {
    doZoom_size(0.1, 'def_h1', 1);
}

function doZoomOut_h1() {
    doZoom_size(-0.1, 'def_h1', 1);
}

function doZoomIn_h2() {
    doZoom_size(0.1, 'def_h2', 1);
}

function doZoomOut_h2() {
    doZoom_size(-0.1, 'def_h2', 1);
}

function doZoomIn_h3() {
    doZoom_size(0.1, 'def_h3', 1);
}

function doZoomOut_h3() {
    doZoom_size(-0.1, 'def_h3', 1);
}

function doZoomIn_h4() {
    doZoom_size(0.1, 'def_h4', 1);
}

function doZoomOut_h4() {
    doZoom_size(-0.1, 'def_h4', 1);
}

function doZoomIn_h5() {
    doZoom_size(0.1, 'def_h5', 1);
}

function doZoomOut_h5() {
    doZoom_size(-0.1, 'def_h5', 1);
}

function doZoomIn_h6() {
    doZoom_size(0.1, 'def_h6', 1);
}

function doZoomOut_h6() {
    doZoom_size(-0.1, 'def_h6', 1);
}

function doZoomIn_line_height() {
    doZoom_size(0.1, 'line_height', 1);
}

function doZoomOut_line_height() {
    doZoom_size(-0.1, 'line_height', 1);
}

function checkLineHeight() {
    var checkbox = document.getElementById('line_height_checkbox');
    if (checkbox.checked == true) {
        line_height_on_off = 1;
    } else {
        line_height_on_off = 0;
    }
}

function checkBlackList() {
    var checkbox = document.getElementById('blacklist_checkbox');
    if (checkbox.checked == true) {
        text_param_on_off = 1;
    } else {
        text_param_on_off = 0;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('increaseButton_001').onclick = doZoomIn_001;
    document.getElementById('decreaseButton_001').onclick = doZoomOut_001;
    document.getElementById('increaseButton_01').onclick = doZoomIn_01;
    document.getElementById('decreaseButton_01').onclick = doZoomOut_01;
    document.getElementById('increaseButton_def_h1').onclick = doZoomIn_h1;
    document.getElementById('decreaseButton_def_h1').onclick = doZoomOut_h1;
    document.getElementById('increaseButton_def_h2').onclick = doZoomIn_h2;
    document.getElementById('decreaseButton_def_h2').onclick = doZoomOut_h2;
    document.getElementById('increaseButton_def_h3').onclick = doZoomIn_h3;
    document.getElementById('decreaseButton_def_h3').onclick = doZoomOut_h3;
    document.getElementById('increaseButton_def_h4').onclick = doZoomIn_h4;
    document.getElementById('decreaseButton_def_h4').onclick = doZoomOut_h4;
    document.getElementById('increaseButton_def_h5').onclick = doZoomIn_h5;
    document.getElementById('decreaseButton_def_h5').onclick = doZoomOut_h5;
    document.getElementById('increaseButton_def_h6').onclick = doZoomIn_h6;
    document.getElementById('decreaseButton_def_h6').onclick = doZoomOut_h6;
    document.getElementById('increaseButton_line_height').onclick = doZoomIn_line_height;
    document.getElementById('decreaseButton_line_height').onclick = doZoomOut_line_height;
    document.getElementById('line_height_checkbox').onclick = checkLineHeight;
    document.getElementById('blacklist_checkbox').onclick = checkBlackList;
    document.getElementById('saveForm').onclick = Save;
    document.getElementById('defaultButton').onclick = StartDefaultData;
});


(function() {
    setTimeout(load_data, 300);
}());