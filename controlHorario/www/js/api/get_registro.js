$( "#buscar_registros" ).submit(function( event ) {
  event.preventDefault()
  var $inputs = $('#buscar_registros :input');
  var data = {};
  $inputs.each(function() {
      data[this.id] = $(this).val();
  });
    var url_get ="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:3000/buscarPorFechaAcumulando/" +data.dia_inicio+"/"+data.dia_fin;
    $.ajax({
      url: url_get,
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
       var col = [];
       for (var i = 0; i < data.length; i++) {
           for (var key in data[i]) {
               if (col.indexOf(key) === -1) {
                   if(key=="dia" || key=="horaEntrada" || key =="horaSalida" || key=="Observaciones" ||key=="saldoHorario" || key=="suma_acumulada"){
                        col.push(key);
                    }
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
               var space="";
               const regex = /[0-9]*-[0-9]*-[0-9]*T[0-9]*:[0-9]*:[0-9]*.[0-9]*Z/;
               // ADD JSON DATA TO THE TABLE AS ROWS.
               for (var i = 0; i < data.length; i++) {
       
                   tr = table.insertRow(-1);
       
                   for (var j = 0; j < col.length; j++) {
                       var tabCell = tr.insertCell(-1);
                       var data_input = data[i][col[j]];
                       
                       if(data_input ==null){
                        tabCell.innerHTML = space;
                       }else{
                        if(data_input.match(regex)){
                            date = new Date(data_input);
                                year = date.getFullYear();
                                month = date.getMonth()+1;
                                dt = date.getDate();
                                if (dt < 10) {
                                dt = '0' + dt;
                                }
                                if (month < 10) {
                                month = '0' + month;
                                }
                                var day_input = dt+'/'+month+'/'+year;
                                tabCell.innerHTML =day_input; 
                        }else{
                            tabCell.innerHTML = data_input;
                        }
                    }
                       }
                   }
               
       
               // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
               var divContainer = document.getElementById("tabla_registros");
               divContainer.innerHTML = "";
               divContainer.appendChild(table);
      }
});
    
  });