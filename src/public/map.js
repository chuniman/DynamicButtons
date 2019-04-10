var camerasApp = new Vue({
  el: "#mapa",
  data: {
    camerasStatus: {}
  }
});

// para mostrar los botones de las camaras en la pantalla
$(document).ready(function() {
  $.ajax({
    url: "http://localhost:3000/cameras",
    type: "GET",
    contentType: "application/json",
    success: function(data) {
      let camerasStatus = {};
      for (let index = 0; index < data.length; index++) {
        camerasStatus[data[index]["ubicacion"]] = data[index]["status"];
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
      camerasApp.camerasStatus = camerasStatus;
    }
  });
});

//para obtener id
$(document).ready(function() {
  $(document).on("click", "button", function() {
    var ubication = $(this).attr("id");
    alert($(this).attr("id"));
    console.log(ubication);
  });
});

//para que se viva ejecutando la ida a buscar recursos
setInterval(function () {
  $.ajax({
    // 3001 es para ir al pasamanos luego lo tengo que cambiar a 3000
    url: "http://localhost:3000/status",
    type: "GET",
    contentType: "application/json",
    success: function(data) {
      let camerasStatus = {};

      for (let index = 0; index < data.length; index++) {
        console.log(index);
        console.log(camerasApp.camerasStatus[data[index]["ubicacion"]]);
        
      }
      for (let index = 0; index < data.length; index++) {
        let ubicacion=data[index]["ubicacion"];
        if (data[index]["status"]!=camerasApp.camerasStatus[ubicacion]) {

          //primero borro el anterior
          $("#"+ubicacion).remove(); 

          //esto para ver si se pone bien
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
        camerasStatus[ubicacion] = data[index]["status"];


      }
      camerasApp.camerasStatus = camerasStatus;
    }
  });
}, 5000)


//ir a buscar a el nombre de la ultima imagen a la bd
$(document).ready(function() {
  var imgName = "";
  $.ajax({
    url: "http://localhost:3000/mapa",
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function(data) {
      document.body.style.backgroundImage = "url(/img/" + data["route"] + ")";
      console.log(data["route"]);
    }
  });

  document.body.style.backgroundImage = "url(/img/" + imgName + ")";
});