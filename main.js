const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${
          pokemon.type
        }" onclick='showPokemonDetail(${JSON.stringify(pokemon)})'>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function showPokemonDetail(pokemon) {
  const detailSection = document.getElementById("pokemonDetail");
  detailSection.innerHTML = `
        <button class="back-button" onclick="hidePokemonDetail()">← Voltar</button>
        <div class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <h1 class="name">${pokemon.name}</h1>
            <img src="${pokemon.photo}" alt="${
    pokemon.name
  }" style="width: 120px; height: 120px;">
            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>
            </div>
            <div class="stats">
                <p><strong>Habilidades:</strong> ${
                  pokemon.abilities?.join(", ") || "N/A"
                }</p>
                <!-- Aqui você pode adicionar stats se quiser -->
            </div>
        </div>
    `;
  detailSection.classList.remove("hidden");
}

function hidePokemonDetail() {
  const detailSection = document.getElementById("pokemonDetail");
  detailSection.classList.add("hidden");
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
