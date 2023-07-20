import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;

/*import { writeFile } from "fs/promises";
import { buildPage } from "./createHTML.js";
import { buildIndividualPage } from "./createIndividualHTML.js";
import { getPokemon } from "./pokemons.js";

const PokemonObj = await getPokemon(100);
const PokemonHtml = buildPage(PokemonObj);
await writeFile("pokemon.html", PokemonHtml);

for (const monster of PokemonObj) {
	let miniPage = buildIndividualPage(monster);
	await writeFile(`${monster.name}.html`, miniPage);
}
*/

/*import { useEffect, useState } from "react";
import "./App.css";

type User = {
  name: string;
  email: string;
  avatar: string;
};

const getUsers: () => Promise<User[]> = async () => {
  const response = await fetch(`https://randomuser.me/api/?results=50`);
  const { results } = await response.json();
  return results.map((u: any) => ({
    name: `${u.name.first} ${u.name.last}`,
    email: u.email,
    avatar: u.picture.thumbnail,
  }));
};

function App() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  if (users === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {users.map((user) => (
        <div>{user.name}</div>
      ))}
    </>
  );
}

export default App;*/
