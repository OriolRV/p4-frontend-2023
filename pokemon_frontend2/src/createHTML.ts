/*import { Pokemon } from "./pokemons.js";

const head = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <title>${title}</title>
</head>`;

const obj2html = (Pokemon: Array<Pokemon>) => {
	let pageCode = "";
	for (const monster of Pokemon) {
		pageCode += `<a href="./${monster.name}.html" target="_blank"><div class="pokemon">
                <div class="leftSection">
                    <h1 class="name">
                    ${monster.name}</h1>
                    <div class="id">${monster.id}</div>
                </div>
                <div class="middleSection">
                    <div class="types">${monster.types}</div>
                    <div class="abilties">${monster.abilities}</div> 
                </div>
                <div class="rightSection">
                    <img src="${monster.picture}" alt="${monster.name}"/>
                </div>
          </div></a>`;
	}
	return pageCode;
};

export const buildPage = (Pokemon: Array<Pokemon>) => {
	return `
    <html>
      ${head("Random Pokédex")}
      <body>
        <header>
        <h1>Random Pokedex</h1>
        </header>
        <div class=centralSquare>
            ${obj2html(Pokemon)}
        </div>
        <footer>
            <a href="./pokemon.html" target="_blank"><img src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"/></a>
        </footer>
      </body>
    </html>`;
};
*/
