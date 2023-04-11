var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Canvas waarden
canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 10;

var canvas_width = canvas.width;
var canvas_height = canvas.height;

let offset_x;
let offset_y;

let get_offset = function(){
  let canvas_offsets = canvas.getBoundingClientRect();
  offset_x = canvas_offsets.left;
  offset_y = canvas_offsets.top;
}

get_offset();
window.onscroll = function(){get_offset();}
window.onresize = function(){get_offset();}
canvas.onresize = function(){get_offset();}

//Vormen
let shapes = [];
let current_shape_index = null;
let drag = false;
let startX;
let startY;

shapes.push({x : 200, y : 50, width: 100, height: 100 , color: 'red'});

//Tekenvorm
function draw_shapes(){
  ctx.clearRect(0,0,canvas_width,canvas_height);
  for(let shape of shapes){
    console.log(shape.x+shape.y);
    ctx.fillStyle = shape.color;
    ctx.fillRect(shape.x,shape.y,shape.width,shape.height);
  }
}
draw_shapes();

let is_mouse_in_shape = function(x,y,shape){
  let shape_left = shape.x;
  let shape_right = shape.x + shape.width;
  let shape_top = shape.y;
  let shape_bottom = shape.y + shape.height;

  if(x > shape_left && x < shape_right && y > shape_top && y < shape_bottom){
    return true;
  }
  return false;
}

let mouse_down = function(event){

  event.preventDefault();

  startX = parseInt(event.clientX - offset_x);
  startY = parseInt(event.clientY - offset_y);

  let index = 0 ;
  for(let shape of shapes){

    if(is_mouse_in_shape(startX,startY,shape)){
      console.log('yes');
      current_shape_index = index;
      console.log(current_shape_index);
      drag=true;
      return;
    }else{
      console.log('no');
    }
    index++;
  }
}

let mouse_up = function(event){
  if(!drag){
    return;
  }
  event.preventDefault();
  drag=false;
}

let mouse_out = function(event){
  if(!drag){
    return;
  }
  event.preventDefault();
  drag=false;
}

let mouse_move = function(event){
  if(!drag){
    return;
  }else{
    event.preventDefault();
    let mouseX = parseInt(event.clientX - offset_x);
    let mouseY = parseInt(event.clientY - offset_y);

    let dx = mouseX - startX;
    let dy = mouseY - startY;

    console.log(dx,dy);
    let current_shape = shapes[current_shape_index];
    
    current_shape.x += dx;
    current_shape.y += dy;
    
    //clear it and redraw
    draw_shapes();

    startX = mouseX;
    startY = mouseY;

  }
}

//eventlisteners
canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;



/*
var vierkant;
vierkant= new component(30, 30, "orange", 10, 120);
//De grootte van het tangramvierkant:
var zijde = 100;
var z_vierkant = zijde/(2*Math.sqrt(2))


draw();

//De verschillende vormen
function draw(){

    //Vierkant
    ctx.save();
    ctx.translate(zijde,50);
    ctx.rotate(45*Math.PI/180);
    ctx.fillStyle = "red";
    ctx.fillRect(0,0, z_vierkant, z_vierkant);
    ctx.restore();

    //Grote Driehoek 
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(zijde/2, zijde/2);
    ctx.lineTo(0, zijde);
    ctx.fill();

    //Kleine Driehoek 
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(zijde/2, zijde/2);
    ctx.lineTo(0, zijde/2);
    ctx.fill();
    

    //Parallellogram
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    var place = 100;
    //ctx.save();
    //ctx.translate(place,place);
    //ctx.rotate(180*Math.PI/180);
    ctx.moveTo(place, place);
    ctx.lineTo(place+zijde/2,place);
    ctx.lineTo(place+zijde/2+z_vierkant*Math.cos(45*Math.PI/180),place+z_vierkant*Math.sin(45*Math.PI/180));
    ctx.lineTo(place+z_vierkant*Math.cos(45*Math.PI/180),place+z_vierkant*Math.sin(45*Math.PI/180));  
    ctx.lineTo(place,place);
    ctx.fill();
    //ctx.restore();
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

*/