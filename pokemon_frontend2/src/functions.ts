import { Pokemon, apiurl } from "./variablesAndTypes";

//FUNCTION: transforms first letter of word to upper case.
export const capitalizeFirstLetter = (word: string) => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

//FUNCTION: retrieves, destructures, stores and sets types in an asyncronous way results from the API.
export const getPokemon = async () => {
	let pokemonData = [];
	for (let i = 1; i < 1011; i++) {
		let response = await fetch(`${apiurl}${i}`);
		let {
			name,
			id,
			sprites: {
				other: {
					"official-artwork": { front_default: picture },
				},
			},
			abilities,
			types,
			moves,
			stats,
		}: {
			name: string;
			id: number;
			sprites: any;
			other: any;
			abilities: any;
			types: any;
			moves: any;
			stats: any;
		} = await response.json();
		let abilityNames = abilities.map((x: any) =>
			capitalizeFirstLetter(x.ability.name)
		);
		let typeNames = types.map((x: any) => capitalizeFirstLetter(x.type.name));
		let movesNames = moves.map((x: any) => capitalizeFirstLetter(x.move.name));
		let statsNumbers = stats.map((x: any) => x.base_stat);
		pokemonData.push(
			new Pokemon(
				capitalizeFirstLetter(name),
				id,
				picture,
				typeNames,
				abilityNames,
				movesNames,
				statsNumbers
			)
		);
	}
	return pokemonData;
};

export { Pokemon };
