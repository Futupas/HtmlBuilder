var properties = {
    x: 0,
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1
}

document.getElementById('preview').onmousemove = function (e) {
    if (e.buttons == 1) {
        properties.rotateX = properties.rotateX*1 - e.movementY*0.5;
        properties.rotateY = properties.rotateY*1 + e.movementX*0.5;
        draw();
    }
}
window.onkeydown = function (e) {
    if (e.code == 'KeyW') {
        properties.z = properties.z*1 + 10;
        draw();
    } else if (e.code == 'KeyS') {
        properties.z = properties.z*1 - 10;
        draw();
    } else if (e.code == 'KeyA') {
        properties.x = properties.x*1 + 10;
        draw();
    } else if (e.code == 'KeyD') {
        properties.x = properties.x*1 - 10;
        draw();
    } else if (e.code == 'KeyQ') {
        properties.rotateZ = properties.rotateZ*1 - 5;
        draw();
    } else if (e.code == 'KeyE') {
        properties.rotateZ = properties.rotateZ*1 + 5;
        draw();
    } else if (e.code == 'KeyR') {
        properties.y = properties.y*1 + 10;
        draw();
    } else if (e.code == 'KeyF') {
        properties.y = properties.y*1 - 10;
        draw();
    } else if (e.code == 'Equal') {
        properties.scale = properties.scale*1 * 1.25;
        draw();
    } else if (e.code == 'Minus') {
        properties.scale = properties.scale*1 / 1.25;
        draw();
    }
}

function draw() {
    document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
        'translateX(' + properties.x +
        'px) translateY(' + properties.y +
        'px) translateZ(' + properties.z +
        'px) rotateX(' + properties.rotateX +
        'deg) rotateY(' + properties.rotateY +
        'deg) rotateZ(' + properties.rotateZ +
        'deg) scaleX(' + properties.scale +
        ') scaleY(' + properties.scale +
        ') scaleZ(' + properties.scale + ')';
}
