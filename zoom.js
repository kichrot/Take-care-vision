'use strict';

/* Объявляем глобальные переменные */
var doc_dom;
var domain_list;
var font_size_def;
var brauzer_font_size_def;
var font_size;
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
var text_param_def = "1.5;1.3;1.1;1;0.9;0.7;1.1;0;0;1;0;0;100;";


/* определяем размер шрифта браузера по умолчанию */
brauzer_font_size_def = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');
brauzer_font_size_def = Number(brauzer_font_size_def.replace("px", ""));

/* функция применения параметров на странице */
function textZoom() {
    var title_font_weight = 600; /*  */
    /* 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 */
    var start_comment = " ";
    var end_comment = " ";
    if (line_height_on_off == 0) {
        start_comment = "/*";
        end_comment = "*/";
    }
    var start_comment_pw = " ";
    var end_comment_pw = " ";
    if (page_width == 100) {
        start_comment_pw = "/*";
        end_comment_pw = "*/";
    }

    var css = document.createElement('style');
    if (text_param_on_off == 1) {
        css.innerHTML += [
            `*` +
            `:not(a,abbr,area,aside,audio,base,body,br,button,button *,canvas,caption,col,command,datalist,` +
            `details,dd,dl,dt,embed,fieldset,figcaption,form,font,footer,h1,h2,h3,h4,h5,h6,head,header,hr,html,i,iframe,img,` +
            `h1 *,h2 *,h3 *,h4 *,h5 *,h6 *,` +
            `input,input *,keygen,label,legend,li,link,map,menu,menuitem,meta,` +
            `meter,nav,nav *,noindex,noscript,object,optgroup,option,param,params,progress,relative-time,script,` +
            `select,small,source,style,summary,svg,template,textarea,time,title,track,ul,video,wbr)` +
            `{`,
            `font-size: ${font_size}vw !important;`,
            `${start_comment}line-height: ${line_height} !important;${end_comment}`,
            `}`,

            `[class*=title]` +
            `:not([class*="subtitle"],[class*=spoil] div,[class*=block],h1,h2,h3,h4,h5,h6,h1 *,h2 *,h3 *,h4 *,h5 *,h6 *,ul li,` +
            `a[class*="sidebar"] [class*="title"],a span,span,td *),` +
            `a[class*=title] {`,
            `font-size: ${font_size * title_coeff_h2}vw !important;`,
            `font-weight: ${title_font_weight} !important;`,
            `${start_comment}line-height: ${line_height} !important;${end_comment}`,
            `}`,

            `h1,h1 * {`,
            `font-size: ${font_size * title_coeff_h1}vw !important;`,
            `font-weight: ${title_font_weight} !important;`,
            `${start_comment}line-height: ${line_height} !important;${end_comment}`,
            `}`,
            `h2,h2 * {`,
            `font-size: ${font_size * title_coeff_h2}vw !important;`,
            `font-weight: ${title_font_weight} !important;`,
            `${start_comment}line-height: ${line_height} !important;${end_comment}`,
            `}`,
            `h3,h3 * {`,
            `font-size: ${font_size * title_coeff_h3}vw !important;`,
            `font-weight: ${title_font_weight} !important;`,
            `${start_comment}line-height: ${line_height} !important;${end_comment}`,
            `}`,
            `h4,h4 * {`,
            `font-size: ${font_size * title_coeff_h4}vw !important;`,
            `font-weight: ${title_font_weight} !important;`,
            `${start_comment}line-height: ${line_height} !important;${end_comment}`,
            `}`,
            `h5,h5 * {`,
            `font-size: ${font_size * title_coeff_h5}vw !important;`,
            `font-weight: ${title_font_weight} !important;`,
            `${start_comment}line-height: ${line_height} !important;${end_comment}`,
            `}`,
            `h6,h6 * {`,
            `font-size:  ${font_size * title_coeff_h6}vw !important;`,
            `font-weight: ${title_font_weight} !important;`,
            `${start_comment}line-height: ${line_height} !important;${end_comment}`,
            `}`,
        ].join("\n");
        document.documentElement.appendChild(css);
    }
    css.innerHTML += [
       `html, body {`,
       `transform-origin: 0px 0px !important;`,
       `transform: matrix(${page_css_zoom}, 0, 0, ${page_css_zoom}, ${page_X_shift}, ${page_Y_shift}) !important;`,
       `${start_comment_pw}width: ${page_width}% !important;${end_comment_pw}`,
        `}`,
    ].join("\n");
    document.documentElement.appendChild(css);
}

function loadData() {
    chrome.storage.local.get(["list_domain", "def_text_param"], function(result) {

        if (typeof result.def_text_param !== 'undefined') {

            text_param_def = result.def_text_param;
        } else {
            font_size_def = 1 / (screen.width / 100) * brauzer_font_size_def;
            font_size_def = Number(font_size_def.toFixed(2))
            text_param_def = String(font_size_def) + ";" + text_param_def;
            chrome.storage.local.set({ "def_text_param": text_param_def });
        }
        let arr = text_param_def.split(";");
        font_size_def = Number(arr[0]);
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
        if (typeof result.list_domain !== 'undefined') {
            domain_list = result.list_domain;
            domain_list = domain_list.replace(/\s+/g, '');
            if (domain_list.includes(";" + doc_dom + ";") == true) {
                let arr = domain_list.split("|");
                for (let i = 0; i < arr.length; i += 1) {
                    if (arr[i].includes(";" + doc_dom + ";")) {
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
                font_size = font_size_def;
            }
        } else {
            font_size = font_size_def;
        }
        textZoom();
        font_size = font_size_def;
    });
}

function ReloadAllFrame() {
    var items = document.getElementsByTagName('frame');
    for (var el of items) {
        el.src = el.src;
    }
    var itemss = document.getElementsByTagName('iframe');
    for (var ell of itemss) {
        ell.src = ell.src;
    }
}

function domain() {
    var isFramed = false;
    try {
        isFramed = window != window.top || document != top.document || self.location != top.location;
    } catch (e) {
        isFramed = true;
    }
    if (isFramed) {
        /* страница загружена во фрейме */
        doc_dom = document.location.ancestorOrigins[0];
        doc_dom = doc_dom.replace(/\s+/g, '');
        doc_dom = doc_dom.replace("http://", '');
        doc_dom = doc_dom.replace("https://", '');
        loadData();
    } else {
        /* страница загружена в основном окне */
        if (window.top.location.href.includes("chrome://") || (window.top.location.href.includes("http://") == false && window.top.location.href.includes("https://") == false)) {
            return;
        }
        while (true) {
            doc_dom = window.top.location.hostname;
            doc_dom = doc_dom.replace(/\s+/g, '');
            if (typeof(doc_dom) !== "undefined") {
                loadData();
                ReloadAllFrame();
                break;
            }
        }
    }
}

(function() {
    domain();
})();