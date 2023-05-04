document.addEventListener("DOMContentLoaded", function () {
  // ATRIBUTOS
  const nombre = document.querySelector("#nombre");
  const apellido = document.querySelector("#apellido");
  const correo = document.querySelector("#correo");
  const telefono = document.querySelector("#telefono");
  const empresa = document.querySelector("#empresa");
  const asunto = document.querySelector("#asunto");
  const spinner = document.querySelector("#spinner");
  const formulario = document.querySelector("#formulario");

  // BOTONES
  const btnSubmit = document.querySelector(".form-actions button[type='submit']");
  const btnReset = document.querySelector(".form-actions button[type='reset']");

  // Eventos
  nombre.addEventListener("input", validarCampos);
  apellido.addEventListener("input", validarCampos);
  correo.addEventListener("input", validarCampos);
  telefono.addEventListener("input", validarCampos);
  empresa.addEventListener("input", validarCampos);
  asunto.addEventListener("input", validarCampos);

  btnReset.addEventListener("click", resetearFormulario);

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    comprobarEmail();
  });

  // OBJETO
  const camposEvaluar = {
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    empresa: "",
    asunto: "",
  };

  // <-- FUNCIONES -->

  // Validamos los todos los campos del formulario
  function validarCampos(event) {
    if (event.target.value.trim() === "") {
      mostrarMensaje(`El campo ${event.target.id} esta vacio`,event.target.parentElement);
      camposEvaluar[event.target.id] = "";
      return;
    }

    if (event.target.id === "correo" && !validarEmail(event.target.value)) {
      mostrarMensaje(`El campo correo ingresado no es correcto`,event.target.parentElement);
      camposEvaluar[event.target.id] = "";
      return;
    }

    if (event.target.id === "telefono" &&!validarTelefono(event.target.value)) {
      mostrarMensaje(`Solo se pueden ingresar numeros`,event.target.parentElement);
      camposEvaluar[event.target.id] = "";
      return;
    }

    if (event.target.id === "telefono" && !(event.target.value.length === 7)) {
      (event.target.value.length < 7)
      ? mostrarMensaje("Faltan números por ingresar",event.target.parentElement)
      : mostrarMensaje("Demasiados números ingresados",event.target.parentElement);
      camposEvaluar[event.target.id] = "";
      return;
    }

    limpiarAlerta(event.target.parentElement);

    camposEvaluar[event.target.id] = event.target.value.trim().toLowerCase();

    event.target.classList.remove("verificado");
    event.target.classList.add("noVerificado");
  }

  // Validamos el NUMERO DE TELEFONO para que  solo acepte numeros
  function validarTelefono(numero) {
    const verificar = /^[0-9]+$/;
    return verificar.test(numero);
  }

  // Mostramos diferentes mensajes de acuerdo al tipo de validacion
  function mostrarMensaje(mensaje, referencia) {
    limpiarAlerta(referencia);

    const error = document.createElement("P");
    const posicion = referencia.children[1];
    error.textContent = mensaje;
    error.classList.add("errorAgregado");

    referencia.insertBefore(error, posicion);

    posicion.classList.add("verificado");
    posicion.classList.remove("noVerificado");
  }

  // Validamos el CORREO
  function validarEmail(email) {
    const verificar = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return verificar.test(email);
  }

  // Evitamos duplicacion de elertas
  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".errorAgregado");
    if (alerta) {
      alerta.remove();
    }
  }

  // Comprobamos si todos los campos estan llenos
  function comprobarEmail() {
    for (let iterador in camposEvaluar) {
      if (camposEvaluar[iterador] === "") {
        const eventoFalso = {
          target: document.querySelector(`#${iterador}`),
        };
        validarCampos(eventoFalso);
      }
    }

    if (!Object.values(camposEvaluar).includes("")) {
      enviarEmail();
      return;
    }
  }

  // Mostramos el mensaje una vez comprobado que todos los campos estan llenos
  function enviarEmail() {
    spinner.style.display = "block";

    setTimeout(() => {
      spinner.style.display = "none";

      resetearFormulario();

      // Creamos una alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add("exito");
      alertaExito.textContent = "Mensaje enviado correctamente";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }


  // Eliminamos todos los errores
  function borrarErrores() {
    const verificados = document.querySelectorAll(".verificado");
    const errores = document.querySelectorAll(".errorAgregado");
    if(verificados.length > 0){
      verificados.forEach( veri => {
        veri.classList.remove('verificado');
        veri.classList.add('noVerificado');
      });

      errores.forEach( error => error.remove() );
    }
  }

  // Retearmos el formulario
  function resetearFormulario() {
    // Borramos los errores
    borrarErrores();

    // Reiniciar el objeto
    camposEvaluar.nombre = "";
    camposEvaluar.apellido = "";
    camposEvaluar.correo = "";
    camposEvaluar.telefono = "";
    camposEvaluar.empresa = "";
    camposEvaluar.asunto = "";
   
    formulario.reset();
  }
});
