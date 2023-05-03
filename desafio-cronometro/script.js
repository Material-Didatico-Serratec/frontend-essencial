// Formata o número de segundos para o formato hh:mm:ss
const formatTime = (value) => {
    var sec_num = parseInt(value, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

// Insere os caracteres em cada uma das divs designadas
const insertNumbers = (timeLimit) => {
    var timeArray = formatTime(timeLimit).split("");
    document.getElementById("decHour").innerText = timeArray[0]
    document.getElementById("unHour").innerText = timeArray[1]
    document.getElementById("decMinute").innerText = timeArray[3]
    document.getElementById("unMinute").innerText = timeArray[4]
    document.getElementById("decSecond").innerText = timeArray[6]
    document.getElementById("unSecond").innerText = timeArray[7]
}

// Inicia a contagem
const startCounter = () => {
    var inputValue = document.getElementById("secondsInput").value;
    if(inputValue === "" || parseInt(inputValue) <= 0) {
        alert("Por favor, insira um valor válido.")
    } else {
        document.getElementById("startBtn").setAttribute("disabled", true)
        document.getElementById("secondsInput").setAttribute("disabled", true)
        document.getElementById("secondsInput").setAttribute("placeholder", "Aguarde a contagem...")
        var timeLimit = inputValue;
        document.getElementById("secondsInput").value = "";
        insertNumbers(timeLimit);
    
        var counter = setInterval(() => {
            timeLimit--;
            insertNumbers(timeLimit);
    
            if(timeLimit === 0) {
                document.getElementById("startBtn").removeAttribute("disabled")
                document.getElementById("secondsInput").removeAttribute("disabled")
                document.getElementById("secondsInput").setAttribute("placeholder", "Quantos segundos?")
                clearInterval(counter);
            }
        }, 1000)
    }

}