function DownloadHtml () {
    var html = '', css = '', js = '';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/exporthtml/index.html', false);
    xhr.send();
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        html = xhr.responseText;
    }
    xhr = new XMLHttpRequest();
    xhr.open('GET', '/exporthtml/styles.css', false);
    xhr.send();
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        css = xhr.responseText;
    }
    xhr = new XMLHttpRequest();
    xhr.open('GET', '/exporthtml/main.js', false);
    xhr.send();
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        js = xhr.responseText;
    }

    css = '<style>' + css + '</style>';
    js = '<script>' + js + '</script>';

    html = html.replace('<!--STYLES-->', css);
    html = html.replace('<!--SCRIPTS-->', js);

    var va = document.createElement('a');
    va.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html));
    va.setAttribute('download', 'sketch.html');
    va.style.display = 'none';
    document.body.appendChild(va);
    va.click();
    va.remove();
}
function OpenHtml () {
    var html = '', css = '', js = '';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/exporthtml/index.html', false);
    xhr.send();
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        html = xhr.responseText;
    }
    xhr = new XMLHttpRequest();
    xhr.open('GET', '/exporthtml/styles.css', false);
    xhr.send();
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        css = xhr.responseText;
    }
    xhr = new XMLHttpRequest();
    xhr.open('GET', '/exporthtml/main.js', false);
    xhr.send();
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        js = xhr.responseText;
    }

    css = '<style>' + css + '</style>';
    js = '<script>' + js + '</script>';

    html = html.replace('<!--STYLES-->', css);
    html = html.replace('<!--SCRIPTS-->', js);

    var window1 = window.open("", "HtmlBuilder sketch", "");
    window1.document.write(html);
    // myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
}
