
//delete Buttons
$(document).ready(function() {
  $(document).on("click", "#mapa div div", function() {
    var ubication = $(this).attr("id");
    $.ajax({
      url: "/Buttons/" + ubication,
      type: "DELETE",
      contentType: "application/json",
      dataType: "json",
      success: function() {
        $("#" + ubication).remove();
      }
    });
  });
});