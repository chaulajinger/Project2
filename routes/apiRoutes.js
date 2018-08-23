var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Color.findAll({}).then(function(colorstable) {
      res.json(colorstable);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Color.create(req.body).then(function(colorstable) {
      res.json(colorstable);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Color.destroy({ where: { id: req.params.id } }).then(function(colorstable) {
      res.json(colorstable);
    });
  });
};
