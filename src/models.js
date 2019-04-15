const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const ObjectId = mongoose.Schema.Types.ObjectId;

var SchemaTypes = mongoose.Schema.Types;

const ButtonSchema = new mongoose.Schema({
  ubicacion: String,
  stream: String,
  status: { type: String, default: "success" },
  Y: {
    type: SchemaTypes.Double
  },
  X: {
    type: SchemaTypes.Double
  }
});

const MapaSchema = new mongoose.Schema({
  route: String
});

const Button = mongoose.model("Button", ButtonSchema);

const Mapa = mongoose.model("Mapa", MapaSchema);

module.exports = {
  Button: Button,
  Mapa: Mapa,
};
