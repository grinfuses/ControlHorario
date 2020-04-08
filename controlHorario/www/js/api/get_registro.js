$( "#buscar_registros" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#buscar_registros :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
    var url_get ="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:3000/buscarPorFechaAcumulando/" +data.dia_inicio+"/"+data.dia_fin;
    // $.ajax({
    //       url: url_get,
    //       type: 'post',
    //       dataType: 'json',
    //       error: function(XMLHttpRequest, textStatus, errorThrown) {
    //         alert('Error al consultar el registro');
    //         console.log(JSON.stringify(XMLHttpRequest));
    //         console.log(JSON.stringify(textStatus));
    //         console.log(JSON.stringify(errorThrown));
    //       },
    //       success: function (data) {
    //         console.log("entra sucess");
    //         console.log(data);
    //       },
    // timeout: 5000 // sets timeout to 3 seconds      
    // });
    // var settings = {
    //   "url": "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:3000/buscarPorFechaAcumulando/2020-01-01/2020-08-01",
    //   "method": "POST",
    //   "timeout": 4000,
    //   "headers": {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    // };
    
    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    // });
    $.ajax({
      url: "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:3000/buscarPorFechaAcumulando/2020-01-01/2020-08-01",
      type: 'post',
      timeout: 5000, 
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Error al crear el registro, reinténtelo más tarde');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
       console.log(data);
       var col = [];
       for (var i = 0; i < data.length; i++) {
           for (var key in data[i]) {
               if (col.indexOf(key) === -1) {
                   col.push(key);
               }
           }
       }
               // CREATE DYNAMIC TABLE.
               var table = document.createElement("table");

               // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
       
               var tr = table.insertRow(-1);                   // TABLE ROW.

               for (var i = 0; i < col.length; i++) {
                   var th = document.createElement("th");      // TABLE HEADER.
                   th.innerHTML = col[i];
                   tr.appendChild(th);
               }
       
               // ADD JSON DATA TO THE TABLE AS ROWS.
               for (var i = 0; i < data.length; i++) {
       
                   tr = table.insertRow(-1);
       
                   for (var j = 0; j < col.length; j++) {
                       var tabCell = tr.insertCell(-1);
                       tabCell.innerHTML = data[i][col[j]];
                   }
               }
       
               // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
               var divContainer = document.getElementById("tabla_registros");
               divContainer.innerHTML = "";
               divContainer.appendChild(table);
      }
});
    
  });