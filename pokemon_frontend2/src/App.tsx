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
				<Route path="/all/*" element={<All data={pokemonData} />}></Route>
				<Route path="/all/:id" element={<IndividualPage />}></Route>
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

function IndividualPage() {
	const { id } = useParams();
	return <div>{id}</div>;
}

/*export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<h1> Home </h1>} />
				<Route path="users/*" element={<Users />} />
			</Routes>
		</BrowserRouter>
	);
}

function Users() {
	return (
		<div>
			<nav>
				{" "}
				<Link to="me"> My Profile </Link>{" "}
			</nav>
			<nav>
				{" "}
				<Link to="/"> Home </Link>{" "}
			</nav>
			<Routes>
				<Route path="you" element={<h1> You </h1>} />
				<Route path="me" element={<h1> Me </h1>} />
			</Routes>
		</div>
	);
}*/

/*

		<Route path="/" element={<h1> Home </h1>} />
*/

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
