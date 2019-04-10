const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const request = require("request");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req,file,cb) {
//    cb(null,'./uploads/');
    cb(null,'./src/public/img/');    
    
  },
  filename: function (req,file,cb) {
    cb(null,file.originalname);
    
  }
});

const upload = multer({ storage: storage });
const models = require("./models");

module.exports = app => {
  //insert usuarios
  app.post("/Buttons", jsonParser, async (req, res) => {
    const Button = await new models.Camera(req.body).save();

    res.json(camera);
  });

  //get all cameras
  app.get("/Buttons", async (req, res) => {
    const cams = await models.Camera.find({});

    res.json(cams);
  });

  //get camera from ubicacion
  app.get("/Buttons/:ubicacion", async (req, res) => {
    const cam = await models.Camera.find({ ubicacion: req.params.ubicacion });

    res.json(cam);
  });

  //delete camera from ubicacion
  app.delete("/Buttons/:ubicacion", async (req, res) => {
    const cam = await models.Camera.findOneAndDelete({
      ubicacion: req.params.ubicacion
    });
    res.json(cam.ubicacion);
  });

  //cambiar el status de una camara
  app.patch("/Buttons/:ubicacion", jsonParser, async (req, res) => {
    const cam = await models.Camera.findOneAndUpdate(
      { ubicacion: req.params.ubicacion },
      { status: req.body.status }
    );
    res.json("listo");
  });

  //obtain cameras status, igual devuelvo camaras pero aca las saco de otro lugar
  app.get("/status", async (req, res) => {
    let itBe = await request(
      "http://localhost:3000/Buttons",
      { json: true },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          //console.log(body);
          res.json(body);
        }
      }
    );
  });

  //guardar ruta del mapa
  app.post("/mapa", upload.single('productImage'), async (req, res) => {
    console.log(req.file.path);
    const mapa = await new models.Mapa(req.file.originalname).save();
    res.json('listo');
  });

  //te devuelve el ultimo mapa
  app.get("/mapa", jsonParser, async (req, res) => {
    const mapa = await models.Mapa.findOne()
      .sort({ field: "asc", _id: -1 })
      .limit(1);
    res.json(mapa);
  });

  //probar subir imagenes
  app.post("/imagenes", upload.single('productImage'), async (req, res) => {
    console.log(req.file.originalname);
    const mapa = await new models.Mapa({route:req.file.originalname}).save();
    res.json('listo');
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
