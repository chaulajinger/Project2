var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Color.findAll({}).then(function(colorstable) {
      res.render("index", {
        msg: "Welcome!",
        colorstable: colorstable
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Color.findOne({ where: { id: req.params.id } }).then(function(colorstable) {
      res.render("example", {
        colorstable: colorstable
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
