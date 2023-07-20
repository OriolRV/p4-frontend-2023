import { useState, useEffect } from "react";
import "./App.css";
import { Pokemon, getPokemon } from "./getPokemonData";

function App() {
	const [pokemonData, setPokemonData] = useState<Pokemon[] | null>(null);

	useEffect(() => {
		getPokemon(10).then((pokemonData) => setPokemonData(pokemonData));
	}, []);

	if (pokemonData === null) {
		return <div>Retrieving data</div>;
	}

	return (
		<>
			<div className="mainPage">
				{pokemonData.map((pokemon) => (
					<div className="bubble">
						<div>{pokemon.name}</div>
						<img src={pokemon.picture} alt={pokemon.name} />
						<div>{pokemon.id}</div>
					</div>
				))}
			</div>
		</>
	);
}

export default App;

/*import { writeFile } from "fs/promises";
import { buildPage } from "./createHTML.js";
import { buildIndividualPage } from "./createIndividualHTML.js";

const PokemonObj = await getPokemon(100);
const PokemonHtml = buildPage(PokemonObj);
await writeFile("pokemon.html", PokemonHtml);

for (const monster of PokemonObj) {
	let miniPage = buildIndividualPage(monster);
	await writeFile(`${monster.name}.html`, miniPage);
}



function App() {

  
} */
