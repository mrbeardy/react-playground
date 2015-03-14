var minesweeper = {};

(function() {
  var app = {}, minesweeper = app

  var Application = React.createClass({displayName: "Application",
    render: function() {
      return (
        React.createElement("h1", null, "Minesweeper")
      );
    }
  });

  app.render = function() {
    React.render(React.createElement(Application, null), document.body);
  }
  app.render();
})();