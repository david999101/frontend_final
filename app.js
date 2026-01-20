const grid = document.getElementById("pokemonGrid");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const header = document.getElementById("header");

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

const MAX_POKEMON = 1025;
const SHINY_RATE = 4096;

function getRandomIds(count) {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * MAX_POKEMON) + 1);
  }
  return [...ids];
}

async function loadPokemons() {
  const randomIds = getRandomIds(20);

  for (const id of randomIds) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();

    const types = pokemon.types.map((t) => t.type.name).join(", ");
    const isShiny = Math.floor(Math.random() * SHINY_RATE) === 0;
    const shinyName = isShiny ? "shiny" : "";

    const imageSrc = isShiny
      ? pokemon.sprites.front_shiny
      : pokemon.sprites.front_default;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${imageSrc}" alt="${pokemon.name}">
      <h3>${shinyName} ${pokemon.name}</h3>
      <p><strong>Type:</strong> ${types}</p>
      <button>More info</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      showMoreInfo(pokemon);
    });

    grid.appendChild(card);
  }
}

function showMoreInfo(pokemon) {
  modalBody.innerHTML = `
    <h3>${pokemon.name}</h3>

    <h4>Abilities</h4>
    <ul>
      ${pokemon.abilities.map((a) => `<li>${a.ability.name}</li>`).join("")}
    </ul>

    <h4>Base Stats</h4>
    <ul>
      ${pokemon.stats.map((s) => `<li>${s.stat.name}: ${s.base_stat}</li>`).join("")}
    </ul>
  `;

  modal.style.display = "block";
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

loadPokemons();
