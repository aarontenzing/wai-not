/*Oase Maken
 *Loic Dehan, Jef Plochaet en Mathijs Lens
 *Webtechnologie, Wai-not
 *19/05/2020
 */
//mapGeneratie variablen
const startLengteMakkelijk = 3;
const maxRowMakkelijk = 4;
const rowCountMakkelijk = 4;
const startLengteGemiddeld = 5;
const maxRowGemiddeld = 5;
const rowCountGemiddeld = 5;
const startLengteMoeilijk = 7;
const maxRowMoeilijk = 6;
const rowCountMoeilijk = 6;
const max = Math.max(maxRowMakkelijk,maxRowGemiddeld,maxRowMoeilijk)
//-------------------//
//images
var SG= new Image();
var LDG= new Image();
var LDW= new Image();
var SW= new Image();
var nulG= new Image();
var nulW= new Image();
var EINDW= new Image();
var EINDG= new Image();
var START= new Image();
//-------------------//
//Arrays
var water = [];
var pad = [];
var rotation = [];
var imgVal = [];
const richtingArr = [1,2,3,4];
//
const Makkelijk = 0;
const Gemiddeld = 1;
const Moeilijk = 2;
var levelGedaan = 0;
var AantalGedaan = 0;
var aantalLevels = 10;
var startLengte;
var lengte;
var rowCount;
var maxRow;
const startPos = 1;
const Startx = 0;//startpositie moet 0,0 zijn
const Starty = 0;
//-------------------//
//ToestandsVariabelen
var score = new Number();
var update = new Number();
var resized = new Number();
var moeilijkheidsgraad = new Number();
//-------------------//
//Canvas
var canvas;;
var context;
var size;	
var maxSize;
//resize canvas
var canvasOffset;
var offsetX;
var offsetY;

var rowHeight;
var colWidth;
//sounds
var digSound=new Audio();
digSound.play();
var waterSound=new Audio();
waterSound.play();
digSound.volume = 0.2;
waterSound.volume = 0.5;

var aantalrivier=1;//teller voor aantalriviertegels
var vaantalrivier=0;//vorig aantal riviertegels

init();
sizePopup();
//-------------------//
function sizePopup(){
	if(canvas.width<460){
		document.getElementById("popupStart").style.transform = "scale(0.4)";
		document.getElementById("tussenlevel").style.transform = "scale(0.4)";
	}
}
function popupMoeilijkheidsgraad(){
	document.getElementById("popupStart").style.visibility = "hidden";
}
function popupTussenlevel(){
	if(AantalGedaan >= aantalLevels){
		
		//dbdoe();
		if(document.getElementById("Eindlevel").style.visibility=="hidden"){
			document.getElementById("Eindlevel").style.visibility="visible";
		}
		else{//Op volgende geklikt, start volgende level
			document.getElementById("Eindlevel").style.visibility="hidden";
			update=1;
			startLevel();
		}
	}
	else{
		if(document.getElementById("tussenlevel").style.visibility=="hidden"){
			document.getElementById("tussenlevel").style.visibility="visible";
		}
		else{//Op volgende geklikt, start volgende level
			document.getElementById("tussenlevel").style.visibility="hidden";
			update=1;
			startLevel();
		}
	}
}
function init(){//opgeroepen in Oase.html
	canvas = document.getElementById("canvas");
	maxSize = canvas.width;
	context = canvas.getContext('2d');	

	resize();//pas de canvas aan aan de huidige window size//resizeHandler
	document.getElementsByTagName("body")[0].onresize = function() {
		resize();
	};
	SG.src ='media/SG.jpg';
	LDG.src = 'media/LDG.jpg';
	LDW.src ='media/LDW.jpg';
	SW.src = 'media/SW.jpg';
	nulG.src = 'media/nullG.jpg';
	nulW.src = 'media/nullW.jpg';
	EINDW.src = 'media/EINDW.jpg';
	EINDG.src = 'media/EINDG.jpg';
	START.src = 'media/START.jpg';
	digSound.src = 'audio/dig.mp3';
	waterSound.src = 'audio/water.mp3';
}
function KiesMoeilijkheid(m){
	resetArrays();
	score = 0;
	AantalGedaan = 0;
	vaantalrivier = 0;
	//Level aanpassen aan gegeven moeilijkheidsgraad m(0-1-2)
	popupMoeilijkheidsgraad();
	moeilijkheidsgraad = m;
	if (m==Makkelijk){
		startLengte = startLengteMakkelijk;
		rowCount = rowCountMakkelijk;
		maxRow = maxRowMakkelijk;
	}
	else if (m==Gemiddeld){
		startLengte = startLengteGemiddeld;
		rowCount = rowCountGemiddeld;
		maxRow = maxRowGemiddeld;
	}
	else if (m==Moeilijk){
		startLengte = startLengteMoeilijk;
		rowCount = rowCountMoeilijk;
		maxRow = maxRowMoeilijk;
	}
	lengte = startLengte;
	if(lengte>=rowCount*rowCount-rowCount){
		lengte=rowCount*rowCount-rowCount;
	}
	var minLengte = 3;
	if(lengte<minLengte){
		lengte = minLengte;
	}
	var minRow = 3;
	if(rowCount<minRow){
		maxRow = 3;
	}
	if(maxRow<rowCount){
		maxRow = rowCount;
	}
	resize();
	startLevel();
}

function resize(){
	//canvas grootte aanpassen aan window grootte
	if((window.innerHeight-0.1*window.innerHeight)<(window.innerWidth-0.1*window.innerWidth)){
		size = (window.innerHeight-canvas.offsetTop)-0.1*window.innerHeight
	}
	else{
		size = (window.innerWidth-canvas.offsetLeft)-0.1*window.innerWidth
	}
	if(size>maxSize){
		size = maxSize;
	}
	context.canvas.width  = size;
	context.canvas.height = size;
	//**************************//
	canvas.style.left = (window.innerWidth-size)/2+"px";//canvas centreren
	//canvas.style.top = (0.1*window.innerHeight)/2+"px";//canvas centreren
	canvas.style.position = "absolute";

	//Drawloop aanpassen
	rowHeight = canvas.height/rowCount;
	colWidth = canvas.width/rowCount;
	resized = 1;
}

function main(m) {
	fill2DimensionsArray();
	KiesMoeilijkheid(m);
	//MouseHandler
	window.addEventListener('mousedown',
		function(event){
			handleMouseDown(event);
		});
	loop(0);//start drawLoop
}

function loop(now) {
	if(!(update || resized)){//Als er niets is aangepast, moet de frame niet worden getekent
		window.requestAnimationFrame(loop);
		return;
	}
	if(!resized){//enkel bij een update geluid afspelen
		WaterStroom();
		if(vaantalrivier == 0){/*start van level geen geluid*/}
		else if (aantalrivier >vaantalrivier){
			waterSound.pause();
			waterSound.play();
		}
		else {
			digSound.pause();
			digSound.play();
		}
		vaantalrivier=aantalrivier;
	}
		
	//Update de water array op basis van de huidige tegels en rotatie
	//reset canvas
	context.clearRect(0, 0, context.width,context.height);
	context.beginPath();
	context.moveTo(0,0);
	//Teken de tegels
	for (var i = 0; i < rowCount; i++) {
		var letterRow = [];
		for (var j = 0; j < rowCount; j++) {
			context.save(); 
			context.translate( j * colWidth+colWidth/2, i * rowHeight+rowHeight/2);
			context.rotate(Math.PI / 180 * (rotation[i][j]*90));//rotation tabel bevat 0-3		
			//G(ras) tegel tekenen als er water door stroomt
			//W(oestijn) tegel voor tegels zonder water
			if(water[i][j] == 1){
				if(imgVal[i][j] == "S"){//Straight
					img = SG;
				}
				else if(imgVal[i][j] == "LD"){//Left-Down
					img = LDG;
				}
				else if(imgVal[i][j] == "null"){//Achtergrond tegel
					img = nulG;
				}
				else if(imgVal[i][j] == "START"){//Startpunt: rivierbron
					img = START;
				}
				else if(imgVal[i][j] == "EIND"){//Eindpunt: Meer
					img = EINDG;
				}
			}
			else{
				if(imgVal[i][j] == "S"){
					img = SW;
				}
				else if(imgVal[i][j] == "LD"){
					img = LDW;
				}
				else if(imgVal[i][j] == "null"){
					img = nulW;
				}
				else if(imgVal[i][j] == "START"){
					img = START;
				}
				else if(imgVal[i][j] == "EIND"){
					img = EINDW;
				}
				else{
					alert(imgVal + imgVal[i][j]);
					alert("drawRect else");
					img = nul;
				}
			}
			console.log(context);
			console.log(img);
			console.log(-colWidth/2);
			console.log(-rowHeight/2);
			console.log(colWidth);
			console.log(rowHeight);
	
			context.drawImage(img,-colWidth/2,-rowHeight/2, colWidth, rowHeight); //teken tegel ten opzichte van het middelpunt
			context.restore();				
			
			//Kader rond de tegels
			context.rect(i * colWidth, j * rowHeight, colWidth, rowHeight);
			context.stroke();
			}
		}
	//*************************************************************//
	update = 0;//wacht op volgende update
	resized = 0;
	window.requestAnimationFrame(loop);//Frame getekent, start voglende frame
 }
 
//Initialiseer de arrays
function fill2DimensionsArray(){
    for (var i = 0; i < max; i++) {
        imgVal.push([0]);
		pad.push([0]);
		rotation.push([0]);
		water.push([0]);
        for (var j = 0; j < max; j++) {
            imgVal[i][j] = "null";
			rotation[i][j] = 0;
			water[i][j] = 0;
			pad[i][j] = 0;
		}
    }
}
function startLevel(){
  levelGedaan = 0;
  resetArrays();
  pad[Startx][Starty] = startPos;
  path_backtracking(startPos+1,Startx,Starty);
  vulPadIn();
  WaterStroom();
}
function resetArrays(){
	for (var i = 0; i < rowCount; i++) {
        for (var j = 0; j < rowCount; j++) {
            imgVal[i][j] = "null";
			rotation[i][j] = 0;
			water[i][j] = 0;
			pad[i][j] = 0;
		}
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function geldig(x,y,pos){
	if(x<0 || x>=rowCount || y<0 || y>=rowCount){//check out of bounds
		return 0;
	}
	if ((pad[x] === "undefined")||(pad[y] === "undefined")){
		return 0;}
	else if(!(pad[x][y] == 0)){//check al ingevuld
		return 0;
	}
	if(pos == lengte){//zodat de eind en startpositie niet naast elkaar kunnnen staan
		if((x == Startx+1 && y==Starty)||(x==Startx&&y==Starty+1)||(x==Startx&&y==Starty-1)||(x == Startx-1 && y==Starty)){
			return 0;
		}
	}
	return 1;
}
function path_backtracking(pos,x,y){
	var mogelijkheden = shuffle(richtingArr);//initialiseer keuze
	var j;
	var nx
	var ny;
	var richting;
	var klaar;
	for (j = 0; j< mogelijkheden.length ; j++) {//genereer volgende kandidaat
		richting = mogelijkheden[j];
		if(richting == 1){
			nx = x;
			ny = y-1;
		}
		else if (richting == 2){
			nx = x+1;
			ny = y;
		}
		else if (richting == 3){
			nx = x;
			ny = y+1;
		}
		else if (richting == 4){
			nx = x-1;
			ny = y;
		}
		//indien aanvaardbaar
		if(geldig(nx,ny,pos)){	
			pad[nx][ny] = pos;//voeg kandidaat toe aan oplossing
		
			if(pos<lengte){//indien onvolledig				
				//probeer	
				if(path_backtracking(pos+1,nx,ny)){
					return 1;
				}
				pad[nx][ny] = 0;//verwijder kandidaat van oplossing
			}
			else{
				return 1;//er is een oplossing gevonden
			}	
		}	
	}
	return 0;
}

function setWater(){
	//Alles in de waterArray wordt op 1 gezet
	for (var i = 0; i < maxRow; i++) {
        for (var j = 0; j < maxRow; j++) {
			water[i][j] = 1;
        }
    }
}
function setWoestijn(){
	//Alles in de waterArray wordt op 0 gezet
	for (var i = 0; i < maxRow; i++) {
        for (var j = 0; j < maxRow; j++) {
			water[i][j] = 0;
        }
    }
}
function Einde(){
	/*Alle niet gebruikte rivierdelen worden als achtergrond tegel gezet
	 *Score wordt geteld op basis van het aantal gebruikte riviertegels
	 *Alles wordt gevuld met water/alles wordt oase
	 */
	levelGedaan = 1;
	AantalGedaan +=1;
	//Aanpassen progress bar
	var perc=AantalGedaan/aantalLevels * 100;
	var percstr=perc+"%";
	var progressbar=document.getElementById("myBar");
	progressbar.style.width=percstr; 
	progressbar.innerHTML=percstr;

	for (var i = 0; i < rowCount; i++) {
        for (var j = 0; j < rowCount; j++) {
			if(water[i][j] == 0){
				imgVal[i][j] = "null";
			}
			else{
				score+=1;
			}
        }
    }
	setWater();
	lengte = startLengte + (score-score%lengte)/lengte;
	if(lengte>=rowCount*rowCount-rowCount){
		lengte=rowCount*rowCount-rowCount;
		if(++rowCount>maxRow){
			rowCount = maxRow;
		}
		rowHeight = canvas.height/rowCount;
		colWidth = canvas.width/rowCount;
	}	
	document.getElementById("popupScore1").innerHTML = "Score: "+score;
	document.getElementById("popupScore2").innerHTML = "Score: "+score;
	//Hier nog score veranderen door de score uit de database
	if(moeilijkheidsgraad==0){
		document.getElementById("highScore1").innerHTML = "Hoogste score gemakkelijk: "+ score;
		document.getElementById("highScore2").innerHTML = "Hoogste score gemakkelijk: "+ score;
	}
	else if(moeilijkheidsgraad==1){
		document.getElementById("highScore1").innerHTML = "Hoogste score normaal: "+ score;
		document.getElementById("highScore2").innerHTML = "Hoogste score normaal: "+ score;
	}
	else if(moeilijkheidsgraad==2){
		document.getElementById("highScore1").innerHTML = "Hoogste score moeilijk: "+ score;
		document.getElementById("highScore2").innerHTML = "Hoogste score moeilijk: "+ score;
	}
	popupTussenlevel();//Menu wordt zichtbaar
}

function checkDefined(x,y){
	/*Controleer of de meegegeven x-y positie in de array ligt*/
	if(x<0||y<0||x>=rowCount||y>=rowCount)
	{
		return 0;
	}
	if (pad[x] === "undefined"){
		return 0;
	}
	else if (pad[y] === "undefined"){
		return 0;
	}
	else{
		return 1;
	}
}
function vulPadIn(){
	/*De pad array wordt gebruikt om de imgVal array in te vullen en de juiste rivertegels op het bord te plaatsen*/
	var volgende=startPos+1;//begin van het pad (pad[0][0]) is 1
	var vx=0;
	var vy=0;//De vorige positie: vx,vy
	var x=Startx;
	var y=Starty;//De huidige positie: x,y
	var nx,ny;//nieuwe x,y: de volgende positie 
	var richting = 0;//Richting van de huidige positie naar volgende: boven(1)/rechts(2)/onder(3)/links(4)
	var vrichting = 0;//Richting van de vorige plaats naar de huidige 
	while(1){//Invullen tot er geen aanliggende volgende stap meer is
		volgende = pad[x][y]+1;//lees waarde van de huidige positie in het pad => volgende is +1 (om een of andere reden is het een string => parseInt zet om naar intiger)
		//-----------------------------------//
		//bepaal de richting waarin de volgende plaats op het pad zich bevindt en de daarbj horende xy coord.
		if(checkDefined(x,y-1) && pad[x][y-1]== volgende){
			richting = 1;
			nx = x;ny = y-1
		}
		else if(checkDefined(x+1,y) && (pad[x+1][y] == volgende)){
			richting = 2;
			nx=x+1;ny = y;
		}
		else if(checkDefined(x,y+1) && pad[x][y+1] == volgende){
			richting = 3;
			nx = x;ny = y+1;
		}
		else if(checkDefined(x-1,y) && pad[x-1][y] == volgende){
			richting = 4;
			nx = x-1;ny = y;
		}
		else{//Geen volgende meer. Eindtegel bereikt
			richting = 0;
		}
		//-----------------------------------//
		if(x == Startx && y == Starty){//Startpositie
			tegel = "START";
			if(richting == 2){
				rotation[x][y] = 0;
			}
			else{
				rotation[x][y] = 3;
			}
		}
		else if(richting == 0){//Einde van het pad
			imgVal[x][y] = "EIND";
			break
		}
		else{
			if((richting+vrichting)%2){//Verschillende richting => Left-Down LD anders Straight S
				tegel = "LD";
			}
			else{
				tegel = "S";
			}	
		}
		imgVal[x][y] = tegel;
		//-----------------------------------//
		vrichting = richting;
		vx = x;
		vy =y;
		x = nx;
		y = ny;
	}
}

function WaterStroom(){
	/*Start met alles zonder water (setWoestijn)
	 *Bepaalt welke riviertegels verbonden zijn met de bron of een andere tegel met water
	 *Tegels verbonden met water krijgen zelf ook water
	 */
	setWoestijn();
	
	x = Startx;
	y = Starty;
	vx = x;
	vy = y;
	aantalrivier=0;
	while(1){
				
		if(x>=rowCount || y>=rowCount || x<0 ||y<0){//De vorige tegel leidt naar de rand. Het einde van de rivier is bereikt
			return;
		}
		huidig = imgVal[x][y];
		
		if(water[x][y]==1){//De huidige tegel heeft al water. Het einde van de rivier is bereikt
			return;
		}
		
		nx = x;
		ny = y;
		switch(huidig) {
		case "START":
			water[x][y] = 1;
			aantalrivier+=1;
			if(rotation[x][y] == 0){
				nx = x+1;
			}
			else if(rotation[x][y] == 1){
				ny = y-1;
			}
			else if(rotation[x][y] == 2){
				nx = x-1;
			}
			else if(rotation[x][y] == 3){
				ny = y+1;
			}
			break;
		case "EIND":
			if(rotation[x][y] == 0){
				if(vx == (x+1)){
					water[x][y] = 1;
					aantalrivier+=1;
					Einde();
				}
			}
			else if(rotation[x][y] == 1){
				if(vy == (y-1)){
					water[x][y] = 1;
					aantalrivier+=1;
					Einde();
				}
			}
			else if(rotation[x][y] == 2){
				if(vx == (x-1)){
					water[x][y] = 1;
					aantalrivier+=1;
					Einde();
				}
			}
			else if(rotation[x][y] == 3){
				if(vy == (y+1)){
					water[x][y] = 1;
					aantalrivier+=1;
					Einde();
				}
			}
			return;
		case "LD":
			if(rotation[x][y] == 0){
				if(vx == (x+1)){
					water[x][y] = 1;
					aantalrivier+=1;
					ny = y-1;
					break;	
				}
				else if(vy == (y-1)){
					water[x][y] = 1;
					aantalrivier+=1;
					nx = x+1;
					break;	
				}
			}
			else if(rotation[x][y] == 1){
				if(vx == (x-1)){
					water[x][y] = 1;
					aantalrivier+=1;
					ny = y-1;
					break;	
				}
				else if(vy == (y-1)){
					water[x][y] = 1;
					aantalrivier+=1;
					nx = x-1;
					break;	
				}
			}
			else if(rotation[x][y] == 2){
				if(vx == (x-1)){
					water[x][y] = 1;
					aantalrivier+=1;
					ny = y+1;
					break;	
				}
				else if(vy == (y+1)){
					water[x][y] = 1;
					aantalrivier+=1;
					nx = x-1;
					break;	
				}
			}
			else if(rotation[x][y] == 3){
				if(vx == (x+1)){
					water[x][y] = 1;
					aantalrivier+=1;
					ny = y+1;
					break;	
				}
				else if(vy == (y+1)){
					water[x][y] = 1;
					aantalrivier+=1;
					nx = x+1;
					break;	
				}
			}
			return;
		case "S"://			  0       0         1     0        2
			if(rotation[x][y] == 0 || rotation[x][y] == 2){//true
				if(vx == (x-1)){
					water[x][y] = 1;
					aantalrivier+=1;
					nx = x+1;
					break;	
				}
				else if(vx == (x+1)){
					water[x][y] = 1;
					aantalrivier+=1;
					nx = x-1;
					break;	
				}
			}
			else{
				if(vy == (y-1)){
					water[x][y] = 1;
					aantalrivier+=1;
					ny = y+1;
					break;	
				}
				else if(vy == (y+1)){
					water[x][y] = 1;
					aantalrivier+=1;
					ny = y-1;
					break;	
				}
			}
			return;
		default:
			return;
		}
		vx = x;
		vy = y;
		x = nx;
		y = ny;			
	}//einde while loop
}

function handleMouseDown(e) {
	/*Bij elke klik binnen de canvas:
	 *Bepaal op welke tegel er is geklikt
	 *Deze tegel wordt gedraait door de overeenkomstige rotation[x][y] te verhogen 
	 *		Achtergrondtegels kunnen niet worden gedraait
	 *Door een tegel te draaiien kunnen er verbindingen zijn gevormd of verbroken. 
	 *		Update = 1 zodat deze in de drawloop worden geÃ¼pdate
	 */
	if(levelGedaan){
		return;
	}
	e.preventDefault();//De defaultevent handler niet laten doen
    e.stopPropagation();//Geen verdere acties nodig op dit event
	//Bepaal positie
	var x = new Number();
	var y = new Number();
	var canvas = document.getElementById("canvas");

	if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
	}
	else{
    x = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
	}
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	//Bepaal geklikte tegel
	var c = Math.floor(x/colWidth);
	var	r = Math.floor(y/rowHeight);
	//Roteer de tegel
	if(imgVal[r][c] == "null"){//achtergrondtegels kunnen niet worden gedraait
		return;
	}
	rotation[r][c] += 1;
	if(rotation[r][c] == 4){//4*90Â° = 360Â° -> 0Â°
		rotation[r][c] =0;
	}
	//************//
	update = 1;
}

//code voor databank

		function dbdoe()//opgeroepen samen met nieuwe moeilijkheid kizen
		{
			userid=5;	//normaal met login kan je hier de user_id opvragen
			httpObject=getHTTPObject();
			if(httpObject!=null)
			{
				httpObject.open("Get", "php/databank.php?userid="+userid+"&score="+score+"&moeilijkheid="+moeilijkheidsgraad, true);
				httpObject.send(null);
				httpObject.onreadystatechange=output;
			}
		}
		
		function output()
		{			
			if (httpObject.readyState==4)
			{
				console.log(httpObject.responseText);
				document.getElementById("highScore2").innerHTML =httpObject.responseText;
			}
		}
		
		function getHTTPObject()
		{
			if(window.ActiveXObject)
				return new ActiveXObject("Microsoft.XMLHTTP");
			else if(window.XMLHttpRequest)
				return new XMLHttpRequest();
			else
			{
				alert("Your browser does not support AJAX.");
				return null;
			}
		}

		var httpObject = null;
