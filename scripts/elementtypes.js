var elementtypes = [
    {
        type: 'sketch',
        properties: [
            'perspective', 
            'background', 
            'scale',
            'ratateX',
            'ratateY',
            'ratateZ',
            'x',
            'y',
            'z'
        ],
        styles: [],
        
        draw: function (o) {
            var prw = document.getElementById('preview');
            prw.style.perspective = o.properties['perspective'] + 'px';
            prw.style.background = o.properties['background'];
            var sketch = document.querySelector('#preview div[data-elname="sketch"]');
            sketch.style.transform = 'translateX(' + o.properties['x'] +
                'px) translateY(' + o.properties['y'] +
                'px) translateZ(' + o.properties['z'] +
                'px) rotateX(' + o.properties['rotateX'] +
                'deg) rotateY(' + o.properties['rotateY'] +
                'deg) rotateZ(' + o.properties['rotateZ'] + 
                'deg) ScaleX(' + o.properties['scale'] +
                ') ScaleY(' + o.properties['scale'] +
                ') ScaleZ(' + o.properties['scale'] + ')';
            return sketch;
        },
        edit: function(o) {
            var table = document.createElement('table');

            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.innerText = 'Name';
            var td2 = document.createElement('td');
            var b = document.createElement('b');
            b.innerText = o.name;
            td2.appendChild(b);
            tr.appendChild(td1); tr.appendChild(td2);
            table.appendChild(tr);
            
            var drawfunc = this.draw
            var createTr = function (caption, propname, from, to, step, isText, length) {
                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                td1.innerText = caption;
                var input = document.createElement('input');
                if (isText === true) {
                    input.setAttribute('type', 'text');
                    input.setAttribute('maxlength', length);
                } else {
                    input.setAttribute('type', 'number');
                    input.setAttribute('min', from);
                    input.setAttribute('max', to);
                    input.setAttribute('step', step);
                }
                
                input.value = o.properties[propname];
                input.propname = propname;
                input.elem = o;
                // input.previewprops = previewprops;
                input.oninput = function (e) {
                    o.properties[this.propname] = this.value * 1;
                    var propelement = this.elem;
                    Elements.filter(function(el){return el.name == propelement.name})[0].properties[this.propname] = 
                            this.value;
                    
                    var previewdiv = document.getElementById('preview');
                    previewdiv.style.perspective = o.properties['perspective'] + 'px';
                    previewdiv.style.background = o.properties['background'];
                    var sketchdiv = document.querySelector('#preview div[data-elname="sketch"]');
                    sketchdiv.style.transform = 'translateX(' + o.properties['x'] +
                        'px) translateY(' + o.properties['y'] +
                        'px) translateZ(' + o.properties['z'] +
                        'px) rotateX(' + o.properties['rotateX'] +
                        'deg) rotateY(' + o.properties['rotateY'] +
                        'deg) rotateZ(' + o.properties['rotateZ'] + 
                        'deg) ScaleX(' + o.properties['scale'] +
                        ') ScaleY(' + o.properties['scale'] +
                        ') ScaleZ(' + o.properties['scale'] + ')';
                }
                td2.appendChild(input);
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
            }
            createTr('Perspective', 'perspective', 0, 10000, 100, false, 0);
            createTr('Background', 'background', 0, 0, 0, true, 1000);
            createTr('Scale', 'scale', -10, 10, 0.5, false, 0);
            createTr('Rotate X', 'rotateX', -360, 360, 5, false, 0);
            createTr('Rotate Y', 'rotateY', -360, 360, 5, false, 0);
            createTr('Rotate Z', 'rotateZ', -360, 360, 5, false, 0);
            createTr('Translate X', 'x', -1000, 1000, 10, false, 0);
            createTr('Translate Y', 'y', -1000, 1000, 10, false, 0);
            createTr('Translate Z', 'z', -1000, 1000, 10, false, 0);

            document.getElementById('element').innerHTML = '';
            document.getElementById('element').appendChild(table);
        },
        create: function(o) {
            return false;
        }
    }, 
    {
        type: 'div',
        properties: [
            'x',
            'y',
            'z',
            'rotateX',
            'rotateY',
            'rotateZ',
            'scaleX',
            'scaleY',
            'scaleZ',
            'skewX',
            'skewY',
            'width',
            'height',
            'background',
            'border'
        ],

        draw: function (o) {
            var div = document.createElement('div');
            var divstyles = div.style;
            // divstyles.position = 'absolute';
            // divstyles.padding = '0px';
            // divstyles.margin = '0px';
            divstyles.transform = 'translateX(' + o.properties['x'] +
                    'px) translateY(' + o.properties['y'] +
                    'px) translateZ(' + o.properties['z'] +
                    'px) rotateX(' + o.properties['rotateX'] +
                    'deg) rotateY(' + o.properties['rotateY'] +
                    'deg) rotateZ(' + o.properties['rotateZ'] + 
                    'deg) scaleX(' + o.properties['scaleX'] + 
                    ') scaleY(' + o.properties['scaleY'] + 
                    ') scaleZ(' + o.properties['scaleZ'] + 
                    ') skewX(' + o.properties['skewX'] + 
                    'deg) skewY(' + o.properties['skewY'] + 'deg)';
            divstyles.width = o.properties['width'] + 'px';
            divstyles.height = o.properties['height'] + 'px';
            divstyles.background = o.properties['background'];
            divstyles.border = o.properties['border'];
            div.setAttribute('data-elname', o.name);
            return div;
        },
        edit: function(o) {
            var table = document.createElement('table');

            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.innerText = 'Name';
            var td2 = document.createElement('td');
            var b = document.createElement('b');
            b.innerText = o.name;
            td2.appendChild(b);
            tr.appendChild(td1); tr.appendChild(td2);
            table.appendChild(tr);

            var drawfunc = this.draw
            var createTr = function (caption, propname, from, to, step, isText, length) {
                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                td1.innerText = caption;
                var input = document.createElement('input');
                if (isText === true) {
                    input.setAttribute('type', 'text');
                    input.setAttribute('maxlength', length);
                } else {
                    input.setAttribute('type', 'number');
                    input.setAttribute('min', from);
                    input.setAttribute('max', to);
                    input.setAttribute('step', step);
                }
                
                input.value = o.properties[propname];
                input.propname = propname;
                input.elem = o;
                input.oninput = function (e) {
                    o.properties[this.propname] = this.value * 1;
                    var propelement = this.elem;
                    Elements.filter(function(el){return el.name == propelement.name})[0].properties[this.propname] = 
                            this.value;
                    
                    var div = document.querySelector('#preview div[data-elname="'+propelement.name+'"]');
                    var divstyles = div.style;
                    divstyles.transform = 'translateX(' + o.properties['x'] +
                            'px) translateY(' + o.properties['y'] +
                            'px) translateZ(' + o.properties['z'] +
                            'px) rotateX(' + o.properties['rotateX'] +
                            'deg) rotateY(' + o.properties['rotateY'] +
                            'deg) rotateZ(' + o.properties['rotateZ'] + 
                            'deg) scaleX(' + o.properties['scaleX'] + 
                            ') scaleY(' + o.properties['scaleY'] + 
                            ') scaleZ(' + o.properties['scaleZ'] + 
                            ') skewX(' + o.properties['skewX'] + 
                            'deg) skewY(' + o.properties['skewY'] + 'deg)';
                    divstyles.width = o.properties['width'] + 'px';
                    divstyles.height = o.properties['height'] + 'px';
                    divstyles.background = o.properties['background'];
                    divstyles.border = o.properties['border'];
                }
                td2.appendChild(input);
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
            }
            createTr('Translate X', 'x', -1000, 1000, 10, false, 0);
            createTr('Translate Y', 'y', -1000, 1000, 10, false, 0);
            createTr('Translate Z', 'z', -1000, 1000, 10, false, 0);
            createTr('Rotate X', 'rotateX', -360, 360, 5, false, 0);
            createTr('Rotate Y', 'rotateY', -360, 360, 5, false, 0);
            createTr('Rotate Z', 'rotateZ', -360, 360, 5, false, 0);
            createTr('Scale X', 'scaleX', -10, 10, 0.5, false, 0);
            createTr('Scale Y', 'scaleY', -10, 10, 0.5, false, 0);
            createTr('Scale Z', 'scaleZ', -10, 10, 0.5, false, 0);
            createTr('Skew X', 'skewX', -360, 360, 5, false, 0);
            createTr('Skew Y', 'skewY', -360, 360, 5, false, 0);
            createTr('Width', 'width', 0, 1000, 10, false, 0);
            createTr('Height', 'height', 0, 1000, 10, false, 0);
            createTr('Background', 'background', 0, 0, 0, true, 1000);
            createTr('Border', 'border', 0, 0, 0, true, 100);

            document.getElementById('element').innerHTML = '';
            document.getElementById('element').appendChild(table);
            var deletebtn = document.createElement('button');
            deletebtn.innerText = 'Delete';
            deletebtn.classList.add('deleteelement');
            deletebtn.dataElement = o.name;
            deletebtn.onclick = this.delete;
            document.getElementById('element').appendChild(deletebtn);
        },
        create: function(name, parent) {
            var element = {
                type: 'div',
                name: name,
                parent: parent,
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
                    width: 100,
                    height: 100,
                    background: '#fff',
                    border: '1px solid black'
                }
            };
            return element;
        },
        delete: function(e) {
            var confirm_ = confirm('Are you sure want to delete element "'+this.dataElement+'"?');
            if (!confirm_) return;

            var deletenames = [];
            var adddeletename = function(elemname) {
                deletenames.push(elemname);
                var children = Elements.filter(function (el) {return el.parent == elemname;});
                for (var i = 0; i < children.length; i++) {
                    adddeletename(children[i].name);
                }
            }

            adddeletename(this.dataElement);
            document.querySelector('#preview div[data-elname="'+this.dataElement+'"]').remove();
            var elname = this.dataElement;
            var parent = Elements.filter(function (el) {return el.name == elname})[0].parent;
            document.querySelector('#solution div.treeview.active').remove();
            document.querySelector('#element').innerHTML = '';

            for (var i = 0; i < deletenames.length; i++) {
                var index = Elements.indexOf(Elements.filter(function(el) {return el.name == deletenames[i];})[0]);
                Elements.splice(index, 1);
            }

            var siblings = Elements.filter(function (el) {return el.parent == parent}).length;
            if (siblings == 0) {
                document.querySelector('#solution div.treeview[data-s-elname="'+parent+'"] > div.treeview.button').classList.add('endbranch');
                document.querySelector('#solution div.treeview[data-s-elname="'+parent+'"] > div.treeview.button').onclick = null;
            }
        }
    }
];
