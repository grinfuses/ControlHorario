
$( "#buscar_registros" ).submit(function( event ) {
    // get all the inputs into an array.
    var $inputs = $('#buscar_registros :input');

    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    var data = {};
    $inputs.each(function() {
        data[this.id] = $(this).val();
    });
    var url ="http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:3000/buscarPorFechaAcumulando/" +data.dia_inicio+"/"+data.dia_fin;
    var settings = {
        "url": url,
        "method": "POST",
        "headers": {
          "Content-Type": ["application/x-www-form-urlencoded"]
        },
        };
    
        $.post(url, {}, function(result){
            //$("span").html(result);
            console.log(result);
          });
    // $.post(settings).done(function(data) {
    //     console.log(data);
    //   }).fail(function(data){
    //     console.log("Try again champ!");
    //   });
  });