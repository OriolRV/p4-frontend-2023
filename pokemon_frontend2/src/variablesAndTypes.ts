export type TypeColours = {
	[key: string]: string;
};

export const typeColours: TypeColours = {
	Normal: "#A8A77A",
	Fire: "#EE8130",
	Water: "#6390F0",
	Electric: "#F7D02C",
	Grass: "#7AC74C",
	Ice: "#96D9D6",
	Fighting: "#C22E28",
	Poison: "#A33EA1",
	Ground: "#E2BF65",
	Flying: "#A98FF3",
	Psychic: "#F95587",
	Bug: "#A6B91A",
	Rock: "#B6A136",
	Ghost: "#735797",
	Dragon: "#6F35FC",
	Dark: "#705746",
	Steel: "#B7B7CE",
	Fairy: "#D685AD",
};

type Generations = {
	[key: string]: Array<number>;
};

export const generations: Generations = {
	"1": [1, 151],
	"2": [152, 251],
	"3": [252, 386],
	"4": [387, 493],
	"5": [494, 694],
	"6": [650, 721],
	"7": [722, 809],
	"8": [810, 905],
	"9": [906, 1010],
};

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

export const apiurl: string = "https://pokeapi.co/api/v2/pokemon/";
