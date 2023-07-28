import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<header>
			<img src="../public/assets/Pokédex_logo.png" alt="pokédex logo"></img>
		</header>
		<BrowserRouter>
			<App />
		</BrowserRouter>
		<footer>
			<img src="../public/assets/Pokédex_logo.png" alt="pokédex logo"></img>
		</footer>
	</React.StrictMode>
);
