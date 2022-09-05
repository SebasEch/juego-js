// LOGIN (guarda nombre en localStorage para poder mostrarlo luego en el juego)

let boton = document.getElementById("entrar");

boton.addEventListener("click", (e) => {
  e.preventDefault();
  let usuario = document.getElementById("usuario").value;
  let pass = document.getElementById("pass").value;

  if (usuario == "Jose" && pass == "1234") {
    window.location.href = "juego.html";
    localStorage.setItem("nombre", usuario)
  } else {
    Swal.fire({
	title: "Error!",
	text: "datos ingresados no validos",
	icon: "warning",
	confirmButtonText: "Aceptar",
	padding:"3em",
	background: "#849765",
	allowOutsideClick: false,	
	confirmButtonColor: "#2d4932da",
	showCloseButton: true,
    })   
  }
}
)