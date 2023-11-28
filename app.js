let randomNumberArray = [];
let secretNumLimit = 10;
let secretNum = autoNumGen();
let tries = 1;
let repeatedGuess = []

function showScreenText(tag, text){
    let space = document.querySelector(tag);
    space.innerHTML = text;
    responsiveVoice.speak(text,'Brazilian Portuguese Female',{rate:1.2});
}



function showIniText(){

    showScreenText('h1','Jogo do Número Secreto');
    showScreenText('p',`Escolha um número entre 1 e ${secretNumLimit}.`);

}

showIniText();

function autoNumGen() {

    let arrayLengthCalculator = randomNumberArray.length;
    let chosenNum = parseInt(Math.random()*secretNumLimit+1);

    if (arrayLengthCalculator == secretNumLimit){
        randomNumberArray = [];
    }

    if (randomNumberArray.includes(chosenNum)){
         return autoNumGen();
    }else{
         randomNumberArray.push(chosenNum);
         return chosenNum;
         
    }

}

function verifyGuess () {
    let guess = document.querySelector('input').value;
    
    if(guess == secretNum){

        showScreenText('h1','Acertou!');
        let wordTry = tries > 1?  'tentativas' : 'tentativa';
        let triesText = `Você descobriu o número secreto com ${tries} ${wordTry}!`;
        showScreenText('p',triesText);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled', true);

    }else{
        if(guess>secretNum){

        showScreenText('p','O número secreto é menor.');

        }else{
            showScreenText('p','O número secreto é maior');
        }
        tries++;
        clearNumber();
        if(guess == repeatedGuess){

            showScreenText('p','Você já tentou esse número');
            
        }else{
            repeatedGuess.push(guess);
        }
        
    }
}


function clearNumber() {
    guess = document.querySelector('input');
    guess.value = '';
}

function resetGame(){

    secretNum = autoNumGen();
    clearNumber();
    repeatedGuess = [];
    tries = 1;
    showIniText();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chute').removeAttribute('disabled');

}
