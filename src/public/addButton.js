//añadir botones
$(document).ready(function() {
  var fadeDelay = 1000;
  var fadeDuration = 1000;
  $(document).on("click", ".pushbar_overlay", function(e) {
    //.pushbar_overlay esto es lo que va como selector del click
    if (e.which == 1) {
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
              '<div type="button" class="btn btn-circle btn-success" id=' +
                ubicacion +
                ">" +
                ubicacion +
                "</div>"
            )
          )
          .appendTo("#mapa");
        $("#" + ubicacion).draggable();

        console.log(
          JSON.stringify({
            X: e.pageX,
            Y: e.pageY,
            ubicacion: $("#ubicacion").val(),
            stream: $("#stream").val()
          })
        );
        $.ajax({
          url: "/Buttons",
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
      }
    }
  });
});
