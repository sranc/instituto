// js/cursos.js
export async function loadAndDisplayCourses() {
  const container = document.getElementById("cursos-container");
  if (!container) return;

  container.innerHTML = `
    <div class="col-span-3 text-center py-12" data-aos="fade-in">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mb-4"></div>
      <p class="text-gray-500 dark:text-gray-400 transition-colors duration-300">Cargando cursos...</p>
    </div>`;

  try {
    const response = await fetch("data/cursos.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const cursos = await response.json();
    if (!Array.isArray(cursos))
      throw new Error("Formato de datos inválido: se esperaba un array");

    const cursosActivos = cursos.filter(
      (curso) =>
        curso.activo === true &&
        curso.titulo &&
        curso.descripcion &&
        curso.duracion
    );

    if (cursosActivos.length === 0) {
      showNoCoursesMessage(container);
    } else {
      renderCourses(container, cursosActivos);
    }
  } catch (error) {
    console.error("Error al cargar cursos:", error);
    showErrorMessage(container, error);
  }
}

function showNoCoursesMessage(container) {
  container.innerHTML = `
    <div class="col-span-3 text-center py-12" data-aos="fade-in">
      <svg class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">No hay cursos disponibles</h3>
      <p class="mt-1 text-gray-500 dark:text-gray-400 transition-colors duration-300">Próximamente añadiremos nuevos cursos. ¡Vuelve a revisar más tarde!</p>
    </div>`;
}

function showErrorMessage(container, error) {
  container.innerHTML = `
    <div class="col-span-3 text-center py-12" data-aos="fade-in">
      <svg class="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">Error al cargar los cursos</h3>
      <p class="mt-1 text-gray-500 dark:text-gray-400 transition-colors duration-300">No pudimos cargar la información de los cursos. Por favor intenta nuevamente.</p>
      <button onclick="location.reload()" class="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-theme">
        Reintentar
      </button>
      ${
        process.env.NODE_ENV === "development"
          ? `<p class="mt-2 text-xs text-gray-500">Detalles: ${error.message}</p>`
          : ""
      }
    </div>`;
}

function renderCourses(container, cursos) {
  container.innerHTML = "";
  cursos.forEach((curso, index) => {
    const cursoElement = document.createElement("div");
    cursoElement.className =
      "bg-warm-light dark:bg-dark-card p-6 rounded-xl shadow-md hover-scale transition-colors duration-300";
    cursoElement.setAttribute("data-aos", "flip-up");
    cursoElement.setAttribute("data-aos-delay", `${index * 150}`);

    const imageUrl =
      curso.imagen ||
      "https://via.placeholder.com/400x300/F97316/FFFFFF?text=Orange+Training";
    const altText = curso.imagenAlt || curso.titulo;

    cursoElement.innerHTML = `
      <div class="bg-orange-500 bg-opacity-25 dark:bg-opacity-40 p-4 rounded-lg mb-4 overflow-hidden transition-colors duration-300">
        <img src="${imageUrl}" alt="${altText}" 
             class="rounded-lg w-full h-48 object-cover object-center">
      </div>
      <h3 class="text-xl font-bold mb-2 dark:text-white transition-colors duration-300">${
        curso.titulo
      }</h3>
      <p class="text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">${
        curso.descripcion
      }</p>
      <div class="flex justify-between items-center">
        <p class="text-sm text-orange-500 dark:text-orange-400 transition-colors duration-300">Duración: ${
          curso.duracion
        }</p>
        ${
          curso.precio
            ? `<span class="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs font-semibold px-2.5 py-0.5 rounded transition-colors duration-300">${curso.precio}</span>`
            : ""
        }
      </div>`;

    container.appendChild(cursoElement);
  });
}
