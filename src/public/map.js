var buttonsApp = new Vue({
  el: "#mapa",
  data: {
    buttonsStatus: {}
  }
});

//para obtener id
$(document).ready(function() {
  $(document).on("click", "#mapa div button", function() {
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
      let buttonsStatus = {};

      for (let index = 0; index < data.length; index++) {
        console.log(index);
        console.log(buttonsApp.buttonsStatus[data[index]["ubicacion"]]);
        
      }
      for (let index = 0; index < data.length; index++) {
        let ubicacion=data[index]["ubicacion"];
        if (data[index]["status"]!=buttonsApp.buttonsStatus[ubicacion]) {

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
        buttonsStatus[ubicacion] = data[index]["status"];


      }
      buttonsApp.buttonsStatus = buttonsStatus;
    }
  });
}, 5000)
