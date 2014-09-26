var app = {	
	screens: [],
	word: '',
	attempts: 8,
	hits: 0,
	choices: [],
	pieces: [],	
	currentPiece: 0,
	keyboard: {
		chars: []
	},
	setWord: function(word){
		app.word = word.toUpperCase();
	},
	start: function(){
		app.setWord(app.getInputValue());
		app.changeScreen('#gameScreen');
		app.renderWordChoices();
		app.loadKeyboard();
		app.loadPieces();
	},
	loadScreens: function(){
		app.screens = $('.screen');	
		app.renderScreens();
	},
	renderScreens: function(){
		app.screens.each(function(index){
			$(this).css('top', $(this).height() * index);
		});
	},
	changeScreen: function(screenId){
		var newScreen = app.getScreenById(screenId),
			activeScreen = app.getActiveScreen();

		activeScreen.removeClass('screen-on');
		activeScreen.css('top', newScreen.css('top'));
		
		newScreen.addClass('screen-on');
		newScreen.css('top', 0);
	},
	getScreenById: function(screenId){				
		return app.screens.siblings(screenId);
	},
	getActiveScreen: function(){
		return app.screens.siblings('.screen-on');
	},
	getInputValue: function(){
		return $('#inputWord').val();
	},
	renderWordChoices: function(){			
		for(var i = 0; i < app.word.length; i++){	
			var choice = app.createWordChoiceDOM();
			app.choices.push(choice);			
			$('#wordChoices').append(choice);
		}
	},
	createWordChoiceDOM: function(){
		return $('<span class="choice">');
	},
	loadKeyboard: function(){
		app.keyboard.chars = $('.char');
		app.loadKeyboardEvents();
	},
	loadKeyboardEvents: function(){		
		app.keyboard.chars.on('click', function(){				
			if(!$(this).hasClass('char-off')){					
				app.makeChoice($(this).html());
				$(this).addClass('char-off');
			}			
		});
	},
	removeKeyboardEvents: function(){
		app.keyboard.chars.off();
	},
	makeChoice: function(value){
		var indexes = app.findCharInString(value, app.word);		
		if(indexes.length > 0){
			for(var i = 0; i < indexes.length; i++){
				$(app.choices[indexes[i]]).html(value);
			}
			app.addHits(indexes.length);
		}else{
			app.removeAttempt();
		}
		app.verifyGameStatus();
	},
	findCharInString: function(value, string){
		var indexes = [];
		for(var i = 0; i < string.length; i++){
			if(value == string[i]){
				indexes.push(i);
			} 
		}
		return indexes;
	},
	loadPieces: function(){
		app.pieces = $('.piece');
	},
	renderPiece: function(){
		$(app.pieces[app.currentPiece]).css('display', 'block');		
		app.currentPiece++;		
	},
	removeAttempt: function(){
		app.attempts--;
		app.renderPiece();
	},
	addHits: function(n){
		app.hits += n;		
	},
	verifyGameStatus: function(){
		if(app.word.length == app.hits){
			app.gameWin();
		}else if(app.attempts == 0){
			app.gameLose();
		}
	},
	gameWin: function(){
		alert("Você ganhou!!! :D");
		app.endGame();
	},
	gameLose: function(){
		alert("Você perdeu!!! :(  \n a palavra era " + app.word + "!!!");
		app.endGame();
	},
	endGame: function(){
		location.reload();
	},
	init: function(){
		app.loadScreens();
	}
}



