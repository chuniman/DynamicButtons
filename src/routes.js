const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const request = require("request");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./src/public/img/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
const models = require("./models");

module.exports = app => {
  //insert usuarios
  app.post("/Buttons", jsonParser, async (req, res) => {
    const Button = await new models.Button(req.body).save();

    res.json(Button);
  });

  //get all Buttons
  app.get("/Buttons", async (req, res) => {
    const cams = await models.Button.find({});

    res.json(cams);
  });

  //get Button from ubicacion
  app.get("/Buttons/:ubicacion", async (req, res) => {
    const cam = await models.Button.find({ ubicacion: req.params.ubicacion });

    res.json(cam);
  });

  //delete Button from ubicacion
  app.delete("/Buttons/:ubicacion", async (req, res) => {
    const cam = await models.Button.findOneAndDelete({
      ubicacion: req.params.ubicacion
    });
    res.json(cam.ubicacion);
  });

  //cambiar el status de una camara
  app.patch("/Buttons/:ubicacion", jsonParser, async (req, res) => {
    const cam = await models.Button.findOneAndUpdate(
      { ubicacion: req.params.ubicacion },
      { status: req.body.status }
    );
    res.json("listo");
  });

  //obtain Buttons status, igual devuelvo camaras pero aca las saco de otro lugar
  app.get("/status", async (req, res) => {
    let itBe = await request(
      "http://localhost:3000/Buttons",
      { json: true },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          res.json(body);
        }
      }
    );
  });

  //te devuelve el ultimo mapa
  app.get("/mapa", jsonParser, async (req, res) => {
    const mapa = await models.Mapa.findOne()
      .sort({ field: "asc", _id: -1 })
      .limit(1);
    res.json(mapa);
  });

  // guarda la imagen en una carpeta y la ruta en la bd
  app.post("/addMap", upload.single("productImage"), async (req, res) => {
    const mapa = await new models.Mapa({ route: req.file.originalname }).save();
    res.render("addMap.html");
  });

  //renders
  //no fue la mejor idea dejarle de nombre de ruta map, pero no sabia que iba a terminar guardando rutas de mapas
  app.get("/map", async (req, res) => {
    res.render("map.html");
  });

  app.get("/addButton", async (req, res) => {
    res.render("addButton.html");
  });

  app.get("/deleteButton", async (req, res) => {
    res.render("deleteButton.html");
  });

  app.get("/addMap", async (req, res) => {
    res.render("addMap.html");
  });
};
