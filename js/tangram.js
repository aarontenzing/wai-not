var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Canvas waarden
canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 25;

var canvas_width = canvas.width;
var canvas_height = canvas.height;

let offset_x;
let offset_y;

let get_offset = function () {
  let canvas_offsets = canvas.getBoundingClientRect();
  offset_x = canvas_offsets.left;
  offset_y = canvas_offsets.top;
}

get_offset();
window.onscroll = function () { get_offset(); }
window.onresize = function () { get_offset(); }
canvas.onresize = function () { get_offset(); }

//Vormen
let shapes = [];
let current_shape_index = null;
let drag = false;
let startX;
let startY;

var zijde = 300;
var z_vierkant = zijde / (2 * Math.sqrt(2))

shapes.push({ x: 200, y: 50, width: z_vierkant, height: z_vierkant, rotation: 0, color: 'red', type: 'square', solved: false });
shapes.push({ x: 200, y: 200, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 0, color: 'yellow', type: 'parallel', solved: false });
shapes.push({ x: 500, y: 300, width: zijde / 2, height: zijde, rotation: 0, color: 'blue', type: 'big_triangle', solved: false });
shapes.push({ x: 200, y: 300, width: zijde / 2, height: zijde, rotation: 0, color: 'orange', type: 'big_triangle', solved: false });
shapes.push({ x: 500, y: 150, width: zijde / 2, height: zijde / 2, rotation: 0, color: 'green', type: 'med_triangle', solved: false });
shapes.push({ x: 800, y: 350, width: zijde / 4, height: zijde / 2, rotation: 0, color: 'purple', type: 'small_triangle', solved: false });
shapes.push({ x: 900, y: 350, width: zijde / 4, height: zijde / 2, rotation: 0, color: 'violet', type: 'small_triangle', solved: false });

//Solution
let sol = [];

for (let i = 0; i < 4; i++) {
  sol.push([]);
}

sol[0].push({ x: 1246, y: 265, width: z_vierkant, height: z_vierkant, rotation: 45, type: 'square', solved: false, level: 'hard' });
sol[0].push({ x: 1313 , y: 145, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 45, type: 'parallel', solved: false});
sol[0].push({ x: 1423 , y: 168, width: zijde / 2, height: zijde, rotation: 180, type: 'big_triangle', solved: false});
sol[0].push({ x: 1523 , y: 167, width: zijde / 2, height: zijde, rotation: 0, type: 'big_triangle', solved: false});
sol[0].push({ x: 1604 , y: 156, width: zijde / 2, height: zijde / 2, rotation: 315, type: 'med_triangle', solved: false});
sol[0].push({ x: 1653 , y: 335, width: zijde / 4, height: zijde / 2, rotation: 90, type: 'small_triangle', solved: false});
sol[0].push({ x: 1395, y: 388, width: zijde / 4, height: zijde / 2, rotation: 180, type: 'small_triangle', solved: false});

sol[1].push({ x: 1471, y: 188, width: z_vierkant, height: z_vierkant, rotation: 45, type: 'square', solved: false, level: 'hard' });
sol[1].push({ x: 1768 , y: 579, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel', solved: false});
sol[1].push({ x: 1575 , y: 433, width: zijde / 2, height: zijde, rotation: 45, type: 'big_triangle', solved: false});
sol[1].push({ x: 1545 , y: 293, width: zijde / 2, height: zijde, rotation: 0, type: 'big_triangle', solved: false});
sol[1].push({ x: 1411 , y: 350, width: zijde / 2, height: zijde / 2, rotation: 225, type: 'med_triangle', solved: false});
sol[1].push({ x: 1449 , y: 93, width: zijde / 4, height: zijde / 2, rotation: 0, type: 'small_triangle', solved: false});
sol[1].push({ x: 1549, y: 92, width: zijde / 4, height: zijde / 2, rotation: 180, type: 'small_triangle', solved: false});

sol[2].push({ x: 1477, y: 131, width: z_vierkant, height: z_vierkant, rotation: 45, type: 'square', solved: false, level: 'easy' });
sol[2].push({ x: 1466 , y: 525, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel', solved: false, level: 'easy'});
sol[2].push({ x: 1347 , y: 264, width: zijde / 2, height: zijde, rotation: 45, type: 'big_triangle', solved: false, level: 'easy'});
sol[2].push({ x: 1590 , y: 270, width: zijde / 2, height: zijde, rotation: 135, type: 'big_triangle', solved: false, level: 'easy'});
sol[2].push({ x: 1411 , y: 628, width: zijde / 2, height: zijde / 2, rotation: 135, type: 'med_triangle', solved: false, level: 'easy'});
sol[2].push({ x: 1331 , y: 504, width: zijde / 4, height: zijde / 2, rotation: 45, type: 'small_triangle', solved: false, level: 'easy'});
sol[2].push({ x: 1630, y: 502, width: zijde / 4, height: zijde / 2, rotation: 135, type: 'small_triangle', solved: false, level: 'easy'});

sol[3].push({ x: 1423, y: 427, width: z_vierkant, height: z_vierkant, rotation: 0, type: 'square', solved: false, level: 'medium' });
sol[3].push({ x: 1740 , y: 453, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel', solved: false});
sol[3].push({ x: 1550 , y: 231, width: zijde / 2, height: zijde, rotation: 135, type: 'big_triangle', solved: false});
sol[3].push({ x: 1550 , y: 372, width: zijde / 2, height: zijde, rotation: 225, type: 'big_triangle', solved: false});
sol[3].push({ x: 1267 , y: 327, width: zijde / 2, height: zijde / 2, rotation: 180, type: 'med_triangle', solved: false});
sol[3].push({ x: 1866 , y: 428, width: zijde / 4, height: zijde / 2, rotation: 270, type: 'small_triangle', solved: false});
sol[3].push({ x: 1363, y: 388, width: zijde / 4, height: zijde / 2, rotation: 315, type: 'small_triangle', solved: false});

let solutions = [];

function get_level(diff) {
  do {
    console.log(sol.length);
    rand = Math.floor(Math.random()*sol.length);
  } while(sol[rand][0].level != diff);
  solutions = sol[rand];
  return;
}

const hardBtn = document.getElementById("hardBtn"); 
hardBtn.innerText = "HARD";
hardBtn.addEventListener("click", function() { console.log("hard pressed"); chose_level("hard");});

const mediumBtn = document.getElementById("mediumBtn"); 
mediumBtn.innerText = "MEDIUM";
mediumBtn.addEventListener("click", function() { chose_level("medium");});

const easyBtn = document.getElementById("easyBtn"); 
easyBtn.innerText = "EASY";
easyBtn.addEventListener("click", function() { chose_level("easy");});

const restart = document.getElementById("restart");
restart.style.display = "none";


function chose_level(difficulty) {
  switch (difficulty ) {

    case "hard":
      console.log("hey dit is het level");
      get_level('hard');
      draw_shapes();
      break;

    case "medium":
      get_level('medium');
      draw_shapes();
      break;

    case "easy":
      get_level('easy');
      draw_shapes();
      break;
  }
}

//Tekenvorm

function draw_shapes() {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  for (let shape of solutions.concat(shapes)) {
    if (shape.color == null) {
      ctx.fillStyle = "grey";
    } 
    else {
      ctx.fillStyle = shape.color;
    }
    ctx.save();
    if (shape.type == 'square') {
      ctx.translate(shape.x + shape.width / 2, shape.y + shape.height / 2);
      ctx.rotate(shape.rotation * Math.PI / 180);
      ctx.fillRect(shape.width / -2, shape.height / -2, shape.width, shape.height);
    }
    else {
      if (shape.type == 'big_triangle') {
        ctx.translate(shape.x + shape.width /3, shape.y+ (shape.height + shape.width) /3);
        ctx.rotate(shape.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(-shape.width /3, -(shape.height + shape.width) /3);
        ctx.lineTo(shape.width - shape.width /3, shape.width -(shape.height + shape.width) /3);
        ctx.lineTo(-shape.width /3, shape.height -(shape.height + shape.width) /3);
        ctx.lineTo(-shape.width /3, -(shape.height + shape.width) /3);
      }

      if (shape.type == 'med_triangle') {
        
        ctx.translate(shape.x + shape.width * 2/3, shape.y + shape.width /3);
        ctx.rotate(shape.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(-shape.width * 2/3, -shape.width /3);
        ctx.lineTo(shape.width - shape.width * 2/3, -shape.width /3);
        ctx.lineTo(shape.width -shape.width * 2/3, shape.height -shape.width /3);
        ctx.lineTo(-shape.width * 2/3, -shape.width /3 );
      }

      if (shape.type == 'small_triangle') {
        ctx.translate(shape.x + shape.width /3, shape.y+ (shape.height + shape.width) /3);
        ctx.rotate(shape.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(-shape.width /3, -(shape.height + shape.width) /3);
        ctx.lineTo(shape.width - shape.width /3, shape.width -(shape.height + shape.width) /3);
        ctx.lineTo(-shape.width /3, shape.height -(shape.height + shape.width) /3);
        ctx.lineTo(-shape.width /3, -(shape.height + shape.width) /3);
      }

      if (shape.type == 'parallel') {
        ctx.translate(shape.x + (shape.height + shape.width)/2-shape.height, shape.y + shape.height/2);
        ctx.rotate(shape.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(-((shape.height + shape.width)/2-shape.height), - shape.height/2);
        ctx.lineTo(-((shape.height + shape.width)/2-shape.height) - shape.height, - shape.height/2 + shape.height);
        ctx.lineTo(-((shape.height + shape.width)/2-shape.height) - shape.height + shape.width, - shape.height/2 + shape.height);
        ctx.lineTo(-((shape.height + shape.width)/2-shape.height) + shape.width, - shape.height/2);
        ctx.lineTo(-((shape.height + shape.width)/2-shape.height), - shape.height/2);
      }
      ctx.fill(); 
      ctx.closePath();
    }
    ctx.restore();
  }
}
<<<<<<< HEAD
ctx.scale(0.5,0.5);
draw_shapes();
=======

>>>>>>> 67aca12a2b5c52854cf106c3f375008c5b24a474

let is_mouse_in_shape = function (x, y, shape) {
  let shape_left = shape.x;
  let shape_right = shape.x + shape.width;
  let shape_top = shape.y;
  let shape_bottom = shape.y + shape.height;

  if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
    return true;
  }
  return false;
}

let mouse_down = function (event) {

  event.preventDefault();

  startX = parseInt(event.clientX - offset_x)*2;
  startY = parseInt(event.clientY - offset_y)*2;

  for (i = 6; i>=0; i--) {
    let shape = shapes[i];
    console.log(shape);
    if (is_mouse_in_shape(startX, startY, shape) && !shape.solved) {
      if (event.button == 0) { // Checks if it is left mouse button
        console.log('yes');
        current_shape_index = i;
        console.log(current_shape_index);
        drag = true;
        return;
      } else {
        console.log('no');
      }

      if (event.button == 1) { // Checks if it is middle mouse button
        console.log('middle mouse click');
        current_shape_index = i;
        shape.rotation += 45;
        if (shape.type == "square") {
          if (shape.rotation == 90) {
            shape.rotation = 0;
          }
        }
        if (shape.type == "parallel") {
          if (shape.rotation == 180) {
            shape.rotation = 0;
          }
        }
        if (shape.rotation == 360) {
          shape.rotation = 0;
        }
        console.log(shape.rotation);
        draw_shapes();
        check_correct();
        return;
      }
    }
  }
  
}


let mouse_up = function (event) {
  if (!drag) {
    return;
  }
  event.preventDefault(); 
  check_correct();
  console.log(shapes);
  let shape = shapes.splice(current_shape_index, 1);
  shapes = shapes.concat(shape);
  draw_shapes();
  drag = false;
}

let mouse_out = function (event) {
  if (!drag) {
    return;
  }
  event.preventDefault();
  drag = false;
}

let mouse_move = function (event) {
  if (!drag) {
    return;
  } else {
    event.preventDefault();
    let mouseX = parseInt(event.clientX - offset_x)*2;
    let mouseY = parseInt(event.clientY - offset_y)*2;

    let dx = mouseX - startX;
    let dy = mouseY - startY;

    console.log(dx, dy);
    let current_shape = shapes[current_shape_index];

    current_shape.x += dx;
    current_shape.y += dy;

    console.log(current_shape.x, current_shape.y);


    //clear it and redraw
    draw_shapes();

    startX = mouseX;
    startY = mouseY;

  }
}

function check_correct() {
  for (let shape of shapes) {
    for (let solution of solutions) {
      console.log('komen we hier ooit?')
      if (!shape.solved && !solution.solved && shape.x <= solution.x + 25 && shape.x >= solution.x -25 && shape.y <= solution.y + 25 && shape.y >= solution.y - 25
         && shape.type == solution.type && shape.rotation == solution.rotation) {
          shape.x = solution.x;
          shape.y = solution.y;
          draw_shapes();
          shape.solved = true;
          solution.solved = true;
          check_finished();
          return;
        }
    }
  }
}

function check_finished() {
  for (let shape of shapes.concat(solutions)) {
    if (!shape.solved) {
      console.log(shapes[0]);
      console.log(solutions[0]);
      return false;
    }
  }
  console.log('je hebt gewonnen, yeeeeeeeeeeeeeeeeeey');
  restart.style.display = "block";
  restart.addEventListener("click", function() {location.reload();})
  return true;

}

//eventlisteners
canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;
