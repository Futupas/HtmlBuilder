var Elements = [
    {
        type: 'sketch',
        name: 'sketch',
        properties: {
            perspective: 1000,
            background: '#fff'
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
    Draw(element, document.querySelector('#preview div[data-elname="'+activeelementname+'"], #preview[data-elname="'+activeelementname+'"]'));
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
            document.getElementById('preview').innerHTML = '';
            Draw(Elements[0], document.getElementById('preview'));
            document.getElementById('solution').innerHTML = '';
            DrawS(Elements[0], document.getElementById('solution'));
        };  
    })(file);
    reader.readAsBinaryString(file);
}
