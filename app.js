const URL = "http://localhost:3000/alumnos";

const form = document.getElementById("formAlumno");
const lista = document.getElementById("listaAlumnos");
const mensaje = document.getElementById("mensaje");

async function obtenerAlumnos() {
  const res = await fetch(URL);
  const data = await res.json();

  lista.innerHTML = "";

  data.forEach(alumno => {
    lista.innerHTML += `
      <tr>
        <td>${alumno.nombre}</td>
        <td>${alumno.apellido}</td>
        <td>${alumno.email}</td>
        <td>
          <button onclick="editarAlumno(${alumno.id})">Editar</button>
          <button onclick="eliminarAlumno(${alumno.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;

  const alumno = {
    nombre: nombre.value,
    apellido: apellido.value,
    edad: edad.value,
    email: email.value,
    comision: comision.value,
    activo: true
  };

  if (!alumno.nombre || !alumno.apellido || !alumno.email) {
    mensaje.textContent = "Completa los campos obligatorios";
    return;
  }

  if (id) {
    await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alumno)
    });

    mensaje.textContent = "Alumno actualizado";
  } else {
    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alumno)
    });

    mensaje.textContent = "Alumno agregado";
  }

  form.reset();
  obtenerAlumnos();
});

async function editarAlumno(id) {
  const res = await fetch(`${URL}/${id}`);
  const alumno = await res.json();

  document.getElementById("id").value = alumno.id;
  nombre.value = alumno.nombre;
  apellido.value = alumno.apellido;
  edad.value = alumno.edad;
  email.value = alumno.email;
  comision.value = alumno.comision;
}

async function eliminarAlumno(id) {
  if (!confirm("¿Seguro que querés eliminar?")) return;

  await fetch(`${URL}/${id}`, {
    method: "DELETE"
  });

  mensaje.textContent = "Alumno eliminado";
  obtenerAlumnos();
}

obtenerAlumnos();