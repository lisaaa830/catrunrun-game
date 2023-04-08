/*

The Game Project part 6 - adding game mechanics
*/
/*new me*/

var gameChar_x;
var gameChar_y;

var floorPos_y;

var treePos_y;
var trees_x;

var canyons;
var collectables;
var mountains;
var clouds;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var cameraPosX;
var game_score;
var flagpole;
var lives;

var platforms;
var enemies;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    game_score = 0;
    lives = 3;
    startGame();
}

function draw()
{

    cameraPosX = gameChar_x - width/2;
    
	///////////DRAWING CODE//////////

	background(212,242,242); //fill the sky blue


	noStroke();
	fill(196,224,192);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    //start translate
    push();
    translate(-cameraPosX, 0);
       
    drawClouds();
    drawMountains();
    drawTrees();
    
    for(var i = 0;i < platforms.length; i++)
        {
            platforms[i].draw();
        }
    
    //draw some collectables and canyons
    for(var i = 0; i < collectables.length; i++)
    {
        if(!collectables[i].isFound)
        {
            drawCollectable(collectables[i]);  
            checkCollectable(collectables[i]);
        } 
    }
    
    for(var j = 0; j < canyons.length; j++)
    {
            drawCanyon(canyons[j]);  
            checkCanyon(canyons[j]);
    }
    
    
    renderFlagpole();
    
	//the game character
	drawGameChar();
    
    for(var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw();
            
            var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
            if(isContact)
                {
                    if(lives > 0)
                    {
                        startGame();
                        lives -= 1;
                        break;
                    }
                }
        }
    
    pop();
    
    
    fill(95, 111, 111);
    noStroke();
    text("SCORE: " + game_score, 20, 20);
    
    fill(95, 111, 111);
    text("LIVES: " + lives, 90, 20);
    
    
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    if(isLeft)
    {
        gameChar_x -= 5;
    }
    
    if(isRight)
    {
        gameChar_x += 5;
    }
    
    //add gravity
    if(gameChar_y < floorPos_y)
    {
        var isContact = false;
        for(var i = 0; i < platforms.length; i++)
            {
                if(platforms[i].checkContact(gameChar_x, gameChar_y) == true)
                    {
                        isContact = true;
                        break;
                    }
            }
        if(!isContact)
            {
                gameChar_y += 5;
                isFalling = true;
            }
    }
    else
    {
        isFalling = false;  
    }
    

    //at the hole
    if(isPlummeting)
    {
        isLeft = false;
        isRight = false;
        gameChar_y += 10;
    }
    
   
    //check char whether is reached
    if(!flagpole.isReached)
    {
       checkFlagpole(); 
    }
    
    
    
    if(lives < 1)
    {
        fill(255);
        text("Game over. Press space to continue.", 
             width/2 - 50, height/2);
        return;
    }
    else if(flagpole.isReached)
    {
        text("Level complete. Press space to continue.", 
             width/2 - 100, height/2);
        return;
    }
    
    //check char whether is died
    checkPlayerDie();

}



function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    //character move left
    if(keyCode == 65)
    {
        //key A
        isLeft = true;
    }
    
    //character move right
    else if(keyCode == 68)
    {
        //key D
        isRight = true;
    }
    
    //character jumps
    else if(keyCode == 87 || key == ' ')
    {
        //key W and blank key
        
        if(!isFalling)
        {
            gameChar_y -= 100;
        }
    }

}


function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    //move left
    if(keyCode == 65)
    {
        console.log("keyA");
        isLeft = false;
    }

    //move right
    else if(keyCode == 68)
    {
        console.log("keyD");
        isRight = false;
    }

    
}

function drawClouds()
{
    for(var i = 0; i < clouds.length; i++)
    {
        fill(255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, 50, 50);
        ellipse(clouds[i].x_pos + 30, clouds[i].y_pos, 60, 60);
        ellipse(clouds[i].x_pos + 60, clouds[i].y_pos, 50, 50);

    }
}

function drawGameChar()
{
    if(isLeft && isFalling)
	{
		// add your jumping-left code
        fill(57,37,32);
        ellipse(gameChar_x, gameChar_y - 15, 25, 30);
        ellipse(gameChar_x - 5, gameChar_y - 5, 15, 20);
        ellipse(gameChar_x + 5, gameChar_y - 5, 15, 20);
        fill(49,26,22);
        ellipse(gameChar_x, gameChar_y - 25, 35, 35);
        triangle(gameChar_x + 15, gameChar_y - 30, gameChar_x, gameChar_y - 40, gameChar_x + 10, gameChar_y - 50);
        fill(255);
        ellipse(gameChar_x - 5, gameChar_y - 10, 10, 10);
        ellipse(gameChar_x - 6, gameChar_y - 10, 10, 10);
        fill(255,193,0);
        ellipse(gameChar_x - 6, gameChar_y - 30, 5, 5);
        ellipse(gameChar_x - 7, gameChar_y - 30, 5, 5);
        fill(106,82,7);
        ellipse(gameChar_x - 7, gameChar_y - 30, 3, 3);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        fill(57,37,32);
        ellipse(gameChar_x, gameChar_y - 35, 25, 30);
        ellipse(gameChar_x - 5, gameChar_y - 25, 15, 35);
        ellipse(gameChar_x + 5, gameChar_y - 25, 15, 35);
        fill(49,26,22);
        ellipse(gameChar_x, gameChar_y - 45, 35, 35);
        triangle(gameChar_x - 15, gameChar_y - 50, gameChar_x, gameChar_y - 60, gameChar_x - 10, gameChar_y - 70);
        fill(255);
        ellipse(gameChar_x + 5, gameChar_y - 30, 10, 10);
        ellipse(gameChar_x + 6, gameChar_y - 30, 10, 10);
        fill(255,193,0);
        ellipse(gameChar_x + 6, gameChar_y - 50, 5, 5);
        ellipse(gameChar_x + 7, gameChar_y - 50, 5, 5);
        fill(106,82,7);
        ellipse(gameChar_x + 7, gameChar_y - 50, 3, 3);

	}
	else if(isLeft)
	{
		// add your walking left code
        fill(57,37,32);
        ellipse(gameChar_x, gameChar_y - 15, 25, 30);
        ellipse(gameChar_x - 5, gameChar_y - 5, 15, 20);
        ellipse(gameChar_x + 5, gameChar_y - 5, 15, 20);
        fill(49,26,22);
        ellipse(gameChar_x, gameChar_y - 25, 35, 35);
        triangle(gameChar_x + 15, gameChar_y - 30, gameChar_x, gameChar_y - 40, gameChar_x + 10, gameChar_y - 50);
        fill(255);
        ellipse(gameChar_x - 5, gameChar_y - 10, 10, 10);
        ellipse(gameChar_x - 6, gameChar_y - 10, 10, 10);
        fill(255,193,0);
        ellipse(gameChar_x - 6, gameChar_y - 30, 5, 5);
        ellipse(gameChar_x - 7, gameChar_y - 30, 5, 5);
        fill(106,82,7);
        ellipse(gameChar_x - 7, gameChar_y - 30, 3, 3);

	}
	else if(isRight)
	{
		// add your walking right code
        fill(57,37,32);
        ellipse(gameChar_x, gameChar_y - 15, 25, 30);
        ellipse(gameChar_x - 5, gameChar_y - 5, 15, 20);
        ellipse(gameChar_x + 5, gameChar_y - 5, 15, 20);
        fill(49,26,22);
        ellipse(gameChar_x, gameChar_y - 25, 35, 35);
        triangle(gameChar_x - 15, gameChar_y - 30, gameChar_x, gameChar_y - 40, gameChar_x - 10, gameChar_y - 50);
        fill(255);
        ellipse(gameChar_x + 5, gameChar_y - 10, 10, 10);
        ellipse(gameChar_x + 6, gameChar_y - 10, 10, 10);
        fill(255,193,0);
        ellipse(gameChar_x + 6, gameChar_y - 30, 5, 5);
        ellipse(gameChar_x + 7, gameChar_y - 30, 5, 5);
        fill(106,82,7);
        ellipse(gameChar_x + 7, gameChar_y - 30, 3, 3);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        fill(57,37,32);
        ellipse(gameChar_x, gameChar_y - 35, 40, 30);
        ellipse(gameChar_x - 5, gameChar_y - 25, 15, 35);
        ellipse(gameChar_x + 5, gameChar_y - 25, 15, 35);
        fill(49,26,22);
        ellipse(gameChar_x, gameChar_y - 45, 35, 35);
        triangle(gameChar_x - 15, gameChar_y - 50, gameChar_x, gameChar_y - 60, gameChar_x - 10, gameChar_y - 70);
        triangle(gameChar_x + 15, gameChar_y - 50, gameChar_x, gameChar_y - 60, gameChar_x + 10, gameChar_y - 70);
        fill(255);
        ellipse(gameChar_x - 5, gameChar_y - 30, 10, 10);
        ellipse(gameChar_x + 6, gameChar_y - 30, 10, 10);
        fill(255,193,0);
        ellipse(gameChar_x - 6, gameChar_y - 50, 5, 5);
        ellipse(gameChar_x + 6, gameChar_y - 50, 5, 5);
        fill(106,82,7);
        ellipse(gameChar_x - 6, gameChar_y - 50, 3, 3);
        ellipse(gameChar_x + 6, gameChar_y - 50, 3, 3);

	}
	else
	{
		// add your standing front facing code
        
        fill(57,37,32);
        ellipse(gameChar_x, gameChar_y - 15, 40, 30);
        ellipse(gameChar_x - 10, gameChar_y - 5, 15, 20);
        ellipse(gameChar_x + 10, gameChar_y - 5, 15, 20);
        fill(49,26,22);
        ellipse(gameChar_x, gameChar_y - 25, 35, 35);
        triangle(gameChar_x - 15, gameChar_y - 30, gameChar_x, gameChar_y - 40, gameChar_x - 10, gameChar_y - 50);
        triangle(gameChar_x + 15, gameChar_y - 30, gameChar_x, gameChar_y - 40, gameChar_x + 10, gameChar_y - 50);
        fill(255);
        ellipse(gameChar_x - 5, gameChar_y - 10, 10, 10);
        ellipse(gameChar_x + 6, gameChar_y - 10, 10, 10);
        fill(255,193,0);
        ellipse(gameChar_x - 6, gameChar_y - 30, 5, 5);
        ellipse(gameChar_x + 6, gameChar_y - 30, 5, 5);
        fill(106,82,7);
        ellipse(gameChar_x - 6, gameChar_y - 30, 3, 3);
        ellipse(gameChar_x + 6, gameChar_y - 30, 3, 3);
     
	}
}


function drawMountains()
{
    for(var i = 0; i < mountains.length; i++)
    {
    fill(149,179,126);
    quad(mountains[i].x_pos + 280, floorPos_y,
         mountains[i].x_pos + 180, floorPos_y - 200,
         mountains[i].x_pos + 120, floorPos_y - 200,
         mountains[i].x_pos, floorPos_y);
    fill(255);
    ellipse(mountains[i].x_pos + 150, floorPos_y - 200, 60, 30);
    triangle(mountains[i].x_pos + 170, floorPos_y - 150,
         mountains[i].x_pos + 180, floorPos_y - 200,
         mountains[i].x_pos + 120, floorPos_y - 200);
    triangle(mountains[i].x_pos + 130, floorPos_y - 160,
         mountains[i].x_pos + 170, floorPos_y - 180,
         mountains[i].x_pos + 120, floorPos_y - 200);
    }
}

function drawTrees()
{
    for(var i = 0; i < trees_x.length; i++){
        
        fill(161,114,6);
        rect(trees_x[i], treePos_y, 40, 150);

        //branches
        fill(31,117,6);
        ellipse(trees_x[i] - 40, treePos_y + 28, 30, 30);
        
        fill(41,161,6);
        ellipse(trees_x[i] - 20, treePos_y, 70, 70);
        ellipse(trees_x[i] + 60, treePos_y + 10, 100, 100);
        ellipse(trees_x[i] + 60, treePos_y - 82, 100, 100);
        ellipse(trees_x[i] + 20, treePos_y - 122, 100, 100);
        
        fill(31,117,6);
        ellipse(trees_x[i] + 40, treePos_y - 40, 100, 100);
        ellipse(trees_x[i], treePos_y + 18, 70, 70);
        ellipse(trees_x[i] - 30, treePos_y - 32, 30, 30);
        ellipse(trees_x[i] + 30, treePos_y - 122, 50, 50);
    
        fill(41,161,6);
        ellipse(trees_x[i] - 10, treePos_y - 82, 100, 100);
        //flowers
        fill(250,136,180);
        ellipse(trees_x[i] - 10, treePos_y - 82, 10, 10);
        ellipse(trees_x[i] + 30, treePos_y - 12, 10, 10);
        ellipse(trees_x[i] + 60, treePos_y + 8, 10, 10);
        ellipse(trees_x[i] + 60, treePos_y - 112, 10, 10);
        ellipse(trees_x[i] - 30, treePos_y + 8, 10, 10);
    }
}


function drawCollectable(t_collectable)
{
    fill(253,119,1);
        ellipse(t_collectable.x_pos + 20, t_collectable.y_pos, 30, 40);
        ellipse(t_collectable.x_pos, t_collectable.y_pos, 30, 40);
        fill(255,161,50);
        ellipse(t_collectable.x_pos + 15, t_collectable.y_pos, 25, 40);
        ellipse(t_collectable.x_pos + 5, t_collectable.y_pos, 25, 40);
        fill(255,144,45);
        ellipse(t_collectable.x_pos + 12, t_collectable.y_pos, 20, 40);
        fill(21,99,4);
        quad(t_collectable.x_pos + 15, t_collectable.y_pos - 25, 
             t_collectable.x_pos + 10, t_collectable.y_pos - 25, 
             t_collectable.x_pos + 8, t_collectable.y_pos - 20, 
             t_collectable.x_pos + 15, t_collectable.y_pos - 20);
}


function checkCollectable(t_collectable)
{
    if(dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size)
    {
        t_collectable.isFound = true;
        game_score += 1;
    }
    
}


function drawCanyon(t_canyon)
{
    fill(212,242,242);
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
}

function checkCanyon(t_canyon)
{
    //falling canyon
    if((gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width) && gameChar_y >= floorPos_y)
    {
        isPlummeting = true;
    }
}

function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(168, 156, 161);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(252, 191, 230);
    noStroke();
    
    if(flagpole.isReached)
    {
        rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
    }
    else
    {
        rect(flagpole.x_pos, floorPos_y -  50, 50, 50);
    }
    
    pop();
}

function checkFlagpole()
{
    var d = abs(gameChar_x - flagpole.x_pos);
    
    if(d < 15)
    {
        flagpole.isReached = true;
    }
}

function checkPlayerDie()
{
    
    if(gameChar_y > height)
    {
        lives -= 1;
        startGame();
    }
}


function createPlatforms(x, y, length)
{
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function(){
            fill(138, 131, 139);
            rect(this.x, this.y, this.length, 20);
            fill(185, 178, 187);
            rect(this.x, this.y - 5, this.length, 20);
            fill(138, 131, 139);
            rect(this.x + 30, this.y - 10, this.length, 20);
            fill(185, 178, 187);
            rect(this.x + 30, this.y - 15, this.length, 20);
            fill(138, 131, 139);
            rect(this.x + 60, this.y - 20, this.length, 20);
            fill(185, 178, 187);
            rect(this.x + 60, this.y - 25, this.length, 20);
        },
        checkContact: function(gc_x, gc_y)
        {
            if(gc_x > this.x && gc_x < this.x + 60 + this.length)
            {
                var d = this.y - gc_y;
                if(d >= 0 && d < 30)
                    {
                        return true;
                    }
            }
            
            return false;
        }
    }
    
    return p;
}

function Enemy(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function()
    {
        this.currentX += this.inc;
        if(this.currentX >= this.x + this.range)
            {
                this.inc = -1;
            }
        else if(this.currentX < this.x)
            {
                this.inc = 1;
            }
    }
    
    this.draw = function()
    {
        this.update();
        fill(255, 0, 0);
        ellipse(this.currentX, this.y, 20, 20);
    }
    this.checkContact = function(gc_x, gc_y)
    {
        var d = dist(gc_x, gc_y, this.currentX, this.y)
        if(d < 20)
            {
                return true;
            }
        return false;
    }
}


function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;    
    
    canyons = [
        {x_pos: 300, width: 60},
        {x_pos: 1000, width: 75},
        {x_pos: 1400, width: 60},
        {x_pos: 1800, width: 50},
    ];
    
    collectables = [
        {x_pos: 210, y_pos: floorPos_y - 30, size: 50, isFound: false},
        {x_pos: 690, y_pos: floorPos_y - 130, size: 50, isFound: false},
        {x_pos: 1190, y_pos: floorPos_y - 10, size: 50, isFound: false},
        {x_pos: 1640, y_pos: floorPos_y - 110, size: 50, isFound: false},
    ];
    
    treePos_y = height/2;
    trees_x = [500, 800, 1150, 1500, 1650, 1890, 2200, 2650, 2700];
    
    clouds = [
        {x_pos: 160, y_pos: 100},
        {x_pos: 360, y_pos: 50},
        {x_pos: 660, y_pos: 100},
        {x_pos: 960, y_pos: 100},
        {x_pos: 1160, y_pos: 50},
        {x_pos: 1360, y_pos: 100},
        {x_pos: 1460, y_pos: 30},
        {x_pos: 1960, y_pos: 60},
        {x_pos: 2160, y_pos: 100},
        {x_pos: 2360, y_pos: 50},
    ];
    
    mountains = [
        {x_pos: 0},
        {x_pos: 500},
        {x_pos: 700},
        {x_pos: 1480},
        {x_pos: 1900},
        {x_pos: 2900},
    ];
    
    cameraPosX = 0;
    
    flagpole = {isReached: false, x_pos: 2900};
    
    platforms = [];
    platforms.push(createPlatforms(100, floorPos_y - 100, 30));
    platforms.push(createPlatforms(900, floorPos_y - 100, 30));
    
    enemies = [];
    enemies.push(new Enemy(100, floorPos_y - 10, 60));
    enemies.push(new Enemy(600, floorPos_y - 10, 300));
    enemies.push(new Enemy(1200, floorPos_y - 10, 50));
}