//requerindo as blibliotecas
const express = require('express');
const session = require('express-session');

//as palavras vao ser pegas de um arquivo em json com varias palavras
const words = require('./assets/info/palavras.json')
const app = express();

//permite servir arquivos do frontend
app.use(express.static("public"));
//permite receber json no body
app.use(express.json());
//sessao
app.use(session({
    secret: 'secret',
    resave: false, 
    saveUninitialized: true
}));

//get
app.get('/start', (req, res) => {
    //vai pegar um numero aleatorio
    const random = Math.floor(Math.random() * words.length)

    //vai armazenar na sessao a palavra chave
    req.session.word = words[random].toUpperCase();

    //vai mandar uma resposta em formato json falando que começou
    res.json({ message: 'start game' });
})
app.get('/answer', (req, res) => {
    const answerLooser = req.session.word;

    res.json({ answerLooser })
})

//Post
app.post('/guess', (req, res) => {
    //vai pegar o chute
    const { guess } = req.body;
    const correctWord = req.session.word;

    if(!guess || !correctWord){
        return res.status(400).json({dados:'Dados Invalidos'})
    }

    //vai colocar em result o que vier da função check word
    const result = checkWord(guess, correctWord);

    //vai mandar o json como uma resposta
    //!!!!!!!!!!!!!!!! lembrar de tirar o correctWord tb
    res.json({ result });
})


//vai checar a palavra
function checkWord(guess, correctWord){
    if(!guess) return 'invalid';

    guess = guess.toUpperCase();

    if(guess === correctWord) return 'correct';

    //tornar o array de cores tudo cinza
    const result = Array(5).fill('gray');
    //dividir a palavra correta
    const wordTemp = correctWord.split('');

    //verificar verde, por cada elemento da tentativa
    guess.split('').forEach((letter, index) => {
        //se a letra estiver na posição certa
        if(letter === wordTemp[index]){
            //vai mudar para verde o indice do resultado
            result[index] = 'green';
            //remove letra usada
            wordTemp[index] = null;
        }
    })

    //verificar amarelo
    guess.split('').forEach((letter, index) => {
        //vai pular se o indice estiver verde
        if(result[index] === 'green') return;

        //procura a letra nas que sobraram
        const foundIndex = wordTemp.indexOf(letter);

        //se encontrou e -1
        if(foundIndex !== -1){
            //marca amarelo
            result[index] = 'yellow';
            //remove usada
            wordTemp[foundIndex] = null
        }
    })

    return result;
}

//vai escutar a porta 3000
app.listen(3000, ()=>{
    console.log('Acessar http://localhost:3000')
})