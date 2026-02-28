# Adivinhe a Palavra

Projeto pessoal inspirado no site Termo.

A ideia aqui não foi copiar interface pronta, foi mais pra praticar lógica,
express pra fazer comunicação entre cliente e servidor.

O jogo funciona assim:

- O servidor escolhe uma palavra aleatória
- O jogador tem 6 tentativas
- Cada tentativa é validada no backend
- O servidor retorna as cores (verde, amarelo, cinza)
- Letras repetidas são tratadas corretamente

---

## Por que esse projeto existe?

Eu queria praticar:

- Manipulação de estado
- Sessões com express-session
- Comunicação assíncrona com fetch
- Lógica de comparação com controle de letras repetidas
- Organização básica de projeto full stack

Não usei framework frontend.
A ideia foi entender o que realmente está acontecendo por baixo.

---

## Tecnologias

- Node.js
- Express
- express-session
- JavaScript puro (Vanilla)
- HTML + CSS

---

## Estrutura

server.js → backend  
public/ → frontend  
assets/info/palavras.json → base de palavras  

---

## Como rodar

npm install  
npm update
node server.js  

Depois abrir:
http://localhost:3000

---

## O que eu melhoraria no futuro

- Bloquear rota de resposta até o jogo terminar
- Adicionar animações
- Melhorar UI
- Deploy online
- Sistema de ranking

---

## Observação

Esse projeto foi feito para consolidar base.
A prioridade foi lógica e arquitetura, não design.

