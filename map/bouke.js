function generate_map() {
		const cells = Array.from(document.getElementsByTagName("img"));
		const desert = cells.filter(x => x.alt == "desert")
		//	const forest = cells.filter(x => x.alt == "forest")
		const forest = document.querySelectorAll('img[alt="forest"]')
		
		difficulty = 24;
		let state = []
		for (const cell of desert) {  
			if (Math.random() > 0.5) {	// use a more consistent difficulty algoritm	
				
				cell.alt = "forest";
				difficulty-= 1;
				state.push("forest")
			}
			else state.push("desert")
		}
		for (const cell of forest) {  
			if (Math.random() > 0.5) {	// use a more consistent difficulty algoritm	
				cell.src = "map/desert.png";
				cell.alt = "desert";
				difficulty-= 1;
			}
		}
		localStorage.setItem("state", JSON.stringify(state))
		return state
}

function set_map_state(state) {
	let cells = document.getElementsByTagName("img");
	for (const cell of cells) {
		var cell_state = state.shift()
		if (cell.alt == "city") {
			continue
			
		}
		else if (cell_state == "forest") {
			cell.src = "map/forest.png";
			cell.alt = "forest";
		}
		else if (cell_state == "desert") {
			cell.src = "map/desert.png"
			cell.alt = "desert";
		}
	}
}

function set_tile_state(x, y, state) {
	let cells = document.getElementsByTagName("img");
	let cell = cells[x + y * 7]
	cell.src = "map/"+state+".png";
	cell.alt = state;
}

function main() {	
	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has('t')) {
		const turn = parseInt( urlParams.get('t') )
		document.getElementById('turn').value = turn + 1
		document.getElementById('turn_text').textContent = 'turn: ' + turn	
		random_event_text()
		document.getElementById("difficulty").style.display = "none"
		set_map_state( JSON.parse(localStorage.getItem("state")) )
	}
	else {
		let	state = generate_map()
		let forestTiles = state.filter(x => x==1).length
		document.getElementById("difficulty").innerHTML +=Math.round(( (difficulty*100/24))) + "%";
	}
	//random_event()
	
	//createTable();	

}

window.addEventListener('load', main)

// event
event_text.setAttribute('style', 'white-space: pre;'); //this makes linebreak (/r/n ) possible.
var turn = 0;
function random_event(){
	view.src = Math.random() > 0.5 ? 'map/sponsor.svg' : "map/fire.svg" 
}



