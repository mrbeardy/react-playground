var hangman = {};

(function() {
  var app = {}, hangman = app,
  Application;

  // The code presented in this file was written in round-a-bout a single
  // session wile learning React. Take it all with a grain of salt and fire.

  // Note: his file is a swear-free zone. Anyone found cursing at their 
  // screen while reading this file is here-by obligated to fork the 
  // repo, fix the problem and issue a pull request.

  Application = React.createClass({displayName: "Application",
    GAME_STATES: {
      PLAYING:  0x01,
      WIN:      0x02,
      LOSE:     0x04
    },
    
    
    LETTERS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
    MAX_MISSES: 9,

    // TODO: Come up with a better way to do this.
    HANGMAN: [
      "       ________          ",
      "      |        |         ",
      "      |        |         ",
      "      |        0         ",
      "      |       /-\\       ",
      "      |       / \\       ",
      "      |                  ",
      "      |                  ",
      "      |                  ",
      "      |                  ",
      "  =====================  ",
      "  | [ H A N G M A N ] |  ",
      "  X                   X  ",
    ],

    HANGMAN_MAP: [
      "       22222222          ",
      "      1        3         ",
      "      1        3         ",
      "      1        4         ",
      "      1       576        ",
      "      1       8 9        ",
      "      1                  ",
      "      1                  ",
      "      1                  ",
      "      1                  ",
      "                         ",
      "    1 3 4 5 6 7 8 9 2    ",
      "                         ",
    ],

    HANGMAN_WIN: [
      "                         ",
      "                         ",
      "    ________________     ",
      "   |                |    ",
      "   |   Thank You!   |    ",
      "   |                |    ",
      "   ------------------    ",
      "          \\0/           ",
      "           |             ",
      "          / \\           ",
      "  =====================  ",
      "  |                   |  ",
      "  X                   X  ",
    ],


    getInitialState: function() {
      var state = {
        word: [],
        words: [],
        lettersChosen: [],
        misses: 0,
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
      state.misses = 0;
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
          letter = target.innerHTML

      if ( target.hasAttribute("disabled") ) return;

      var state = this.state,
          wasGoodChoice = state.word.join('').toUpperCase().indexOf( letter ) > -1;

      if (state.misses == this.MAX_MISSES) {
      }
      
      state.lettersChosen.push(letter);

      if (!wasGoodChoice) {
        state.misses++;
      }

      this.setState(state);
      
      if (this.hasSolved()) {
        this.endGame( this.GAME_STATES.WIN );
      } else if (state.misses == this.MAX_MISSES) {
        this.endGame( this.GAME_STATES.LOSE );
      }
    },

    render: function() {
      var gameState   = this.state.gameState;
      var didWin      = gameState == this.GAME_STATES.WIN;
      var didLose     = gameState == this.GAME_STATES.LOSE;
      var isGameEnded = didWin || didLose;

      var hangman = "";

      if (!didWin) {        
        this.HANGMAN.forEach(function( row, r ) {
          var columns = row.split('');
          var map_columns = this.HANGMAN_MAP[ r ].split('');

          columns.forEach(function( column, c ) {
            if ( parseInt(map_columns[ c ]) <= this.state.misses || map_columns[ c ] == ' ' ) {
              hangman += column;
            } else {
              hangman += " ";
            }
          }, this);

          hangman += "\r\n";
        }, this);
      } else {
        hangman = this.HANGMAN_WIN.join("\n");
      }

      if (this.state.word.length > 0) {
        var letterItems = _.map(this.state.word, function(c, key) {
          var upper = c.toUpperCase();

          var isChosen = this.state.lettersChosen.indexOf( upper ) > -1;
          var isNonLetter = this.LETTERS.indexOf( upper ) == -1;

          return (
            React.createElement("span", {className:  !isNonLetter ? "letter" : "", key: key}, 
               (isGameEnded || (isChosen || isNonLetter)) ? c : "_"
            )
          );
        }, this);
      }

      var buttons = _.map(this.LETTERS, function(letter) {
        var isChosen = this.state.lettersChosen.indexOf(letter) > -1;

        return (
          React.createElement("button", {
            key: letter, 
            onClick:  this.chooseLetter, 
            disabled:  ( isChosen || isGameEnded ) ? "disabled" : ""
          }, 
            letter 
          )
        );
      }, this);

      var endMessage = "";

      if (isGameEnded) {
        endMessage = (didWin) ? "Congratulations!" : "Better luck next time.";
      }

      return (
        React.createElement("main", null, 
          React.createElement("div", {className: "hangman"}, hangman ), 
          React.createElement("div", {className: "word"}, letterItems ), 
          React.createElement("div", {className: "buttons"}, 
            buttons 
          ), 

          React.createElement("div", {className: "controls"}, 
            React.createElement("div", {className: "endMessage"}, 
              endMessage 
            ), 
            React.createElement("button", {onClick:  this.newGame},  (isGameEnded) ? "Play Again" : "New Game")
          )
        )
      );
    }
  });

  app.render = function() {
    React.render(React.createElement(Application, {words: wordlist }), document.getElementById("app"));
  }
  app.render();
})();