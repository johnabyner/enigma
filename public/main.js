//vai conter os estados
const stats = {
  word: 'rapaz',
  currentGuess: '',
  currentRow: 0,
  maxRows: 6,
  maxLetters: 5,
  warning: false,
  gameIsFinished: false
};

//elementos do html
const teste = document.querySelector('#teste')
const div = document.querySelector('.continueGame')

async function startGame(){
  try{
    await fetch('/start');
  }
  catch(e){
    console.log(e)
  }
}

//iniciando o jogo
startGame();

//controla o mouse
document.addEventListener('click', (e) => {
  el = e.target;

  if(el.classList.contains('buttonContinue')){
    window.location.reload();
  }
})

//controlando o teclado
document.addEventListener('keydown', (e) => {
  //se for uma letra e menor que 5
  if(isLetter(e.key) && stats.currentGuess.length < stats.maxLetters && !stats.gameIsFinished){
    //vai adicionar a currentGuess
    stats.currentGuess += e.key.toUpperCase();
    updateUI();
  }
  
  //vai apagar 1 indice
  if(e.key === 'Backspace' && stats.currentGuess.length > 0 && !stats.gameIsFinished){
    stats.currentGuess = stats.currentGuess.slice(0, -1);
    updateUI();
  }

  //se for diferente de 5 ele vai da um aviso e sair, se nao, ele vai chamar a função para verificar a resposta
  if(e.key === 'Enter' && !stats.gameIsFinished){
    if(stats.currentGuess.length !== stats.maxLetters){
      warningLetter();
      return;
    }
    verifyAnswer();
  }

})

//para verificar se é uma letra
function isLetter(key){
  return /^[a-zA-Z]$/.test(key);
}
//vai atualizar a interface
function updateUI(state, arrayColor){ 
  const head = document.querySelector('.row')

  //vai pegar as linhas
  const rows = head.querySelectorAll('.cell')
  //a linha atual
  const currentRow = rows[stats.currentRow];
  //os botaos vao estar dentro dessa celular
  const buttons = currentRow.querySelectorAll("button");

  //limpa a ultima linha
  buttons.forEach(button => button.textContent = '');

  stats.currentGuess.split('').forEach((letter, index) => {
    buttons[index].textContent = letter;
  })

  if(state === 'correct'){
    buttons.forEach(button => button.classList.add(`green`))
    stats.gameIsFinished = true;
  }

  if(state === 'wrong'){
    buttons.forEach((button, index) => button.classList.add(arrayColor[index]));
  }
}

//melhorar o aviso
function warningLetter(){
  //se nao esta mostrando aviso
  if(!stats.warning){
    //vai se tornar verdadeiro
    stats.warning = true
    
    //vai aparecer um aviso junto com a classe
    teste.textContent = 'A palavra precisa ter 5 letras'
    teste.classList.add('warnWord');

    //setar um tempo de 2 segundos
    setTimeout(() => {
      teste.textContent = '';
      teste.classList.remove('warnWord');

      //quando passar 2 segundos se tornara falso
      stats.warning = false;
    }, 2000);
  }
}
async function verifyAnswer(){
  let dataExpress = await sendGuess(stats.currentGuess);

  //se a respota estiver correta
  if(dataExpress.result === 'correct'){
    //vai enviar 'correct'
    updateUI(dataExpress.result)
    anotherGame('win');
  }

  //se a resposta estiver errada
  //vai mandar um array com os indices em determinada cor
  if(dataExpress.result !== 'correct'){
    updateUI('wrong',dataExpress.result);
  }
  

  //limpar
  stats.currentGuess = ''

  stats.currentRow += 1
  //pular para proxima linha
  if(stats.currentRow === 6){ anotherGame('lose')}
  
}

async function sendGuess(word){
  const response = await fetch('/guess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ guess: word })
  });

  const data = await response.json();

  return data; 
}


//se venceu ou perdeu vai aparecer um botao para continuar e mostrar a palavra
async function anotherGame(state){
  const response = await fetch('/answer')
  const data = await response.json();
  
  stats.gameIsFinished = true;
  if(state === 'win'){
    teste.textContent = 'Parabens';
  }else{
    teste.textContent = `A palavra era ${data.answerLooser}`
  }
  
  const buttonGame = document.createElement('button');
  buttonGame.textContent = 'continuar'
  buttonGame.classList.add('buttonContinue');
  
  
  div.appendChild(buttonGame);
}
