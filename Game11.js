let ball_x, ball_y, ball_dx, ball_dy, ball_dia;
let pad_width, pad_height, pad_x, pad_y, pad_dx;
let score, lives, bricks_hit;
let bricks = [];
let temp;
let paused = true;


function setup() {
  createCanvas(400, 400);
  stroke("blue");

  score = 0;
  lives = 3;
  bricks_hit = 0;

  //ball init
  ball_dia = 24;
  ball_x = width / 2;
  ball_y = height - 27;
  ball_dx =2;
  ball_dy = -1;


  //paddle initß
  pad_width = 80;
  pad_height = 15;
  pad_x = width / 2 - (pad_width / 2);
  pad_y = height - 15;
  pad_dx = 3;

  //bricks init
  var dx = 70;
  var dy = 60;

  for (var row = 0; row < 3; row++) {
    let brick_row = [];
    for (var col = 0; col < 5; col++) {

      let brick = {};
      brick["x"] = 25 + dx * col;
      brick["y"] = 50 + dy * row;
      brick["w"] = 60;
      brick["h"] = 20;
      brick["status"] = 1;

      brick_row.push(brick);
    }
    bricks.push(brick_row);
  }


}

function draw() {

  background("black")
  ball_x += ball_dx;
  ball_y += ball_dy;
  fill("red")
  circle(ball_x, ball_y, ball_dia);
  fill("white");
  rect(pad_x, pad_y, pad_width, pad_height);
  fill("yellow");
  stroke("red");


  for (var i = 0; i < bricks.length; i++) {
    for (var j = 0; j < bricks[0].length; j++) {
      rect(bricks[i][j].x, bricks[i][j].y, bricks[i][j].w, bricks[i][j].h);
    }
  }

  //ball
  //right and right
  if (ball_x + (ball_dia) / 2 > width || ball_x - (ball_dia) / 2 < 0) {
    ball_dx = -(ball_dx);
  }
  //top side
  if (ball_y - (ball_dia) / 2 < 0) {
    ball_dy = -(ball_dy);
  }

  //pad
  if (keyIsDown(RIGHT_ARROW) && pad_x + pad_width < width) {
    pad_x += pad_dx;
  }
  if (keyIsDown(LEFT_ARROW) && pad_x > 0) {
    pad_x -= pad_dx;
  }

  
    //padd and ball
    if (ball_y + (ball_dia) / 2 >= height - pad_height) {
      if (ball_x >= pad_x && ball_x <= pad_x + pad_width) {
        ball_dy = -ball_dy;
      }
      else {
        ball_dy = 0;
        ball_dx = 0;
      }
    }

    fill("white")

    text("Lives: " + lives, 50, 20)
    text("Score: "+score,width-100,20)

    //brick
    //brick top
    var win = true;
    for (var i = 0; i < bricks.length; i++) {
      for (var j = 0; j < bricks[1].length; j++) {
        if (bricks[i][j].status == 1) {
          win = false;

           //brick left
           if (ball_y >= bricks[i][j].y && ball_y <= bricks[i][j].y + bricks[i][j].h && ball_x + ball_dia / 2 >= bricks[i][j].x && ball_x + ball_dia / 2 < bricks[i][j].x + bricks[i][j].w) {
             ball_dx = -ball_dx;
             score += 1;
             bricks[i][j].status = 0;
           }
           //brick right
          if (ball_y >= bricks[i][j].y && ball_y <= bricks[i][j].y + bricks[i][j].h && ball_x - ball_dia / 2 <= bricks[i][j].x + bricks[i][j].w && ball_x - ball_dia / 2 > bricks[i][j].x) {
            ball_dx = -ball_dx;
            score += 1;
            bricks[i][j].status = 0;
          }
          //Top
          if (ball_x >= bricks[i][j].x && ball_x <= bricks[i][j].x + bricks[i][j].w && ball_y + ball_dia / 2 == bricks[i][j].y) {
            ball_dy = -ball_dy;
            score += 1;
            bricks[i][j].status = 0;
          }
          //brick_bottom
          if (ball_x >= bricks[i][j].x && ball_x <= bricks[i][j].x + bricks[i][j].w && ball_y - ball_dia / 2 == bricks[i][j].y + bricks[i][j].h) {
            ball_dy = -ball_dy;
            score += 1;
            bricks[i][j].status = 0;
          }


        }

        //Remove brick if ball is touched
        if (bricks[i][j].status == 0) {
          bricks[i][j].w = 0;
          bricks[i][j].h = 0;
        }
      }
    }


    if (ball_dx == 0 && ball_dy == 0 && lives != 0) {
      lives = lives - 1;
      ball_x = width / 2;
      ball_y = height - 27;
      ball_dx = 3;
      ball_dy = -1;
      pad_x = width / 2 - (pad_width / 2);
      pad_y = height - 15;
    }

    if (lives == 0 && win == false) {
      background("black");
      stroke("yellow");
      text("Game Over! ", 150, 200);
      text("Your Score is: " + score, 145, 225);
      ball_dx = 0;
      ball_dy = 0;
    }

    if (win) {
      background("black");
      stroke("yellow");
      text("You Won! ", 170, 180);
      text("Your Score is: " + score, 165, 205);
      ball_dx = 0;
      ball_dy = 0;
    }

  }

