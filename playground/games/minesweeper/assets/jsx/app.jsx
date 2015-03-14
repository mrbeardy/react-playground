var minesweeper = {};

(function() {
  var app = {}, minesweeper = app

  var Application = React.createClass({
    render: function() {
      return (
        <h1>Minesweeper</h1>
      );
    }
  });

  app.render = function() {
    React.render(<Application />, document.body);
  }
  app.render();
})();