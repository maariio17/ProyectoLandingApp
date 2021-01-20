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

var respuesta;
let servicios=
    $.ajax({
        url: 'servtest.json',
        success: function(respuesta) {
            //console.log(respuesta);
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

$(function () {
    //Boton ScrollTop
    $("#subir").click( function(){
        console.log("esto funciona");
        $("html").animate( {scrollTop: 0}, 3000)
    });

    $(".ofertas").click( function(){
        $(window).scrollTop(400);
    });

    //Animacion div Servicios
    $(window).scroll(function () {
        if($(window).scrollTop() >= 750 || $(window).scrollTop() <= 900){
            //console.log("Esto si funciona");
            $(".servicios").slideDown("slow");  
        }
    });
});

let arrTestimonios=[]
let fTestimonios=$.ajax({
    url: "servtest.json",
    success: function (response) {
        //console.log(respuesta);
        var idTestimonio = $("#testimonio");
        $.each(response.Testimonios, function (index, elemento) { 
            idTestimonio.append(
                '<div class="testimonio">' +
                    '<img src=' +elemento.ImagenCliente+ '>'+
                    '<h2>' +elemento.NombreCliente + '</h2>' +
                    '<p>' +elemento.Comentario + '<p>' +
                    '<p>' +elemento.Fecha + '</p>' +
                '</div>'
            );
            arrTestimonios.push(idTestimonio);
            //console.log(arrTestimonios);
        });
        function testimonioAleatorio(){
            let randomTestimonios=[];
            for (let i = 0; i < 3; i++) {
                let random= Math.floor( Math.random() * (arrTestimonios.length));
                randomTestimonios.push(random);
            }
            console.dir(randomTestimonios);
            for (let i = 0; i < randomTestimonios.length; i++) {
                console.log(i);
                $('#testimonio').prepend(arrTestimonios[randomTestimonios[i]]);
            }
        }
        testimonioAleatorio();
        
    },error: function() {
        console.error("No se ha podido obtener la información");
    }
});
