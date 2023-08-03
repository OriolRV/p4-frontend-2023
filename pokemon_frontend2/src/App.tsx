import { useState, useEffect } from "react";
import "./App.css";
import { Pokemon, getPokemon } from "./getPokemonData";
import {
	Routes,
	Route,
	Link,
	Outlet,
	useNavigate,
	useParams,
} from "react-router-dom";
import { Radar } from "react-chartjs-2";
import { Chart, RadialLinearScale, PointElement, LineElement } from "chart.js";
Chart.register(RadialLinearScale, PointElement, LineElement);

function App() {
	const [pokemonData, setPokemonData] = useState<Pokemon[] | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		getPokemon(20).then((pokemonData) => {
			setPokemonData(pokemonData);
			navigate("/all");
		});
	}, []);

	if (pokemonData === null) {
		return (
			<Routes>
				<Route path="/" element={<Loading />} />
			</Routes>
		);
	}

	return (
		<>
			<div className="navigation">
				{Array.from({ length: 8 }, (_, index) => index + 1).map((num) => (
					<Link to={`/generation/${num}/`} key={num}>
						<div>Generation {num}</div>
					</Link>
				))}
			</div>

			<Routes>
				<Route path="/all/" element={<All data={pokemonData} />}></Route>
				<Route
					path="/all/:id"
					element={<IndividualPage data={pokemonData} />}
				></Route>
				<Route path="/generation/:id" element={<Generation />}></Route>
			</Routes>
		</>
	);
}

export default App;

function Generation() {
	const { id } = useParams();
	return <div>Generation {id} gen</div>;
}

function Loading() {
	return (
		<>
			<p>Retrieving data...</p>
			<img
				className="spinningPokeball"
				src="../public/assets/Poké_Ball_icon.svg.png"
				alt="spinning pokeball"
			></img>
		</>
	);
}

function All({ data }: { data: Pokemon[] }) {
	return (
		<>
			<div className="mainPage">
				{data.map((pokemon) => (
					<Link to={`/all/${pokemon.id}`} key={pokemon.id}>
						<div className="bubble">
							<div>{pokemon.name}</div>
							<img src={pokemon.picture} alt={pokemon.name} />
							<div>{pokemon.id}</div>
						</div>
					</Link>
				))}
			</div>
			<Outlet />
		</>
	);
}

function IndividualPage({ data }: { data: Pokemon[] }) {
	const id = Number(useParams().id);

	const pokemon = data.find((pokemon) => pokemon.id === id);

	if (!pokemon) {
		return <div>Pokemon not found</div>;
	}

	const plotData = {
		labels: ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"],
		datasets: [
			{
				label: "This pokemon's base stats",
				data: pokemon.stats,
				fill: true,
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgb(255, 99, 132)",
				pointBackgroundColor: "rgb(255, 99, 132)",
				pointBorderColor: "#fff",
			},
		],
	};

	const plotOptions = {
		scales: {
			r: {
				beginAtZero: true,
			},
		},
	};

	return (
		<>
			<div className="upperSection">
				<h1>{pokemon.name}</h1>
				<img src={pokemon.picture} alt={pokemon.name} />
				<div>ID: {pokemon.id}</div>
				{pokemon.types.map((type: string) => (
					<p style={{ background: typeColours[type] }}>{type}</p>
				))}
			</div>
			<div className="middleSection">
				<p>{pokemon.abilities}</p>
				<p>{pokemon.moves}</p>
			</div>
			<div className="bottomSection">
				<Radar data={plotData} options={plotOptions} />
			</div>
		</>
	);
}

type TypeColours = {
	[key: string]: string;
};

const typeColours: TypeColours = {
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
