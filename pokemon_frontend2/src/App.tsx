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
			<header> MyHeader </header>
			<Routes>
				<Route path="/all/" element={<All data={pokemonData} />}></Route>
				<Route
					path="/all/:id"
					element={<IndividualPage data={pokemonData} />}
				></Route>
			</Routes>
			<footer> MyFooter </footer>
		</>
	);
}

export default App;

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

	return (
		<>
			<div>
				<h1>{pokemon.name}</h1>
				<img src={pokemon.picture} alt={pokemon.name} />
				<div>ID: {pokemon.id}</div>
			</div>
		</>
	);
}
