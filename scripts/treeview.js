var els1 = document.querySelectorAll('.treeview.button');
for (var i = 0; i < els1.length; i++) {
    els1[i].onclick = function (e) {
        this.parentElement.classList.toggle('opened');
    };
}
var els2 = document.querySelectorAll('.treeview.title');
for (var i = 0; i < els2.length; i++) {
    els2[i].onclick = function (e) {
        var els3 = document.querySelectorAll('.treeview.title.active');
        for (var i = 0; i < els3.length; i++) {
            els3[i].classList.remove('active');
        }
        this.classList.toggle('active');
    };
    els2[i].oncontextmenu = function (e) {
        var els3 = document.querySelectorAll('.treeview.focus');
        for (var i = 0; i < els3.length; i++) {
            els3[i].classList.remove('focus');
        }
        this.parentElement.classList.toggle('focus');
        return false;
    };
}