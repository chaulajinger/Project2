var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Color.findAll({}).then(function(Color) {
      res.render("index", {
        msg: "Welcome!",
        colors: Color
      });
    });
  });

  // Load result page and pass in an color by id
  app.get("/example/:id", function(req, res) {
    db.Color.findOne({ where: { id: req.params.id } }).then(function(color) {
      res.render("example", {
        colorstable: color
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
