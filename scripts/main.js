var Elements = [
    {
        type: 'sketch',
        name: 'sketch',
        properties: {
            perspective: 1000,
            background: '#fff',
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            x: 0,
            y: 0,
            z: 0,
        }
    }
];

function Draw(element, parent) {
    var retype = elementtypes.filter(function(e){ return e.type == element.type })[0];
    var readyelement = retype.draw(element);
    if (element.type != 'sketch') {
        parent.appendChild(readyelement);
    } else {

    }

    var children = Elements.filter(function(e){ return e.parent == element.name });
    for(var i = 0; i < children.length; i++){
        Draw(children[i], readyelement);
    }
}
function DrawS(element, parent) {
    var children = Elements.filter(function(e){ return e.parent == element.name });

    var sol = document.createElement('div');
    sol.classList.add('treeview');
    sol.setAttribute('data-s-elname', element.name);
    var solbtn = document.createElement('div');
    solbtn.classList.add('treeview', 'button');
    var soltitle = document.createElement('div');
    soltitle.classList.add('treeview', 'title');
    soltitle.innerText = element.name;
    soltitle.dataElement = element;
    var solcnt = document.createElement('div');
    solcnt.classList.add('treeview', 'content');
    sol.appendChild(solbtn);
    sol.appendChild(soltitle);
    sol.appendChild(solcnt);

    if (children.length > 0) {
        solbtn.onclick = function (e) {
            this.parentElement.classList.toggle('opened');
        };
    } else {
        solbtn.classList.add('endbranch');
    };
    soltitle.onclick = function (e) {
        var els3 = document.querySelectorAll('.treeview.active');
        for (var i = 0; i < els3.length; i++) {
            els3[i].classList.remove('active');
        }
        this.parentElement.classList.toggle('active');

        var elem = this.dataElement;
        var eltype = elementtypes.filter(function(e) {return e.type == elem.type;})[0];
        eltype.edit(elem);

        return false;
    };
    soltitle.oncontextmenu = function (e) {
        var els3 = document.querySelectorAll('.treeview.focus');
        for (var i = 0; i < els3.length; i++) {
            els3[i].classList.remove('focus');
        }
        this.parentElement.classList.toggle('focus');
        document.querySelector('#preview div[data-elname="sketch"]').innerHTML = '';
        Draw(this.dataElement, document.querySelector('#preview div[data-elname="sketch"]'));
        // document.querySelector('#preview div[data-elname="sketch"]').style.transform =
        //     'translateX(0px) translateY(0px) translateZ(0px)'+
        //     'rotateX(0deg) rotateY(0deg) rotateZ(0deg) '+
        //     'scaleX(' + Elements[0].properties.scaleX + 
        //     ') scaleY(' + Elements[0].properties.scaleY + 
        //     ') scaleZ(' + Elements[0].properties.scaleZ + ')';
        return false;
    };
    
    parent.appendChild(sol);
    for(var i = 0; i < children.length; i++){
        DrawS(children[i], solcnt);
    }
}

document.querySelector('#preview div[data-elname="sketch"]').innerHTML = '';
Draw(Elements[0], document.querySelector('#preview div[data-elname="sketch"]'));

document.getElementById('solution').innerHTML = '';
DrawS(Elements[0], document.getElementById('solution'));


function CreateElement(e) {
    var activeelementname = document.querySelector('.treeview.active').getAttribute('data-s-elname');
    var eltypename = document.querySelector('#create select > option:checked').getAttribute('value');
    var eltype = elementtypes.filter(function(el) { return el.type == eltypename; })[0];
    var name = document.querySelector('#create input[name="elemname"]').value;
    document.querySelector('#create input[name="elemname"]').value = '';

    var nameisvalid = (Elements.filter(function(el) {return el.name == name}).length == 0);
    if (!nameisvalid) {
        alert('The name is already taken');
        return;
    }
    var element = eltype.create(name, activeelementname);
    Elements.push(element);
    Draw(element, document.querySelector('#preview div[data-elname="'+activeelementname+'"]'));
    DrawS(element, document.querySelector('#solution div.treeview.active > div.treeview.content'));
    if (document.querySelector('#solution div.treeview.active > div.treeview.button').classList.contains('endbranch')) {
        document.querySelector('#solution div.treeview.active > div.treeview.button').classList.remove('endbranch');
        document.querySelector('#solution div.treeview.active').classList.add('opened');
        document.querySelector('#solution div.treeview.active > div.treeview.button').onclick = function (e) {
            this.parentElement.classList.toggle('opened');
        };
    }
}

document.querySelector('#create > button.createelement').onclick = CreateElement;


function ExportJson() {
    var json = JSON.stringify(Elements);
    var va = document.createElement('a');
    va.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
    va.setAttribute('download', 'sketch.json');
    va.style.display = 'none';
    document.getElementById('json').appendChild(va);
    va.click();
    va.remove();
}
function ImportJsonBtn() {
    document.getElementById('importinput').click();
    return false;
}
function ImportJson(files) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
            var json = e.target.result;
            Elements = JSON.parse(json);
            document.querySelector('#preview div[data-elname="sketch"]').innerHTML = '';
            Draw(Elements[0], document.querySelector('#preview div[data-elname="sketch"]'));
            document.getElementById('solution').innerHTML = '';
            DrawS(Elements[0], document.getElementById('solution'));
        };  
    })(file);
    reader.readAsBinaryString(file);
}


document.getElementById('preview').onmousemove = function (e) {
    if (e.buttons == 1) {
        Elements[0].properties.rotateX = Elements[0].properties.rotateX*1 - e.movementY;
        Elements[0].properties.rotateY = Elements[0].properties.rotateY*1 + e.movementX;
        document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
            elementtypes[0].draw(Elements[0]).style.transform;

        if (document.querySelectorAll('#solution div.active[data-s-elname="sketch"]').length >= 1) elementtypes[0].edit(Elements[0]);
    }
}
document.getElementById('projectpreview').onmousemove = function (e) {
    if (e.buttons == 1) {
        // MOUSE IN PROJECT PREVIEW
    }
}

window.onkeydown = function (e) {
    if (mouseinpreview) {
        if (e.code == 'KeyW') {
            Elements[0].properties.z = Elements[0].properties.z*1 + 10;
            document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
                elementtypes[0].draw(Elements[0]).style.transform;
        } else if (e.code == 'KeyS') {
            Elements[0].properties.z = Elements[0].properties.z*1 - 10;
            document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
                elementtypes[0].draw(Elements[0]).style.transform;
        } else if (e.code == 'KeyA') {
            Elements[0].properties.x = Elements[0].properties.x*1 + 10;
            document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
                elementtypes[0].draw(Elements[0]).style.transform;
        } else if (e.code == 'KeyD') {
            Elements[0].properties.x = Elements[0].properties.x*1 - 10;
            document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
                elementtypes[0].draw(Elements[0]).style.transform;
        } else if (e.code == 'KeyQ') {
            Elements[0].properties.rotateZ = Elements[0].properties.rotateZ*1 - 5;
            document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
                elementtypes[0].draw(Elements[0]).style.transform;
        } else if (e.code == 'KeyE') {
            Elements[0].properties.rotateZ = Elements[0].properties.rotateZ*1 + 5;
            document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
                elementtypes[0].draw(Elements[0]).style.transform;
        } else if (e.code == 'KeyR') {
            Elements[0].properties.y = Elements[0].properties.y*1 + 10;
            document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
                elementtypes[0].draw(Elements[0]).style.transform;
        } else if (e.code == 'KeyF') {
            Elements[0].properties.y = Elements[0].properties.y*1 - 10;
            document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
                elementtypes[0].draw(Elements[0]).style.transform;
        } else if (e.code == 'Equal') {
            Elements[0].properties.scale = +(Elements[0].properties.scale*1 * 1.25).toFixed(2);
            document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
                elementtypes[0].draw(Elements[0]).style.transform;
        } else if (e.code == 'Minus') {
            Elements[0].properties.scale = +(Elements[0].properties.scale*1 / 1.25).toFixed(2);
            document.querySelector('#preview div[data-elname="sketch"]').style.transform = 
                elementtypes[0].draw(Elements[0]).style.transform;
        }
        if (document.querySelectorAll('#solution div.active[data-s-elname="sketch"]').length >= 1) {
            elementtypes[0].edit(Elements[0]);
        }
    }
    if (mouseinprojectpreview) {
        // KEY IN PROJECT PREVIEW
    }
}

var mouseinpreview = false, mouseinprojectpreview = false;

document.getElementById('preview').onmouseenter = function (e) {
    mouseinpreview = true;
}
document.getElementById('preview').onmouseleave = function (e) {
    mouseinpreview = false;
}
document.getElementById('projectpreview').onmouseenter = function (e) {
    mouseinprojectpreview = true;
}
document.getElementById('projectpreview').onmouseleave = function (e) {
    mouseinprojectpreview = false;
}
