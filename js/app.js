// LLamada al localStorage

const jugador = localStorage?.getItem("nombre");


// PREGUNTAS Y RESPUESTAS MEDIANTE OBJETOS Y ARRAYS
const preguntas = [
  {
    pregunta: "¿cual de los siguientes es un personaje de dc comics?",
    opciones: ["Homelander", "Omni-Man", "Black Widow", "The Joker"],
    respuesta: "The Joker",
  },

  {
    pregunta: "¿cual de los siguientes es un personaje de Marvel?",
    opciones: ["Goku", "Dorian Gray", "Capitan Nemo", "Jean Grey"],
    respuesta: "Jean Grey",
  },

  {
    pregunta:
      "¿quien dijo la frase: 'todo poder conlleva una gran responsabilidad'?",
    opciones: ["Benjamin Parker", "Stan Lee", "Julio Verne", "Elon Musk"],
    respuesta: "Benjamin Parker",
  },

  {
    pregunta:
      "Cual es el nombre de la actriz que interpreta a Starlight de The Boys?",
    opciones: [
      "Rachel McAdams",
      "Evangeline Lily",
      "Erin Moriarty",
      "Elisabeth Shue",
    ],
    respuesta: "Erin Moriarty",
  },

  {
    pregunta: "¿cual es la identidad de Nightwing?",
    opciones: ["Demian Wayne", "Dick Grayson", "Tim Drake", "Jason Todd"],
    respuesta: "Dick Grayson",
  },

  {
    pregunta: "¿cual es el segundo nombre del abuelo Simpson?",
    opciones: ["Abraham", "Jebediah", "Jeremias", "J"],
    respuesta: "Jebediah",
  },

  {
    pregunta: "¿Que cancion suena al principio de IronMan 1?",
    opciones: [
      "Iron Man, Black Sabbath",
      "Showbiz, Muse",
      "Paranoid, Black Sabbath",
      "Back in Black, AC/DC",
    ],
    respuesta: "Back in Black, AC/DC",
  },

  {
    pregunta: "¿quien es el director de Pulp Fiction?",
    opciones: [
      "Martin Scorsese",
      "Tim Burton",
      "Quentin Tarantino",
      "Stanley Kubric",
    ],
    respuesta: "Quentin Tarantino",
  },
  {
    pregunta:
      "¿Cual de las tortugas ninjas tiene como arma predilecta los sai?",
    opciones: ["Leonardo", "Donatello", "Miguelangel", "Rafael"],
    respuesta: "Rafael",
  },
];

// AGREGO PREGUNTA MEDIANTE EL METODO DE ARRAY "PUSH"

let agregaPregunta = preguntas.push({
  pregunta: "¿cual de los siguientes juegos de mesa se trata de colonizar una isla?",
  opciones: ["TEG", "Monopoly", "Catan", "Risk"],
  respuesta: "Catan",
})


// DEFINIENDO CLASES

class Pregunta {
  /**
   *
   * @param {string} texto la pregunta que va a arrojar el juego
   * @param {string []} opciones estas son las opciones que va a arrojar el juego
   * @param {string} respuesta  esta es la respuesta
   */
  constructor(texto, opciones, respuesta) {
    this.texto = texto;
    this.opciones = opciones;
    this.respuesta = respuesta;
  }
  /**
   *
   * @param {string} opcion una opcion para adivinar
   * @returns {boolean} si la respuesta es correcta devuelve un true, caso contrario un false
   */
  respuestaCorrecta(opcion) {
    return opcion === this.respuesta;
  }
}
// METODO QUE RECORRE LAS PREGUNTAS

const juegoPreguntas = preguntas.map(
  (pregunta) =>
    new Pregunta(pregunta.pregunta, pregunta.opciones, pregunta.respuesta)
);

// CLASE CON LA MECANICA DEL JUEGO
class Trivia {
  preguntaIndex = 0;
  puntaje = 0;

  constructor(juegoPreguntas) {
    this.juegoPreguntas = juegoPreguntas;
  }
  preguntaIndexActual() {
    return this.juegoPreguntas[this.preguntaIndex];
  }
  adivinar(respuesta) {
    if (this.preguntaIndexActual().respuestaCorrecta(respuesta)) {
      this.puntaje++;
      Swal.fire({
        title: "Adivinaste!!",
        text: "Buen Trabajo :) !!!",
        icon: "success",
        toast: true,
        confirmButtonText: "Aceptar",
        padding: "3em",
        background: "#a1ad58",
        confirmButtonColor: "#2d4932da",
        timer: 3000,
      })
    } else {
      Swal.fire({
        title: "Fallaste!",
        text: "Shit Happens!",
        icon: "error",
        toast: true,
        confirmButtonText: "Aceptar",
        padding: "3em",
        background: "#3b1919",
        confirmButtonColor: "#2d4932da",
        timer: 2000
      })
    }
    this.preguntaIndex++;
  }

  finDeJuego() {

    return this.juegoPreguntas.length === this.preguntaIndex;
  }
}

// INTERFAZ HTML

class Interfaz {

  mostrarJugador(usuario) {
    document.getElementById("jugador").innerHTML = jugador;
  }
  mostrarPregunta(texto) {
    const preguntaTitle = document.getElementById("preguntar");
    preguntaTitle.innerText = texto;
  }

  mostrarOpciones(opciones, callback) {
    const contenedorOpciones = document.getElementById("opciones");
    contenedorOpciones.innerHTML = "";
    for (let i = 0; i < opciones.length; i++) {
      const button = document.createElement("button");
      button.innerText = opciones[i];
      button.className = "button";
      button.addEventListener("click", () => callback(opciones[i]));
      contenedorOpciones.append(button);
    }
  }

  mostrarPuntaje(puntaje) {
    const puntosHtml = `
    <h1>Resultado</h1>
    <h2>Tu puntaje: ${puntaje}</h2>
    <button class="btn" id="correctasBtn">Aceptar</button>
    `;
    const element = document.getElementById("triviaContenedor");
    element.innerHTML = puntosHtml;

  }

  mostrarProgreso(indice, total) {
    const element = document.getElementById("progreso");
    element.innerHTML = `Pregunta ${indice} of ${total}`;
  }
}

//FUNCION PARA RENDERIZAR EL HTML

const render = (trivia, interfaz) => {
  if (trivia.finDeJuego()) {
    interfaz.mostrarPuntaje(trivia.puntaje);
    correctasBtn.addEventListener("click", () => mostrarCorrectas());
  } else {
    interfaz.mostrarPregunta(trivia.preguntaIndexActual().texto);
    interfaz.mostrarOpciones(
      trivia.preguntaIndexActual().opciones,
      (opcionActual) => {
        trivia.adivinar(opcionActual);
        render(trivia, interfaz);
      }
    );
    interfaz.mostrarJugador();
    interfaz.mostrarProgreso(
      trivia.preguntaIndex + 1,
      juegoPreguntas.length
    );
  }
};

//FUNCION PARA MOSTRAR RESPUESTAS CORRECTAS (utilizando fetch de manera local mediante json)

const mostrarCorrectas = () => {
  fetch("respuestas.json")
    .then(response => response.json())
    .then(data => {
      let correctas = "";
      data.forEach((data) => {
        correctas += `<div class="respContenedor">
      <h3 class="respuesta">${data.pregunta}</h3>  
      <h3 class="respuesta">${data.resp}</h3>
      <p class="descripcion">${data.descripcion}</p>
      <hr>
      </div>`
      })
      document.getElementById("triviaContenedor").innerHTML = correctas;
    })
}


// FUNCION PRINCIPAL DEL JUEGO

const main = () => {
  const trivia = new Trivia(juegoPreguntas);
  const interfaz = new Interfaz();
  render(trivia, interfaz);
}
main();

