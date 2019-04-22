//variables de Vue para los estados de los botones
var buttonsApp = new Vue({
    el: "#mapa",
    data: {
      buttonsStatus: {}
    }
  });

// para mostrar los botones de las camaras en la pantalla
$(document).ready(function() {
    $.ajax({
      url: "/Buttons",
      type: "GET",
      contentType: "application/json",
      success: function(data) {
        let buttonsStatus = {};
        for (let index = 0; index < data.length; index++) {
          buttonsStatus[data[index]["ubicacion"]] = data[index]["status"];
          var ubicacion = data[index]["ubicacion"];
          var div = $('<div class="image-wrapper" id="' + ubicacion + '">')
            .css({
              left: data[index]["X"] + "px",
              top: data[index]["Y"] + "px"
            })
            .append(
              $(
                '<button type="button" class="btn btn-circle btn-' +
                  data[index]["status"] +
                  '" id=' +
                  ubicacion +
                  ">" +
                  ubicacion +
                  "</button>"
              )
            )
            .appendTo("#mapa");
        }
        buttonsApp.buttonsStatus = buttonsStatus;
      }
    });
  });



//ir a buscar a el nombre de la ultima imagen a la bd
$(document).ready(function() {
    var imgName = "";
    $.ajax({
      url: "/mapa",
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      success: function(data) {
        document.body.style.backgroundImage = "url(/img/" + data["route"] + ")";
      }
    });
  
    document.body.style.backgroundImage = "url(/img/" + imgName + ")";
  });