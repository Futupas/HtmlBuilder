var elementtypes = [
    {
        type: 'sketch',
        properties: ['perspective', 'backgroundColor'],
        styles: [],
        
        draw: function (o) {
            var prw = document.getElementById('preview');
            prw.style.perspective = o.properties['perspective'] + 'px';
            prw.style.backgroundColor = o.properties['backgroundColor'];
            return prw;
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
            'width',
            'height',
            'background',
            'border'
        ],

        draw: function (o) {
            var div = document.createElement('div');
            var divstyles = div.style;
            divstyles.position = 'absolute';
            divstyles.padding = '0px';
            divstyles.margin = '0px';
            divstyles.transform = 'translateX(' + o.properties['x'] +
                    'px) translateY(' + o.properties['y'] +
                    'px) translateZ(' + o.properties['z'] +
                    'px) rotateX(' + o.properties['rotateX'] +
                    'deg) rotateY(' + o.properties['rotateY'] +
                    'deg) rotateZ(' + o.properties['rotateZ'] + 'deg)';
            divstyles.width = o.properties['width'] + 'px';
            divstyles.height = o.properties['height'] + 'px';
            divstyles.background = o.properties['background'];
            divstyles.border = o.properties['border'];
            div.setAttribute('data-elname', o.name);
            return div;
        },
        edit: function(o) {
            var table = document.createElement('table');
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
                    divstyles.padding = '0px';
                    divstyles.margin = '0px';
                    divstyles.transform = 'translateX(' + o.properties['x'] +
                            'px) translateY(' + o.properties['y'] +
                            'px) translateZ(' + o.properties['z'] +
                            'px) rotateX(' + o.properties['rotateX'] +
                            'deg) rotateY(' + o.properties['rotateY'] +
                            'deg) rotateZ(' + o.properties['rotateZ'] + 'deg)';
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
            createTr('Width', 'width', 0, 1000, 10, false, 0);
            createTr('Height', 'height', 0, 1000, 10, false, 0);
            createTr('Background', 'background', 0, 0, 0, true, 50);
            createTr('Border', 'border', 0, 0, 0, true, 32);

            document.getElementById('element').innerHTML = '';
            document.getElementById('element').appendChild(table);
        }
    }
];
