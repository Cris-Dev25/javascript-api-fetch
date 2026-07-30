const usersContainer = document.getElementById("users");

function crearTarjeta(user) {
  const div = document.createElement("div");
  const nombre = document.createElement("h2");
  const correo = document.createElement("p");
  const ciudad = document.createElement("p");

  div.className =
    "max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md";
  nombre.className =
    "mb-3 text-2xl font-semibold tracking-tight text-gray-900 leading-8 truncate";
  correo.className = "text-gray-700 truncate";
  ciudad.className = "text-gray-500 truncate";

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
  p.className =
    "p-4 mb-4 text-red-800 bg-red-100 border border-red-300 rounded-lg";
  p.textContent = "⚠️ " + message;

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
