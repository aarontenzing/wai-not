var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Canvas waarden
canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 25;

var canvas_width = canvas.width;
var canvas_height = canvas.height;

//absolute waarden om mee te scalen
var abs_width = 2018;
var abs_height = 985;
//scale factor
var scale_factor = canvas_width / abs_width;

let offset_x;
let offset_y;

let get_offset = function () {
  let canvas_offsets = canvas.getBoundingClientRect();
  offset_x = canvas_offsets.left;
  offset_y = canvas_offsets.top;
}

console.log("black" == 0, 0, 0);
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
let clickedX;
let clickedY;

var zijde = 300 * scale_factor;
var z_vierkant = zijde / (2 * Math.sqrt(2))

shapes.push({ x: 200 * scale_factor, y: 50 * scale_factor, width: z_vierkant, height: z_vierkant, rotation: 0, color: 'red', type: 'square', solved: false });
shapes.push({ x: 200 * scale_factor, y: 200 * scale_factor, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 0, color: 'yellow', type: 'parallel', solved: false });
shapes.push({ x: 500 * scale_factor, y: 300 * scale_factor, width: zijde / 2, height: zijde, rotation: 0, color: 'blue', type: 'big_triangle', solved: false });
shapes.push({ x: 200 * scale_factor, y: 300 * scale_factor, width: zijde / 2, height: zijde, rotation: 0, color: 'orange', type: 'big_triangle', solved: false });
shapes.push({ x: 500 * scale_factor, y: 150 * scale_factor, width: zijde / 2, height: zijde / 2, rotation: 0, color: 'green', type: 'med_triangle', solved: false });
shapes.push({ x: 800 * scale_factor, y: 350 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 0, color: 'purple', type: 'small_triangle', solved: false });
shapes.push({ x: 900 * scale_factor, y: 350 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 0, color: 'violet', type: 'small_triangle', solved: false });

//Solution
let sol = [];

for (let i = 0; i < 4; i++) {
  sol.push([]);
}
var solution_zijde = zijde - 5;
var z_solution_vierkant = solution_zijde / (2 * Math.sqrt(2))

sol[0].push({ x: 1246 * scale_factor, y: 265 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 45, type: 'square', solved: false, level: 'hard' });
sol[0].push({ x: 1313 * scale_factor, y: 145 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 45, type: 'parallel', solved: false });
sol[0].push({ x: 1423 * scale_factor, y: 168 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 180, type: 'big_triangle', solved: false });
sol[0].push({ x: 1523 * scale_factor, y: 167 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 0, type: 'big_triangle', solved: false });
sol[0].push({ x: 1604 * scale_factor, y: 156 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 315, type: 'med_triangle', solved: false });
sol[0].push({ x: 1653 * scale_factor, y: 335 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 90, type: 'small_triangle', solved: false });
sol[0].push({ x: 1395 * scale_factor, y: 388 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 180, type: 'small_triangle', solved: false });

sol[1].push({ x: 1471 * scale_factor, y: 188 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 45, type: 'square', solved: false, level: 'hard' });
sol[1].push({ x: 1768 * scale_factor, y: 579 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel', solved: false });
sol[1].push({ x: 1575 * scale_factor, y: 433 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 45, type: 'big_triangle', solved: false });
sol[1].push({ x: 1545 * scale_factor, y: 293 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 0, type: 'big_triangle', solved: false });
sol[1].push({ x: 1411 * scale_factor, y: 350 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 225, type: 'med_triangle', solved: false });
sol[1].push({ x: 1449 * scale_factor, y: 93 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 0, type: 'small_triangle', solved: false });
sol[1].push({ x: 1549 * scale_factor, y: 92 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 180, type: 'small_triangle', solved: false });

sol[2].push({ x: 1477 * scale_factor, y: 131 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 45, type: 'square', solved: false, level: 'easy' });
sol[2].push({ x: 1466 * scale_factor, y: 525 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel', solved: false, level: 'easy' });
sol[2].push({ x: 1347 * scale_factor, y: 264 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 45, type: 'big_triangle', solved: false, level: 'easy' });
sol[2].push({ x: 1590 * scale_factor, y: 270 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 135, type: 'big_triangle', solved: false, level: 'easy' });
sol[2].push({ x: 1411 * scale_factor, y: 628 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 135, type: 'med_triangle', solved: false, level: 'easy' });
sol[2].push({ x: 1331 * scale_factor, y: 504 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 45, type: 'small_triangle', solved: false, level: 'easy' });
sol[2].push({ x: 1630 * scale_factor, y: 502 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 135, type: 'small_triangle', solved: false, level: 'easy' });

sol[3].push({ x: 1423 * scale_factor, y: 427 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 0, type: 'square', solved: false, level: 'medium' });
sol[3].push({ x: 1740 * scale_factor, y: 453 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel', solved: false });
sol[3].push({ x: 1550 * scale_factor, y: 231 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 135, type: 'big_triangle', solved: false });
sol[3].push({ x: 1550 * scale_factor, y: 372 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 225, type: 'big_triangle', solved: false });
sol[3].push({ x: 1267 * scale_factor, y: 327 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 180, type: 'med_triangle', solved: false });
sol[3].push({ x: 1866 * scale_factor, y: 428 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 270, type: 'small_triangle', solved: false });
sol[3].push({ x: 1362 * scale_factor, y: 388 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 315, type: 'small_triangle', solved: false });

let solutions = [];

function get_level(diff) {
  do {
    console.log(sol.length);
    rand = Math.floor(Math.random() * sol.length);
  } while (sol[rand][0].level != diff);
  solutions = sol[rand];
  return;
}

function hideButton() {
  console.log("ik ben hier");
  document.getElementById('hardBtn').style.visibility = 'hidden';
  document.getElementById('mediumBtn').style.visibility = 'hidden';
  document.getElementById('easyBtn').style.visibility = 'hidden';
}


const hardBtn = document.getElementById("hardBtn");
hardBtn.innerText = "moeilijk";
hardBtn.addEventListener("click", function () { console.log("hard pressed"); chose_level("hard"); hideButton();});

const mediumBtn = document.getElementById("mediumBtn");
mediumBtn.innerText = "normaal";
mediumBtn.addEventListener("click", function () { chose_level("medium"); hideButton();});

const easyBtn = document.getElementById("easyBtn");
easyBtn.innerText = "makkelijk";
easyBtn.addEventListener("click", function () { chose_level("easy");hideButton();});

ctx.font = "30px Arial";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText("Sleep de vormen naar de juiste plaats!", 1000 * scale_factor, 750 * scale_factor);

function chose_level(difficulty) {
  switch (difficulty) {

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
      easy_rotate();
      draw_shapes();
      break;
  }
}

//Tekenvorm

function draw_shapes() {
  console.log("in drawshapes")
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
      if (shape.type == 'big_triangle' || shape.type == 'small_triangle') {
        ctx.translate(shape.x + shape.width / 3, shape.y + (shape.height + shape.width) / 3);
        ctx.rotate(shape.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(-shape.width / 3, -(shape.height + shape.width) / 3);
        ctx.lineTo(shape.width - shape.width / 3, shape.width - (shape.height + shape.width) / 3);
        ctx.lineTo(-shape.width / 3, shape.height - (shape.height + shape.width) / 3);
        ctx.lineTo(-shape.width / 3, -(shape.height + shape.width) / 3);
      }

      if (shape.type == 'med_triangle') {

        ctx.translate(shape.x + shape.width * 2 / 3, shape.y + shape.width / 3);
        ctx.rotate(shape.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(-shape.width * 2 / 3, -shape.width / 3);
        ctx.lineTo(shape.width - shape.width * 2 / 3, -shape.width / 3);
        ctx.lineTo(shape.width - shape.width * 2 / 3, shape.height - shape.width / 3);
        ctx.lineTo(-shape.width * 2 / 3, -shape.width / 3);
      }

      if (shape.type == 'parallel') {
        ctx.translate(shape.x + (shape.height + shape.width) / 2 - shape.height, shape.y + shape.height / 2);
        ctx.rotate(shape.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(-((shape.height + shape.width) / 2 - shape.height), - shape.height / 2);
        ctx.lineTo(-((shape.height + shape.width) / 2 - shape.height) - shape.height, - shape.height / 2 + shape.height);
        ctx.lineTo(-((shape.height + shape.width) / 2 - shape.height) - shape.height + shape.width, - shape.height / 2 + shape.height);
        ctx.lineTo(-((shape.height + shape.width) / 2 - shape.height) + shape.width, - shape.height / 2);
        ctx.lineTo(-((shape.height + shape.width) / 2 - shape.height), - shape.height / 2);
      }
      ctx.fill();
      ctx.closePath();
    }
    ctx.restore();
  }
}

function easy_rotate() {
  for (i = 0; i < 7; i++) {
    shapes[i].rotation = solutions[i].rotation;
  }
}

let is_mouse_in_shape = function (x, y, shape) {
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  //check op zelfde kleur
  var kleuren = { "red": "rgb(255,0,0)", "blue": "rgb(255,0,0)", "yellow": "rgb(255,255,0)", "blue": "rgb(0,0,255)", "orange": "rgb(255,165,0)", "green": "rgb(0,128,0)", "purple": "rgb(128,0,128)", "violet": "rgb(238,130,238)" };
  if (kleuren[shape.color] == color) {
    return true;
  }
  return false;
}

let mouse_down = function (event) {

  event.preventDefault();
  //first coordinates where you click
  clickedX = parseInt(event.clientX - offset_x);
  clickedY = parseInt(event.clientY - offset_y);
  //coordinates used when dragging
  startX = clickedX;
  startY = clickedY;

  for (i = 6; i >= 0; i--) {
    let shape = shapes[i];
    console.log(shape);
    if (is_mouse_in_shape(startX, startY, shape) && !shape.solved) {
      current_shape_index = i;
      if (event.button == 0) { // Checks if it is left mouse button
        console.log('yes');
        console.log(current_shape_index);
        drag = true;
        console.log("-----------")
        console.log(clickedX);
        console.log(clickedY);
        console.log("===========")
        return;
      } else {
        console.log('no');
      }
      //rotate met middle mouse button
      // if (!(solutions[0].level == "easy")) {
      //   if (event.button == 1) { // Checks if it is middle mouse button
      // console.log('middle mouse click');
      // shape.rotation += 45;
      // if (shape.type == "square") {
      //   if (shape.rotation == 90) {
      //     shape.rotation = 0;
      //   }
      // }
      // if (shape.type == "parallel") {
      //   if (shape.rotation == 180) {
      //     shape.rotation = 0;
      //   }
      // }
      // if (shape.rotation == 360) {
      //   shape.rotation = 0;
      // }
      // console.log(shape.rotation);
      // draw_shapes();
      // check_correct();
      // return;
      //   }
      // }
    }
  }
}

let mouse_up = function (event) {
  if (!drag) {
    return;
  }
  event.preventDefault();
  draw_shapes();
  check_correct();
  console.log(shapes);
  let shape = shapes.splice(current_shape_index, 1);
  shapes = shapes.concat(shape);
  drag = false;
  if (!(solutions[0].level == "easy")) {
    for (i = 6; i >= 0; i--) {
      let shape = shapes[i];
      if (is_mouse_in_shape(startX, startY, shape) && !shape.solved) {
        if (startX == clickedX && startY == clickedY) {
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
    let mouseX = parseInt(event.clientX - offset_x);
    let mouseY = parseInt(event.clientY - offset_y);

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
      if (!shape.solved && !solution.solved && shape.x <= solution.x + 25 * scale_factor && shape.x >= solution.x - 25 * scale_factor && shape.y <= solution.y + 25 * scale_factor && shape.y >= solution.y - 25 * scale_factor
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
  ctx.beginPath();
  ctx.font = "30px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Je hebt gewonnen!", 1000, 750);
  console.log("we geraken hier");
  drawButton(700, 800, 200, 40,"OPNIEUW");
  canvas.addEventListener("click", function(event) {
    var x = event.clientX - offset_x;
    var y = event.clientY - offset_y;
    
    if (x > 700  && x < 700  + 200  && y > 800 && y < 800 + 40 ) {
      // Button was clicked
      location.reload();
    }
  });
  return true;
}

function drawButton(x, y, width, height, text) {

  // draw button
  ctx.fillStyle = "red";
  ctx.fillRect(x, y, width, height);

  // draw text
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(text, x + 100, y + 30);

}

//eventlisteners
canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;
