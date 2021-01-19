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

function servicios(){
    let peliculaBuscar = document.getElementById("busqueda").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Aquí dentro haces las cosas que quieras hacer con los datos que consigues de la API. Por ejemplo un console.log()
            //console.log(xhttp.responseText);
            // Esto te devuelve las cosas como texto plano si no me equivoco, así que tendrías que hacerle un JSON.parse()
            // También puedes llamar a una función que hayas definido en otro lado y pasarle el xhttp.responseText como argumento
            pelicula = JSON.parse(xhttp.responseText);
            borrar();
            maquetaRespuesta(pelicula);
            //console.log(pelicula);
        }
    };
    xhttp.open("GET", "https://www.omdbapi.com/?apikey=5f2a0e9a&t="+peliculaBuscar+"", true); // Aquí está puesto un ejemplo de llamada a la API, tienes que poner lo que necesites. En este caso es buscar las pelis que se llamen Titanic
    xhttp.send(); // Cuando llamas al send se lanza la petición y se ejecuta lo de xhttp.onreadystatechange
}