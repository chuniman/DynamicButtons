//añadir botones
$(function() {
  var fadeDelay = 1000;
  var fadeDuration = 1000;
  $(document).mousedown(function(e) {
    if (e.which == 1) {
      console.log($(this)[0].id);
      if (!(e.pageX > 1250 && e.pageY < 80) && !(e.pageX < 130 && e.pageY < 55)) {
        if ($("#ubicacion").val() != "" && $("#stream").val() != "") {
          var ubicacion = $("#ubicacion")
            .val()
            .split(" ")
            .join("_");
          var div = $('<div class="image-wrapper">')
            .css({
              left: e.pageX + "px",
              top: e.pageY + "px"
            })
            .append(
              $(
                '<button type="button" class="btn btn-circle btn-success" id=' +
                  ubicacion +
                  ">" +
                  ubicacion +
                  "</button>"
              )
            )
            .appendTo("#mapa");
          console.log(
            JSON.stringify({
              X: e.pageX,
              Y: e.pageY,
              ubicacion: $("#ubicacion").val(),
              stream: $("#stream").val()
            })
          );
          $.ajax({
            url: "http://localhost:3000/Buttons",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
              X: e.pageX,
              Y: e.pageY,
              ubicacion: ubicacion,
              stream: $("#stream").val()
            })
          });
          // setTimeout(function() {
          // 	div.addClass('fade-out');
          // 	setTimeout(function() { div.remove(); }, fadeDuration);
          // }, fadeDelay);
        }
      }
    }
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