var ComponentExamples = {};
var ComponentExample, Application;

(function() {
  var App = {};

  ComponentExample = React.createClass({
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
        <div>
          <h1>{ props.title }</h1>
          { propRender }
        </div>
      );
    }
  });

  /********************************************************************/

  Application = React.createClass({
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
          <option key={example.props.id} value={example.props.id}>
            {example.props.title}
          </option>
        );
      });

      return (
        <div style={ props.style }>
          <select 
            onChange={this.examplesSelectChange}
            selectedValue={state.currentExample.props.id}
          >{examplesOptions}</select>
          <hr />
          { state.currentExample }
        </div>
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
          <div>
            <br /><TypingMarquee messages={messages} />
            <br /><TypingMarquee keyDelay={20} messages={["This marquee is a lot faster than the other one."]} />
            <br />
            <TypingMarquee messages={["I'm updating document.title."]} 
              keyChangeCallback={
                function(message, index, component) {
                  document.title = message.substr(0, index);

                  
                }
              } 
            />
          </div>
        )
      }
    }
  };

  App.Examples = {
    TypingMarquee: <ComponentExample {...App.ExamplesProps.TypingMarquee}/>,
  }
  
  App.render = function() {
    React.render(
      <Application initialExample={App.Examples.TypingMarquee} examples={ App.Examples }/>, 
      document.body
    );
  }

  App.render();
  ComponentExamples = App;
})();