var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Color.findAll({}).then(function(colors) {
      res.json(colors);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Color.create(req.body).then(function(colors) {
      res.json(colors);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Color.destroy({ where: { id: req.params.id } }).then(function(colors) {
      res.json(colors);
    });
  });
};
