/*import { Pokemon } from "./pokemons.js";

const head = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <title>${title}</title>
</head>`;

//https://www.chartjs.org/docs/latest/charts/radar.html
export const buildIndividualPage = (Pokemon: Pokemon) => {
	let moveList = "";
	for (let i = 0; i < Pokemon.moves.length; i++) {
		moveList += `<li>${Pokemon.moves[i]}</li>`;
	}

	return `
    <html>
        ${head(Pokemon.name)}
        <body>
            <div class="centralSquare">
                <div class="pokemon">
                    <div class="leftSection">
                        <h1 class="name">${Pokemon.name}</h1>
                        <div class="id">${Pokemon.id}</div>
                    </div>
                    <div class="middleSection">
                        <div class="types">${Pokemon.types}</div>
                        <div class="abilties">${Pokemon.abilities}</div> 
                    </div>
                    <div class="rightSection">
                        <img src="${Pokemon.picture}" alt="${Pokemon.name}"/>
                    </div>
                </div>
                
                <div class="morePokemon">
                    <div class="moves">
                        <h2>Moves</h2>
                        <ul>${moveList}</ul>
                    </div>
                    <div class="stats">
                        <h2>Base stats<h2>
                        <canvas id="stats">
                    </div>
                    
                    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                    <script>
                    const ctx = document.getElementById('stats');
                    new Chart(ctx, {
                        type: "radar",
                        data: {
                            labels: ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"],
                            datasets: [{
                                label: "${Pokemon.name}'s base stats",
                                data: ${JSON.stringify(Pokemon.stats)},
                                fill: true,
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgb(255, 99, 132)",
                            pointBackgroundColor: "rgb(255, 99, 132)",
                            pointBorderColor: "#fff"
                            }]
                        },
                        options: {
                            scales: {
                                r: {
                                    beginAtZero: true
                                }
                            }
                        }
                    })
                    </script>
                </div>
            </div>
            <footer>
            <a href="./pokemon.html" target="_blank"><img src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"/></a>
            </footer>
        </body>
    </html>`;
};
*/
