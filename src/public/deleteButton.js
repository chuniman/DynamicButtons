// para mostrar el mapa de camaras
$(document).ready(function() {
  $.ajax({
    url: "http://localhost:3000/Buttons",
    type: "GET",
    contentType: "application/json",
    success: function(data) {
      for (let index = 0; index < data.length; index++) {
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
    }
  });
});

//delete Buttons
$(document).ready(function() {
  $(document).on("click", "button", function() {
    var ubication = $(this).attr("id");
    $.ajax({
      url: "http://localhost:3000/Buttons/" + ubication,
      type: "DELETE",
      contentType: "application/json",
      dataType: "json",
      success: function() {
        $("#" + ubication).remove();
      }
    });
  });
});

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
