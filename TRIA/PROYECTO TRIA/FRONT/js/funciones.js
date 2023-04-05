/* 
 * Scripts
 * Voluta Estudio
 */

/*VARIABLES GLOBALES */

var esperaLink = "<div class='spinner-border text-primary' role='status'><span class='sr-only'>Un momento por favor...</span></div>";
var esperaSmall = "<img src='img/espera.gif' width=20>";
var mensaje = "";
eliminaspam();
var geoDireccion = "";



function existe(valor) {
    if (valor == "" | valor == undefined | valor == null | String(valor).trim() == "") {
        return false;
    } else {
        return true;
    }
}

function anuncio(mensaje) {
    $("#aviso").show();
    $("#mensaje").show();
    $("#mensaje").children().remove();
    $("#mensaje").append("<p>" + mensaje + "</p><button name=aceptar class='btn btn-success'>Aceptar</button>");
    //evento
    $("#mensaje button[name=aceptar]").click(function () {
        $("#aviso").toggle();
        $("#mensaje").toggle();
    });
}

function aviso(mensaje) {
    $("#aviso").show();
    $("#mensaje").show();
    $("#mensaje").children().remove();
    $("#mensaje").append("<p>" + mensaje + "</p><button name=aceptar class='btn btn-success'>Aceptar</button>");
    //evento
    $("#mensaje button[name=aceptar]").click(function () {
        $("#aviso").toggle();
        $("#mensaje").toggle();
    });
}

function avisoLink(mensaje, link) {
    $("#aviso").show();
    $("#mensaje").show();
    $("#marco").children().remove();
    $("#marco").append("<p>" + mensaje + "</p><button name=aceptar class='btn btn-secondary'>Aceptar</button><br>");
    //evento
    $("#mensaje button[name=aceptar]").click(function () {
        $("#aviso").toggle();
        $("#mensaje").toggle();
        location.href = link;
    });
}

function espera() {
    $("#aviso").show();
    $("#mensaje").show();
    $("#mensaje").children().remove();
    $("#mensaje").append("<p>" + esperaLink + "</p>");
}

function eliminaspam() {
    $("#aviso").hide();
    $("#mensaje").hide();
    $("#contenidoEmergente").hide();
}

function info(texto) {
    $("#aviso").show();
    $("#mensaje").show();
    $("#mensaje").children().remove();
    $("#mensaje").append("<p>" + texto + "</p>");
}

function geoDirecciona() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            geocoder = new google.maps.Geocoder();
            latlng = {
                lat: parseFloat(lat),
                lng: parseFloat(long),
            };
            geocoder
                .geocode({ location: latlng })
                .then((response) => {
                    if (response.results[0]) {
                        geoDireccion = response.results[0].formatted_address;
                        console.log(geoDireccion);
                    } else {
                        geoDireccion = "No se puede geolocalizar";

                    }
                })
                .catch((e) => {geoDireccion = "Error en geolocalización: " + e});
        });
    }
    
};

function registraGeo() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitud = position.coords.latitude;
            var longitud = position.coords.longitude;
            geocoder = new google.maps.Geocoder();
                    latlng = latlng = {
                        lat: parseFloat(latitud),
                        lng: parseFloat(longitud),
                      };
                    geocoder.geocode({ location: latlng })
                        .then(({ results }) => {
                            var salida = "";
                                $.ajax({
                                    url: "https://dbd.voluta.studio/back/servidor.php",
                                    method: "POST",
                                    async: true,
                                    data: {
                                        registraGeo: "ok",
                                        direccion: results[0].formatted_address
                                    },
                                    method: "POST",
                                    error: function () {
                                        alert("No se puede conectar al Servidor");
                                    },

                                    success: function (respuesta) {
                                        resString = "";
                                        //resString = JSON.parse(respuesta);
                                        resString = respuesta;
                                        console.log(respuesta);
                                    },
                                    complete: function () {
                                        salida = resString;
                                    }
                                });
                                return salida;             
            });    
        });
    } else {
        anuncio("Por favor, acepta compartir la localización");
        return "ko";
    }

}

function geolocaliza() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitud = position.coords.latitude;
            var longitud = position.coords.longitude;
            geocoder = new google.maps.Geocoder();
                    latlng = latlng = {
                        lat: parseFloat(latitud),
                        lng: parseFloat(longitud),
                      };
                    geocoder.geocode({ location: latlng })
                        .then(({ results }) => {
                            var salida = "";
                                $.ajax({
                                    url: "https://dbd.voluta.studio/back/servidor.php",
                                    method: "POST",
                                    async: true,
                                    data: {
                                        geolocaliza: "ok",
                                        direccion: results[0].formatted_address
                                    },
                                    method: "POST",
                                    error: function () {
                                        alert("No se puede conectar al Servidor");
                                    },

                                    success: function (respuesta) {
                                        resString = "";
                                        //resString = JSON.parse(respuesta);
                                        resString = respuesta;
                                        console.log(respuesta);
                                    },
                                    complete: function () {
                                        salida = resString;
                                    }
                                });
                                return salida;             
            });    
        });
    } else {
        anuncio("Por favor, acepta compartir la localización");
        return "ko";
    }


}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function aviso(mensajeHtml){
    $("#avisos").html(mensajeHtml);
    $("#avisos").fadeIn();
    setTimeout(function(){
        $("#avisos").fadeOut();
    },5000);
}

function cargaCategorias(id,div){
    //carga todas las categorias
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: true,
        data: {
            listadoCategorias: "ok"
            
        },
        method: "POST",
        error: function () {
            alert("No se puede conectar al Servidor");
        },

        success: function (respuesta) {
            resString = "";
            resString = JSON.parse(respuesta);
            //resString = respuesta;
            console.log(respuesta);
            
         },
         complete:function(){
            $("#"+div).empty();
            $.each(resString,function(key,value){
                $("#"+div).append("<option value='"+value['CATEGORIAS']+"'>"+value['CATEGORIAS']+"</option>");
            });
         }
    
    });
    
    //ahora seleccionamos los elegidos
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: true,
        data: {
            listadoCategoriasComunidad: "ok",
            comunidad: id
            
        },
        method: "POST",
        error: function () {
            alert("No se puede conectar al Servidor");
        },

        success: function (respuesta) {
            resString = "";
            resString = JSON.parse(respuesta);
            //resString = respuesta;
            console.log(resString);
            
         },
         complete:function(){
            $.each(resString,function(key,value){
                $("#"+div).find("option[value='"+value+"']").attr("selected",true);
            });
         }
    
    });
}

function cargaCategoriasFinanciera(id,div){
    //carga todas las categorias

    
    //ahora seleccionamos los elegidos
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: true,
        data: {
            listadoCategoriasComunidad: "ok",
            comunidad: id
            
        },
        method: "POST",
        error: function () {
            alert("No se puede conectar al Servidor");
        },

        success: function (respuesta) {
            resString = "";
            resString = JSON.parse(respuesta);
            //resString = respuesta;
            console.log(resString);
            
         },
         complete:function(){
            $.each(resString,function(key,value){
                $("#"+div).append("<option value='"+value['CATEGORIAS']+"'>"+value+"</option>");
            });
         }
    
    });
}

