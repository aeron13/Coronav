function giocoOniFinale() {/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/aMSIdOUi
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(952, 652, Phaser.AUTO, 'giocoOni', { preload: preload, create: create, update: update, render: render });

function preload() {



    game.load.baseURL = './assets';
    game.load.crossOrigin = 'anonymous';

    game.load.image('playerDead', '/player.dead.png');

    //game.load.image('minioni', '/onichan.png');

    game.load.image('bullet', '/freccia.png');

    game.load.image('block3', '/plat3.png');
    game.load.image('block1', '/cubotto.png');
    game.load.image('block2', '/tronchetto.png');

    game.load.image('sfondo', '/sfondo-oni6.png');

    game.load.spritesheet('player', '/momochan.png',31, 45, 8);
    game.load.spritesheet('minioni', '/onichanFrames1.png',41, 37, 12);
    game.load.image('miniDead', '/onichan.png',41, 37, 12);

    game.load.image('frecciaDx', '/frecciaDx.png');
    game.load.image('frecciaSx', '/frecciaSx.png');
    game.load.image('frecciaAl', '/frecciaAl.png');
    game.load.image('spacebar', '/spacebar.png');

    game.load.image('sbarra', '/sbarra.png');
    game.load.image('indicatore', '/momochantesta.png');

    game.load.image('cane', '/nonna.png');
    game.load.image('door', '/frecciaDx.png');
}

var player;
var playerDead;
var minioni;
var miniDead;

var cursors;
var jumpButton;
var fireButtonR;
var fireButtonL;

var block3;
var block1;
var block2;
var blocksp;

var bullets;
var bulletTime = 0;
var bullet;

var text;
var subtext;
var victoryText;
var instructions;
var instruction2;

// 1 = sinistra
var go;
var pGo;

var sfondo;

var start = 0;
var starText;

var sbarra;
var indicatore;

var playerCaduto;
var cane;
var canePreso;
var door;

function create() {
go = 1;
pGo = 0;
canePreso = 0;
minioniCreate = 0;
//0 -> il player non è caduto, 1 -> il player è morto cadendo
playerCaduto = 0;
  //sfondo
  sfondo = game.add.physicsGroup();
  var s;
  var y;
  for(s=0; s<3; s++) {
     for(y=0; y<7; y++) sfondo.create(0+500*s, 0+652*y, 'sfondo');
};
  sfondo.setAll('body.immovable', true);


    // bullets
    bullets = game.add.physicsGroup();
    bullets.createMultiple(32, 'bullet', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);


    //controls !quando si cambia il tasto del salto, cambiarli anche nel tutorial!
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButtonR = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    fireButtonL = game.input.keyboard.addKey(Phaser.Keyboard.Z);

    //world bounds
    game.world.setBounds(0,0,952,4000);

    //minioni
      minioni = game.add.physicsGroup();
      var i;
      for(i=0; i<0; i++)
          minioni.create(game.world.randomX + 500, game.world.randomY, 'minioni');

      minioni.forEach(function(item) {
          item.body.gravity.y = Math.random()*150;
          item.body.velocity.x = Math.random()*150;
          item.body.velocity.y = Math.random()*150;
          var fly = item.animations.add('fly');
          item.animations.play('fly', 30, true);
      });

      minioni.setAll('body.immovable', false);
      minioni.setAll('body.bounce.x', 1);
      minioni.setAll('body.bounce.y', 1);
      minioni.setAll('body.collideWorldBounds', true);

    //platforms
    block3 = game.add.physicsGroup();
    block3.create(100, 3700, 'block3');
    /*block3.create(600, 450, 'block3');
    block3.create(1050, 600, 'block3');
    block3.create(2100, 612, 'block3');
    block3.create(2500, 300, 'block3');
    block3.create(3180, 592, 'block3');
    block3.create(3800, 320, 'block3');
    block3.create(4850, 450, 'block3');
    block3.create(5680, 500, 'block3');*/
    block3.setAll('body.immovable', true);

    block1 = game.add.physicsGroup();
    block1.create(500, 3500, 'block1');
    block1.create(500, 3700, 'block1');
    /*block1.create(2900, 200, 'block1');
    block1.create(2880, 500, 'block1');
    block1.create(3700, 480, 'block1');
    block1.create(4630, 100, 'block1');
    block1.create(5300, 300, 'block1');
    block1.create(5500, 150, 'block1');*/
    block1.setAll('body.immovable', true);

    block2 = game.add.physicsGroup();
    block2.create(750, 3600, 'block2');
    /*block2.create(1770, 190, 'block2');
    block2.create(2245, 190, 'block2');
    block2.create(1860, 600, 'block2');
    block2.create(3180, 380, 'block2');
    block2.create(4350, 500, 'block2');
    block2.create(5300, 600, 'block2');*/
    block2.setAll('body.immovable', true);

   blocksp = game.add.physicsGroup();
   blocksp.create(5500, 435, 'block1');
   blocksp.create(4350, 350, 'block2');
   blocksp.create(4350, 200, 'block2');
   blocksp.setAll('body.immovable', true);
   blocksp.alpha = 0.5;

   //porta
   door = game.add.sprite(880, 3560, 'door');
   game.physics.arcade.enable(door);
   door.body.immovable = true;

   //cane
   cane = game.add.sprite(300, 150, 'cane');
   game.physics.arcade.enable(cane);
   cane.body.immovable = true;

        //player
        player = game.add.sprite(200, 3500, 'player');

        game.camera.follow(player);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = false;
        player.body.gravity.y = 1000;

        //sbarra avanzamento
        sbarra = game.add.sprite(100, 25, 'sbarra');
        game.physics.arcade.enable(sbarra);
        sbarra.fixedToCamera = true;
        //indicatore della posizione del player
        indicatore = game.add.sprite(0, -23/4, 'indicatore');
        game.physics.arcade.enable(indicatore);
        sbarra.addChild(indicatore);

          var frecciaDx;
          var frecciaSx;
          var frecciaAl;
          var spacebar;

}

// game over text and restart function
function updateCounter() {
  //se il player è morto perché è caduto
  if(playerCaduto == 1) {
    GiocosiFermaGameOver();
  }
  //se il player è stato ucciso dagli oni
  //il player cade dopo che è morto
  playerDead = game.add.sprite(player.x, player.y, 'playerDead');
  player.kill();
  game.physics.arcade.enable(playerDead);
  playerDead.body.gravity.y = 500;
  playerDead.body.collideWorldBounds = false;

  if (pGo == 1) {
      playerDead.scale.setTo(-1,1);
  }

  if(playerCaduto == 0) {
    setTimeout(GiocosiFermaGameOver, 3000);
  }
        //restart on click function
        game.input.onTap.addOnce(function () {
            game.paused = false;
            game.state.restart();
        });
}

//victory text and victory function
function victory () {
  if(canePreso == 1) {
  game.paused = true;
  console.log("hai vinto!!!");
         //restart on click function
        game.input.onTap.addOnce(function () {
          game.paused = false;
          game.state.restart();
        });
}
}

function GiocosiFermaGameOver() {
  game.paused = true;
}

function update () {

    game.physics.arcade.overlap(bullets, minioni, hitEnemy, null, this);
    game.physics.arcade.overlap(player, minioni, gameOver, null, this);
    game.physics.arcade.overlap(player, door, victory, null, this);
    game.physics.arcade.overlap(player, cane, function() {canePreso = 1; cane.x = player.x - 10; cane.y = player.y;}, null, this);

    game.physics.arcade.overlap(bullets, block1, bulletBlock1, null, this);
    game.physics.arcade.overlap(bullets, block2, bulletBlock2, null, this);
    game.physics.arcade.overlap(bullets, block3, bulletBlock3, null, this);
    game.physics.arcade.overlap(bullets, blocksp, bulletBlocksp, null, this);

    game.physics.arcade.collide(player, block3);
    game.physics.arcade.collide(player, block1);
    game.physics.arcade.collide(player, block2);
    game.physics.arcade.collide(player, door);
    game.physics.arcade.collide(player, cane);
    game.physics.arcade.collide(minioni, player);

    game.physics.arcade.collide(minioni, minioni);
    game.physics.arcade.collide(minioni, block3);
    game.physics.arcade.collide(minioni, block1);
    game.physics.arcade.collide(minioni, block2);

    game.physics.arcade.collide(bullets, block1);
    game.physics.arcade.collide(bullets, block2);
    game.physics.arcade.collide(bullets, block3);


    //cursors properties
    player.body.velocity.x = 0;
    indicatore.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
      pGo = 1;
        player.body.velocity.x = -350;
        indicatore.body.velocity.x = -350/30;
    }
    else if (cursors.right.isDown)
    {
      pGo = 0;
        player.body.velocity.x = 350;
        indicatore.body.velocity.x = 350/30;
    }
    //player walks only when touching the ground
  if (!player.body.touching.down)
  {
      var walk = player.animations.add('walk');
  player.animations.play('walk', 16, true);
  }
    //player turns left and right
  if (pGo == 0) {
       player.scale.setTo(1,1);


   }
   if (pGo == 1) {
       player.scale.setTo(-1,1);



   }

    //fireButtonR properties
     if (fireButtonR.isDown && pGo == 0)
    {
        fireBulletR();
    }
    //quando il player si gira spara a sx con lo stesso tasto
    if (fireButtonR.isDown && pGo == 1)
   {
       fireBulletL();
   }
    //fireButtonL properties
     if (fireButtonL.isDown)
    {
        fireBulletL();
    }

    //jumpButton properties
     if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -600;
    }

    //player dies if fallen
    if (player.y > 4000)
    {
      playerCaduto = 1;
      updateCounter();
    }
}   // end of update function

   //player's body hits minioni
   function gameOver (player,minioni) {
        updateCounter();
    }

    //player fires right
    function fireBulletR () {

        //crea uno spazio fra i bullets
    if (game.time.time > bulletTime)

    {   //prende il primo bullet che trova dal mucchio
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x+6, player.y+14 );
            bullet.body.velocity.x = 600;
            //spazia i bullets fra di loro
            bulletTime = game.time.time + 400;
        }
    }

}

//player fires left
    function fireBulletL () {

        //crea uno spazio fra i bullets
    if (game.time.time > bulletTime)

    {   //prende il primo bullet che trova dal mucchio
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x+6, player.y+15 );
            bullet.body.velocity.x = -600;
            //spazia i bullets fra di loro
            bulletTime = game.time.time + 400;
        }
    }

}

//when bullets hit platfoms are killed
function bulletBlock1 (bullet, block1) {
    bullet.kill();
}

function bulletBlock2 (bullet, block2) {
    bullet.kill();
}

function bulletBlock3 (bullet, block3) {
    bullet.kill();
}
function bulletBlocksp (bullet, blocksp) {
    bullet.kill();
}

// minioni killed by bullets
function hitEnemy (minioni, bullet) {

    bullet.kill();
    miniDead = game.add.sprite(minioni.x, minioni.y, 'miniDead');
    minioni.kill();
    game.physics.arcade.enable(miniDead);
    miniDead.body.gravity.y = 500;

}

function render () {


}

}

giocoOniFinale();
