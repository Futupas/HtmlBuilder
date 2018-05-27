var Elements = [
    {
        type: 'sketch',
        name: 'sketch',
        properties: {
            perspective: 1000,
            backgroundColor: '#fff'
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
        solbtn.style.backgroundImage = 'url("./img/treeview/treeview_square.png")';
        solbtn.style.backgroundSize = '10px 10px';
    };
    soltitle.onclick = function (e) {
        var els3 = document.querySelectorAll('.treeview.title.active');
        for (var i = 0; i < els3.length; i++) {
            els3[i].classList.remove('active');
        }
        this.classList.toggle('active');

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
