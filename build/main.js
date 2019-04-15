require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const express = __webpack_require__(/*! express */ "express");

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const routes = __webpack_require__(/*! ./routes */ "./src/routes.js");

const cors = __webpack_require__(/*! cors */ "cors");

const ejs = __webpack_require__(/*! ejs */ "ejs");

const app = express(); // //setear para que puedas usar ejs
// app.set('view engine', 'ejs');
// set the default views folder

app.set('views', __dirname + '/views');
app.engine('html', __webpack_require__(/*! ejs */ "ejs").renderFile);
app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost/cameras');
app.use(cors());
routes(app);
app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000!'));
/* WEBPACK VAR INJECTION */}.call(this, "src"))

/***/ }),

/***/ "./src/models.js":
/*!***********************!*\
  !*** ./src/models.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

__webpack_require__(/*! mongoose-double */ "mongoose-double")(mongoose);

const ObjectId = mongoose.Schema.Types.ObjectId;
var SchemaTypes = mongoose.Schema.Types;
const ButtonSchema = new mongoose.Schema({
  ubicacion: String,
  stream: String,
  status: {
    type: String,
    default: "success"
  },
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
  Mapa: Mapa
};

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

const jsonParser = bodyParser.json();

const request = __webpack_require__(/*! request */ "request");

const multer = __webpack_require__(/*! multer */ "multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/img/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({
  storage: storage
});

const models = __webpack_require__(/*! ./models */ "./src/models.js");

module.exports = app => {
  //insert usuarios
  app.post("/Buttons", jsonParser, async (req, res) => {
    const Button = await new models.Button(req.body).save();
    res.json(Button);
  }); //get all Buttons

  app.get("/Buttons", async (req, res) => {
    const cams = await models.Button.find({});
    res.json(cams);
  }); //get Button from ubicacion

  app.get("/Buttons/:ubicacion", async (req, res) => {
    const cam = await models.Button.find({
      ubicacion: req.params.ubicacion
    });
    res.json(cam);
  }); //delete Button from ubicacion

  app.delete("/Buttons/:ubicacion", async (req, res) => {
    const cam = await models.Button.findOneAndDelete({
      ubicacion: req.params.ubicacion
    });
    res.json(cam.ubicacion);
  }); //cambiar el status de una camara

  app.patch("/Buttons/:ubicacion", jsonParser, async (req, res) => {
    const cam = await models.Button.findOneAndUpdate({
      ubicacion: req.params.ubicacion
    }, {
      status: req.body.status
    });
    res.json("listo");
  }); //obtain Buttons status, igual devuelvo camaras pero aca las saco de otro lugar

  app.get("/status", async (req, res) => {
    let itBe = await request("http://localhost:3000/Buttons", {
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(body);
      }
    });
  }); //te devuelve el ultimo mapa

  app.get("/mapa", jsonParser, async (req, res) => {
    const mapa = await models.Mapa.findOne().sort({
      field: "asc",
      _id: -1
    }).limit(1);
    res.json(mapa);
  }); // guarda la imagen en una carpeta y la ruta en la bd

  app.post("/addMap", upload.single("productImage"), async (req, res) => {
    const mapa = await new models.Mapa({
      route: req.file.originalname
    }).save();
    res.render("addMap.html");
  }); //renders
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

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Usuario\Desktop\Pruebas Streaming\Botones Dynamicos\src/index.js */"./src/index.js");


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "mongoose-double":
/*!**********************************!*\
  !*** external "mongoose-double" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose-double");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ })

/******/ });
//# sourceMappingURL=main.map