/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/
//FUNCTION: gets random number between two. The maximum is exclusive and the minimum is inclusive
const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};

//FUNCTION: transforms first letter of word to upper case.
const capitalizeFirstLetter = (word: string) => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

//API URL
const apiurl: string = "https://pokeapi.co/api/v2/pokemon/";

//CLASS: defines the Pokemon object.
export class Pokemon {
	constructor(
		public name: string,
		public id: number,
		public picture: string,
		public types: Array<string>,
		public abilities: Array<string>,
		public moves: Array<string>,
		public stats: Array<string>
	) {}
}

//FUNCTION: retrieves, destructures, stores and sets types in an asyncronous way results from the API.
export const getPokemon = async (n: number) => {
	let pokemonNames = [];
	for (let i = 0; i < n; i++) {
		let pokemonIndex: number = getRandomInt(1, 1010);
		let response = await fetch(`${apiurl}${pokemonIndex}`);
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
		pokemonNames.push(
			new Pokemon(
				capitalizeFirstLetter(name),
				id,
				picture,
				typeNames.join(" "),
				abilityNames.join(" "),
				movesNames,
				statsNumbers
			)
		);
	}
	return pokemonNames;
};
