'use strict';

var domain_list;
var domain_current;
var font_size;
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
var page_width;

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
var page_width_def;

function openOptions() {
    chrome.runtime.openOptionsPage();
    setTimeout(() => window.close(), 300);
}

function url_domain(data) {
    var a = document.createElement('a');
    a.href = data;
    return a.hostname;
}

chrome.tabs.query({ lastFocusedWindow: true, active: true }, function(tabs) {
    if (tabs[0].url.includes("chrome://") || (tabs[0].url.includes("http://") == false && tabs[0].url.includes("https://") == false)) {
        window.close();
        return;
    }
    domain_current = url_domain(tabs[0].url);
});

function display_no_yes(display) {
    document.getElementById('fieldset_font_size').style.display = display;
    document.getElementById('fieldset_header_size_coefficient').style.display = display;
    document.getElementById('fieldset_line_height').style.display = display;
}

function display_no_yes_table_line_height(display) {
    document.getElementById('table_line_height').style.display = display;
}

function display_options(id, level) {
    document.getElementById(id).value = level;
}

function filling_out_form() {
    document.getElementById('current_domain').textContent = domain_current;
    document.getElementById('default_Font_size').textContent = "Default: " + size_font_def + 'vw';
    document.getElementById('text_size').textContent = String(font_size) + 'vw';
    document.getElementById('def_h1').textContent = String(title_coeff_h1);
    document.getElementById('def_h2').textContent = String(title_coeff_h2);
    document.getElementById('def_h3').textContent = String(title_coeff_h3);
    document.getElementById('def_h4').textContent = String(title_coeff_h4);
    document.getElementById('def_h5').textContent = String(title_coeff_h5);
    document.getElementById('def_h6').textContent = String(title_coeff_h6);
    document.getElementById('line_height').textContent = String(line_height);
    if (line_height_on_off == 1) {
        document.getElementById('line_height_checkbox').checked = true;
        display_no_yes_table_line_height("block");
    }
    if (line_height_on_off == 0) {
        document.getElementById('line_height_checkbox').checked = false;
        display_no_yes_table_line_height("none");
    }
    if (text_param_on_off == 1) {
        document.getElementById('blacklist_checkbox').checked = true;
        display_no_yes("block");
    }
    if (text_param_on_off == 0) {
        document.getElementById('blacklist_checkbox').checked = false;
        display_no_yes("none");
    }
    document.getElementById('Zoom_css').textContent = (page_css_zoom * 100).toFixed(1) + "%";
    document.getElementById('page_X_shift').textContent = String(page_X_shift);
    document.getElementById('page_Y_shift').textContent = String(page_Y_shift);
    document.getElementById('page_width').textContent = String(page_width);
}

function load_font_size() {
    if (typeof domain_list !== 'undefined') {
        if (domain_list.includes(";" + domain_current + ";") == true) {
            let arr = domain_list.split("|");
            for (let i = 0; i < arr.length; i += 1) {
                if (arr[i].includes(";" + domain_current + ";")) {
                    let arr_2 = arr[i].split(";");
                    font_size = Number(arr_2[2]);
                    title_coeff_h1 = Number(arr_2[3]);
                    title_coeff_h2 = Number(arr_2[4]);
                    title_coeff_h3 = Number(arr_2[5]);
                    title_coeff_h4 = Number(arr_2[6]);
                    title_coeff_h5 = Number(arr_2[7]);
                    title_coeff_h6 = Number(arr_2[8]);
                    line_height = Number(arr_2[9]);
                    line_height_on_off = Number(arr_2[10]);
                    text_param_on_off = Number(arr_2[11]);
                    page_css_zoom = Number(arr_2[12]);
                    page_X_shift = Number(arr_2[13]);
                    page_Y_shift = Number(arr_2[14]);
                    page_width = Number(arr_2[15]);
                }
            }
        } else {
            font_size = size_font_def;
        }
    } else {
        font_size = size_font_def;
    }
    filling_out_form();
}

function clean_domain_list() {
    if (typeof domain_list !== 'undefined') {
        let arr = domain_list.split("|");
        for (let i = 0; i < arr.length; i += 1) {
            let arr_2 = arr[i].split(";");
            if (Number(arr_2[2]) == size_font_def && Number(arr_2[3]) == title_coeff_h1_def && Number(arr_2[4]) == title_coeff_h2_def && Number(arr_2[5]) == title_coeff_h3_def && Number(arr_2[6]) == title_coeff_h4_def && Number(arr_2[7]) == title_coeff_h5_def && Number(arr_2[8]) == title_coeff_h6_def && Number(arr_2[9]) == line_height_def && Number(arr_2[10]) == line_height_on_off_def && Number(arr_2[11]) == text_param_on_off_def && Number(arr_2[12]) == page_css_zoom_def && Number(arr_2[13]) == page_X_shift_def && Number(arr_2[14]) == page_Y_shift_def && Number(arr_2[15]) == page_width_def) {
                arr.splice(i, 1);
            }
        }
        let str = arr.join("|");
        domain_list = str;
    }
}

function loadData() {
    chrome.storage.local.get(['list_domain', 'def_text_param'], function(result) {
        if (typeof result.def_text_param !== 'undefined') {
            domain_list = result.list_domain;
            let arr = result.def_text_param.split(";");
            size_font_def = Number(arr[0]);
            title_coeff_h1 = Number(arr[1]);
            title_coeff_h1_def = Number(arr[1]);
            title_coeff_h2 = Number(arr[2]);
            title_coeff_h2_def = Number(arr[2]);
            title_coeff_h3 = Number(arr[3]);
            title_coeff_h3_def = Number(arr[3]);
            title_coeff_h4 = Number(arr[4]);
            title_coeff_h4_def = Number(arr[4]);
            title_coeff_h5 = Number(arr[5]);
            title_coeff_h5_def = Number(arr[5]);
            title_coeff_h6 = Number(arr[6]);
            title_coeff_h6_def = Number(arr[6]);
            line_height = Number(arr[7]);
            line_height_def = Number(arr[7]);
            line_height_on_off = Number(arr[8]);
            line_height_on_off_def = Number(arr[8]);
            text_param_on_off = Number(arr[9]);
            text_param_on_off_def = Number(arr[9]);
            page_css_zoom = Number(arr[10]);
            page_css_zoom_def = Number(arr[10]);
            page_X_shift = Number(arr[11]);
            page_X_shift_def = Number(arr[11]);
            page_Y_shift = Number(arr[12]);
            page_Y_shift_def = Number(arr[12]);
            page_width = Number(arr[13]);
            page_width_def = Number(arr[13]);
        } else {
            alert("Attention! \nTo initialize the extension, you need to restart the current page.");
            return;
        }
        if (typeof domain_list !== 'undefined') {
            domain_list = domain_list.replace(/\s+/g, '');
        } else {
            chrome.storage.local.set({ "list_domain": "" });
        }
    });
    setTimeout(load_font_size, 300);
    clean_domain_list();
}
loadData();

function save_domain_list() {
    domain_list = domain_list + " ";
    if (domain_list == "undefined") domain_list = "";
    if (domain_list.includes(";" + domain_current + ";") == false) {
        domain_list = domain_list + ";" + domain_current + ";" + String(font_size) + ";" + String(title_coeff_h1) + ";" + String(title_coeff_h2) + ";" + String(title_coeff_h3) + ";" + String(title_coeff_h4) + ";" + String(title_coeff_h5) + ";" + String(title_coeff_h6) + ";" + String(line_height) + ";" + String(line_height_on_off) + ";" + String(text_param_on_off) + ";" + String(page_css_zoom) + ";" + String(page_X_shift) + ";" + String(page_Y_shift) + ";" + String(page_width) + ";|";
    } else {
        let arr = domain_list.split("|");
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i].includes(";" + domain_current + ";")) {
                arr.splice(i, 1);
            }
        }
        let str = arr.join("|");
        domain_list = str + ";" + domain_current + ";" + String(font_size) + ";" + String(title_coeff_h1) + ";" + String(title_coeff_h2) + ";" + String(title_coeff_h3) + ";" + String(title_coeff_h4) + ";" + String(title_coeff_h5) + ";" + String(title_coeff_h6) + ";" + String(line_height) + ";" + String(line_height_on_off) + ";" + String(text_param_on_off) + ";" + String(page_css_zoom) + ";" + String(page_X_shift) + ";" + String(page_Y_shift) + ";" + String(page_width) + ";|";
    }
    domain_list = domain_list.replace(/\s+/g, '');
    clean_domain_list();
    chrome.storage.local.set({ "list_domain": domain_list });
}

function doZoom_size_font(dif) {
    if (Number.isFinite(font_size)) {
        font_size = font_size + dif;
        font_size = font_size.toFixed(2);
        document.getElementById('text_size').textContent = String(font_size) + 'vw';
        save_domain_list();
    }
}

function doZoom_Texe_Default() {
    font_size = size_font_def;
    title_coeff_h1 = title_coeff_h1_def;
    title_coeff_h2 = title_coeff_h2_def;
    title_coeff_h3 = title_coeff_h3_def;
    title_coeff_h4 = title_coeff_h4_def;
    title_coeff_h5 = title_coeff_h5_def;
    title_coeff_h6 = title_coeff_h6_def;
    line_height = line_height_def;
    line_height_on_off = line_height_on_off_def;
    text_param_on_off = text_param_on_off_def;
    page_css_zoom = page_css_zoom_def;
    page_X_shift = page_X_shift_def;
    page_Y_shift = page_Y_shift_def;
    page_width = page_width_def;
    filling_out_form();
    save_domain_list();
}

function doZoom_h(Id, title_coeff, dif) {
    if (Number.isFinite(title_coeff)) {
        var title_coeff_new = title_coeff + dif;
        title_coeff_new = title_coeff_new.toFixed(1);
        document.getElementById(Id).textContent = String(title_coeff_new);
        return title_coeff_new;
    }
}

function doZoom_lh(Id, line_h, dif) {
    if (Number.isFinite(line_h)) {
        var line_height_new = line_h + dif;
        line_height_new = line_height_new.toFixed(1);
        document.getElementById(Id).textContent = String(line_height_new);
        return line_height_new;
    }
}

function doZoom_css(Id, p_css, dif) {
    if (Number.isFinite(p_css)) {
        var page_css_new = p_css + dif;
        //page_css_new = Number(page_css_new.toFixed(2));
        //document.getElementById(Id).textContent = String(page_css_new * 100).toFixed(0)) + "%";
        return page_css_new;
    }
}

function doZoomIn_001() {
    doZoom_size_font(0.01);
}

function doZoomOut_001() {
    doZoom_size_font(-0.01);
}

function doZoomIn_01() {
    doZoom_size_font(0.1);
}

function doZoomOut_01() {
    doZoom_size_font(-0.1);
}

function doZoomTextDefault() {
    doZoom_Texe_Default();
    chrome.tabs.reload();
}

function doZoomIn_h1() {
    if (Number.isFinite(title_coeff_h1)) {
        title_coeff_h1 = doZoom_h("def_h1", title_coeff_h1, 0.1);
        save_domain_list();
    }
}

function doZoomOut_h1() {
    if (Number.isFinite(title_coeff_h1)) {
        title_coeff_h1 = doZoom_h("def_h1", title_coeff_h1, -0.1);
        save_domain_list();
    }
}

function doZoomIn_h2() {
    if (Number.isFinite(title_coeff_h2)) {
        title_coeff_h2 = doZoom_h("def_h2", title_coeff_h2, 0.1);
        save_domain_list();
    }
}

function doZoomOut_h2() {
    if (Number.isFinite(title_coeff_h2)) {
        title_coeff_h2 = doZoom_h("def_h2", title_coeff_h2, -0.1);
        save_domain_list();
    }
}

function doZoomIn_h3() {
    if (Number.isFinite(title_coeff_h3)) {
        title_coeff_h3 = doZoom_h("def_h3", title_coeff_h3, 0.1);
        save_domain_list();
    }
}

function doZoomOut_h3() {
    if (Number.isFinite(title_coeff_h3)) {
        title_coeff_h3 = doZoom_h("def_h3", title_coeff_h3, -0.1);
        save_domain_list();
    }
}

function doZoomIn_h4() {
    if (Number.isFinite(title_coeff_h4)) {
        title_coeff_h4 = doZoom_h("def_h4", title_coeff_h4, 0.1);
        save_domain_list();
    }
}

function doZoomOut_h4() {
    if (Number.isFinite(title_coeff_h4)) {
        title_coeff_h4 = doZoom_h("def_h4", title_coeff_h4, -0.1);
        save_domain_list();
    }
}

function doZoomIn_h5() {
    if (Number.isFinite(title_coeff_h5)) {
        title_coeff_h5 = doZoom_h("def_h5", title_coeff_h5, 0.1);
        save_domain_list();
    }
}

function doZoomOut_h5() {
    if (Number.isFinite(title_coeff_h5)) {
        title_coeff_h5 = doZoom_h("def_h5", title_coeff_h5, -0.1);
        save_domain_list();
    }
}

function doZoomIn_h6() {
    if (Number.isFinite(title_coeff_h6)) {
        title_coeff_h6 = doZoom_h("def_h6", title_coeff_h6, 0.1);
        save_domain_list();
    }
}

function doZoomOut_h6() {
    if (Number.isFinite(title_coeff_h6)) {
        title_coeff_h6 = doZoom_h("def_h6", title_coeff_h6, -0.1);
        save_domain_list();
    }
}

function doZoomIn_line_height() {
    if (Number.isFinite(line_height)) {
        line_height = doZoom_lh("line_height", line_height, 0.1);
        save_domain_list();
    }
}

function doZoomOut_line_height() {
    if (Number.isFinite(line_height)) {
        line_height = doZoom_lh("line_height", line_height, -0.1);
        save_domain_list();
    }
}

function checkLineHeight() {
    var checkbox = document.getElementById('line_height_checkbox');
    if (checkbox.checked == true) {
        display_no_yes_table_line_height("block");
        line_height_on_off = 1;
        save_domain_list();
    } else {
        display_no_yes_table_line_height("none");
        line_height_on_off = 0;
        save_domain_list();
        chrome.tabs.reload();
    }
}

function checkBlackList() {
    var checkbox = document.getElementById('blacklist_checkbox');
    if (checkbox.checked == true) {
        display_no_yes("block");
        text_param_on_off = 1;
        save_domain_list();
    } else {
        display_no_yes("none");
        text_param_on_off = 0;
        save_domain_list();
        chrome.tabs.reload();
    }
}

function doZoomIn_page_css_zoom_001() {
    var but = document.getElementById('Zoom_increaseButton_css_001');
    if (but.disabled) {
        return;
    }
    but.disabled = true;
    if (Number.isFinite(page_css_zoom)) {
        page_css_zoom = doZoom_css("Zoom_css", page_css_zoom, 0.001);
        page_css_zoom = Number(page_css_zoom.toFixed(3));
        document.getElementById('Zoom_css').textContent = String((page_css_zoom * 100).toFixed(1)) + "%";
        save_domain_list();
    }
    setTimeout(() => {
        but.disabled = false;
    }, 500);
}

function doZoomOut_page_css_zoom_001() {
    var but = document.getElementById('Zoom_decreaseButton_css_001');
    if (but.disabled) {
        return;
    }
    but.disabled = true;
    if (Number.isFinite(page_css_zoom)) {
        page_css_zoom = doZoom_css("Zoom_css", page_css_zoom, -0.001);
        page_css_zoom = Number(page_css_zoom.toFixed(3));
        document.getElementById('Zoom_css').textContent = String((page_css_zoom * 100).toFixed(1)) + "%";
        save_domain_list();
    }
    setTimeout(() => {
        but.disabled = false;
    }, 500);
}

function doZoomIn_page_css_zoom_01() {
    var but = document.getElementById('Zoom_increaseButton_css_01');
    if (but.disabled) {
        return;
    }
    but.disabled = true;
    if (Number.isFinite(page_css_zoom)) {
        page_css_zoom = doZoom_css("Zoom_css", page_css_zoom, 0.01);
        page_css_zoom = Number(page_css_zoom.toFixed(3));
        document.getElementById('Zoom_css').textContent = String((page_css_zoom * 100).toFixed(1)) + "%";
        save_domain_list();
    }
    setTimeout(() => {
        but.disabled = false;
    }, 500);
}

function doZoomOut_page_css_zoom_01() {
    var but = document.getElementById('Zoom_decreaseButton_css_01');
    if (but.disabled) {
        return;
    }
    but.disabled = true;
    if (Number.isFinite(page_css_zoom)) {
        page_css_zoom = doZoom_css("Zoom_css", page_css_zoom, -0.01);
        page_css_zoom = Number(page_css_zoom.toFixed(3));
        document.getElementById('Zoom_css').textContent = String((page_css_zoom * 100).toFixed(1)) + "%";
        save_domain_list();
    }
    setTimeout(() => {
        but.disabled = false;
    }, 500);
}

function doZoomIn_page_X_shift() {
    var but = document.getElementById('increaseButton_page_X_shift');
    if (but.disabled) {
        return;
    }
    but.disabled = true;
    if (Number.isFinite(page_X_shift)) {
        page_X_shift = doZoom_css("page_X_shift", page_X_shift, 1);
        save_domain_list();
    }
    setTimeout(() => {
        but.disabled = false;
    }, 500);
}

function doZoomOut_page_X_shift() {
    var but = document.getElementById('decreaseButton_page_X_shift');
    if (but.disabled) {
        return;
    }
    but.disabled = true;
    if (Number.isFinite(page_X_shift)) {
        page_X_shift = doZoom_css("page_X_shift", page_X_shift, -1);
        save_domain_list();
    }
    setTimeout(() => {
        but.disabled = false;
    }, 500);
}

function doZoomIn_page_Y_shift() {
    var but = document.getElementById('increaseButton_page_Y_shift');
    if (but.disabled) {
        return;
    }
    but.disabled = true;
    if (Number.isFinite(page_Y_shift)) {
        page_Y_shift = doZoom_css("page_Y_shift", page_Y_shift, 1);
        save_domain_list();
    }
    setTimeout(() => {
        but.disabled = false;
    }, 500);
}

function doZoomOut_page_Y_shift() {
    var but = document.getElementById('decreaseButton_page_Y_shift');
    if (but.disabled) {
        return;
    }
    but.disabled = true;
    if (Number.isFinite(page_Y_shift)) {
        page_Y_shift = doZoom_css("page_Y_shift", page_Y_shift, -1);
        save_domain_list();
    }
    setTimeout(() => {
        but.disabled = false;
    }, 500);
}

function doZoomIn_page_width() {
    var but = document.getElementById('increaseButton_width');
    if (but.disabled) {
        return;
    }
    but.disabled = true;
    if (Number.isFinite(page_width)) {
        page_width = doZoom_css("page_width", page_width, 1);
        save_domain_list();
    }
    setTimeout(() => {
        but.disabled = false;
    }, 500);
}

function doZoomOut_page_width() {
    var but = document.getElementById('decreaseButton_width');
    if (but.disabled) {
        return;
    }
    but.disabled = true;
    if (Number.isFinite(page_width)) {
        page_width = doZoom_css("page_width", page_width, -1);
        save_domain_list();
    }
    setTimeout(() => {
        but.disabled = false;
    }, 500);
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
    document.getElementById('Option_text').onclick = openOptions;
    document.getElementById('Zoom_increaseButton_css_001').onclick = doZoomIn_page_css_zoom_001;
    document.getElementById('Zoom_decreaseButton_css_001').onclick = doZoomOut_page_css_zoom_001;
    document.getElementById('Zoom_increaseButton_css_01').onclick = doZoomIn_page_css_zoom_01;
    document.getElementById('Zoom_decreaseButton_css_01').onclick = doZoomOut_page_css_zoom_01;
    document.getElementById('increaseButton_page_X_shift').onclick = doZoomIn_page_X_shift;
    document.getElementById('decreaseButton_page_X_shift').onclick = doZoomOut_page_X_shift;
    document.getElementById('increaseButton_page_Y_shift').onclick = doZoomIn_page_Y_shift;
    document.getElementById('decreaseButton_page_Y_shift').onclick = doZoomOut_page_Y_shift;
    document.getElementById('increaseButton_width').onclick = doZoomIn_page_width;
    document.getElementById('decreaseButton_width').onclick = doZoomOut_page_width;
    document.getElementById('button_default_text').onclick = doZoomTextDefault;
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
    var my_tabid;
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        my_tabid = tabs[0].id;
        setTimeout(zoom_Action, 50);
    });

    function zoom_Action() {
        chrome.scripting.executeScript({
            target: { tabId: my_tabid },
            files: ['zoom.js'],
        });
        setTimeout(loadData, 100);
    }
})