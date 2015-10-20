function Module1(id) {
    this.element = document.getElementById(id);
}

Module1.prototype.ChangeText = function () {
    this.element.innerHTML = 'Привет. Я модуль номер один';
};
module.exports = Module1;