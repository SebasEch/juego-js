// LOGIN (guarda nombre en localStorage para poder mostrarlo luego en el juego)

const alertaDatosNoValidos = () => {
  Swal.fire({
    title: "Error!",
    text: "datos ingresados no validos",
    icon: "warning",
    confirmButtonText: "Aceptar",
    padding: "3em",
    background: "#849765",
    confirmButtonColor: "#2d4932da",
    allowOutsideClick: false,
    showCloseButton: true,
  })
}

// EVENTO EN EL BOTON ENTRAR, QUE ME REDIRIGE A LA APP EN CASO DE QUE LOS DATOS SEAN CORRECTOS.

let boton = document.getElementById("entrar");

boton.addEventListener("click", (e) => {
  e.preventDefault();
  let usuario = document.getElementById("usuario").value;
  let pass = document.getElementById("pass").value;

  usuario == "Jose" && pass == "1234" ? (window.location.href = "juego.html", localStorage.setItem("nombre", usuario)) : alertaDatosNoValidos()
})

//EVENTO EN EL BOTON PARA ENTRAR CONMO INVITADO, REDIRIGE A LA APP.

let botonInvitado = document.getElementById("entrarInvitado");

botonInvitado.addEventListener("click", (e) => {
  e.preventDefault();
  let usuario = document.getElementById("usuarioInvitado").value;
  window.location.href = "juego.html", localStorage.setItem("nombre", usuario)
})







