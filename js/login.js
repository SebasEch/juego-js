// LOGIN (guarda nombre en localStorage para poder mostrarlo luego en el juego)

let boton = document.getElementById("entrar");

boton.addEventListener("click", (e) => {
  e.preventDefault();
  let usuario = document.getElementById("usuario").value;
  let pass = document.getElementById("pass").value;

  if (usuario == "jose"|| "Jose" || "JOSE" && pass == "1234") {
    window.location.href = "juego.html";
    localStorage.setItem("nombre", usuario)
  } else {
    alert("datos incorrectos");
  }
});
