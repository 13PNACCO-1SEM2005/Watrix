var fundos = [],cursor;

function fundos_pre() {

	game.load.image('chao', 'imagens/chao.png');
	game.load.image('cursor', 'imagens/arrow_keys.gif');
    game.load.image('fundo1', 'imagens/fundo1.jpg');
    game.load.image('fundo2', 'imagens/fundo2.jpg');
    game.load.image('fundo3', 'imagens/fundo3.jpg');
    game.load.image('fundo4', 'imagens/fundo4.jpg');
    game.load.image('fundo5', 'imagens/fundo5.jpg');
	game.load.audio('tema', 'sounds/tema_fundo.mp3');
}

function fundo_create() {

	music = game.sound.play('tema');
	
	fundos[0] = game.add.sprite(0, 0, 'fundo1');
    fundos[1] = game.add.sprite(1000, 0, 'fundo2');
    fundos[2] = game.add.sprite(2000, 0, 'fundo3');
    fundos[3] = game.add.sprite(3000, 0, 'fundo4');
    fundos[4] = game.add.sprite(4000, 0, 'fundo5');
	fundos[5] = game.add.sprite(6000, 0, 'fundo1');
	fundos[6] = game.add.sprite(7000, 0, 'fundo1');
    fundos[7] = game.add.sprite(5000, 0, 'fundo2');
    fundos[8] = game.add.sprite(8000, 0, 'fundo3');
    fundos[9] = game.add.sprite(11000, 0, 'fundo4');
    fundos[10] = game.add.sprite(9000, 0, 'fundo5');
	fundos[11] = game.add.sprite(10000, 0, 'fundo1');
    fundos[12] = game.add.sprite(15000, 0, 'fundo2');
    fundos[13] = game.add.sprite(13000, 0, 'fundo3');
    fundos[14] = game.add.sprite(12000, 0, 'fundo4');
    fundos[15] = game.add.sprite(19000, 0, 'fundo5');
	fundos[16] = game.add.sprite(17000, 0, 'fundo1');
    fundos[17] = game.add.sprite(14000, 0, 'fundo2');
    fundos[18] = game.add.sprite(16000, 0, 'fundo3');
    fundos[19] = game.add.sprite(18000, 0, 'fundo4');
    fundos[20] = game.add.sprite(20000, 0, 'fundo5');
    chao = game.add.sprite(0, 515, 'chao');
	
	game.physics.arcade.enable(chao);
	chao.body.allowGravity = false;
	chao.body.immovable = true;
	chao.fixedToCamera = true;
	
	cursor = game.add.sprite(400, 15, 'cursor');

}

