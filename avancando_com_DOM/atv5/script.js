const select = document.getElementsByName('cores');
const tamanho = select.length

for (let i = 0; i < tamanho; i++) {
    select[i].addEventListener("change", function () {
        if (this.checked) {
            document.body.style.backgroundColor = this.value;
        }
    });
}