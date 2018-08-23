module.exports = function(sequelize, DataTypes) {
  var Color = sequelize.define("Color", {
    color: DataTypes.STRING,
    details: DataTypes.TEXT
  });
  return Color;
};
