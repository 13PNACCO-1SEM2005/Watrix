var game;
var teclado,espaco;

var passo = 125;
var pulo = 750;
var jumpTime = 1000;

var score = 200;
var scoreString = '';
var scoreText;
var lives;
var live;
var stateText;

var scomeca,scacto,spegou, smorreu;

window.onload = function() {
	
}

var game = new Phaser.Game(1000, 650, Phaser.AUTO, '', 
		{ preload: preload, create: create, update: update });

function preload () {
	
    fundos_pre();
	watrix_pre();
	gotas_pre();
	cactos_pre();
	dinos_pre();

	game.load.audio('comeca', 'sounds/jogo_comeca.mp3');
	game.load.audio('cacto', 'sounds/pegou_cacto.mp3');
	game.load.audio('morreu', 'sounds/morreu.mp3');
	game.load.audio('pegou', 'sounds/pegou_gota.mp3');

	teclado = game.input.keyboard.createCursorKeys();

	game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
   
    espaco = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}


function create () {
	game.input.gamepad.start();
	
	scomeca = game.add.audio('comeca');
	scomeca.play();
	
	scacto = game.add.audio('cacto');
	smorreu = game.add.audio('morreu');
	spegou = game.add.audio('pegou');
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	game.physics.arcade.gravity.y = 0;
	
    fundo_create();
	watrix_create();
	gotas_create();
	cactos_create();
	dinos_create();
	
	game.world.setBounds(0, 0, 50000, 650);
	
	game.camera.follow(watrix);

    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '40px Verdana', fill: '#00bfff', fontWeight: 'bold' });
	scoreText.fixedToCamera = true;
	
    lives = game.add.group();
    game.add.text(700, 10, 'Vidas : ', { font: '40px Verdana', fill: '#00bfff' }).fixedToCamera = true;
	
    stateText = game.add.text(watrix_getx()+500,watrix_gety(),' ', { font: '96px Verdana', fill: '#f00', fontWeight: 'bold' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
	stateText.fixedToCamera = true;
		
	for (var i = 0; i < 5; i++) 
    {
        var vidas = lives.create(850 + (30 * i), 60, 'watrix');
		vidas.scale.x = 0.5
		vidas.scale.y = 0.5
        vidas.anchor.setTo(0.5, 0.5);
        vidas.alpha = 0.8;
		vidas.fixedToCamera = true;
    }

}

function update () {

	game.physics.arcade.overlap(bullets, watrix, balaperdida, null, this);
	game.physics.arcade.overlap(tiros, cactos, collisiontiro, null, this);
	//game.physics.arcade.overlap(tiros, dinos, collisiontiro, null, this);
	
	game.physics.arcade.overlap(gotas, watrix, collisionbala, null, this);
	
	game.physics.arcade.overlap(cactos, watrix, collisioncac, null, this);
	
	game.physics.arcade.collide(cactos, watrix);
	game.physics.arcade.collide(dinos, watrix);
	game.physics.arcade.collide(chao, watrix);
	
	if (espaco.isDown && score>=40 && game.time.now > tempoTiro){
		watrix_atira();
		score = score - 40;
		scoreText.text = scoreString + score;
	}

	if (teclado.up.isDown && game.time.now > jumpTime) {
				watrix_pula(-750);
				jumpTime = game.time.now + 1550
		}
		else {
			if (teclado.left.isDown) {
				watrix_anda(-passo);
			}
			else {
				if (teclado.right.isDown) {
					watrix_anda(passo);
				}
				else {
					watrix_para();
				}
			}
		}
		
		fireBullet();
}


function collisionbala (watrix, gotas) {
    gotas.kill();
	score += 20;
	spegou.play();
    scoreText.text = scoreString + score;
}

function collisioncac (watrix, cactos) {
    cactos.kill();
	scacto.play();
	score -= 20;
    scoreText.text = scoreString + score;
}

function collisiontiro (tiro, qlq) {
    tiro.kill();
	qlq.kill();
}

function balaperdida (watrix,bullets) {
    
    bullets.kill();
    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    if (lives.countLiving() < 1)
    {
        smorreu.play();
		watrix.kill();

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;
		
        game.input.onTap.addOnce(restart,this);
    }

}


function restart () {

    lives.callAll('revive');
    
    watrix.revive();

    stateText.visible = false;

}