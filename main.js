/***** VALIDACIÓN FORMULARIO CON JQUERY ***********/

var reNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
var reApellidos = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
var reDNI = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
var reDireccion = /^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)* (((#|[nN][oO]\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/;
var reCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
var reTelefono = /^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$/;

$(document).ready(function(){
    $(".btnInscribete").click(function(){
        let nombre = $("#itNombre").val();
        let apellidos = $("#itApellidos").val();
        let DNI = $("#itDNI").val();
        let direccion = $("#itDireccion").val();
        let telefono = $("#itTelefono").val();
        let correo = $("#itCorreo").val();

        if (nombre == "" || !reNombre.test(nombre)){
            $("#mensaje1").fadeIn();
            $("#itNombre").css("border-color", "red");
            return false;
        } else{
            $(".errores").css("display", "none");
            $("#mensaje2").fadeIn();
            $("#itNombre").css("border-color", "green");
            $("#itApellidos").removeAttr("disabled");
            $("#itApellidos").focus();

            if (apellidos == "" || !reApellidos.test(apellidos)){
                $("#mensaje3").fadeIn();
                $("#itApellidos").css("border-color", "red");
                return false;
            } else{
                $(".errores").css("display", "none");
                $("#mensaje4").fadeIn();
                $("#itApellidos").css("border-color", "green");
                $("#itDNI").removeAttr("disabled");
                $("#itDNI").focus();

                if (DNI == "" || !reDNI.test(DNI)){
                    $("#mensaje5").fadeIn();
                    $("#itDNI").css("border-color", "red");
                    return false;
                } else{
                    $(".errores").css("display", "none");
                    $("#mensaje6").fadeIn();
                    $("#itDNI").css("border-color", "green");
                    $("#itDireccion").removeAttr("disabled");
                    $("#itDireccion").focus();

                    if(direccion == "" || reDireccion.test(direccion)){
                        $("#mensaje7").fadeIn();
                        $("#itDireccion").css("border-color", "red");
                        return false;
                    } else{
                        $(".errores").css("display", "none");
                        $("#mensaje8").fadeIn();
                        $("#itDireccion").css("border-color", "green");
                        $("#itTelefono").removeAttr("disabled");
                        $("#itTelefono").focus();

                        if(telefono == "" || reTelefono.test(telefono)){
                            $("#mensaje9").fadeIn();
                            $("#itTelefono").css("border-color", "red");
                            return false;
                        } else{
                            $(".errores").css("display", "none");
                            $("#mensaje10").fadeIn();
                            $("#itTelefono").css("border-color", "green");
                            $("#itCorreo").removeAttr("disabled");
                            $("#itCorreo").focus();

                            if(correo == "" || reCorreo.test(correo)){
                                $("#mensaje11").fadeIn();
                                $("#itCorreo").css("border-color", "red");
                                return false;
                            } else{
                                $(".errores").css("display", "none");
                                $("#mensaje12").fadeIn();
                                $("#itCorreo").css("border-color", "green");
                                $("#abono").removeAttr("disabled");
                                $("#abono").focus();

                                if ($("#abono").val().trim() == ""){
                                    return false;
                                } else{
                                    $(".errores").css("display", "none");
                                    $("#checkbox").focus();

                                    if($("#checkbox").is(':checked')){
                                        return true;
                                    } else{
                                        $("#mensaje13").fadeIn();
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
});

window.onload = function(){
    servicios();
}

var respuesta;
function servicios(){
    $.ajax({
        url: 'servtest.json',
        success: function(respuesta) {
            console.log(respuesta);
            var idServicio = $("#servicio");
            $.each(respuesta.Servicios, function(index, elemento){
                idServicio.append(
                    '<div class="servicio">' +
                        '<img src=' +elemento.Logo+ '>'+
                        '<h3>' +elemento.Abono + '</h3>' +
                        '<h1>' +elemento.Precio + '</h1>' +
                        '<p>' +elemento.Cuota + '</p>' +
                        '<p>' +elemento.Compromiso + '</p>' +
                        '<p>' +elemento.Matricula + '</p>' +
                    '</div>'
                );
            });
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        },
        timeout: '10000'
    });
}

/*function maquetaRespuestaServicio(respuesta){
    for (i=0; i<=respuesta.length; i++){    
        let idServicio = document.getElementById("servicio");
        let divServicio = document.createElement("div");
        divServicio.setAttribute("class", "servicio");

        let abono = document.createElement("h3");
        let precio = document.createElement("h1");
        let cuota = document.createElement("p");
        let compromiso = document.createElement("p");
        let matricula = document.createElement("p");

        abono.innerText = servicio.Abono;
        precio.innerText = servicio.Precio;
        cuota.innerText = servicio.Cuota;
        compromiso.innerText = servicio.Compromiso;
        matricula.innerText = servicio.Matricula;

        divServicio.append(abono);
        divServicio.append(precio);
        divServicio.append(cuota);
        divServicio.append(compromiso);
        divServicio.append(matricula);


        idServicio.appendChild(divServicio);
    }
}*/