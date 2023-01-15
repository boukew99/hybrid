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
		growing_seed()
		document.getElementById('turn').value = turn + 1 //waarom zet je de +turn niet in een aparte functie?
		document.getElementById('turn_text').textContent = 'turn: ' + turn	
		random_event_text()
		document.getElementById("difficulty").style.display = "none"
		
	}
	else {
	//	let	state = generate_map()
		let forestTiles = state.filter(x => x==1).length
		document.getElementById("difficulty").innerHTML +=Math.round(( (difficulty*100/24))) + "%";
	//	set_map_state( JSON.parse(localStorage.getItem("state")) )
	}
	//random_event()
	
	//createTable();	

}

// window.addEventListener('load', main)

// event
event_text.setAttribute('style', 'white-space: pre;'); //this makes linebreak (/r/n ) possible.
var turn = 0;
function random_event(){
	view.src = Math.random() > 0.5 ? 'map/sponsor.svg' : "map/fire.svg" 
}

function plantTree(){
const row = document.createElement('div');
const randomColor = Math.floor(Math.random()*16777215).toString(16);
var rdm_color = "#" + randomColor;

  row.className = 'row';
	
  row.innerHTML = '<i style ='+rdm_color+' class="fa-solid fa-seedling"></i>';
  row.style.color = rdm_color;
  document.getElementById('seedcount').appendChild(row);
  }
  
function growing_seed(){
	 const rows = document.getElementsByClassName('row')
	 var test = 0;
	 for (const row of rows){
		test+=1;
		console.log(test+ "heeft seeds "+row.getElementsByClassName("fa-solid fa-seedling").length);
		if (row.getElementsByClassName("fa-solid fa-seedling").length==3){
		row.remove()
		console.log("destroyed "+test)}
		
		else
		{row.innerHTML += '<i class="fa-solid fa-seedling"></i>';
	console.log("added to "+test);}
		
	 }
}
var turn_count = 0;
function next_turn(){
	//document.getElementById('turn').value = turn + 1 //waarom zet je de +turn niet in een aparte functie?
	turn_count+=1;
	document.getElementById('turn_text').textContent = 'turn: ' + turn_count	;
	growing_seed();
	random_event_text();
}

