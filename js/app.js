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
    pregunta: "¿quien es Nightwing?",
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
    if (this.preguntaIndexActual().respuestaCorrecta(respuesta)) {
      this.puntaje++;
      Swal.fire({
        title: "Adivinaste!!",
        text: "Buen Trabajo :) !!!",
        icon: "success",
        toast: true,
        confirmButtonText: "Aceptar",
        padding:"3em",
        background: "#a1ad58",
        allowOutsideClick: false,	
        confirmButtonColor: "#2d4932da",
          })   
    } else {
      Swal.fire({
        title: "Fallaste!",
        text: "Shit Happens!",
        icon: "error",
        toast: true,
        confirmButtonText: "Aceptar",
        padding:"3em",
        background: "#3b1919",
        allowOutsideClick: false,	
        confirmButtonColor: "#2d4932da",
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
    const style = document.documentElement.style;
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
    interfaz.mostrarJugador();
    interfaz.mostrarProgreso(
      nerdeandola.preguntaIndex + 1,
      juegoPreguntas.length
    );
  }
};

// FUNCION PRINCIPAL DEL JUEGO

function main() {
  const nerdeandola = new Nerdeandola(juegoPreguntas);
  const interfaz = new Interfaz();
  render(nerdeandola, interfaz);
}
main();
