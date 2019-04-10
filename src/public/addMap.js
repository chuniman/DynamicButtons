function previewFile(fileInput) {
  var file = fileInput.files[0];
  var formData = new FormData();
  formData.append("file", file);

  //guardar el nombre de la imagen en la bd
  $.ajax({
    url: "http://localhost:3000/mapa",
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      route: fileInput.files[0].name
    })
  });

  var reader = new FileReader();

  reader.addEventListener(
    "load",
    function() {
      setBackground(reader.result);
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}
function setBackground(imageURL) {
  document.body.style.backgroundImage = "url(" + imageURL + ")";
  document.body.style.backgroundSize = "100% auto";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center top";
}

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
