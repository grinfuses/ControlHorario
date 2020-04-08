
$( "#nuevo_registro" ).submit(function( event ) {
    // get all the inputs into an array.
    var $inputs = $('#nuevo_registro :input');

    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    var data = {};
    $inputs.each(function() {
        data[this.id] = $(this).val();
    });
    console.log(data);
    var settings = {
        "url": "http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com:3000/nuevoregistro/",
        "method": "POST",
        "headers": {
          "Content-Type": ["application/x-www-form-urlencoded"]
        },
        "data": data,
        };
      
      $.ajax(settings).done(function (response) {
        console.log(response); 
      });
  });