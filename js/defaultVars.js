const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var buffer = document.createElement("canvas").getContext("2d");
var gravity = 0.1;

let frames = 0;
let points = 0;
let requestId;
//et gravity = 0.1;
var keys = [];
var friction = 0.8;

/*const controller = new Controller()
const game = new Game()
const display = new Display(document.querySelector('canvas'))*/