const x = 10;

const y = "Carlos Vitor comprou um carro.";

const z = [1, 2];

console.log(x, y, z);

//Contagem de impressões

console.count(`O valor de x é: ${x}, contagem`);
console.count(`O valor de x é: ${x}, contagem`);
console.count(`O valor de x é: ${x}, contagem`);

// Variável entre String
console.log("O texto é: %s", y);

//Limpar o console

setTimeout(() => {
  console.clear();
}, 2000);
