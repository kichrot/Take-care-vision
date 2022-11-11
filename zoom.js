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
var page_css_on_off;
var text_param_def = ";1.5;1.3;1.1;1;0.9;0.7;1.1;0;0;1;0;0;100;0;0;";
var param_font_on_off;
var shadow_font_on_off;
var shadow_font_width;
var shadow_font_blur;
var shadow_font_lightens;
var contour_font_on_off;
var contour_font_width;
var selected_font_on_off;
var selected_font;
var align_text_on_off;

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
    var start_comment_pzcss = " ";
    var end_comment_pzcss = " ";
    if (page_css_zoom == 1 && page_X_shift == 0 && page_Y_shift == 0) {
        start_comment_pzcss = "/*";
        end_comment_pzcss = "*/";
    }
    var start_comment_shf = " ";
    var end_comment_shf = " ";
    if (shadow_font_on_off == 0) {
        start_comment_shf = "/*";
        end_comment_shf = "*/";
    }
    var start_comment_cf = " ";
    var end_comment_cf = " ";
    if (contour_font_on_off == 0) {
        start_comment_cf = "/*";
        end_comment_cf = "*/";
    }
    var start_comment_sf = " ";
    var end_comment_sf = " ";
    if (selected_font_on_off == 0) {
        start_comment_sf = "/*";
        end_comment_sf = "*/";
    }


    var css = document.createElement('style');
    if (text_param_on_off == 1) {
        css.innerHTML += [
            `html *` +
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

    if (align_text_on_off == 1) {
        css.innerHTML += [
            `:where(span,p,[class*=text],[class*=desc],[class*=excerpt],[class*=comment],[class*=post])` +
            `:not([style*="text-align:"])` +
            `:not([class*=title],[class*=subject],[class*=heading],[class*=headline],[class*=caption],[class*=subtitle])` +
            `:not(a,a *,td,tr,h1,h2,h3,h4,h5,h6),` +
            `div:has(>i,>br),` +
            `td:has(>span)` +
            ` {`,
            `text-align: justify;`,
            `hyphens: auto;`,
            `}`,
            `code,pre:has(code),a,[class*=title] {`,
            `text-align: start;`,
            `}`
        ].join("\n");
        document.documentElement.appendChild(css);
    }

    if (page_css_on_off == 1) {
        css.innerHTML += [
            `body {`,
            `transform-origin: 0px 0px !important;`,
            `transform: matrix(${page_css_zoom}, 0, 0, ${page_css_zoom}, ${page_X_shift * 2}, ${page_Y_shift* 2}) !important;`,
            `/*transform: scale(${page_css_zoom}) translateX(${page_X_shift * 2}px) translateY(${page_Y_shift* 2}px) !important;*/`,
            `width: ${page_width}% !important;`,
            `}`,

            `html {`,
            `${start_comment_pzcss}height: 100% !important;${end_comment_pzcss}`,
            `}`,
        ].join("\n");
        document.documentElement.appendChild(css);
    }

    if (param_font_on_off == 1) {
        css.innerHTML += [`html * {`,
            `-webkit-text-fill-color:currentColor  !important;`,
            `${start_comment_shf}text-shadow:-${shadow_font_width}px -${shadow_font_width}px ${shadow_font_blur}px rgba(250,250,250,${shadow_font_lightens}), ${shadow_font_width}px ${shadow_font_width}px ${shadow_font_blur}px rgba(250,250,250,${shadow_font_lightens}), ${shadow_font_width}px ${shadow_font_width}px ${shadow_font_blur}px currentColor, -${shadow_font_width}px -${shadow_font_width}px ${shadow_font_blur}px currentColor  !important;${end_comment_shf}`,
            `${start_comment_cf}-webkit-text-stroke-width: ${contour_font_width}px !important;${end_comment_cf}`,
            `-webkit-font-smoothing: subpixel-antialiased /*antialiased*/ !important;`,
            `text-rendering: geometricPrecision !important;`,
            `font-optical-sizing: auto !important;`,
            `}`,

            `${start_comment_sf}html *:not(img,svg,[class*=\"icon\"],[class*=\"ico\"],[class*=\"button\"],[class*=mjx],[class*=vjs],[class*=fa],` +
            `[class*=ms-Button-icon],[class*=DPvwYc],[class*=bb],[class*=icon],[class*=ll],i,[role*=button],[type*=button],` +
            `[class*=btn],[class*=button],[class*=button] *),` +
            `[class*="text"]:not([class*=fa])  {`,
            `font-family: ${selected_font} !important;`,
            `}${end_comment_sf}`
        ].join("\n");
        document.documentElement.appendChild(css);
    }
}

function loadData() {
    chrome.storage.local.get(["list_domain", "def_text_param", 'font_param'], function(result) {
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
        font_size = Number(arr[0]);
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
        arr = result.font_param.split(";");
        param_font_on_off = Number(arr[0]);
        shadow_font_on_off = Number(arr[1]);
        shadow_font_width = Number(arr[2]);
        shadow_font_blur = Number(arr[3]);
        shadow_font_lightens = Number(arr[4]);
        contour_font_on_off = Number(arr[5]);
        contour_font_width = Number(arr[6]);
        selected_font_on_off = Number(arr[7]);
        selected_font = arr[8];
        if (typeof result.list_domain !== 'undefined') {
            domain_list = result.list_domain;
            domain_list = domain_list.replace(/\s+/g, '');
            let k = domain_list.indexOf(";" + doc_dom + ";");
            if (k != -1) {
                let sd = domain_list.slice(k, domain_list.indexOf("|", k));
                let arr = sd.split(";");
                if (arr[2] !== '') font_size = Number(arr[2]);
                if (arr[3] !== '') title_coeff_h1 = Number(arr[3]);
                if (arr[4] !== '') title_coeff_h2 = Number(arr[4]);
                if (arr[5] !== '') title_coeff_h3 = Number(arr[5]);
                if (arr[6] !== '') title_coeff_h4 = Number(arr[6]);
                if (arr[7] !== '') title_coeff_h5 = Number(arr[7]);
                if (arr[8] !== '') title_coeff_h6 = Number(arr[8]);
                if (arr[9] !== '') line_height = Number(arr[9]);
                if (arr[10] !== '') line_height_on_off = Number(arr[10]);
                if (arr[11] !== '') text_param_on_off = Number(arr[11]);
                if (arr[12] !== '') page_css_zoom = Number(arr[12]);
                if (arr[13] !== '') page_X_shift = Number(arr[13]);
                if (arr[14] !== '') page_Y_shift = Number(arr[14]);
                if (arr[15] !== '') page_width = Number(arr[15]);
                if (arr[16] !== '') page_css_on_off = Number(arr[16]);
                if (arr[17] !== '') align_text_on_off = Number(arr[17]);
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
    const t0 = performance.now();
    domain();
    const t1 = performance.now();
    console.log(`zoom.js выполнялся ${t1 - t0} milliseconds.`);
})();