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
            'opacity',
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
            divstyles.opacity = o.properties['opacity'];
            divstyles.border = o.properties['border'];
            div.setAttribute('data-elname', o.name)
            return div;
        },
        edit: function(o) {
            var div = document.querySelector('#preview div[data-elname="'+o.name+'"]');
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
            divstyles.opacity = o.properties['opacity'];
            divstyles.border = o.properties['border'];
        }
    }
];
