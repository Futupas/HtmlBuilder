function DownloadHtml () {
    var html = '', css = '', js = '', sketch = '';

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

    sketch = document.getElementById('preview').outerHTML;

    html = html.replace('<!--STYLES-->', css);
    html = html.replace('<!--SCRIPTS-->', js);
    html = html.replace('<!--SKETCH-->', sketch);

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

    sketch = document.getElementById('preview').outerHTML;
    var window1 = window.open("", "HtmlBuilder sketch", "");
    window1.document.head.innerHTML = '<!-- Made with ❤ by Futupas --><title>Html builder sketch</title>' + css;
    window1.document.body.innerHTML = sketch;

    window1.properties = {
        x: Elements[0].properties.x,
        y: Elements[0].properties.y,
        z: Elements[0].properties.z,
        rotateX: Elements[0].properties.rotateX,
        rotateY: Elements[0].properties.rotateY,
        rotateZ: Elements[0].properties.rotateZ,
        scale: Elements[0].properties.scale
    }
    
    window1.document.getElementById('preview').onmousemove = function (e) {
        if (e.buttons == 1) {
            window1.properties.rotateX = window1.properties.rotateX*1 - e.movementY*0.5;
            window1.properties.rotateY = window1.properties.rotateY*1 + e.movementX*0.5;
            window1.draw();
        }
    }
    window1.onkeydown = function (e) {
        if (e.code == 'KeyW') {
            window1.properties.z = window1.properties.z*1 + 10;
            window1.draw();
        } else if (e.code == 'KeyS') {
            window1.properties.z = window1.properties.z*1 - 10;
            window1.draw();
        } else if (e.code == 'KeyA') {
            window1.properties.x = window1.properties.x*1 + 10;
            window1.draw();
        } else if (e.code == 'KeyD') {
            window1.properties.x = window1.properties.x*1 - 10;
            window1.draw();
        } else if (e.code == 'KeyQ') {
            window1.properties.rotateZ = window1.properties.rotateZ*1 - 5;
            window1.draw();
        } else if (e.code == 'KeyE') {
            window1.properties.rotateZ = window1.properties.rotateZ*1 + 5;
            window1.draw();
        } else if (e.code == 'KeyR') {
            window1.properties.y = window1.properties.y*1 + 10;
            window1.draw();
        } else if (e.code == 'KeyF') {
            window1.properties.y = window1.properties.y*1 - 10;
            window1.draw();
        } else if (e.code == 'Equal') {
            window1.properties.scale = window1.properties.scale*1 * 1.25;
            window1.draw();
        } else if (e.code == 'Minus') {
            window1.properties.scale = window1.properties.scale*1 / 1.25;
            window1.draw();
        }
    }
    
    window1.draw = function() {
        window1.document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
            'translateX(' + window1.properties.x +
            'px) translateY(' + window1.properties.y +
            'px) translateZ(' + window1.properties.z +
            'px) rotateX(' + window1.properties.rotateX +
            'deg) rotateY(' + window1.properties.rotateY +
            'deg) rotateZ(' + window1.properties.rotateZ +
            'deg) scaleX(' + window1.properties.scale +
            ') scaleY(' + window1.properties.scale +
            ') scaleZ(' + window1.properties.scale + ')';
    }
}
