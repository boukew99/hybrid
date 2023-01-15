
const urlParamsHub = new URLSearchParams(window.location.search);

const numbOfPlayers = urlParamsHub.get('player-count');
mapSizeVert = numbOfPlayers*2+4;
mapSizeHor = numbOfPlayers*2+4;
numbOfTiles = mapSizeHor*mapSizeVert;

function changeTerrain(){
	//logica om zand->bos en andersom te simuleren
	//omliggende horizontale en verticale velden zijn: west cell[-4] noord cell[-1] oost cell[+4] zuid cell[+1]
	
const table = document.getElementById('gameMap')
console.log(table)
const arr = [...table.rows].map(r => [...r.querySelectorAll('td')].map(td => td.innerHTML)) 
console.log(arr)

//to array or not to array, setAttribute lijkt in beide gevallen niet te werken
const mapCells = Array.from(document.getElementsByClassName("imgMC")); //mapCell moet dan nog naar img.alt kunnen kijken - hoe van td element naar cell.getElementsByTagName("img")
console.log("dit is const array mapcells", mapCells)
for (var i = 0, cell; cell = mapCells[i]; i++) {
	if (i > mapSizeHor+1 && i < numbOfTiles-mapSizeHor-1){
console.log("dit is mapcell[i]", mapCells[i]['alt'])
console.log("dit is mapcell[i-1]", mapCells[i-1])
if(Math.random()>.2 && mapCells[i-1]['alt'] == 'desert' && mapCells[i+1]['alt'] == 'desert' ){
cell.src = 'map/desert.png'
}
//cell.setAttribute('drought', 1) //zo'n new attribute is blijkbaar niet accessible via console.log, want geeft hierna undefined terug. 
cell.drought = 1 //direct nieuwe waarde introduceren en setten gaat zonder problemen en komt ook goed terug in console.log
console.log("dit is cell buiten loop ",cell['drought'])
console.log(cell)
console.log(cell.drought)}

}
/*var table = document.getElementById("gameMap");
for (var i = 0, row; row = table.rows[i]; i++) {
   //iterate through rows
   //rows would be accessed using the "row" variable assigned in the for loop
   for (var j = 0, col; col = row.cells[j]; j++) {
   console.log(col.innerHTML);
  
     //iterate through columns
     //columns would be accessed using the "col" variable assigned in the for loop
   }  
}

	//for (var i = 0; i < cells.length; ++i){
	//console.log(cells[i+1]["alt"]);
	
	//}
	*/
	};

 

	function createTable() {
  const body = document.body,
        tbl = document.createElement('table');
		tbl.id = "gameMap"
  //tbl.style.width = '500px';
  //tbl.style.height = '500px';
  // tbl.style.padding = '5px'; //welke setting geeft deze white space om velden en welke waarde heb jij gebruikt?

  //tbl.style.border = '1px solid black';

//counter om cell nummerID te geven
var cell_id = 0;
var img = document.createElement('img');
    img.src = "map/desert.png";
	img.alt = "desert"
	img.setAttribute('drought', 1)
	
  for (let i = 0; i < mapSizeVert; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < mapSizeHor; j++) {
 
        const td = tr.insertCell();
		
		td.setAttribute('class', "mapCell" ) //counter cell_id=+1??
		td.drought = 0 //value of the borders (invisble tiles) will not change because they stay out of the i,j loop
		td.innerHTML="<img alt='border' class='imgMC'/>"
     //   td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
		//td.appendChild(img)
		if (0 < i  && i < mapSizeVert-1 && 0 < j && j < mapSizeHor-1) { // 0 < i < 5 is blijkbaar geen JS-syntax
		//if (i != 0 && i != 5 && j != 0 && j!= 7){
		td.drought = 1
		td.innerHTML="<img src='map/desert.png' alt='desert' class='imgMC'/>"
			if (Math.random() > 0.5) {		
				td.innerHTML="<img src='map/forest.png' alt='forest' class='imgMC'/>"
				td.drought = 0
								}
		 console.log("hiero "+ td.getElementsByTagName("img")) //td.['img'] td.img geeft undefined
		
		// td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
		mapDiv.append(tbl)
		} 
		
    
        }
      }

 // body.appendChild(tbl);
}

// event
event_text.setAttribute('style', 'white-space: pre;'); //this makes linebreak (/r/n ) possible.
var turn = 0;
function random_event(){
	view.src = Math.random() > 0.5 ? 'map/sponsor.svg' : "map/fire.svg" 
}


function random_event_text(){
var event_prob = Math.random();
if (event_prob>=.6 && event_prob<.85){//negative event vuur
	if (Math.random )
	var randomI = Math.floor(Math.random() * 4)+1; //+1 om 0 te voorkomen
	var randomJ = Math.floor(Math.random() * 7)+1;
	var location = "Verti"+randomI+" Hori"+randomJ;
		event_text.textContent = "A pyromaniac, anti-environmentalist or very clumsy person set fire at " +location+".\r\n Throw a dice for each surrounding tile, 5 or 6 means the fire is spread."; 
		let cells = document.getElementsByTagName("img");
		
	} else if(event_prob>=.85 && event_prob <.95){//positive event water supply
		event_text.textContent = "Non-profits and volunteers stand by you: pick one tile to be watered by a drone."
	} else if(event_prob>=.95){
	event_text.textContent = "Non-profits and volunteers stand by you: assign a forester to a tile that will protect it and the 4 surrounding tiles. "
	}
	
	else{ //if <.6, no event this turn
		event_text.textContent = "No events this turn. Stay tuned!"
		  }
//turn+=1;
//turn_text.textContent = "turn: "+turn;
}

window.addEventListener('load', createTable)