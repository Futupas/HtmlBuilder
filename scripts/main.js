var Elements = [
    {
        type: 'sketch',
        name: 'sketch',
        properties: {
            perspective: 1000,
            background: '#fff'
        }
    }, {
        type: 'div',
        name: 'main',
        parent: 'sketch',
        properties: {
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            skewX: 0,
            skewY: 0,
            width: 300,
            height: 300,
            background: '#f00',
            border: 'none'
        }
    }, {
        type: 'div',
        name: 'div1',
        parent: 'main',
        properties: {
            x: 10,
            y: 10,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            skewX: 0,
            skewY: 0,
            width: 100,
            height: 100,
            background: '#0f0',
            border: 'none'
        }
    }, {
        type: 'div',
        name: 'div2',
        parent: 'main',
        properties: {
            x: 120,
            y: 120,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            skewX: 0,
            skewY: 0,
            width: 100,
            height: 100,
            background: '#00f',
            border: 'none'
        }
    }, {
        type: 'div',
        name: 'div3',
        parent: 'div2',
        properties: {
            x: 10,
            y: 10,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            skewX: 0,
            skewY: 0,
            width: 40,
            height: 40,
            background: '#ff0',
            border: 'none'
        }
    }
];

function Draw(element, parent) {
    var retype = elementtypes.filter(function(e){ return e.type == element.type })[0];
    var readyelement = retype.draw(element);
    if (element.type != 'sketch') {
        parent.appendChild(readyelement);
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
        document.getElementById('preview').innerHTML = '';
        Draw(this.dataElement, document.getElementById('preview'));
        return false;
    };
    
    parent.appendChild(sol);
    for(var i = 0; i < children.length; i++){
        DrawS(children[i], solcnt);
    }
}

document.getElementById('preview').innerHTML = '';
Draw(Elements[0], document.getElementById('preview'));

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
