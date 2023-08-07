import { useState, useEffect } from "react";
import {
	Routes,
	Route,
	Link,
	Outlet,
	useNavigate,
	useParams,
} from "react-router-dom";
import { Radar } from "react-chartjs-2";
import {
	Chart,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
} from "chart.js";
import "./App.css";
import { Pokemon, getPokemon } from "./functions";
import { generations, typeColours } from "./variablesAndTypes";
Chart.register(RadialLinearScale, PointElement, LineElement, Filler);

function App() {
	const [pokemonData, setPokemonData] = useState<Pokemon[] | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		getPokemon().then((pokemonData) => {
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
				<Link to={`/all/`}>All Generations</Link>
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
					element={<Generation data={pokemonData} />}
				></Route>
			</Routes>
		</>
	);
}

export default App;

function Loading() {
	return (
		<>
			<h1>Retrieving data...</h1>
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
			<PokemonList data={data} />
			<Outlet />
		</>
	);
}

function Generation({ data }: { data: Pokemon[] }) {
	const { id } = useParams<{ id: string }>();

	if (id === undefined) {
		return <div>Invalid generation ID</div>;
	} else {
		const generationRange = generations[id];
		const filteredGenerationData = data.filter(
			(pokemon) =>
				pokemon.id >= generationRange[0] && pokemon.id <= generationRange[1]
		);

		return (
			<PokemonList
				data={filteredGenerationData}
				generationRange={generationRange}
			/>
		);
	}
}

function PokemonList({
	data,
	generationRange,
}: {
	data: Pokemon[];
	generationRange?: number[];
}) {
	return (
		<div className="mainPage">
			{data
				.filter(
					(pokemon) =>
						!generationRange ||
						(pokemon.id >= generationRange[0] &&
							pokemon.id <= generationRange[1])
				)
				.map((pokemon) => (
					<Link to={`/all/${pokemon.id}`} key={pokemon.id}>
						<div className="bubble">
							<div>{pokemon.name}</div>
							<img src={pokemon.picture} alt={pokemon.name} />
							<div>#{pokemon.id}</div>
						</div>
					</Link>
				))}
		</div>
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
				<div className="upperSectionLeft">
					<h1>
						#{pokemon.id} {pokemon.name}
					</h1>
					<div className="types">
						{pokemon.types.map((type: string, index: number) => (
							<p
								className="type"
								style={{ background: typeColours[type] }}
								key={index}
							>
								{type}
							</p>
						))}
					</div>
					<div className="abilities">
						{pokemon.abilities.map((ability: string, index: number) => (
							<p className="ability" key={index}>
								{ability.replace(/-/g, " ")}
							</p>
						))}
					</div>
				</div>
				<div className="upperSectionRight">
					<img src={pokemon.picture} alt={pokemon.name} />
				</div>
			</div>
			<div className="middleSection">
				<div className="moves">
					{pokemon.moves.map((move: string, index: number) => (
						<p className="move" key={index}>
							{move.replace(/-/g, " ")}
						</p>
					))}
				</div>
			</div>
			<div className="bottomSection">
				<Radar data={plotData} options={plotOptions} />
			</div>
		</>
	);
}
