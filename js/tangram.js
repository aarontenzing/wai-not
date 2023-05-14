var canvas = document.getElementById("myCanvas");
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

// Solutions
var AANTAL = 8;

let offset_x;
let offset_y;

let get_offset = function () {
  let canvas_offsets = canvas.getBoundingClientRect();
}

//Vormen
let shapes = [];
let current_shape_index = null;
let current_shape;
let drag = false;
let startX;
let startY;
let positionX;
let positionY;
let dx;
let dy;
let level_index


var zijde = 300 * scale_factor;
var z_vierkant = zijde / (2 * Math.sqrt(2))

shapes.push({ x: 700 * scale_factor, y: 750 * scale_factor, width: z_vierkant, height: z_vierkant, rotation: 0, color: 'red', type: 'square', solved: false });
shapes.push({ x: 1150 * scale_factor, y: 730 * scale_factor, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 0, color: 'yellow', type: 'parallel', solved: false });
shapes.push({ x: 300 * scale_factor, y: 450 * scale_factor, width: zijde / 2, height: zijde, rotation: 0, color: 'blue', type: 'big_triangle', solved: false });
shapes.push({ x: 1500 * scale_factor, y: 450 * scale_factor, width: zijde / 2, height: zijde, rotation: 0, color: 'orange', type: 'big_triangle', solved: false });
shapes.push({ x: 300 * scale_factor, y: 150 * scale_factor, width: zijde / 2, height: zijde / 2, rotation: 0, color: 'green', type: 'med_triangle', solved: false });
shapes.push({ x: 1500 * scale_factor, y: 200 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 0, color: 'purple', type: 'small_triangle', solved: false });
shapes.push({ x: 500 * scale_factor, y: 350 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 0, color: 'violet', type: 'small_triangle', solved: false });

//Solution
let easy = [];
let normal = [];
let hard = [];

for (let i = 0; i < AANTAL; i++) {
  easy.push([]);
  normal.push([]);
  hard.push([]);
}


//kleinere zijdes voor normal en easy
var solution_zijde = zijde - 5;
var z_solution_vierkant = solution_zijde / (2 * Math.sqrt(2))

//HARD DIFFICULTY

//schildpad
hard[0].push({ x: 748 * scale_factor, y: 263 * scale_factor, width: z_vierkant, height: z_vierkant, rotation: 45, type: 'square', solved: false, level: 'hard', name: "schildpad"});
hard[0].push({ x: 813 * scale_factor, y: 145 * scale_factor, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 45, type: 'parallel', solved: false, level: 'hard' });
hard[0].push({ x: 924 * scale_factor, y: 168 * scale_factor, width: zijde / 2, height: zijde, rotation: 180, type: 'big_triangle', orientation: 1, solved: false, level: 'hard' });
hard[0].push({ x: 1024 * scale_factor, y: 167 * scale_factor, width: zijde / 2, height: zijde, rotation: 0, type: 'big_triangle', orientation: 1, solved: false, level: 'hard' });
hard[0].push({ x: 975 * scale_factor, y: 117.5 * scale_factor, width: zijde / 2, height: zijde, rotation: 270, type: 'big_triangle', orientation: 2, solved: false, level: 'hard' });
hard[0].push({ x: 975 * scale_factor, y: 217 * scale_factor, width: zijde / 2, height: zijde, rotation: 90, type: 'big_triangle', orientation: 2, solved: false, level: 'hard' });
hard[0].push({ x: 1104 * scale_factor, y: 156 * scale_factor, width: zijde / 2, height: zijde / 2, rotation: 315, type: 'med_triangle', solved: false, level: 'hard' });
hard[0].push({ x: 1153 * scale_factor, y: 335 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 90, type: 'small_triangle', solved: false, level: 'hard' });
hard[0].push({ x: 895 * scale_factor, y: 388 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 180, type: 'small_triangle', solved: false, level: 'hard' });

//kat
hard[1].push({ x: 871 * scale_factor, y: 188 * scale_factor, width: z_vierkant, height: z_vierkant, rotation: 45, type: 'square', solved: false, level: 'hard', name: "kat"});
hard[1].push({ x: 1169 * scale_factor, y: 579 * scale_factor, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel', solved: false, level: 'hard' });
hard[1].push({ x: 975 * scale_factor, y: 433 * scale_factor, width: zijde / 2, height: zijde, rotation: 45, type: 'big_triangle', solved: false, level: 'hard' });
hard[1].push({ x: 945 * scale_factor, y: 293 * scale_factor, width: zijde / 2, height: zijde, rotation: 0, type: 'big_triangle', solved: false, level: 'hard' });
hard[1].push({ x: 811 * scale_factor, y: 350 * scale_factor, width: zijde / 2, height: zijde / 2, rotation: 225, type: 'med_triangle', solved: false, level: 'hard' });
hard[1].push({ x: 849 * scale_factor, y: 93 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 0, type: 'small_triangle', solved: false, level: 'hard' });
hard[1].push({ x: 949 * scale_factor, y: 92 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 180, type: 'small_triangle', solved: false, level: 'hard' });

//konijn
hard[2].push({ x: 989 * scale_factor, y: 286 * scale_factor, width: z_vierkant, height: z_vierkant, rotation: 45, type: 'square', solved: false, level: 'hard', name: 'konijn'});
hard[2].push({ x: 1041 * scale_factor, y: 189 * scale_factor, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 90, type: 'parallel', solved: false, level: 'hard' });
hard[2].push({ x: 839 * scale_factor, y: 480 * scale_factor, width: zijde / 2, height: zijde, rotation: 135, type: 'big_triangle', solved: false, level: 'hard' });
hard[2].push({ x: 868 * scale_factor, y: 338 * scale_factor, width: zijde / 2, height: zijde, rotation: 180, type: 'big_triangle', solved: false, level: 'hard' });
hard[2].push({ x: 917 * scale_factor, y: 389 * scale_factor, width: zijde / 2, height: zijde / 2, rotation: 180, type: 'med_triangle', solved: false, level: 'hard' });
hard[2].push({ x: 1158 * scale_factor, y: 229 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 45, type: 'small_triangle', solved: false, level: 'hard' });
hard[2].push({ x: 1056 * scale_factor, y: 449 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 315, type: 'small_triangle', solved: false, level: 'hard' });

//vis
hard[3].push({ x: 1503 * scale_factor, y: 515 * scale_factor, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 135, type: 'parallel', hardved: false, level: 'hard', name: 'vis' });
hard[3].push({ x: 1423 * scale_factor, y: 399 * scale_factor, width: zijde / 2, height: zijde / 2, rotation: 45, type: 'med_triangle', hardved: false, level: 'hard' });
hard[3].push({ x: 1513 * scale_factor, y: 269 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 180, type: 'small_triangle', hardved: false, level: 'hard' });
hard[3].push({ x: 1515 * scale_factor, y: 580 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 180, type: 'small_triangle', hardved: false, level: 'hard' });
hard[3].push({ x: 1367 * scale_factor, y: 416 * scale_factor, width: zijde / 2, height: zijde, rotation: 315, type: 'big_triangle', hardved: false, level: 'hard' });
hard[3].push({ x: 1615 * scale_factor, y: 446 * scale_factor, width: z_vierkant, height: z_vierkant, rotation: 45, type: 'square', hardved: false, level: 'hard', name: "kat"});
hard[3].push({ x: 1367 * scale_factor, y: 276 * scale_factor, width: zijde / 2, height: zijde, rotation: 45, type: 'big_triangle', hardved: false, level: 'hard' });

//haai
hard[4].push({ x: 1681 * scale_factor, y: 383 * scale_factor, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 135, type: 'parallel', hardved: false, level: 'hard', name: 'haai' });
hard[4].push({ x: 1442 * scale_factor, y: 343 * scale_factor, width: zijde / 2, height: zijde, rotation: 315, type: 'big_triangle', hardved: false, level: 'hard' });
hard[4].push({ x: 1302 * scale_factor, y: 372 * scale_factor, width: zijde / 2, height: zijde, rotation: 270, type: 'big_triangle', hardved: false, level: 'hard' });
hard[4].push({ x: 1542 * scale_factor, y: 313 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 45, type: 'small_triangle', hardved: false, level: 'hard' });
hard[4].push({ x: 1560 * scale_factor, y: 422 * scale_factor, width: z_vierkant, height: z_vierkant, rotation: 0, type: 'square', hardved: false, level: 'hard'});
hard[4].push({ x: 1720 * scale_factor, y: 270 * scale_factor, width: zijde / 2, height: zijde / 2, rotation: 180, type: 'med_triangle', hardved: false, level: 'hard' });
hard[4].push({ x: 1400 * scale_factor, y: 521 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 90, type: 'small_triangle', hardved: false, level: 'hard' });

//beer
hard[5].push({ x: 1415 * scale_factor, y: 260 * scale_factor, width: zijde / 2, height: zijde, rotation: 225, type: 'big_triangle', hardved: false, level: 'hard', name: 'beer'  });
hard[5].push({ x: 1457 * scale_factor, y: 388 * scale_factor, width: zijde / 2, height: zijde / 2, rotation: 90, type: 'med_triangle', hardved: false, level: 'hard' });
hard[5].push({ x: 1606 * scale_factor, y: 339 * scale_factor, width: z_vierkant, height: z_vierkant, rotation: 0, type: 'square', hardved: false, level: 'hard'});
hard[5].push({ x: 1722 * scale_factor, y: 335 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 135, type: 'small_triangle', hardved: false, level: 'hard' });
hard[5].push({ x: 1568 * scale_factor, y: 503 * scale_factor, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 45, type: 'parallel', hardved: false, level: 'hard'});
hard[5].push({ x: 1406 * scale_factor, y: 560 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 135, type: 'small_triangle', hardved: false, level: 'hard' });
hard[5].push({ x: 1296 * scale_factor, y: 339 * scale_factor, width: zijde / 2, height: zijde, rotation: 180, type: 'big_triangle', hardved: false, level: 'hard' });

//giraf
hard[6].push({ x: 1299 * scale_factor, y: 337 * scale_factor, width: zijde / 2, height: zijde, rotation: 180, type: 'big_triangle', hardved: false, level: 'hard', name: 'giraf'  });
hard[6].push({ x: 1398 * scale_factor, y: 338 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 0, type: 'small_triangle', hardved: false, level: 'hard' });
hard[6].push({ x: 1419 * scale_factor, y: 286 * scale_factor, width: z_vierkant, height: z_vierkant, rotation: 45, type: 'square', hardved: false, level: 'hard'});
hard[6].push({ x: 1448 * scale_factor, y: 336 * scale_factor, width: zijde / 2, height: zijde, rotation: 180, type: 'big_triangle', hardved: false, level: 'hard' });
hard[6].push({ x: 1473 * scale_factor, y: 191 * scale_factor, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 90, type: 'parallel', hardved: false, level: 'hard'});
hard[6].push({ x: 1498 * scale_factor, y: 42 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 180, type: 'small_triangle', hardved: false, level: 'hard' });
hard[6].push({ x: 1498 * scale_factor, y: 17 * scale_factor, width: zijde / 2, height: zijde / 2, rotation: 180, type: 'med_triangle', hardved: false, level: 'hard' });

//hond
hard[7].push({ x: 1587 * scale_factor, y: 344 * scale_factor, width: zijde / 2, height: zijde, rotation: 45, type: 'big_triangle', hardved: false, level: 'hard', name: 'hond'  });
hard[7].push({ x: 1443 * scale_factor, y: 348 * scale_factor, width: zijde / 2, height: zijde, rotation: 225, type: 'big_triangle', hardved: false, level: 'hard' });
hard[7].push({ x: 1447 * scale_factor, y: 563 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 180, type: 'small_triangle', hardved: false, level: 'hard' });
hard[7].push({ x: 1558 * scale_factor, y: 565 * scale_factor, width: zijde / 2, height: zijde / 2, rotation: 0, type: 'med_triangle', hardved: false, level: 'hard' });
hard[7].push({ x: 1273 * scale_factor, y: 441 * scale_factor, width: zijde / 2, height: z_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel', hardved: false, level: 'hard'});
hard[7].push({ x: 1616 * scale_factor, y: 264 * scale_factor, width: z_vierkant, height: z_vierkant, rotation: 45, type: 'square', hardved: false, level: 'hard'});
hard[7].push({ x: 1718 * scale_factor, y: 192 * scale_factor, width: zijde / 4, height: zijde / 2, rotation: 90, type: 'small_triangle', hardved: false, level: 'hard' });

//NORMAL DIFFICULTY

//vliegtuig
normal[0].push({ x: 823 * scale_factor, y: 427 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 0, type: 'square', solved: false, level: 'medium', name: 'vliegtuig' });
normal[0].push({ x: 1140 * scale_factor, y: 453 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel', solved: false, level: 'medium' });
normal[0].push({ x: 950 * scale_factor, y: 231 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 135, type: 'big_triangle', solved: false, level: 'medium' });
normal[0].push({ x: 950 * scale_factor, y: 372 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 225, type: 'big_triangle', solved: false, level: 'medium' });
normal[0].push({ x: 667 * scale_factor, y: 327 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 180, type: 'med_triangle', solved: false, level: 'medium' });
normal[0].push({ x: 1266 * scale_factor, y: 428 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 270, type: 'small_triangle', solved: false, level: 'medium' });
normal[0].push({ x: 762 * scale_factor, y: 388 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 315, type: 'small_triangle', solved: false, level: 'medium' });

//toren
normal[1].push({ x: 843 * scale_factor, y: 179.43 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 0, type: 'square', solved: false, level: 'medium', name: 'toren' });
normal[1].push({ x: 913 * scale_factor, y: 300 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 45, type: 'parallel', solved: false });
normal[1].push({ x: 822.86 * scale_factor, y: 380 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 135, type: 'big_triangle', solved: false });
normal[1].push({ x: 898 * scale_factor, y: 312 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 315, type: 'big_triangle', solved: false });
normal[1].push({ x: 744.97 * scale_factor, y: 305 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 315, type: 'med_triangle', solved: false });
normal[1].push({ x: 906 * scale_factor, y: 70 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 135, type: 'small_triangle', solved: false });
normal[1].push({ x: 836 * scale_factor, y: 70 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 45, type: 'small_triangle', solved: false });

//gans
normal[2].push({ x: 1079 * scale_factor, y: 342 * scale_factor, width:z_solution_vierkant, height: z_solution_vierkant, rotation: 45, type: 'square',  level: 'medium', name: 'gans' });
normal[2].push({ x: 1132 * scale_factor, y: 244 * scale_factor,width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 90, type: 'parallel',  level: 'medium' });
normal[2].push({ x: 1184 * scale_factor, y: 428 * scale_factor,width: solution_zijde / 2, height: solution_zijde, rotation: 135, type: 'big_triangle',  level: 'medium'});
normal[2].push({ x: 1264 * scale_factor, y: 338 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 90, type: 'big_triangle',  level: 'medium' });
normal[2].push({ x: 1028 * scale_factor, y: 494 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 225, type: 'med_triangle',  level: 'medium' });
normal[2].push({ x: 1072 * scale_factor, y: 165 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 45, type: 'small_triangle',  level: 'medium' });
normal[2].push({ x: 1056 * scale_factor, y: 395 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 0, type: 'small_triangle',  level: 'medium' });

//koe
normal[3].push({ x: 860 * scale_factor, y: 310 * scale_factor, width:z_solution_vierkant, height: z_solution_vierkant, rotation: 0, type: 'square',  level: 'medium', name: 'koe' });
normal[3].push({ x: 1283 * scale_factor, y: 457 * scale_factor,width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 90, type: 'parallel',  level: 'medium' });
normal[3].push({ x: 1183 * scale_factor, y: 382 * scale_factor,width: solution_zijde / 2, height: solution_zijde, rotation: 180, type: 'big_triangle',  level: 'medium'});
normal[3].push({ x: 966 * scale_factor, y: 366 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 0, type: 'big_triangle',  level: 'medium' });
normal[3].push({ x: 1033 * scale_factor, y: 410 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 135, type: 'med_triangle',  level: 'medium' });
normal[3].push({ x: 966 * scale_factor, y: 219 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 0, type: 'small_triangle',  level: 'medium' });
normal[3].push({ x: 809 * scale_factor, y: 219 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 180, type: 'small_triangle',  level: 'medium' });

//kangoeroe
normal[4].push({ x: 928 * scale_factor, y: 473 * scale_factor, width:z_solution_vierkant, height: z_solution_vierkant, rotation: 45, type: 'square',  level: 'medium', name: 'kangoeroe' });
normal[4].push({ x: 832 * scale_factor, y: 600 * scale_factor,width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel',  level: 'medium' });
normal[4].push({ x: 1071 * scale_factor, y: 231 * scale_factor,width: solution_zijde / 2, height: solution_zijde, rotation: 45, type: 'big_triangle',  level: 'medium'});
normal[4].push({ x: 1007 * scale_factor, y: 478 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 270, type: 'big_triangle',  level: 'medium' });
normal[4].push({ x: 983 * scale_factor, y: 450 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 0, type: 'med_triangle',  level: 'medium' });
normal[4].push({ x: 1199 * scale_factor, y: 133 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 135, type: 'small_triangle',  level: 'medium' });
normal[4].push({ x: 1191 * scale_factor, y: 371 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 0, type: 'small_triangle',  level: 'medium' });

//krab
normal[5].push({ x: 922 * scale_factor, y: 322 * scale_factor, width:z_solution_vierkant, height: z_solution_vierkant, rotation: 0, type: 'square',  level: 'medium', name: 'krab' });
normal[5].push({ x: 780 * scale_factor, y: 337 * scale_factor,width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 45, type: 'parallel',  level: 'medium' });
normal[5].push({ x: 838 * scale_factor, y: 349 * scale_factor,width: solution_zijde / 2, height: solution_zijde, rotation: 225, type: 'big_triangle',  level: 'medium'});
normal[5].push({ x: 1010 * scale_factor, y: 318 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 45, type: 'big_triangle',  level: 'medium' });
normal[5].push({ x: 1066 * scale_factor, y: 275 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 45, type: 'med_triangle',  level: 'medium' });
normal[5].push({ x: 1070 * scale_factor, y: 499 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 315, type: 'small_triangle',  level: 'medium' });
normal[5].push({ x: 757 * scale_factor, y: 212 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 45, type: 'small_triangle',  level: 'medium' });

//leeuw
normal[6].push({ x: 1121 * scale_factor, y: 325 * scale_factor, width:z_solution_vierkant, height: z_solution_vierkant, rotation: 45, type: 'square',  level: 'medium', name: 'leeuw' });
normal[6].push({ x: 589 * scale_factor, y: 382 * scale_factor,width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 45, type: 'parallel',  level: 'medium' });
normal[6].push({ x: 1050 * scale_factor, y: 156 * scale_factor,width: solution_zijde / 2, height: solution_zijde, rotation: 225, type: 'big_triangle',  level: 'medium'});
normal[6].push({ x: 753 * scale_factor, y: 303 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 225, type: 'big_triangle',  level: 'medium' });
normal[6].push({ x: 880 * scale_factor, y: 346 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 90, type: 'med_triangle',  level: 'medium' });
normal[6].push({ x: 1002 * scale_factor, y: 406 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 315, type: 'small_triangle',  level: 'medium' });
normal[6].push({ x: 782 * scale_factor, y: 495 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 270, type: 'small_triangle',  level: 'medium' });

//paard
normal[7].push({ x: 811 * scale_factor, y: 196 * scale_factor, width:z_solution_vierkant, height: z_solution_vierkant, rotation: 0, type: 'square',  level: 'medium', name: 'paard' });
normal[7].push({ x: 1135 * scale_factor, y: 503 * scale_factor,width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 45, type: 'parallel',  level: 'medium' });
normal[7].push({ x: 797 * scale_factor, y: 223 * scale_factor,width: solution_zijde / 2, height: solution_zijde, rotation: 315, type: 'big_triangle',  level: 'medium'});
normal[7].push({ x: 917 * scale_factor, y: 338 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 0, type: 'big_triangle',  level: 'medium' });
normal[7].push({ x: 711 * scale_factor, y: 111 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 315, type: 'med_triangle',  level: 'medium' });
normal[7].push({ x: 856 * scale_factor, y: 551 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 45, type: 'small_triangle',  level: 'medium' });
normal[7].push({ x: 680 * scale_factor, y: 277 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 270, type: 'small_triangle',  level: 'medium' });


//EASY DIFFICULTY

//huis      let op volgorde !!!
easy[0].push({ x: 972 * scale_factor, y: 179 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 0, type: 'square', solved: false, level: 'easy', name: 'huis' });
easy[0].push({ x: 1041 * scale_factor, y: 301 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 45, type: 'parallel', solved: false, level: 'easy' });
easy[0].push({ x: 876 * scale_factor, y: 192 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 270, type: 'big_triangle', solved: false, level: 'easy' });
easy[0].push({ x: 947 * scale_factor, y: 344 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 270, type: 'big_triangle', solved: false, level: 'easy' });
easy[0].push({ x: 798 * scale_factor, y: 392 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 270, type: 'med_triangle', solved: false, level: 'easy' });
easy[0].push({ x: 1047 * scale_factor, y: 343 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 90, type: 'small_triangle', solved: false, level: 'easy' });
easy[0].push({ x: 1097 * scale_factor, y: 393 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 180, type: 'small_triangle', solved: false, level: 'easy' });

//boot
easy[1].push({ x: 1591 * scale_factor, y: 632 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 0, type: 'square', solved: false, level: 'easy', name: 'boot' });
easy[1].push({ x: 1341 * scale_factor, y: 647 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 45, type: 'parallel', solved: false, level: 'easy' });
easy[1].push({ x: 1429 * scale_factor, y: 410 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 45, type: 'big_triangle', solved: false, level: 'easy' });
easy[1].push({ x: 1571 * scale_factor, y: 412 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 135, type: 'big_triangle', solved: false, level: 'easy' });
easy[1].push({ x: 1386 * scale_factor, y: 616 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 135, type: 'med_triangle', solved: false, level: 'easy' });
easy[1].push({ x: 1531 * scale_factor, y: 627 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 45, type: 'small_triangle', solved: false, level: 'easy' });
easy[1].push({ x: 1708 * scale_factor, y: 593 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 225, type: 'small_triangle', solved: false, level: 'easy' });

//eend
easy[2].push({ x: 1038 * scale_factor, y: 237 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 0, type: 'square', solved: false, level: 'easy', name: 'eend' });
easy[2].push({ x: 1108 * scale_factor, y: 358 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 45, type: 'parallel', solved: false, level: 'easy' });
easy[2].push({ x: 1050 * scale_factor, y: 356 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 270, type: 'big_triangle', solved: false, level: 'easy' });
easy[2].push({ x: 901 * scale_factor, y: 306 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 90, type: 'big_triangle', solved: false, level: 'easy' });
easy[2].push({ x: 746 * scale_factor, y: 469 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 315, type: 'med_triangle', solved: false, level: 'easy' });
easy[2].push({ x: 1154 * scale_factor, y: 233 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 135, type: 'small_triangle', solved: false, level: 'easy' });
easy[2].push({ x: 1189 * scale_factor, y: 409 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 315, type: 'small_triangle', solved: false, level: 'easy' });

//kameel
easy[3].push({ x: 915 * scale_factor, y: 255 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 45, type: 'square', solved: false, level: 'easy', name: 'kameel'});
easy[3].push({ x: 818 * scale_factor, y: 284 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 90, type: 'parallel', solved: false, level: 'easy'});
easy[3].push({ x: 894 * scale_factor, y: 311 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 0, type: 'big_triangle', solved: false, level: 'easy' });
easy[3].push({ x: 1060 * scale_factor, y: 306 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 315, type: 'big_triangle', solved: false, level: 'easy' });
easy[3].push({ x: 974 * scale_factor, y: 298 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 315, type: 'med_triangle', solved: false, level: 'easy' });
easy[3].push({ x: 843 * scale_factor, y: 135 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 180, type: 'small_triangle', solved: false, level: 'easy' });
easy[3].push({ x: 793 * scale_factor, y: 84 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 90, type: 'small_triangle', solved: false, level: 'easy' });

//helikopter
easy[4].push({ x: 1194 * scale_factor, y: 336 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 45, type: 'square', solved: false, level: 'easy', name: 'helikopter'});
easy[4].push({ x: 983 * scale_factor, y: 203 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel', solved: false, level: 'easy'});
easy[4].push({ x: 909 * scale_factor, y: 277 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 0, type: 'big_triangle', solved: false, level: 'easy' });
easy[4].push({ x: 808 * scale_factor, y: 277 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 180, type: 'big_triangle', solved: false, level: 'easy' });
easy[4].push({ x: 701 * scale_factor, y: 193 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 315, type: 'med_triangle', solved: false, level: 'easy' });
easy[4].push({ x: 1034 * scale_factor, y: 402 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 270, type: 'small_triangle', solved: false, level: 'easy' });
easy[4].push({ x: 1111 * scale_factor, y: 377 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 90, type: 'small_triangle', solved: false, level: 'easy' });

//hart
easy[5].push({ x: 1044 * scale_factor, y: 449 * scale_factor, width: z_solution_vierkant, height: z_solution_vierkant, rotation: 45, type: 'square', solved: false, level: 'easy', name: 'hart'});
easy[5].push({ x: 946 * scale_factor, y: 274 * scale_factor, width: solution_zijde / 2, height: z_solution_vierkant / Math.sqrt(2), rotation: 0, type: 'parallel', solved: false, level: 'easy'});
easy[5].push({ x: 971 * scale_factor, y: 251 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 90, type: 'big_triangle', solved: false, level: 'easy' });
easy[5].push({ x: 1122 * scale_factor, y: 150 * scale_factor, width: solution_zijde / 2, height: solution_zijde, rotation: 270, type: 'big_triangle', solved: false, level: 'easy' });
easy[5].push({ x: 1123 * scale_factor, y: 351 * scale_factor, width: solution_zijde / 2, height: solution_zijde / 2, rotation: 270, type: 'med_triangle', solved: false, level: 'easy' });
easy[5].push({ x: 1122 * scale_factor, y: 351 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 180, type: 'small_triangle', solved: false, level: 'easy' });
easy[5].push({ x: 997 * scale_factor, y: 172 * scale_factor, width: solution_zijde / 4, height: solution_zijde / 2, rotation: 270, type: 'small_triangle', solved: false, level: 'easy' });


//  Correctie positionering oplossing
for (let i = 0; i < 7; i++) {

  hard[3][i].x = hard[3][i].x - 300;
  hard[3][i].y = hard[3][i].y - 50;

  hard[4][i].x = hard[4][i].x - 300;

  hard[5][i].x = hard[5][i].x - 300;

  hard[6][i].x = hard[6][i].x - 300;
  hard[6][i].y = hard[6][i].y + 50;

  hard[7][i].x = hard[7][i].x - 350;
  hard[7][i].y = hard[7][i].y - 20;

  normal[2][i].x = normal[2][i].x - 150;

  easy[1][i].x = easy[1][i].x - 550;
  easy[1][i].y = easy[1][i].y - 150;
}


let solutions = [];

let sound1 = new Audio('solved.mp3');
let sound2 = new Audio('gewonnen.mp3');

//Tekenvorm

function draw_shapes() {
  console.log("in drawshapes")
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  for (let shape of solutions.concat(shapes)) {
    if (shape.color == null && shape.solved == true) {                 //de solutions niet opnieuw tekenen als ze al ingevuld zijn
      continue;
    }
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
    //console.log(solutions);
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
  positionX = parseInt(event.clientX);
  positionY = parseInt(event.clientY);
  //coordinates used when dragging
  startX = positionX;
  startY = positionY;
  set_drag(event);
}

let touch_down = function (event) {
  event.preventDefault();
  //first coordinates where you touch
  positionX = parseInt(event.touches[0].clientX);
  positionY = parseInt(event.touches[0].clientY);
  //coordinates used when dragging    
  startX = positionX;
  startY = positionY;
  set_drag(event);
}

function set_drag(event) {
  for (i = 6; i >= 0; i--) {
    let shape = shapes[i];
    console.log(shape);
    if (is_mouse_in_shape(startX, startY, shape) && !shape.solved) {
      current_shape = shape;
      console.log('yes');
      drag = true;
      return;
    }
  }
}

let mouse_touch_up = function (event) {
  if (!drag) {
    return;
  }
  event.preventDefault();
  drag = false;
  if (!(solutions[0].level == "easy")) {
    for (i = 6; i >= 0; i--) {
      let shape = shapes[i];
      if (is_mouse_in_shape(startX, startY, shape) && !shape.solved) {
        if (startX == positionX && startY == positionY) {
          rotate(shape);
          break;
        }
      }
    }
  }
  check_correct();
  draw_shapes();
}

function rotate(shape) {
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

}

function change_draworder() {
  let to_change = shapes.splice(shapes.indexOf(current_shape), 1);
  if (!to_change[0].solved) {
    shapes = shapes.concat(to_change);
  }
  else {
    shapes = to_change.concat(shapes);
  }
}

let mouse_out = function (event) {
  if (!drag) {
    return;
  }
  event.preventDefault();
  drag = false;
}

let touch_move = function (event) {
  console.log("ey o let o")
  if (!drag) {
    return;
  } else {
    event.preventDefault();
    let touchX = parseInt(event.touches[0].clientX);
    let touchY = parseInt(event.touches[0].clientY);
    dx = touchX - startX;
    dy = touchY - startY;

    move_shape(touchX, touchY);
  }
}

let mouse_move = function (event) {
  if (!drag) {
    return;
  } else {
    event.preventDefault();
    let mouseX = parseInt(event.clientX);
    let mouseY = parseInt(event.clientY);
    
    dx = mouseX - startX;
    dy = mouseY - startY;

    move_shape(mouseX, mouseY);
  }
}

function move_shape(posX, posY) {

  console.log(dx, dy);

  current_shape.x += dx;
  current_shape.y += dy;

  console.log(current_shape.x, current_shape.y);

  //clear it and redraw
  change_draworder();
  draw_shapes();
  coordinates(); // giving me the coordinates after moving shape

  startX = posX;
  startY = posY;
}

function check_correct() {
  for (let shape of shapes) {
    for (let solution of solutions) {
      console.log('komen we hier ooit?')
      if (!shape.solved && !solution.solved && shape.x <= solution.x + 25 * scale_factor && shape.x >= solution.x - 25 * scale_factor && shape.y <= solution.y + 25 * scale_factor && shape.y >= solution.y - 25 * scale_factor
        && shape.type == solution.type && shape.rotation == solution.rotation) {
        shape.x = solution.x;
        shape.y = solution.y;

        shape.solved = true;
        solution.solved = true;
        change_draworder();
        draw_shapes();
        if (solution.orientation) {
          solutions = solutions.filter(sol => sol.orientation == null || sol.type != solution.type || sol.orientation == solution.orientation);
        }

        check_finished();
        sound1.play();
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
  sound2.play();

  // Functie die confetti genereert
  const duration = 10 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
  update_score();
  let einde = document.getElementById("einde");
  document.getElementById("end_text").innerHTML = solutions[0].name;
  einde.style.visibility = "visible"
  return true;
}

//eventlisteners
canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_touch_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;
canvas.addEventListener("touchstart", touch_down);
canvas.addEventListener("touchmove", touch_move);
canvas.addEventListener("touchend", mouse_touch_up);

// Databank gedeelte

const PAGINAS = 1;
const PUZZELS = 8;

var user, id, pagina, index;

function pagina(click) {

  switch (click) {

    case "back":
      pagina--; if (pagina < 0) { pagina = PAGINAS; }
      break;

    case "next":
      pagina++; if (pagina > PAGINAS) { pagina = 0; }
      break;

  }
}

function update_score() {
  let difficulty;
  console.log(solutions[0])
  switch (solutions[0].level) {
    case "hard":
      difficulty = 2;
      break;
    case "medium":
      difficulty = 1;
      break;
    case "easy":
      difficulty = 0;
      break;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.wai-not.be/api/username');
  xhr.addEventListener("load", function () {
    if (JSON.parse(xhr.responseText).name != null) {
      console.log('signed in');
      let current_score;
      get_score(difficulty).then((score) => {
        current_score = score;
        console.log("success: " + current_score);
        console.log(current_score[level_index]);
        current_score = current_score.slice(0, level_index) + "1" + current_score.slice(level_index + 1);
        console.log(current_score);
        var xhr_post = new XMLHttpRequest();
        var params = "game=tangram&score=" + current_score + "&difficulty=" + difficulty;
        console.log(params)
        xhr_post.open("POST", "https://www.wai-not.be/api/save_score");
        xhr_post.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr_post.addEventListener("load", function () {
          console.log(xhr_post.responseText);
        });
        xhr_post.send(params);
      })
    }
    else {
      console.log('not signed in');
      return false;
    }
  });
  xhr.send();
}

function get_score(difficulty) {
  return new Promise((resolve) => {
    var xhr_save = new XMLHttpRequest();
    xhr_save.open('GET', 'https://www.wai-not.be/api/top_scores?game=tangram&difficulty=' + difficulty);
    xhr_save.addEventListener("load", function () {
      obj = JSON.parse(xhr_save.responseText).records;
      for (let user of Object.entries(obj)) {
        if (user[1].logged_in) {
          console.log("set");
          console.log(user[1].score);
          resolve(user[1].score);
        }
      }
      resolve("0".padEnd(8, '0'))
    });
    xhr_save.send();
  });
}

function chose_diff(diff) {   // oproepen als de pagina geladen wordt (je komt de eerste keer op de pagina)

  document.getElementById("start").style.visibility = "hidden";
  document.getElementById("tiles").style.visibility = "visible";
  document.getElementById("terug").style.visibility = "visible";
  let difficulty;
    switch (diff) {
      case "hard":
        solutions = hard;
        document.getElementById("hard_button").blur();
        difficulty = 2;
        break;
  
      case "normal":
        document.getElementById("normal_button").blur();
        solutions = normal;
        document.getElementById("puzzel0").innerHTML = '<img src="png/vliegtuig.png" >';
        document.getElementById("puzzel1").innerHTML = '<img src="png/toren.png" >';
        document.getElementById("puzzel2").innerHTML = '<img src="png/gans.png" >';  
        document.getElementById("puzzel3").innerHTML = '<img src="png/koe.png" >';  
        
        document.getElementById("puzzel4").innerHTML = '<img class="image" src="png/kangoeroe.png" >';
        document.getElementById("puzzel5").innerHTML = '<img class="image" src="png/krab.png" >';
        document.getElementById("puzzel6").innerHTML = '<img class="image" src="png/leeuw.png" >';
        document.getElementById("puzzel7").innerHTML = '<img class="image" src="png/paard.png" >';
        difficulty = 1;

        break;
  
      case "easy":
        document.getElementById("easy_button").blur();
        solutions = easy;
        difficulty = 0;
        break;
    }
    for(let i = 0; i<4; i++){
      console.log(solutions.length);
      document.getElementById("puzzel"+i).innerHTML ='<img class="image" src=png/'+solutions[i][0].name +'.png >'
    }
    get_score(difficulty).then((score)=>{
      for(let i = 0; i<score.length; i++){
        score = "0100101"
        if(score[i] ==1){
          document.getElementById("puzzel"+i).innerHTML ='<img class="image" src=png/'+solutions[i][0].name +'_solved.png >'
        }
      }
    });

  document.getElementById("link0").href = 'javascript:chose_level(0)';
  document.getElementById("link1").href = 'javascript:chose_level(1)';
  document.getElementById("link2").href = 'javascript:chose_level(2)';
  document.getElementById("link3").href = 'javascript:chose_level(3)';
  document.getElementById("link4").href = 'javascript:chose_level(4)';
  document.getElementById("link5").href = 'javascript:chose_level(5)';
  document.getElementById("link6").href = 'javascript:chose_level(6)';
  document.getElementById("link7").href = 'javascript:chose_level(7)';
}

function chose_level(index) {
  level_index = index;

    //document.getElementById("tiles").style.visibility = "hidden";
    document.getElementById("tiles").style.display = "none";
    document.getElementById("terug").style.visibility = "hidden";
    document.getElementById("tiles").blur();

  solutions = solutions[index];

  if (solutions.length == 0) {
    location.reload();
  }
  console.log(solutions)
  console.log(solutions[0].level)
  if (solutions[0].level == 'easy') {
    easy_rotate();
  }
  draw_shapes();

}

function coordinates() {
  for (let i of shapes) {
    console.log(i.type, i.x/scale_factor, i.y/scale_factor, i.rotation);
  }
}



