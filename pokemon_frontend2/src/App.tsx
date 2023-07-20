import { useState, useEffect } from "react";
import "./App.css";
import { Pokemon, getPokemon } from "./getPokemonData";
import {
	Routes,
	Route,
	Outlet,
	Link,
	useNavigate,
	useParams,
} from "react-router-dom";

function App() {
	const [pokemonData, setPokemonData] = useState<Pokemon[] | null>(null);

	useEffect(() => {
		getPokemon(100).then((pokemonData) => setPokemonData(pokemonData));
	}, []);

	if (pokemonData === null) {
		return (
			<Routes>
				<Route path="/" element={<div>Retrieving data</div>} />
			</Routes>
		);
	}

	return (
		<>
			<header> MyHeader </header>
			<Routes>
				<Route
					path="/all/"
					element={
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
					}
				>
					<Route path=":id" element={<IndividualPage />}></Route>
				</Route>
			</Routes>
			<footer> MyFooter </footer>
		</>
	);
}

export default App;

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
