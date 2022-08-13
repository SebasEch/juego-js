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
    pregunta: "¿quien es Nightwing?",
    opciones: ["Demian Wayne", "Dick Grayson", "Tim Drake", "Jason Todd"],
    respuesta: "Dick Grayson",
  },

  {
    pregunta: "¿cual es el segundo nombre del abuelo Simpson?",
    opciones: ["Abraham", "Jebediah", "Jeremias", "J"],
    respuesta: "Jebediah",
  },
];

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
// en el siguiente console.log pruebo que todo este corriendo bien, cambiando el indice y el string para ver si me devuelve true o false
// console.log(juegoPreguntas[2].respuestaCorrecta("Benjamin Parker"))

// CLASE CON LA MECANICA DEL JUEGO
class Nerdeandola {
  preguntaIndex = 0;
  puntaje = 0;

  constructor(juegoPreguntas) {
    this.juegoPreguntas = juegoPreguntas;
  }
  preguntaIndexActual() {
    return this.juegoPreguntas[this.preguntaIndex];
  }
  adivinar(respuesta) {
    console.log(respuesta);
    if (this.preguntaIndexActual().respuestaCorrecta(respuesta)) {
      this.puntaje++;
    }
    this.preguntaIndex++;
  }

  finDeJuego() {
    return this.juegoPreguntas.length === this.preguntaIndex;
  }
}

// INTERFAZ HTML

class Interfaz {
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
    `;
    const element = document.getElementById("nerdContenedor");
    element.innerHTML = puntosHtml;
  }

  mostrarProgreso(indice, total) {
    const element = document.getElementById("progreso");
    element.innerHTML = `Pregunta ${indice} of ${total}`;
  }
}

//FUNCION PARA RENDERIZAR EL HTML

const render = (nerdeandola, interfaz) => {
  if (nerdeandola.finDeJuego()) {
    interfaz.mostrarPuntaje(nerdeandola.puntaje);
  } else {
    interfaz.mostrarPregunta(nerdeandola.preguntaIndexActual().texto);
    interfaz.mostrarOpciones(
      nerdeandola.preguntaIndexActual().opciones,
      (opcionActual) => {
        nerdeandola.adivinar(opcionActual);
        render(nerdeandola, interfaz);
      }
    );
    interfaz.mostrarProgreso(
      nerdeandola.preguntaIndex + 1,
      juegoPreguntas.length
    );
  }
};

// FUNCION PRINCIPAL DEL JUEGO

const bienvenido = ()=>{
  let nombre = prompt("ingresa tu nombre para comenzar")
  return alert (`Bienvenido ${nombre} ya puedes comenzar a nerdear`) 
}

function main() {
  const nerdeandola = new Nerdeandola(juegoPreguntas);
  const interfaz = new Interfaz();
  render(nerdeandola, interfaz);
}
bienvenido();
main();
