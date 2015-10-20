function Module2(id) {
    this.element = document.getElementById(id);
}

Module2.prototype.ChangeText2 = function () {
    this.element.innerHTML = 'А я модуль номер два и вывожу привет в консоле... ';
    console.log('Здравствуй, Мир');
};
module.exports = Module2;