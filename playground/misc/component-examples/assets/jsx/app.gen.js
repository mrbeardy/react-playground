var ComponentExamples = {};
var ComponentExample, Application;

(function() {
  var App = {};

  ComponentExample = React.createClass({displayName: "ComponentExample",
    propTypes: {
      id: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      render: React.PropTypes.func.isRequired
    },

    render: function() {
      var props = this.props;
      var state = this.state;
      var propRender;

      if (props.render) {
        propRender = props.render(props, state);
      }

      return (
        React.createElement("div", null, 
          React.createElement("h1", null,  props.title), 
          propRender 
        )
      );
    }
  });

  /********************************************************************/

  Application = React.createClass({displayName: "Application",
    propTypes: {
       /**
        * TODO(mhibbs):  
        *     Make React treat missing required props as a fatal error.
        */

      examples: React.PropTypes.object.isRequired,

      initialExample: function(props, propName, componentName) {
        // TODO(mhibbs): Easier way to do all of this by default?
        // TODO(mhibbs): If not, possibly add a new PropTypes similar
        //               to instanceOf except make it elementOf.
        var errInvalidType = "Invalid prop `intialExample` supplied to `" + componentName + "`, expected a ComponentExample.";
        var errRequired    = "Required prop 'intialExample' was not specified in `" + componentName + "`.";
        var expectedPropName = "initialExample";

        if (!_.has(props, expectedPropName)) {
          return new Error(errRequired);
        }
        
        if (propName == expectedPropName) {
          var prop = props[expectedPropName];

          if (typeof prop !== "object" || typeof prop.type == "undefined" || prop.type.displayName !== "ComponentExample") {
            return new Error(errInvalidType);
          }
        }
      },
    },

    getDefaultProps: function() {
      return {
        style: {
          fontFamily: "'segoe ui', arial, helvetica, sans serif"
        }
      }
    },

    getInitialState: function() {
      return {
        currentExample: this.props.initialExample
      }
    },

    examplesSelectChange: function(e){
      var state = this.state;
      var props = this.props;

      /**
       * TODO(mhibbs): 
       *    Better way of doing this?
       *    Doing it like this relies on the key in Examples
       *    and the props.id being the same. 
       */
      // TODO(mhibbs): Un-mount the currentExample before changing.             
      state.currentExample = props.examples[e.currentTarget.value];

      this.setState(state);
    },

    render: function() {
      var state = this.state
      var props = this.props
      var examples = props.examples;

      var examplesOptions = _.map(examples, function(example) {
        return (
          React.createElement("option", {key: example.props.id, value: example.props.id}, 
            example.props.title
          )
        );
      });

      return (
        React.createElement("main", {style:  props.style}, 
          React.createElement("select", {
            onChange: this.examplesSelectChange, 
            selectedValue: state.currentExample.props.id
          }, examplesOptions), 
          React.createElement("hr", null), 
           state.currentExample
        )
      );
    } 
  });

  /********************************************************************/

  App.ExamplesProps = {
    TypingMarquee: {
      id: "TypingMarquee",
      title: "Typing Marquee",
      render: function(props, state) {
        var messages = [
          "Hello World",
          "This is a new message.",
          "And this is another new mesage, except this one is extra long.",
        ];

        return (
          React.createElement("div", null, 
            React.createElement("br", null), React.createElement(TypingMarquee, {messages: messages}), 
            React.createElement("br", null), React.createElement(TypingMarquee, {keyDelay: 20, messages: ["This marquee is a lot faster than the other one."]}), 
            React.createElement("br", null), 
            React.createElement(TypingMarquee, {messages: ["I'm updating document.title."], 
              keyChangeCallback: 
                function(message, index, component) {
                  document.title = message.substr(0, index);

                  
                }
              }
            )
          )
        )
      }
    }
  };

  App.Examples = {
    TypingMarquee: React.createElement(ComponentExample, React.__spread({},  App.ExamplesProps.TypingMarquee)),
  }
  
  App.render = function() {
    React.render(
      React.createElement(Application, {initialExample: App.Examples.TypingMarquee, examples:  App.Examples}), 
      document.getElementById("app")
    );
  }

  App.render();
  ComponentExamples = App;
})();