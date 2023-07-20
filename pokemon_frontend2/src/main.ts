import { writeFile } from "fs/promises";
import { buildPage } from "./createHTML.js";
import { buildIndividualPage } from "./createIndividualHTML.js";
import { getPokemon } from "./pokemons.js";

const PokemonObj = await getPokemon(100);
const PokemonHtml = buildPage(PokemonObj);
await writeFile("pokemon.html", PokemonHtml);

for (const monster of PokemonObj) {
	let miniPage = buildIndividualPage(monster);
	await writeFile(`${monster.name}.html`, miniPage);
}
