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

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Color.findOne({ where: { id: req.params.id } }).then(function(colors) {
      res.render("example", {
        colorstable: colors
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
