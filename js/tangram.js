var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Canvas waarden
canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 10;

var canvas_width = canvas.width;
var canvas_height = canvas.height;

let offset_x;
let offset_y;

let rotate = false;
let angle = 0;
let rot_shape = 0; //which shape to rotate

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

shapes.push({ x: 200, y: 50, width: z_vierkant, height: z_vierkant, rotation: 0, color: 'red', type: 'square', solved: 0 });
shapes.push({ x: 200, y: 200, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 0, color: 'yellow', type: 'parallel', solved: 0 });
shapes.push({ x: 500, y: 300, width: zijde / 2, height: zijde, rotation: 0, color: 'blue', type: 'big_triangle', solved: 0 });
shapes.push({ x: 200, y: 300, width: zijde / 2, height: zijde, rotation: 0, color: 'orange', type: 'big_triangle', solved: 0 });
shapes.push({ x: 500, y: 150, width: zijde / 2, height: zijde / 2, rotation: 0, color: 'green', type: 'med_triangle', solved: 0 });
shapes.push({ x: 800, y: 350, width: zijde / 4, height: zijde / 2, rotation: 0, color: 'purple', type: 'small_triangle', solved: 0 });
shapes.push({ x: 900, y: 350, width: zijde / 4, height: zijde / 2, rotation: 0, color: 'violet', type: 'small_triangle', solved: 0 });



//Solution
let solutions = [];
let current_solution_index = null;

solutions.push({ x: 200, y: 50, width: 100, height: 100, rotation: 0, color: 'grey', solved: 0 });

//Tekenvorm
function draw_shapes() {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  for (let shape of shapes) {
    ctx.fillStyle = shape.color;
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
  
        // ctx.beginPath();
        // ctx.moveTo(shape.x, shape.y);
        // ctx.lineTo(shape.x + shape.width, shape.y); 
        // ctx.lineTo(shape.x + shape.width, shape.y + shape.height);
        // ctx.lineTo(shape.x, shape.y);

        
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
draw_shapes();

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

  startX = parseInt(event.clientX - offset_x);
  startY = parseInt(event.clientY - offset_y);

  let index = 0;
  for (let shape of shapes) {
    if (is_mouse_in_shape(startX, startY, shape)) {
      if (event.button == 0) { // Checks if it is left mouse button

        console.log('yes');
        current_shape_index = index;
        console.log(current_shape_index);
        drag = true;
        return;
      } else {
        console.log('no');
      }

      if (event.button == 1) { // Checks if it is middle mouse button
        console.log('middle mouse click');
        current_shape_index = index;
        shape.rotation += 45;
        if (shape.rotation == 360) {
          shape.rotation = 0;
        }
        console.log(shape.rotation);
        draw_shapes();
      }
    }
    index++;
  }
}



let mouse_up = function (event) {
  if (!drag) {
    return;
  }
  event.preventDefault();
  check_correct()
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
    let mouseX = parseInt(event.clientX - offset_x);
    let mouseY = parseInt(event.clientY - offset_y);

    let dx = mouseX - startX;
    let dy = mouseY - startY;

    console.log(dx, dy);
    let current_shape = shapes[current_shape_index];

    current_shape.x += dx;
    current_shape.y += dy;

    //clear it and redraw
    draw_shapes();

    startX = mouseX;
    startY = mouseY;

  }
}

function check_correct() {
  for (let shape of shapes) {
    for (let solution of solutions) {
      if (!shape.solved && !solution.solved && shape.x == solution.x && shape.y == solution.y && shape.width == solution.width
        && shape.height == solution.height && shape.rotation == solution.rotation)
        shape.solved = true;
      solution.solved = true;
      check_finished()
      return;
    }
  }
}

function check_finished() {
  for (let shape of shapes) {
    if (!shape.solved) {
      return false;
    }
  }
  for (let solution of solutions) {
    if (!solution.solved) {
      return false;
    }
  }
  return true;

}

//eventlisteners
canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;
