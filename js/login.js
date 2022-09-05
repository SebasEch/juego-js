// LOGIN (guarda nombre en localStorage para poder mostrarlo luego en el juego)

let boton = document.getElementById("entrar");

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

boton.addEventListener("click", (e) => {
  e.preventDefault();
  let usuario = document.getElementById("usuario").value;
  let pass = document.getElementById("pass").value;

  usuario == "Jose" && pass == "1234" ? (window.location.href = "juego.html", localStorage.setItem("nombre", usuario)) : alertaDatosNoValidos()
})




