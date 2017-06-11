var grid = [];
const dim = 32;
const mult = 10;

function drawGrid() {
  for( let y = 0; y < dim; y++ ) {
    for( let x = 0; x < dim; x++ ) {
      if( grid[y][x] === 1 ) {
        rect( x*mult, y*mult, mult, mult );
      }
    }
  }
}

function isAlive( cell ) {
  
}

function stepGrid() {
  var localGrid = [];
  
  for( let y = 0; y < dim; y++ ) {
    localGrid[y] = [];
    for( let x = 0; x < dim; x++ ) {
      localGrid[y][x] = isAlive( grid[y][x] );
    }
  }
  
  return localGrid;
}

function setup() {
  createCanvas( dim*mult, dim*mult );
  background( 200 );
  noStroke();
  fill( 255, 230, 0 );
  
  // Initialize grid
  for( let y = 0; y < dim; y++ ) {
    grid[y] = [];
    for( let x = 0; x < dim; x++ ) {
      grid[y][x] = ( Math.random() > .9 ) ? 1 : 0;
    }
    console.log(grid[y]);
  }
  
  drawGrid();
}

function draw() {
  // grid = stepGrid();
  // drawGrid();
}
