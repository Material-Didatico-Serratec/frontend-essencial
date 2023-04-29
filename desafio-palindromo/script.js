function check() {
    event.preventDefault();
    var word = document.getElementById("prompt").value
    var reverseWord = word.split("").reverse().join("");
    if(reverseWord.toLowerCase() == word.toLowerCase()) {
        document.getElementById("result").innerHTML = "<h1 id='answer' class='success'>É um palíndromo! :D</h1>"
    } else {
        document.getElementById("result").innerHTML = "<h1 id='answer' class='error'>Não é um palíndromo! :(</h1>"
    }
}