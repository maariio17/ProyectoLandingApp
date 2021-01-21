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
        timeout: '5000'
    });

var vista = 0;
$(function () {
    //Boton ScrollTop
    $("#subir").click( function(){
        $("html").animate( {scrollTop: 0}, 3000)
    });

    $(".ofertas").click( function(){
        $(window).scrollTop(400);
    });

    //Animacion div Servicios
    $(window).scroll(function () {
        if($(window).scrollTop() >= 750 || $(window).scrollTop() <= 900){
            $(".servicios").slideDown("slow");  
        }
    });

    //Cambiar Vista Testimonios
    $("#vista").click( function(){
        if (vista == 0){
            $(".testimonios").fadeOut("slow");
            $(".testimonios").fadeIn("slow");
            $(".testimonio").attr("class", "vistaHorizontal");
            $(".comentario").css("width", "50%");
            vista = 1;
        } else{
            $(".testimonios").fadeOut("slow");
            $(".testimonios").fadeIn("slow");
            $(".vistaHorizontal").attr("class", "testimonio");
            $(".comentario").css("width", "auto");
            vista = 0;
        }
    });

    //Animacion div Testimonios
    $(window).scroll(function () {
        if($(window).scrollTop() >= 400 && $(window).scrollTop() <= 500){
            $(".testimonios").slideDown("slow");
        }
    });
});

let arrTestimonios=[]
let fTestimonios=$.ajax({
    url: "servtest.json",
    timeout: '5000',
    success: function (response) {
        $.each(response.Testimonios, function (index, el) {
            const article=$('<div>').attr("class", "testimonio");
            const img=$('<img>').attr('src',el.ImagenCliente);
            const name=$('<h2>').text(el.NombreCliente);
            const text=$('<p>').text(el.Comentario).attr("class", "comentario");
            const date=$('<p>').text(el.Fecha).attr('style','text-align:center');
            let art= $(article)
            .append(img)
            .append(name)
            .append(date)
            .append(text);
            arrTestimonios.push(article);
            //console.dir(article);
        });
        
        function testimonioAleatorio(){
            let randomTestimonios=[];
            /*for (let i = 0; i < 3; i++) {
                let random= Math.floor( Math.random() * (arrTestimonios.length));
                
                /*Para Que no se repita div (No funciona correctamente)
                if (randomTestimonios.includes(random) && random <= 6){
                    random++;
                } else if(arrTestimonios.includes()){
                    random == 0;
                }*/
                //randomTestimonios.push(random);
                //console.log(random);
                
            //}

            while (randomTestimonios.length < 3){
                var numeroAleatorio = Math.floor( Math.random() * (arrTestimonios.length));
                var existe = false;

                for (var i=0; i<randomTestimonios.length; i++){
                    if (randomTestimonios[i] == numeroAleatorio){
                        existe = true;
                        break;
                    }
                }
                if (!existe){
                    randomTestimonios[randomTestimonios.length] = numeroAleatorio;
                }
            }

            for (let i = 0; i < randomTestimonios.length; i++) {
                $('#testimonio').append(arrTestimonios[randomTestimonios[i]]);
            }
        }
        testimonioAleatorio();
        window.setInterval(
            function(){
                $(".testimonio").remove();
                //$(".vistaHorizontal").attr("class", "testimonio");
                //$(".comentario").css("width", "auto");
                testimonioAleatorio();

                /*if (vista == 0){
                    console.log("Hola Vista 0")
                    $(".testimonio").remove();
                    $(".vistaHorizontal").attr("class", "testimonio");
                    $(".comentario").css("width", "auto");
                    testimonioAleatorio();
                } else{
                    console.log("Adios Hola Vista 1");
                    $(".testimonio").remove();
                    $(".vistaHorizontal").remove();
                    //$(".testimonio").attr("class", ".vistaHorizontal");
                    //$(".comentario").css("width", "auto");
                    testimonioAleatorio();
                    vista = 0;
                }*/
                
            }, 5000);
        
    },
    error: function() {
        console.error("No se ha podido obtener la información");
    }
});


$(function () {
    // Get user position
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(getCountryName, positionError, options);
});

/**
 * Print user country to console
 * @param {GeolocationPosition} position User position
 */
function getCountryName(position) {
    $.ajax(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&location_type=APPROXIMATE&result_type=country&key=AIzaSyC9tKLdOI8TPGA7qYzevuquEA3Mb-duWNs`)
        .done((response) => {
            console.log(response.results[0].address_components[0].long_name);
        })
        .fail((error) => {
            console.warn(error);
        });
}

/**
 * Manage error in geolocation
 * @param {GeolocationPositionError} error Error in geolocation
 */
function positionError(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
}