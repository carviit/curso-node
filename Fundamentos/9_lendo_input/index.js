const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Qual a sua linguagem preferida ? ", (language) => {
  if (language == "Python" || language == "python") {
    console.log("Isso não é linguagem.... rs!");
  } else {
    console.log(`A minha linguagem preferida é: ${language}`);
  }

  readline.close();
});
