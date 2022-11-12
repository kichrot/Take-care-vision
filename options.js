"use strict";

var domain_list;
var text_param_start = ";1.5;1.3;1.1;1;0.9;0.7;1.1;0;0;1;0;0;100;0;0;";
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
var page_width;
var page_css_on_off;
var align_text_on_off;
var change_icons_on_off;
var change_badge_on_off;
var param_font_on_off;
var shadow_font_on_off;
var shadow_font_width;
var shadow_font_blur;
var shadow_font_lightens;
var contour_font_on_off;
var contour_font_width;
var selected_font_on_off;
var selected_font;
var scale_settings;

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
var page_css_on_off_def;
var align_text_on_off_def;

// локализация
var elements = document.querySelectorAll('[localization]');
elements.forEach(function(el) {
    el.innerText = chrome.i18n.getMessage(el.getAttribute('localization'))
});
document.getElementById("defaultButton").title = chrome.i18n.getMessage("Title_defaultButton");
document.getElementById("saveForm").title = chrome.i18n.getMessage("Title_saveForm");

/* определяем размер шрифта браузера по умолчанию */
brauzer_font_size_def = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');
brauzer_font_size_def = Number(brauzer_font_size_def.replace("px", ""));

function display_options(id, level) {
    document.getElementById(id).textContent = String(level);
}

function filling_domain_list() {
    chrome.storage.local.get(['list_domain'], function(result) {
        if (typeof result.list_domain !== 'undefined') {
            let arr = result.list_domain.split("|");
            var objSel = document.getElementById("List_domain_no_default");
            for (let i = 0; i < arr.length; i += 1) {
                let arr_2 = arr[i].split(";");
                if (typeof arr_2[1] !== 'undefined') {
                    objSel.options[objSel.options.length] = new Option("", arr_2[1]);
                }
            }
            // сортировка по алфавиту и нумерация списка доменов
            var items = [...objSel.querySelectorAll("option")];
            items.sort((a, b) => a.value == b.text ? 0 : a.value < b.value ? -1 : 1);
            var i = 0;
            items.forEach(item => {
                objSel.appendChild(item);
                item.text = String(i = i + 1) + ".        " + item.value
            });
        }
    });
}

function DeleteDomain() {
    var objSel = document.getElementById("List_domain_no_default");
    if (objSel.selectedIndex != -1) {
        if (typeof domain_list !== 'undefined') {
            let arr = domain_list.split("|");
            for (let i = 0; i < arr.length; i += 1) {
                let arr_2 = arr[i].split(";");
                if (arr_2[1] == objSel.options[objSel.selectedIndex].value) {
                    arr.splice(i, 1);
                    break;
                }
            }
            let str = arr.join("|");
            domain_list = str;
        }
        chrome.storage.local.set({ "list_domain": domain_list }, function() {
            objSel.options.length = 0;
            filling_domain_list();
        });
    }
}

function OpenDomain() {
    var objSel = document.getElementById("List_domain_no_default");
    if (objSel.selectedIndex != -1) {
        window.open("http://" + objSel.options[objSel.selectedIndex].value, "_blank");
    }
}

function clean_domain_list() {
    if (typeof domain_list !== 'undefined') {
        let arr = domain_list.split("|");
        for (let i = 0; i < arr.length; i += 1) {
            let arr_2 = arr[i].split(";");
            if (Number(arr_2[2]) == size_font_def && Number(arr_2[3]) == title_coeff_h1_def && Number(arr_2[4]) == title_coeff_h2_def && Number(arr_2[5]) == title_coeff_h3_def && Number(arr_2[6]) == title_coeff_h4_def && Number(arr_2[7]) == title_coeff_h5_def && Number(arr_2[8]) == title_coeff_h6_def && Number(arr_2[9]) == line_height_def && Number(arr_2[10]) == line_height_on_off_def && Number(arr_2[11]) == text_param_on_off_def && Number(arr_2[12]) == page_css_zoom_def && Number(arr_2[13]) == page_X_shift_def && Number(arr_2[14]) == page_Y_shift_def && Number(arr_2[15]) == page_width_def && Number(arr_2[16]) == page_css_on_off_def && Number(arr_2[17]) == align_text_on_off_def) {
                arr.splice(i, 1);
            }
        }
        let str = arr.join("|");
        domain_list = str;
    }
}

function Scale_page_settings() {
    var css = document.createElement('style');
    css.innerHTML += [`body {transform-origin: 0px 0px; transform: scale(${String(scale_settings)}%);`].join("\n");
    document.documentElement.appendChild(css);
}

function filter_domain() {
    var keyword = document.getElementById("domain_filter_input").value;
    var select = document.getElementById("List_domain_no_default");
    for (var i = 0; i < select.length; i++) {
        var d = select.options[i].value;
        if (!d.match(keyword)) {
            select.options[i].style.display = 'none';
        } else {
            select.options[i].style.display = 'block';
        }
    }
}

function load_data() {
    chrome.storage.local.get(['list_domain', 'def_text_param', 'interface_param', 'font_param'], function(result) {
        var fsd = 1 / (screen.width / 100) * brauzer_font_size_def;
        fsd = Number(fsd.toFixed(2));
        if (typeof result.def_text_param !== 'undefined') {
            domain_list = result.list_domain;
            text_param_def = result.def_text_param;
            let arr = text_param_def.split(";");
            if (arr[0] == "") { size_font_def = fsd; } else { size_font_def = Number(arr[0]); }
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
            page_Y_shift = Number(arr[12]);
            page_width = Number(arr[13]);
            page_css_on_off = Number(arr[14]);
            align_text_on_off = Number(arr[15]);
        } else {
            text_param_def = String(fsd) + ";" + text_param_start;
            chrome.storage.local.set({ "def_text_param": text_param_def });
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        }
        let arr = result.interface_param.split(";");
        change_icons_on_off = Number(arr[0]);
        if (Number(arr[0]) == 1) document.getElementById('change_icons_checkbox').checked = true;
        if (Number(arr[0]) == 0) document.getElementById('change_icons_checkbox').checked = false;
        change_badge_on_off = Number(arr[1]);
        if (Number(arr[1]) == 1) document.getElementById('change_badge_checkbox').checked = true;
        if (Number(arr[1]) == 0) document.getElementById('change_badge_checkbox').checked = false;
        scale_settings = Number(arr[2]);
        display_options("scale_settings", scale_settings);
        Scale_page_settings();
        display_options("default_browser_font_size", chrome.i18n.getMessage("In_browser") + " " + String(fsd) + "vw" + "(" + brauzer_font_size_def + "px" + ")");
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
        if (align_text_on_off == 1) document.getElementById('align_text_checkbox').checked = true;
        if (align_text_on_off == 0) document.getElementById('align_text_checkbox').checked = false;
        var objSel = document.getElementById("List_domain_no_default");
        objSel.options.length = 0;
        filling_domain_list();
        arr = result.font_param.split(";");
        param_font_on_off = Number(arr[0]);
        if (Number(arr[0]) == 1) document.getElementById('Font_options_checkbox').checked = true;
        if (Number(arr[0]) == 0) document.getElementById('Font_options_checkbox').checked = false;
        shadow_font_on_off = Number(arr[1]);
        if (Number(arr[1]) == 1) document.getElementById('Font_shadow_checkbox').checked = true;
        if (Number(arr[1]) == 0) document.getElementById('Font_shadow_checkbox').checked = false;
        shadow_font_width = Number(arr[2]);
        display_options("font_shadow_width", shadow_font_width);
        shadow_font_blur = Number(arr[3]);
        display_options("font_shadow_blur", shadow_font_blur);
        shadow_font_lightens = Number(arr[4]);
        display_options("font_shadow_lightens", shadow_font_lightens);
        contour_font_on_off = Number(arr[5]);
        if (Number(arr[5]) == 1) document.getElementById('Font_contour_checkbox').checked = true;
        if (Number(arr[5]) == 0) document.getElementById('Font_contour_checkbox').checked = false;
        contour_font_width = Number(arr[6]);
        display_options("font_contour_width", contour_font_width);
        selected_font_on_off = Number(arr[7]);
        if (Number(arr[7]) == 1) document.getElementById('Font_family_checkbox').checked = true;
        if (Number(arr[7]) == 0) document.getElementById('Font_family_checkbox').checked = false;
        selected_font = arr[8];
        document.getElementById('font_family_input').value = selected_font;
    });
}

function SaveParamText() {
    if (confirm(chrome.i18n.getMessage("save_message"))) {
        size_font_def = Number(document.getElementById("def_text_size").textContent);
        title_coeff_h1 = Number(document.getElementById("def_h1").textContent);
        title_coeff_h2 = Number(document.getElementById("def_h2").textContent);
        title_coeff_h3 = Number(document.getElementById("def_h3").textContent);
        title_coeff_h4 = Number(document.getElementById("def_h4").textContent);
        title_coeff_h5 = Number(document.getElementById("def_h5").textContent);
        title_coeff_h6 = Number(document.getElementById("def_h6").textContent);
        line_height = Number(document.getElementById("line_height").textContent);
        var tpd = size_font_def + ";" + title_coeff_h1 + ";" + title_coeff_h2 + ";" + title_coeff_h3 + ";" + title_coeff_h4 + ";" + title_coeff_h5 + ";" + title_coeff_h6 + ";" + line_height + ";" + line_height_on_off + ";" + text_param_on_off + ";" + page_css_zoom + ";" + page_X_shift + ";" + page_Y_shift + ";" + page_width + ";" + page_css_on_off + ";" + align_text_on_off + ";";
        chrome.storage.local.set({ "def_text_param": tpd });
        if (tpd !== text_param_def) {
            domain_list = "";
            chrome.storage.local.set({ "list_domain": domain_list });
        }
    }
}

function SaveParamFont() {
    if (document.getElementById("Font_options_checkbox").checked == true) { param_font_on_off = "1" } else { param_font_on_off = "0" }
    if (document.getElementById("Font_shadow_checkbox").checked == true) { shadow_font_on_off = "1" } else { shadow_font_on_off = "0" }
    shadow_font_width = document.getElementById("font_shadow_width").textContent;
    shadow_font_blur = document.getElementById("font_shadow_blur").textContent;
    shadow_font_lightens = document.getElementById("font_shadow_lightens").textContent;
    if (document.getElementById("Font_contour_checkbox").checked == true) { contour_font_on_off = "1" } else { contour_font_on_off = "0" }
    contour_font_width = document.getElementById("font_contour_width").textContent;
    if (document.getElementById("Font_family_checkbox").checked == true) { selected_font_on_off = "1" } else { selected_font_on_off = "0" }
    selected_font = document.getElementById("font_family_input").value;
    var spf = param_font_on_off + ";" + shadow_font_on_off + ";" + shadow_font_width + ";" + shadow_font_blur + ";" + shadow_font_lightens + ";" + contour_font_on_off + ";" + contour_font_width + ";" + selected_font_on_off + ";" + selected_font + ";";
    chrome.storage.local.set({ "font_param": spf });
}

function StartDefaultData() {
    if (confirm(chrome.i18n.getMessage("Initial_settings_message"))) {
        var fsd = 1 / (screen.width / 100) * brauzer_font_size_def;
        fsd = Number(fsd.toFixed(2))
        text_param_def = String(fsd) + ";" + text_param_start;
        chrome.storage.local.set({ "def_text_param": text_param_def });
        chrome.storage.local.set({ "list_domain": "" });
        chrome.storage.local.set({ "interface_param": "1;0;" });
        chrome.storage.local.set({ "font_param": "0;0;0;0;0;0;0;0;;" });
        setTimeout(load_data, 300);
    }
}

function doZoom_size(dif, Id, discharge) {
    document.getElementById(Id).textContent =
        String((Number(document.getElementById(Id).textContent) + dif).toFixed(discharge));
}

function doZoom_size_font_param(dif, Id, discharge) {
    var l = Number(document.getElementById(Id).textContent) + dif;
    if (l < 0) l = 0;
    document.getElementById(Id).textContent = String(l.toFixed(discharge));
}

function doZoomIn_001() { doZoom_size(0.01, 'def_text_size', 2); }

function doZoomOut_001() { doZoom_size(-0.01, 'def_text_size', 2); }

function doZoomIn_01() { doZoom_size(0.1, 'def_text_size', 2); }

function doZoomOut_01() { doZoom_size(-0.1, 'def_text_size', 2); }

function doZoomIn_h1() { doZoom_size(0.1, 'def_h1', 1); }

function doZoomOut_h1() { doZoom_size(-0.1, 'def_h1', 1); }

function doZoomIn_h2() { doZoom_size(0.1, 'def_h2', 1); }

function doZoomOut_h2() { doZoom_size(-0.1, 'def_h2', 1); }

function doZoomIn_h3() { doZoom_size(0.1, 'def_h3', 1); }

function doZoomOut_h3() { doZoom_size(-0.1, 'def_h3', 1); }

function doZoomIn_h4() { doZoom_size(0.1, 'def_h4', 1); }

function doZoomOut_h4() { doZoom_size(-0.1, 'def_h4', 1); }

function doZoomIn_h5() { doZoom_size(0.1, 'def_h5', 1); }

function doZoomOut_h5() { doZoom_size(-0.1, 'def_h5', 1); }

function doZoomIn_h6() { doZoom_size(0.1, 'def_h6', 1); }

function doZoomOut_h6() { doZoom_size(-0.1, 'def_h6', 1); }

function doZoomIn_line_height() { doZoom_size(0.1, 'line_height', 1); }

function doZoomOut_line_height() { doZoom_size(-0.1, 'line_height', 1); }

function doZoomIn_font_shadow_width() { doZoom_size_font_param(0.1, 'font_shadow_width', 1); }

function doZoomOut_font_shadow_width() { doZoom_size_font_param(-0.1, 'font_shadow_width', 1); }

function doZoomIn_font_shadow_blur() { doZoom_size_font_param(0.1, 'font_shadow_blur', 1); }

function doZoomOut_font_shadow_blur() { doZoom_size_font_param(-0.1, 'font_shadow_blur', 1); }

function doZoomIn_font_shadow_lightens() { doZoom_size_font_param(0.1, 'font_shadow_lightens', 1); }

function doZoomOut_font_shadow_lightens() { doZoom_size_font_param(-0.1, 'font_shadow_lightens', 1); }

function doZoomIn_font_contour_width() { doZoom_size_font_param(0.1, 'font_contour_width', 1); }

function doZoomOut_font_contour_width() { doZoom_size_font_param(-0.1, 'font_contour_width', 1); }

function doZoomIn_scale_settings() {
    doZoom_size(1, 'scale_settings', 0);
    scale_settings = Number(document.getElementById("scale_settings").textContent);
    var ip = String(change_icons_on_off) + ";" + String(change_badge_on_off) + ";" + String(scale_settings) + ";";
    chrome.storage.local.set({ "interface_param": ip });
    Scale_page_settings();
}

function doZoomOut_scale_settings() {
    doZoom_size(-1, 'scale_settings', 0);
    scale_settings = Number(document.getElementById("scale_settings").textContent);
    var ip = String(change_icons_on_off) + ";" + String(change_badge_on_off) + ";" + String(scale_settings) + ";";
    chrome.storage.local.set({ "interface_param": ip });
    Scale_page_settings();
}

function checkLineHeight() {
    var checkbox = document.getElementById('line_height_checkbox');
    if (checkbox.checked == true) {
        line_height_on_off = 1;
    } else {
        line_height_on_off = 0;
    }
}

function checkChange_align_text() {
    var checkbox = document.getElementById('align_text_checkbox');
    if (checkbox.checked == true) {
        align_text_on_off = 1;
    } else {
        align_text_on_off = 0;
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

function checkChange_icons() {
    var checkbox = document.getElementById('change_icons_checkbox');
    if (checkbox.checked == true) {
        change_icons_on_off = 1;
    } else {
        change_icons_on_off = 0;
    }
    var ip = String(change_icons_on_off) + ";" + String(change_badge_on_off) + ";" + String(scale_settings) + ";";
    chrome.storage.local.set({ "interface_param": ip });
}

function checkChange_badge() {
    var checkbox = document.getElementById('change_badge_checkbox');
    if (checkbox.checked == true) {
        change_badge_on_off = 1;
    } else {
        change_badge_on_off = 0;
    }
    var ip = String(change_icons_on_off) + ";" + String(change_badge_on_off) + ";" + String(scale_settings) + ";";
    chrome.storage.local.set({ "interface_param": ip });
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
    document.getElementById('saveForm').onclick = SaveParamText;
    document.getElementById('defaultButton').onclick = StartDefaultData;
    document.getElementById('Delete_domain').onclick = DeleteDomain;
    document.getElementById('Open_domain').onclick = OpenDomain;
    document.getElementById('change_icons_checkbox').onclick = checkChange_icons;
    document.getElementById('change_badge_checkbox').onclick = checkChange_badge;
    document.getElementById('increaseButton_font_shadow').onclick = doZoomIn_font_shadow_width;
    document.getElementById('decreaseButton_font_shadow').onclick = doZoomOut_font_shadow_width;
    document.getElementById('increaseButton_font_shadow_blur').onclick = doZoomIn_font_shadow_blur;
    document.getElementById('decreaseButton_font_shadow_blur').onclick = doZoomOut_font_shadow_blur;
    document.getElementById('increaseButton_font_lightens').onclick = doZoomIn_font_shadow_lightens;
    document.getElementById('decreaseButton_font_lightens').onclick = doZoomOut_font_shadow_lightens;
    document.getElementById('increaseButton_font_contour').onclick = doZoomIn_font_contour_width;
    document.getElementById('decreaseButton_font_contour').onclick = doZoomOut_font_contour_width;
    document.getElementById('saveFont').onclick = SaveParamFont;
    document.getElementById('align_text_checkbox').onclick = checkChange_align_text;
    document.getElementById('increaseButton__scale_settings').onclick = doZoomIn_scale_settings;
    document.getElementById('decreaseButton_scale_settings').onclick = doZoomOut_scale_settings;
    document.getElementById('domain_filter_input').oninput = filter_domain;
});

// чтение данных из файла в хранилище расширения
document.getElementById('loadDataFile').addEventListener('click', async() => {
    if (confirm(chrome.i18n.getMessage("Import_data_message"))) {
        try {
            const [fileHandle] = await window.showOpenFilePicker();
            const file = await fileHandle.getFile();
            const fileContent = await file.text();
            let arr = fileContent.split('"');
            chrome.storage.local.set({ "interface_param": arr[0] });
            chrome.storage.local.set({ "def_text_param": arr[1] });
            chrome.storage.local.set({ "font_param": arr[2] });
            chrome.storage.local.set({ "list_domain": arr[3] });
        } catch { return }
        //chrome.runtime.reload ();
        setTimeout(load_data, 300);
    }
});

// завись данных из хранилища в файл
document.getElementById('saveDataFile').addEventListener('click', async() => {
    const options = { suggestedName: 'Take_care_vision_' + new Date().toLocaleString() + '.txt', types: [{ description: 'Text', accept: { 'text/plain': '.txt' } }], excludeAcceptAllOption: true }
    var S_Data;
    chrome.storage.local.get(['list_domain', 'def_text_param', 'interface_param', 'font_param'], function(result) {
        S_Data = result.interface_param + '\"' + result.def_text_param + '\"' + result.font_param + '\"' + result.list_domain + '\"';
    });
    try {
        const fileHandle = await window.showSaveFilePicker(options);
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(S_Data);
        await writableStream.close();
    } catch { return }
});


(function() {
    setTimeout(load_data, 300);
}());