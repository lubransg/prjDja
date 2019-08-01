function Login () {
	console.log('Login');

  var arreglo = {
    "UserCode":
      {
        "requerido"   : true, 
        "alias"       : "Usuario"
      },
    "UserPass":
      {
        "requerido"   : true, 
        "alias"       : "Clave"
      }
	}
    
  var msjerror = '<ul>',
  		// error = 0,
  		validar = ValidJSON(arreglo);

  if(validar !== 0){
    msjerror += validar + '</ul>';
    // error = 1;
    AlertModal('Error',msjerror);
    return false;
  }

  var UserCode = $('#UserCode').val(),
			UserPass = $('#UserPass').val();

  var parametros = {
    'UserCode' : UserCode,
    'UserPass' : UserPass
  }

  $.ajax({
      url: ruta + 'home/TryLogin',
      type: 'post',
      data: parametros,
      beforeSend: function (xhr, settings) {
        $(".lds-ring").show();
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
      },
      success:  function (data) {
        $(".lds-ring").hide();
        if(data.trim() === 'Correcto'){
					window.location.replace("/home/Welcome");
        }
      },
      error: function (error) {
        $(".lds-ring").hide();
      }
  });
}