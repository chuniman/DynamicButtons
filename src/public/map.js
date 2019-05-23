//para obtener id
$(document).ready(function() {
  $(document).on("click", "#mapa div div", function() {
    var ubication = $(this).attr("id");
    alert($(this).attr("id"));
  });
});

//para que se viva ejecutando la ida a buscar recursos
setInterval(function() {
  $.ajax({
    // 3001 es para ir al pasamanos luego lo tengo que cambiar a 3000
    url: "/status",
    type: "GET",
    contentType: "application/json",
    success: function(data) {
      let buttonsStatus = {};

      buttonsNav.cantidadDanger = 0;
      buttonsNav.cantidadWarning = 0;
      buttonsNav.cantidadSuccess = 0;
      buttonsNav.cantidadDark = 0;

      for (let index = 0; index < data.length; index++) {
        let ubicacion = data[index]["ubicacion"];

        if (data[index]["status"] == "danger") {
          buttonsNav.cantidadDanger++;
        }
        if (data[index]["status"] == "warning") {
          buttonsNav.cantidadWarning++;
        }
        if (data[index]["status"] == "success") {
          buttonsNav.cantidadSuccess++;
        }
        if (data[index]["status"] == "dark") {
          buttonsNav.cantidadDark++;
        }
        if (data[index]["status"] != buttonsApp.buttonsStatus[ubicacion]) {

          //si aparece un danger se suena la alarma 
          if (data[index]["status"]=="danger") {
            playAudio();
          }

          //primero borro el anterior
          $("#" + ubicacion).remove();

          //aca se rehace el boton
          var div = $('<div class="image-wrapper" id="' + ubicacion + '">')
            .css({
              left: data[index]["X"] + "px",
              top: data[index]["Y"] + "px"
            })
            .append(
              $(
                '<div type="button" class="btn btn-circle btn-' +
                  data[index]["status"] +
                  '" id=' +
                  ubicacion +
                  ">" +
                  ubicacion +
                  "</div>"
              )
            )
            .appendTo("#mapa");
        }
        buttonsStatus[ubicacion] = data[index]["status"];
      }
      
      //aca se actualiza la grafica
      var statusCount=[['OK',buttonsNav.cantidadSuccess],['Alarma',buttonsNav.cantidadDanger],['Baja Bateria',buttonsNav.cantidadWarning],['Fuera de servicio',buttonsNav.cantidadDark]];
      HChart.series[0].setData(statusCount);
      
      //para quedarse con la nueva configuracion y la proxima comparar contra esta
      buttonsApp.buttonsStatus = buttonsStatus;
    }
  }); // este 5000 simboliza 5 segundos, se ejecuta cada 5 segundos
}, 5000);

//la grafica
// Aca se crea
var HChart = Highcharts.chart("container", {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false,
    backgroundColor: 'transparent',
    spacingBottom:0,
    spacingTop:0,
    height:"400"

  },
  title: {
    text: "Status",
    align: "center",
    verticalAlign: "middle",
    y: 40
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  exporting: {
    enabled: false
},
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: true,
        distance: -50,
        style: {
          fontWeight: "bold",
          color: "white"
        }
      },
      colors:["#1EDF3E","#E51919","#EEEE0E","#7F7A74"],
      startAngle: -90,
      endAngle: 90,
      center: ["50%", "75%"],
      size: "110%"
    }
  },
  series: [
    {
      type: "pie",
      name: "Browser share",
      innerSize: "50%",
      data: []
    }
  ]
});

setTimeout(function() {
  var highchart = document.querySelector(".highcharts-container svg:last-of-type");
  highchart.setAttribute("viewBox", "0 270 650  50");
}, 10);

//para tocar el audio
var x = document.getElementById("myAudio"); 
function playAudio() { 
  x.play(); 
} 