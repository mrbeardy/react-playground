var TypingMarquee = React.createClass({
  propTypes: {
    messages: React.PropTypes.array.isRequired,

    cursorCharacter: React.PropTypes.string,

    keyDelay:     React.PropTypes.number,
    messageDelay: React.PropTypes.number,

    style: React.PropTypes.object,

    keyChangeCallback:      React.PropTypes.func,
    messageChangeCallback:  React.PropTypes.func
  },             

  getDefaultProps: function() {
    return {
      cursorCharacter: "|",

      keyDelay: 90,
      messageDelay: 3000,

      style: {}
    }
  },

  getInitialState: function() {
    return {
      currentCharacterIndex: 0,
      currentMessageIndex: 0
    }
  },

  componentWillMount: function() {
    this.keyInterval = null;
    this.messageTimeout = null;
  },

  componentWillUnmount: function() {
    clearInterval(this.keyInterval);
    clearTimeout(this.messageTimeout);
  },

  componentDidMount: function() {
    // Refactor: Move these set/clear calls into seperate functions 
    //           to reduce code rewrite.
    this.keyInterval = setInterval(this.keyChange, this.props.keyDelay);
  },

  keyChange: function() {
    var state = this.state;
    var props = this.props;

    var currentMessage = props.messages[state.currentMessageIndex];

    state.currentCharacterIndex += 1;

    if (state.currentCharacterIndex >= currentMessage.length) {
      state.currentCharacterIndex = currentMessage.length;

      clearInterval(this.keyInterval);

      this.messageTimeout = setTimeout(this.messageChange, props.messageDelay);
    }
    
    if (props.keyChangeCallback) {
      props.keyChangeCallback({
        message: currentMessage,
        characterIndex: state.currentCharacterIndex
      });
    }

    this.setState(state);
  },

  messageChange: function() {
    var state = this.state;
    var props = this.props;

    state.currentCharacterIndex = 0;
    state.currentMessageIndex += 1;

    if (state.currentMessageIndex > props.messages.length - 1) {
      state.currentMessageIndex = 0;
    }

    this.keyInterval = setInterval(this.keyChange, this.props.keyDelay);

    this.setState(state);
  },

  render: function() {
    var state = this.state;
    var props = this.props;
    var currentMessage = props.messages[state.currentMessageIndex];

    var message = currentMessage.substr(0, state.currentCharacterIndex);

    return (
      <span style={props.style}>{message}<span className='cursor'>{props.cursorCharacter}</span></span>
    )
  }
});

var module = module || {};
module.exports = TypingMarquee;