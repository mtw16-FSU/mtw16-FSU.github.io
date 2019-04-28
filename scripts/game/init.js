//This file initializes all the global variables that will be used in the game

var width, height;
var canvas, ctx;
var background;
var isFullScreen = false;
var sceneHandler = new SceneHandler(new Scene("", new Map("")));
var menuImage;
var currentOption = 0, size;

var Villagers = new Array();
var Enemies = new Array();

// Helps Textbox Printing
printText = 0;

//loads the player in at the middle of the screen 
Player = new initPlayer({
       X: 1024,
       Y: 512,
       aFrame: 0
    });

function Tile(X, Y, collision){
  this.X = X,
  this.Y = Y,
  this.startX,
  this.startY,
  this.endX,
  this.endY,
  this.empty = false,
  this.solid = false,
  this.side = -1,
  this.collision = collision
}

var bounds = new Array();
var endTiles = new Array();

//detects if all images have been loaded in before starting the level
var isImage1Loaded = false;
var isImage2Loaded = false;
var isSpreadsheetLoaded = false;

var image1;
var image2;

var mainMenuOn = false;
var dx = 0, dy = 0;
var left = false, up = false, right = false, down = false;
var pLeft = false, pRight = false, pDown = false, pUp = false;
var isBlocked = false;
var sideOfScreen = -1;
var drawShop = false;

mapEntries = ["Level 1"];
