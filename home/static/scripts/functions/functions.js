var ruta = '/',
    csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

// -- Muestra una vista previa de las imágenes subidas a un input file --
	function PreviewImage(id,input){
		console.log('PreviewImage');

		if ($("#ImageInput"+id).val().trim() !== ''){
			$("#PreviewContainer"+id).html('<img id="ImagePreview'+id+'" src="" width="100%"/>');
			ReadInputFile(input,id);
		}

	}

	function ReadInputFile(input,id) {
		console.log('ReadInputFile');

		if (input.files && input.files[0]) {
			var reader = new FileReader();		
			reader.onload = function(e) {
				$("#ImagePreview"+id).prop('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}

	}
// -- -- --

// -- Devuelve un string random con una longitud preestablecida --
	function RandomString(length = 10) {
		console.log('RandomString');

		var RandomString = "",
				Possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-=|_@";

		for (var i = 0; i < length; i++){
			RandomString += Possible.charAt(Math.floor(Math.random() * Possible.length));
		}

		return RandomString;

	}
// -- -- --

// -- Alerta en forma de modal bootstrap --
	function AlertModal(Title, Message, id = '') {
		console.log('AlertModal');

	  if (id === '') {

	    var html='';

      html+='<div class="modal fade cargar_vista" id="modalpro" tabindex="-1" role="dialog" aria-labelledby="Inserta" aria-hidden="true">';
      html+='<div class="modal-dialog" role="document">';
      html+='<div class="modal-content">';
      html+='<div class="modal-header">';
      html+='<h5 class="modal-title" id="exampleModalLabel">'+Title+'</h5>';
      html+='<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
      html+='<span aria-hidden="true">&times;</span>';
      html+='</button>';
      html+='</div>';
      html+='<div class="modal-body ng-scope" style="overflow-x: hidden;">';
      html+=Message;
      html+='</div>';
      html+='<div class="modal-footer">';
      html+='<button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>';
      html+='</div>';
      html+='</div>';
      html+='</div>';
      html+='</div>';

	    $( ".AlertModal" ).html( html );
	    $('#modalpro').modal('show');

	  } else {

	    var html='';

      html+='<div class="modal fade cargar_vista" id="modalpro" tabindex="-1" role="dialog" aria-labelledby="Inserta" aria-hidden="true">';
      html+='<div class="modal-dialog" role="document">';
      html+='<div class="modal-content">';
      html+='<div class="modal-header">';
      html+='<h5 class="modal-title" id="exampleModalLabel">'+Title+'</h5>';
      html+='<button type="button" class="close" onclick="closemodalfromothermodal(\'modalpro\',0)" aria-label="Close">';
      html+='<span aria-hidden="true">&times;</span>';
      html+='</button>';
      html+='</div>';
      html+='<div class="modal-body" style="overflow-x: hidden;">';
      html+=Message;
      html+='</div>';
      html+='<div class="modal-footer">';
      html+='<button type="button" class="btn btn-primary" onclick="closemodalfromothermodal(\'modalpro\',0)">Cerrar</button>';
      html+='</div>';
      html+='</div>';
      html+='</div>';
      html+='</div>';
      
	    $('#'+id).html(html);
	    $('#modalpro').modal('show');
	  }

	}
// -- -- --

// -- Diferencia de fechas --
	function DateDiference(f1,f2){
		console.log('DateDiference');

    var aFecha1 = f1.split('/'),
   			aFecha2 = f2.split('/'),
   			fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]),
   			fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]),
   			dif = fFecha2 - fFecha1,
   			dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;

	}
// -- -- --

// -- Funciones de modal --
	function OpenModal(id, how, width){
	  console.log('OpenModal');

	  var WindowWidth = $(window).width();

	  if(how === 1){

	    if (WindowWidth>750) {
	      var dialogstyles = {"width": width+"%", "max-width": "100%", "height": "100vh"}
	      $('#'+id+'Dialog').css(dialogstyles);
	      $('#'+id+'Body').removeAttr('style');
	      $('#'+id+'Modal').modal({backdrop: 'static', keyboard: false , show: true});
	    } else {
	      $('#'+id+'Modal').modal({backdrop: 'static', keyboard: false , show: true});
	    }

	  } else if (how === 2){

	    if (WindowWidth>750) {
	      var dialogstyles = {"width": width+"%", "max-width": "100%", "height": "80%", "max-height": "100%"}
	      $('#'+id+'Dialog').css(dialogstyles);
	      $('#'+id+'Body').removeAttr('style');
	      $('#'+id+'Modal').modal({backdrop: 'static', keyboard: false , show: true});
	    } else {
	      $('#'+id+'Modal').modal({backdrop: 'static', keyboard: false , show: true});
	    }

	  }  else {
	    $('#'+id+'Modal').modal({backdrop: 'static', keyboard: false , show: true});
	  }

	  PutScrollonModal(id);
	}

	function PutScrollonModal(id){
	  console.log('PutScrollonModal');

	  var windowsheight = $(window).height() - 200,
    		dialogstyles = {"overflow-y": "initial"},
    		bodystyles = {"height": windowsheight, "overflow-y": "auto"};

	  if($('#'+id+'Content').height() > windowsheight){
	    $('#'+id+'Dialog').css(dialogstyles);
	    $('#'+id+'Body').css(bodystyles);
	  }

	}
// -- -- --

// -- Funciones de modal --
	function ValidJSON(miJSON){ 
	  console.log('ValidJSON');
    
    var requerido		= "",
    		caracteres	= "",
    		alias				= "",
    		campo				= "",
    		msj					= "",
    		valor				= "",
    		filtro			= "",
    		validacion	= 1;

    // var idiomacrm = $("#LanguageID_General").val(); 

    // if(idiomacrm == undefined || idiomacrm.trim() == ''){
    //   idiomacrm = 'es';
    // }

    $.each(miJSON, function(idcampo){
        
        alias       = miJSON[idcampo].alias;    
        requerido   = miJSON[idcampo].requerido;
        numerico    = miJSON[idcampo].numerico;
        alfabetico  = miJSON[idcampo].alfabetico;
        minlongitud = miJSON[idcampo].minlongitud;
        maxlongitud = miJSON[idcampo].maxlongitud;
        email       = miJSON[idcampo].email;

        campo = $("#"+idcampo).val();
        
        if(requerido === "true" || requerido === true){
            
            if(campo === ""){               
              msj += "<li>El campo \""+alias+"\" es requerido.</li>";           
              $("#"+idcampo).addClass("EmptyField");              
              validacion = 0;
              valor      = false;
            }else{             
              $("#"+idcampo).removeClass("EmptyField"); 
            }

        }

        if(numerico === "true" || numerico === true){            
            if(isNaN(campo)){              
                msj += "<li>El campo \""+alias+"\" debe ser numérico</li>";           
                $("#"+idcampo).addClass("EmptyField");
                validacion = 0;
                valor      = false;
            }else{            
                $("#"+idcampo).removeClass("EmptyField"); 
            }
        }

        if(alfabetico === "true" || alfabetico === true){          
          filtro=/^[A-Za-z\_\-\.\s\xF1\xD1]+$/;          
          if ( filtro.test( document.getElementById(idcampo).value ) ){
            $("#"+idcampo).removeClass("EmptyField");             
          }else{
            msj += "<li>El campo \""+alias+"\" debe ser un texto.</li>";         
            $("#"+idcampo).addClass("EmptyField");
            validacion = 0;
            valor = false;
          }
        }

        if(minlongitud > 0 || maxlongitud > 0){          
          
          if ((campo.length >= minlongitud && campo.length <= maxlongitud) || (campo.length === 0 && (requerido === "false" || requerido === false))){
            $("#"+idcampo).removeClass("EmptyField"); 
            msj   += "";       
          }else{    

            if( campo.length < minlongitud ){
               msj += "<li>El campo \""+alias+"\" debe tener mínimo " + maxlongitud + " caracteres.</li>";
               valor = false;
               $("#"+idcampo).addClass("EmptyField");
                validacion = 0;
            }

            if( campo.length > maxlongitud ){ 
              msj += "<li>El campo \""+alias+"\" debe tener máximo " + maxlongitud + " caracteres.</li>";
              valor = false;
              $("#"+idcampo).addClass("EmptyField");
              validacion = 0;
            } 
            
          }
        }

        //valida email.
        if(email === "true" || email === true){
          var filtro = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if($("#"+idcampo).val() !== ''){

            if(filtro.test(document.getElementById(idcampo).value)){
              $("#"+idcampo).removeClass("EmptyField");
              msj   += "";
            }else{
              msj += "<li>El campo \""+alias+"\" debe ser un email.</li>";
              $("#"+idcampo).addClass("EmptyField");
              validacion = 0;
              valor = false;
            }

          }

        }

    }); 
   
    if(validacion===0){
      return msj;
    }else{
      return 0;
    }

	}
// -- -- --