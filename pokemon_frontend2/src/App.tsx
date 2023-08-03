import { useState, useEffect } from "react";
import "./App.css";
import { Pokemon, getPokemon } from "./functions";
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
import { generations, typeColours } from "./variablesAndTypes";
Chart.register(RadialLinearScale, PointElement, LineElement);

function App() {
	const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
	const [filteredPokemonData, setFilteredPokemonData] = useState<Pokemon[]>([]);
	const [selectedGeneration, setSelectedGeneration] = useState<number | null>(
		null
	);
	const navigate = useNavigate();

	useEffect(() => {
		getPokemon(20).then((pokemonData) => {
			setPokemonData(pokemonData);
			navigate("/all");
		});
	}, []);

	useEffect(() => {
		if (pokemonData !== null) {
			if (selectedGeneration !== null) {
				const [minId, maxId] = generations[selectedGeneration];
				const filteredData = pokemonData.filter(
					(pokemon) => pokemon.id >= minId && pokemon.id <= maxId
				);
				setFilteredPokemonData(filteredData);
			} else {
				setFilteredPokemonData(pokemonData);
			}
		}
	}, [pokemonData, selectedGeneration]);

	const handleGenerationClick = (generation: number | null) => {
		setSelectedGeneration(generation);
	};

	if (filteredPokemonData === null) {
		return (
			<Routes>
				<Route path="/" element={<Loading />} />
			</Routes>
		);
	}

	return (
		<>
			<div className="navigation">
				<Link to={`/all/`}>
					<button onClick={() => handleGenerationClick(null)}>
						All Generations
					</button>
				</Link>

				{Array.from({ length: 9 }, (_, index) => index + 1).map((num) => (
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
				<Route
					path="/generation/:id"
					element={<Generation filteredData={filteredPokemonData} />}
				></Route>
			</Routes>
		</>
	);
}

export default App;

function Generation({ filteredData }: { filteredData: Pokemon[] }) {
	const { id } = useParams<{ id: string }>();

	if (id === undefined) {
		return <div>Invalid generation ID</div>;
	} else {
		const generationRange = generations[id];
		const filteredGenerationData = filteredData.filter(
			(pokemon) =>
				pokemon.id >= generationRange[0] && pokemon.id <= generationRange[1]
		);

		return (
			<div>
				{filteredGenerationData.map((pokemon) => (
					<Link to={`/all/${pokemon.id}`} key={pokemon.id}>
						<div className="bubble">
							<div>{pokemon.name}</div>
							<img src={pokemon.picture} alt={pokemon.name} />
							<div>{pokemon.id}</div>
						</div>
					</Link>
				))}
			</div>
		);
	}
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
