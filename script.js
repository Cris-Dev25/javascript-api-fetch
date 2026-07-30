const usersContainer = document.getElementById("users");

function crearTarjeta(user) {
  const div = document.createElement("div");
  const nombre = document.createElement("h2");
  const correo = document.createElement("p");
  const ciudad = document.createElement("p");

  div.className =
    "neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs";
  nombre.className =
    "mb-3 text-2xl font-semibold tracking-tight text-heading leading-8";

  nombre.textContent = user.name;
  correo.textContent = user.email;
  ciudad.textContent = user.address.city;

  div.append(nombre);
  div.append(correo);
  div.append(ciudad);

  return div;
}

function mostrarError(message) {
  const p = document.createElement("p");
  p.className = "text-red-500";
  p.textContent = message;

  usersContainer.append(p);
}

async function cargarUsuarios() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new Error("No encontramos los usuarios.");
      case 500:
        throw new Error("El servidor presentó un problema.");
      default:
        throw new Error("Ocurrió un error inesperado.");
    }
  }
  return response.json();
}

function mostrarUsuarios(users) {
  const fragment = document.createDocumentFragment();
  for (const user of users) {
    fragment.append(crearTarjeta(user));
  }
  usersContainer.append(fragment);
}

async function iniciarPagina() {
  try {
    const users = await cargarUsuarios();
    mostrarUsuarios(users);
  } catch (error) {
    mostrarError(error.message);
  }
}

iniciarPagina();
