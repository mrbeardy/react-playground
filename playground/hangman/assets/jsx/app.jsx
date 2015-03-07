var hangman = {};

(function() {
  var app = {}, hangman = app,
  Application;

  Application = React.createClass({
    GAME_STATES: {
      PLAYING:  0x01,
      WON:      0x02,
      LOST:     0x04
    },
    
    LETTERS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),

    getInitialState: function() {
      var state = {
        word: [],
        words: [],
        lettersChosen: [],
        gameState: this.GAME_STATES.PLAYING
      }

      return state;      
    },

    componentDidMount: function() {
      var state = this.state;

      if (this.props.words)
        state.words = this.props.words;

      this.newGame();
      
      this.setState( state );
    },

    randomword: function() {
      return this.state.words[_.random(0, this.state.words.length - 1)];
    },

    endGame: function( gameState ) {
      var state = this.state;

      state.gameState = gameState;

      this.setState(state);
    },

    newGame: function() {
      var state = this.state;

      state.word = this.randomword().split('');
      state.lettersChosen = [];
      state.gameState = this.GAME_STATES.PLAYING;

      this.setState(state);
    },

    hasSolved: function() {
      var remaining = 0;

      _.each(this.state.word, function(c) {
        var upper = c.toUpperCase();

        var isChosen = this.state.lettersChosen.indexOf( upper ) > -1;
        var isLetter = this.LETTERS.indexOf( upper ) > -1;

        if (!isChosen && isLetter) {
          remaining++;
        }
      }, this);

      return (remaining == 0);
    },

    chooseLetter: function( e ) {
      var target = e.currentTarget,
          letter = target.innerHTML;

      if ( target.hasAttribute("disabled") ) return;

      this.state.lettersChosen.push(letter);
      this.setState({ lettersChosen: this.state.lettersChosen });
      
      if (this.hasSolved()) {
        this.endGame( this.GAME_STATES.WON );
      }
    },

    render: function() {
      var gameState = this.state.gameState;
      var isGameEnded = gameState == this.GAME_STATES.WON || gameState == this.GAME_STATES.LOST;
      var didWin = gameState == this.GAME_STATES.WON;
      var didLose = gameState == this.GAME_STATES.LOST;

      if (this.state.word.length > 0) {
        var letterItems = _.map(this.state.word, function(c, key) {
          var upper = c.toUpperCase();

          var isChosen = this.state.lettersChosen.indexOf( upper ) > -1;
          var isNonLetter = this.LETTERS.indexOf( upper ) == -1;

          return (
            <span className={ !isNonLetter ? "letter" : "" } key={key}>
              { (isGameEnded || (isChosen || isNonLetter)) ? c : "_" } 
            </span>
          );
        }, this);
      }

      var buttons = _.map(this.LETTERS, function(letter) {
        var isChosen = this.state.lettersChosen.indexOf(letter) > -1;

        return (
          <button 
            key={letter} 
            onClick={ this.chooseLetter }
            disabled={ ( isChosen || isGameEnded ) ? "disabled" : "" }
          >
            { letter }
          </button>
        );
      }, this);

      var endMessage = "";

      if (isGameEnded) {
        endMessage = (didWin) ? "Congratulations!" : "Better luck next time.";
      }

      return (
        <main id="app">
          <div className="word">{ letterItems }</div>
          <div className='buttons'>
            { buttons }
          </div>

          <div className="controls">
            <div className="endMessage">
              { endMessage }
            </div>
            <button onClick={ this.newGame }>{ (isGameEnded) ? "Play Again" : "New Game" }</button>
          </div>
        </main>
      );
    }
  });

  app.render = function() {
    React.render(<Application words={ wordlist }/>, document.body);
  }
  app.render();
})();