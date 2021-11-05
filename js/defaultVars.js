
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let frames = 0;
let points = 0;
let requestId;
let gravity = 0.1;
var keys = [];
var friction = 0.8;

