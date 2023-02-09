var pokedex = {};

window.onload = async function () {
  for (let i = 1; i <= 151; i++) {
    await getPokemon(i);

    let pokemon = document.createElement("p");
    let cards = document.querySelector(".cards_pokemon");
    pokemon.id = i;
    pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon-name");

    //criar um car padrao
    let card = document.createElement("div");
    card.classList.add("col");

    //colocar cada card dentro da div cards
    cards.appendChild(card);

    const types = pokedex[i]["type"]
    .map(t => `<span class="pokemon-type background-${t}">${t}</span>`).join('')

    //preencher os dados de cada pokemon
    card.innerHTML = `
    <div class="pokemon ${pokedex[i]["type"][0]} shadow-sm" data-name="Bulbasaur" data-type="grass,poison" tabindex="1">
                        <figure class="pokemon-figure figure">
                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokedex[i]["id"]}.png"
                                alt="Bulbasaur">
                        </figure>
                        <section class="pokemon-description">
                            <span class="pokemon-id">#${pokedex[i]["id"]}</span>
                            <h1 class="pokemon-name">${pokedex[i]["name"]}</h1>
                            <div class="pokemon-types">${types}</div>
                        </section>
                        <section class="pokemon-stats">
                            <div class="stat-row">
                                <div>hp</div>
                                <div class="stat-bar">
                                    <div class="stat-bar-bg" style="width: ${100*pokedex[i]["hp"]/250}%">${pokedex[i]["hp"]}</div>
                                </div>
                            </div>
                            <div class="stat-row">
                                <div>attack</div>
                                <div class="stat-bar">
                                    <div class="stat-bar-bg" style="width: ${100*pokedex[i]["attack"]/250}%">${pokedex[i]["attack"]}</div>
                                </div>
                            </div>
                            <div class="stat-row">
                                <div>defense</div>
                                <div class="stat-bar">
                                    <div class="stat-bar-bg" style="width: ${100*pokedex[i]["defense"]/250}%">${pokedex[i]["defense"]}</div>
                                </div>
                            </div>
                            <div class="stat-row">
                                <div>sp-atk</div>
                                <div class="stat-bar">
                                    <div class="stat-bar-bg" style="width: ${100*pokedex[i]["spAtk"]/250}%">${pokedex[i]["spAtk"]}</div>
                                </div>
                            </div>
                            <div class="stat-row">
                                <div>sp-def</div>
                                <div class="stat-bar">
                                    <div class="stat-bar-bg" style="width: ${100*pokedex[i]["spDef"]/250}%">${pokedex[i]["spDef"]}</div>
                                </div>
                            </div>
                            <div class="stat-row">
                                <div>speed</div>
                                <div class="stat-bar">
                                    <div class="stat-bar-bg" style="width: ${100*pokedex[i]["speed"]/250}%">${pokedex[i]["speed"]}</div>
                                </div>
                            </div>
                        </section>
                    </div>
    `;
  }
};

async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

  let res = await fetch(url);
  let pokemon = await res.json();
  const type = pokemon.types.map((typeInfo) => typeInfo.type.name);
  let typePoke = type;
  let pokemonId = pokemon["id"].toString().padStart(3, "0");
  let pokemonName = pokemon["name"];
  let Type = pokemon.types.map((typeInfo) => typeInfo.type.name);
  let pokemonType = Type.join("|");
  let pokemonImg = pokemon["sprites"]["front_default"];
  let pokeStatsHp = pokemon["stats"][0]["base_stat"];
  let pokeStatsAt = pokemon["stats"][1]["base_stat"];
  let pokeStatsDef = pokemon["stats"][2]["base_stat"];
  let pokeStatsSpAt = pokemon["stats"][3]["base_stat"];
  let pokeStatsSpDef = pokemon["stats"][4]["base_stat"];
  let pokeStatsSpeed = pokemon["stats"][5]["base_stat"];
  
  res = await fetch(pokemon["species"]["url"]);
  let = pokemonDesc = await res.json();

  pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

  pokedex[num] = {
    id: pokemonId,
    name: pokemonName,
    img: pokemonImg,
    type: typePoke,
    types: pokemonType,
    desc: pokemonDesc,
    hp: pokeStatsHp,
    attack: pokeStatsAt,
    defense: pokeStatsDef,
    spAtk: pokeStatsSpAt,
    spDef: pokeStatsSpDef,
    speed: pokeStatsSpeed,
  };
}

//função de filtro de busca
function filterFunction() {
  // Declare variables
  var input, filter, ul, div, samp, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  col = ul.getElementsByClassName("col");

  for (i = 0; i < col.length; i++) {
    samp = col[i].getElementsByClassName("pokemon-name")[0];
    txtValue = samp.textContent || samp.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      col[i].style.display = "";
    } else {
      col[i].style.display = "none";
    }
  }
}
