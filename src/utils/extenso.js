module.exports = (word) => {
  const extenso = [
    "tres",
    "quatro",
    "cinco",
    "seis",
    "sete",
    "oito",
    "nove",
    "dez",
    "onze",
    "doze",
    "treze",
    "quatorze",
    "quinze",
    "dezesseis",
    "dezessete",
    "dezoito",
    "dezenove",
    "vinte",
    "vinte-e-um",
    "vinte-e-dois"
  ];

  return extenso[parseInt(word) - 3];
};
