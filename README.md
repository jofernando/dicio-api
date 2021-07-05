# API DOCS 📚🔎

O Dicio API permite buscas por diversas informações a respeito de milhares de palavras da língua portuguesa, todos os dados são extraídos do [Dicio](https://dicio.com.br).  
Nesta versão é possível acessar os seguintes recursos:

> - SIGNIFICADO
> - SINÔNIMOS
> - SEPARAÇÃO SILÁBICA
> - EXEMPLOS DE FRASES

<br />

### Endpoints e Response Params

##### Significados: GET `/[word]` ou `/meanings/[word]`:   
Response:
```js
[
  {
    class: String,
    meanings: [String],
    etymology: String,
  }
]
```

<br />

##### Sinônimos: GET `/synonyms/[word]`:   
Response:
```js
[
  String,
  String,
  String,
  ...
]
```

<br />

##### Separação silábica: GET `/syllables/[word]`:   
Response:
```js
{
  syllablesText: String,
  syllablesCount: Number
}
```

<br />

##### Exemplos em frases: GET `/sentences/[word]`:   
Response:
```js
[
  {
    sentence: String,
    author: String
  },
  {
    sentence: String,
    author: String
  }
]
```

* * *

## Exemplo de uso:

Usando a palavra `livro` 📗 como exemplo, vamos começar buscando seu significado:

### Request URL

https://significado.herokuapp.com/livro

> Significados também podem ser acessados utilizando o endpoint `/meanings/[word]`: https://significado.herokuapp.com/meanings/livro

### Response

A resposta é um array de objetos. Cada objeto possui uma `class` (classe gramatical da palavra),
`meanings` (array de strings, com os diversos significados da palavra) e `etymology` (etimologia da palavra)

```js
[
  {
    "class": "substantivo masculino",
    "meanings": [
      "Conjunto de folhas impressas e reunidas em volume encadernado ou brochado.",
      "Obra em prosa ou verso, de qualquer extensão, disponibilizada em qualquer meio ou suporte: livro bem escrito; livro eletrônico.",
      "Divisão menor contida numa obra maior: livro dos salmos.",
      "[Literatura] Divisão de uma obra, especialmente de uma epopeia.",
      "Caderno de registro das operações comerciais de; livro-caixa.",
      "[Figurado] Conjunto de saberes, usado como instrução, ou como fonte de ensino: livro de sabedoria."
    ],
    "etymology": "Etimologia (origem da palavra livro). Do latim liber.bri."
  }
]
```

### Palavras com múltiplas classes gramaticais

Quando uma palavra tem mais de uma classe gramatical e significados diferentes, as classes gramaticais e seus respectivos significados 
são divididos em outro objeto

**Exemplo com a palavra `auto`**

```js
[
  {
    "class": "substantivo masculino",
    "meanings": [
      "Festividade pública; solenidade.",
      "[Jurídico] Documento escrito, termo ou registro, que narra detalhadamente uma diligência policial, servindo de prova ou evidência de uma ocorrência.",
      "[Teatro]  Peça teatral em forma poética, de origem medieval, que focaliza temas religiosos e profanos, de criação essencialmente popular, apresenta uma linguagem que integra vocabulário e expressões consagradas pelo povo."
    ],
    "etymology": ""
  },
  {
    "class": "substantivo masculino plural",
    "meanings": [
      "[Jurídico] Os documentos ou registros produzidos no desenrolar de um processo: petições, certidões e os registros de depoimentos foram anexados aos autos."
    ],
    "etymology": "Etimologia (origem da palavra auto). Do latim actum.i."
  },
  {
    "class": "substantivo masculino",
    "meanings": [
      "Veículo movido a motor; automóvel."
    ],
    "etymology": "Etimologia (origem da palavra auto). Forma Red. de automóvel."
  },
  {
    "class": "substantivo masculino",
    "meanings": [
      "Breve momento; instante."
    ],
    "etymology": "Etimologia (origem da palavra auto). De átomo."
  }
]
```

#### Informações adicionais sobre a palavra:

Sinônimos: https://significado.herokuapp.com/synonyms/livro

```js
[
  "alfarrábio",
  "calhamaço",
  "cartapácio"
]

```

Separação silábica: https://significado.herokuapp.com/syllables/livro

```js
{
  "syllablesText": "li-vro",
  "syllablesCount": 2
}
```

Exemplos de frases: https://significado.herokuapp.com/sentences/livro
```js
[
  {
    "sentence": "No fim tu hás de ver que as coisas mais leves são as únicas que o vento não conseguiu levar: um estribilho antigo um carinho no momento preciso o folhear de um livro de poemas o cheiro que tinha um dia o próprio vento...",
    "author": "- Mário Quintana"
  },
  {
    "sentence": "O livro é um mestre que fala mas que não responde.",
    "author": "- Platão"
  },
  {
    "sentence": "Em 9 de setembro passado, o Tribunal Civil de Lisboa proibiu, em caráter cautelar, a venda do livro.",
    "author": "Folha de S.Paulo, 11/01/2010"
  },
  {
    "sentence": "O sucesso on-line transformou os posts em livro.",
    "author": "Folha de S.Paulo, 27/06/2009"
  },
  {
    "sentence": "Veja abaixo trecho do livro com descrição dos melhores locais para visitar na \"cidade maravilhosa\".",
    "author": "Folha de S.Paulo, 02/10/2009"
  }
]
```
