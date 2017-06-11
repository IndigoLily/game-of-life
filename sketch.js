var grid = [];
const dim = 128;
const mult = 3;

function drawGrid() {
  for( let y = 0; y < dim; y++ ) {
    for( let x = 0; x < dim; x++ ) {
      if( grid[y][x] ) {
        rect( x*mult, y*mult, mult, mult );
      }
    }
  }
}

function isAlive( x, y ) {
  var nbrs = 0;
  var cell = grid[y][x];
  
  for( let i = -1; i <= 1; i++ ) {
    // skip if out of bounds
    if( y+i < 0 || y+i >= dim ) {
      continue;
    }
    
    for( let j = -1; j <= 1; j++ ) {
      // skip if out of bounds
      if( x+j < 0 || x+j >= dim ) {
        continue;
      }
      // skip if center
      if( i === 0 && j === 0 ) {
        continue;
      }
      
      if( grid[y+i][x+j] ) {
        nbrs++;
      }
    }
  }
  
  // TODO: simplify into single statement
  if( cell ) {
    if( nbrs < 2 ) {
      return false;
    } else if( nbrs <= 3 ) {
      return true;
    } else if( nbrs > 3 ) {
      return false;
    }
  } else {
    if( nbrs === 3 ) {
      return true;
    }
  }
}

function stepGrid() {
  var localGrid = [];
  
  for( let y = 0; y < dim; y++ ) {
    localGrid[y] = [];
    for( let x = 0; x < dim; x++ ) {
      localGrid[y][x] = isAlive( x, y );
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
      grid[y][x] = ( Math.random() > .9 );
    }
  }
  
  drawGrid();
  frameRate(20);
}

function draw() {
  background( 200 );
  grid = stepGrid();
  drawGrid();
}
