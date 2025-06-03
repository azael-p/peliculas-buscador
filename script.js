const API_KEY = "be17ca03"; // Reemplazá con tu clave de OMDb
const BASE_URL = "https://www.omdbapi.com/";

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
        alert("Escribí algo para buscar.");
        return;
    }

    fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = ""; // Limpiar resultados anteriores

            if (data.Response === "True") {
                data.Search.forEach(movie => {
                    const movieDiv = document.createElement("div");
                    movieDiv.classList.add("movie");

                    movieDiv.innerHTML = `
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <p><strong>Sinopsis:</strong> ${details.Plot}</p>
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="Póster de ${movie.Title}" width="100%">
          `;

                    resultsContainer.appendChild(movieDiv);
                });
            } else {
                resultsContainer.innerHTML = `<p>No se encontraron resultados.</p>`;
            }
        })
        .catch(error => {
            console.error("Error al buscar:", error);
            resultsContainer.innerHTML = `<p>Hubo un error al buscar. Intenta de nuevo.</p>`;
        });
});