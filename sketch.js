var grid = [];
const dim = 100;
const mult = 8;

function drawGrid() {
  background( 127 );
  
  noStroke();
  fill( 255, 230, 0 );
  for( let y = 0; y < dim; y++ ) {
    for( let x = 0; x < dim; x++ ) {
      if( grid[y][x] ) {
        rect( x*mult, y*mult, mult, mult );
      }
    }
  }
  
  stroke( 130 );
  for( let x = 0; x < dim; x++ ) {
    line(x*mult,0,x*mult,dim*mult);
  }
  for( let y = 0; y < dim; y++ ) {
    line(0,y*mult,dim*mult,y*mult);
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
      // skip if out of bounds or center
      if( x+j < 0 || x+j >= dim || (i === 0 && j === 0) ) {
        continue;
      }
      
      if( grid[y+i][x+j] ) {
        nbrs++;
      }
    }
  }
  
  // Explicit form
  // if( cell ) {
  //   if( nbrs < 2 ) {
  //     return false;
  //   } else if( nbrs <= 3 ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // } else {
  //   if( nbrs === 3 ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  return ( cell ) ? ( nbrs >= 2 && nbrs <= 3 ) : ( nbrs === 3 );
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
  var canv = createCanvas( dim*mult, dim*mult );
  canv.mousePressed(function(){
    var x = Math.floor(mouseX/mult)
    var y = Math.floor(mouseY/mult)
    console.log(x+", "+y);
    grid[y][x] = !grid[y][x];
    drawGrid();
  });
  
  var speed = select('#speed');
  speed.changed(function(){
    if( speed.value() === 0 ) {
      noLoop();
    } else {
      loop();
    }
    frameRate( speed.value() );
  });
  
  var clear = select('#clear');
  clear.mouseClicked(function(){
    for( let y = 0; y < dim; y++ ) {
      for( let x = 0; x < dim; x++ ) {
        grid[y][x] = false;
      }
    }
    drawGrid();
  });
  
  var randButton = select('#random');
  randButton.mouseClicked(function(){
    for( let y = 0; y < dim; y++ ) {
      for( let x = 0; x < dim; x++ ) {
        grid[y][x] = ( Math.random() > .75 );
      }
    }
  });
  
  // Initialize grid
  for( let y = 0; y < dim; y++ ) {
    grid[y] = [];
    for( let x = 0; x < dim; x++ ) {
      grid[y][x] = ( Math.random() > .75 );
    }
  }
  
  drawGrid();
  frameRate(20);
}

function draw() {
  grid = stepGrid();
  drawGrid();
}

function mousePressed() {
}
