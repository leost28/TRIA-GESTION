//VARIABLES

var formularioEnvio = new Object;
var comunidadID = new Object;
var propiedadID = new Object;
var terceroID = new Object;
var contabilidadID = new Object;
var mantenimientoID = new Object;
var prespuestoID = new Object;
var documentoID = new Object;
var cuotaID = new Object;
var tesoreriaID = new Object;

//COMUNIDADES------------------------------------------------------------------------------------------------

//Pedir datos de Lista Comunidad


//MODIFICAR COMUNIDAD   

function modificaComunidad() {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        //SI NO HAY ERRORES, RECOGE DATOS Y ENVIA AL SERVIDOR

        form = $('form');
        envio = new FormData(form[0]);
        //envio.append("CATEGORIAS",JSON.stringify($("#CATEGORIAS").val()));
        envio.append("modificaComunidad", "ok");
        var salida = "";

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: envio,
            cache: false,
            processData: false, // utilizado para serializar el parámetro de datos, aquí debe ser falso; si es verdadero, FormData se convertirá al tipo String
            contentType: false, // Algunas cargas de archivos están relacionadas con el protocolo http, Baidu, si hay archivos cargados, solo se puede establecer en false
            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                //resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                alert("Datos modificados");
                $("#guardarFormComunidad").hide();
                $('.botonEditar').show();
                $('.activarInput').attr('disabled', true);
                $("#divErrores").hide();
                comunidadID = "";
            },

        });
    }
}



// AÑADIR COMUNIDAD

function addComunidad(comunidadID) {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#añadirComunidadForm')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("addComunidad", "ok");
        var salida = "";
        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                alert("comunidad creada");
                // $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaComunidades.html');
                $("#modalDiv").hide();
            },
        });
    }
};

// HABILITAR COMUNIDAD

function cambiaEstado(comunidadID, accion) {
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            cambiaEstado: "ok",
            comunidadID: comunidadID,
            accion: accion,
        },
        method: "POST",
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },

        success: function (respuesta) {
            resString = respuesta;
            console.log(resString);
        },
        complete: function () {
            return resString;
        }
    });
}

// PROPIEDADES-------------------------------------------------------------------------------------------

//MODIFICAR PROPIEDAD  

function modificaPropiedad() {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        //SI NO HAY ERRORES, RECOGE DATOS Y ENVIA AL SERVIDOR

        form = $('form');
        envio = new FormData(form[0]);
        envio.append("modificaPropiedad", "ok");
        var salida = "";

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: envio,
            cache: false,
            processData: false, // utilizado para serializar el parámetro de datos, aquí debe ser falso; si es verdadero, FormData se convertirá al tipo String
            contentType: false, // Algunas cargas de archivos están relacionadas con el protocolo http, Baidu, si hay archivos cargados, solo se puede establecer en false
            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                //resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                alert("Datos modificados");
                $("#guardarFormPropiedad").hide();
                $('.botonEditar').show();
                $('.activarInputPropiedad').attr('disabled', true);
                $('.main').load('LISTAS/listaPropiedades.html');
                $("#modalDiv").hide();
                $('#inputBreadCrump').html(comunidadID.DESCRIPCION);
            },

        });
    }
}



// AÑADIR PROPIEDAD

function addPropiedad() {
    comunidadElegida = comunidadID.ID;
    console.log(comunidadElegida);
    var error = false;
    errorString = "";

    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR // 1. AÑADIMOS A LA VARIABLE STRING EL ERROR // 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#añadirPropiedadForm')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("addPropiedad", "ok");
        formularioEnvio.append("comunidadID", comunidadElegida)
        var salida = "";
        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                alert("propiedad creada");
                // $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaPropiedades.html');
                $("#modalDiv").hide();
            },
        });
    }
};


//ELIMINAR PROPIEDAD

function eliminarPropiedad() {
    propiedad = propiedadID.ID;
    console.log('propiedad ' + propiedad);
    var salida = "";
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            eliminarPropiedad: "ok",
            propiedadElegida: propiedad,
        },
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },
        success: function (respuesta) {
            resString = "";
            //resString = JSON.parse(respuesta);
            resString = respuesta;
            console.log(respuesta);
        },
        complete: function () {
            if (resString == 'ok') {
                // $("#cuerpoModal").empty();
                $("#modalDiv").hide();
                aviso("<p><img src='img/ok.gif' width='90px'></p><p>Propiedad eliminada correctamente</p>");
                table.setData();
            }
        }

    })
}


//USUARIOS---------------------------------------------------------------------------------------------------

//Pedir datos de Lista Terceros

function addTercero() {
    var error = false;
    errorString = "";

    //1º VERIFICAMOS CAMPOS
    $(".requeridoTercero").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR // 1. AÑADIMOS A LA VARIABLE STRING EL ERROR // 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#añadirTerceroForm')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("addTercero", "ok");
        var salida = "";
        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                alert("tercerocreada");
                // $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaTerceros.html');
                $("#modalDiv").hide();
            },
        });
    }
};

//MODIFICAR DATOS TERCEROS

function modificaTercero() {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requeridoTercero").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        //SI NO HAY ERRORES, RECOGE DATOS Y ENVIA AL SERVIDOR
        console.log('todo OK')
        form = $('#añadirTerceroForm');
        envio = new FormData(form[0]);
        envio.append("modificaTercero", "ok");
        envio.append("IDTERCERO", terceroID.ID);
        var salida = "";

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: envio,
            cache: false,
            processData: false, // utilizado para serializar el parámetro de datos, aquí debe ser falso; si es verdadero, FormData se convertirá al tipo String
            contentType: false, // Algunas cargas de archivos están relacionadas con el protocolo http, Baidu, si hay archivos cargados, solo se puede establecer en false
            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                //resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                alert("Datos modificados");
                $("#guardarFormTercero").hide();
                $('.botonEditar').show();
                $('.activarInput').attr('disabled', true);
                table.setData();
                $("#modalDiv").hide();
                $('#inputBreadCrump').html(terceroID.NOMBRE + '' + terceroID.APELLIDO1);
            },

        });
    }
}


// HABILITAR TERCERO

function cambiaEstadoTercero(terceroID, accion) {

    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            cambiaEstadoTercero: "ok",
            IDTERCERO: terceroID,
            accion: accion,
        },
        method: "POST",
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },

        success: function (respuesta) {
            resString = respuesta;
            console.log(resString);
        },
        complete: function () {
            return resString;
        }
    });
}



//MANTENIMIENTO-------------------------------------------------------------------------------------------

// AÑADIR MANTENIMIENTO

function addMantenimiento() {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requeridoMantenimiento").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#añadirMantenimientoForm')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("addMantenimiento", "ok");
        var salida = "";
        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                alert("mantenimiento creado");
                // $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaMantenimientoComunidades.html');
                $("#modalDiv").hide();
            },
        });
    }
};

function modificaMantenimiento() {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requeridoMantenimiento").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        //SI NO HAY ERRORES, RECOGE DATOS Y ENVIA AL SERVIDOR
        console.log('todo OK')
        form = $('#añadirMantenimientoForm');
        envio = new FormData(form[0]);
        envio.append("modificaMantenimiento", "ok");
        var salida = "";

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: envio,
            cache: false,
            processData: false, // utilizado para serializar el parámetro de datos, aquí debe ser falso; si es verdadero, FormData se convertirá al tipo String
            contentType: false, // Algunas cargas de archivos están relacionadas con el protocolo http, Baidu, si hay archivos cargados, solo se puede establecer en false
            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                //resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                alert("Datos modificados");
                $('.botonEditar').show();
                $('#guardarFormMantenimiento').hide();
                $('.activarInput').attr('disabled', true);
                table.setData();


            },

        });
    }
}

// HABILITAR MANTENIMIENTO

function cambiaEstadoMantenimiento(mantenimientoID, accion) {

    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            cambiaEstadoMantenimiento: "ok",
            mantenimientoID: mantenimientoID,
            accion: accion,
        },
        method: "POST",
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },

        success: function (respuesta) {
            resString = respuesta;
            console.log(resString);
        },
        complete: function () {
            return resString;
        }
    });
}

//LOG HISTORIAL MANTENIMIENTO

function modificaLog() {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requeridoLog").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        //SI NO HAY ERRORES, RECOGE DATOS Y ENVIA AL SERVIDOR
        console.log('todo OK')
        form = $('#añadirLogForm');
        envio = new FormData(form[0]);
        envio.append("modificaLog", "ok");
        var salida = "";

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: envio,
            cache: false,
            processData: false, // utilizado para serializar el parámetro de datos, aquí debe ser falso; si es verdadero, FormData se convertirá al tipo String
            contentType: false, // Algunas cargas de archivos están relacionadas con el protocolo http, Baidu, si hay archivos cargados, solo se puede establecer en false
            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";



                //resString = JSON.parse(respuesta);
                //resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {

                alert("Datos modificados");
                $('.botonEditar').show();
                $('#guardarFormLog').hide();
                $('.activarInput').attr('disabled', true);
                table.setData();


            },
        });
    }
}


//SELECT DINAMICOS

function comunidadSelect(div) {
    var salida = "";
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            selectComunidades: "ok",
        },

        error: function () {
            alert("No se puede conectar al Servidor");
        },

        success: function (respuesta) {
            resString = "";
            resString = JSON.parse(respuesta);
            console.log(resString);
        },
        complete: function () {
            salida = resString;
            $(div).empty();
            $.each(salida, function (index, value) {
                console.log(value.ID);
                $(div).append("<option value='" + value.ID + "'>" + value.DESCRIPCION + "</option>");
            })
        }
    });

    return salida;
}

function propiedadSelect(div) {
    var salida = "";
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            selectPropiedades: "ok",
            comunidad: comunidadID.ID,
        },

        error: function () {
            alert("No se puede conectar al Servidor");
        },

        success: function (respuesta) {
            resString = "";
            resString = JSON.parse(respuesta);
            console.log(resString);
        },
        complete: function () {
            salida = resString;
            $(div).empty();

            $.each(salida, function (index, value) {
                console.log(value.ID);
                $(div).append("<option value='" + value.ID + "'>" + value.DIRECCION + "</option>");
            });
            $(div).append("<option value=''>ninguna</option>");
        }
    });

    return salida;
}


function propiedadesSelect(div) {
    var salida = "";
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            selectPropiedades: "ok",
            comunidad: comunidadID.ID,
        },

        error: function () {
            alert("No se puede conectar al Servidor");
        },

        success: function (respuesta) {
            resString = "";
            resString = JSON.parse(respuesta);
            console.log(resString);
        },
        complete: function () {
            salida = resString;
            $(div).empty();

            $.each(salida, function (index, value) {
                console.log(value.ID);
                $(div).append("<option value='" + value.ID + "'>" + value.DIRECCION + "</option>");
            });
        }
    });

    return salida;
}

function proveedorSelect(div) {
    var salida = "";
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            selectProveedores: "ok",
            comunidad: comunidadID.ID,
        },

        error: function () {
            alert("No se puede conectar al Servidor");
        },

        success: function (respuesta) {
            resString = "";
            resString = JSON.parse(respuesta);
            console.log(resString);
        },
        complete: function () {
            salida = resString;
            $(div).empty();

            $.each(salida, function (index, value) {
                console.log(value.ID);
                $(div).append("<option value='" + value.ID + "'>" + value.NOMBRE + "</option>");
            });
            $(div).append("<option value=''>ninguna</option>");
        }
    });

    return salida;
}

function bancoSelect(div) {
    var salida = "";
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            selectBanco: "ok",
            comunidad: comunidadID.ID,
        },

        error: function () {
            alert("No se puede conectar al Servidor");
        },

        success: function (respuesta) {
            resString = "";
            resString = JSON.parse(respuesta);
            console.log(resString);
        },
        complete: function () {
            salida = resString;
            $(div).empty();
            $.each(salida, function (index, value) {
                console.log(value.ID);
                $(div).append("<option value='" + value.ID + "'>" + value.NOMBRE + "</option>");
            })
        }
    });

    return salida;
}

function tercerosSelectProp(div, id, activo) {
    var salida = "";
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            selectTercerosProp: "ok",
            propiedad: id,
            activo: activo
        },

        error: function () {
            alert("No se puede conectar al Servidor");
        },

        success: function (respuesta) {
            resString = "";
            resString = JSON.parse(respuesta);
            console.log(resString);
        },
        complete: function () {
            salida = resString;
            $(div).empty();
            $.each(salida, function (index, value) {
                console.log(value.ID);
                $(div).append("<option value='" + value.ID + "'>" + value.TERCERO_NOMBRE + "</option>");
            })
        }
    });
    return salida;
}



function tercerosSelect(div) {
    var salida = "";
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            selectTerceros: "ok",
        },

        error: function () {
            alert("No se puede conectar al Servidor");
        },

        success: function (respuesta) {
            resString = "";
            resString = JSON.parse(respuesta);
            console.log('hhh' + resString);
        },
        complete: function () {
            salida = resString;
            $(div).empty();
            $.each(salida, function (index, value) {
                console.log(value.ID);
                $(div).append("<option value='" + value.ID + "'>" + value.TERCERONOMBRE + "</option>");
            })
        }
    });

    return salida;
}

//PROVEEDORES

function addProveedor() {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requeridoProveedor").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#añadirProveedorForm')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("addProveedor", "ok");
        var salida = "";
        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                alert("comunidad creada");
                // $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaProveedores.html');
                $("#modalDiv").hide();
            },
        });
    }
};

function modificaProveedor() {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        //SI NO HAY ERRORES, RECOGE DATOS Y ENVIA AL SERVIDOR

        form = $('form');
        envio = new FormData(form[0]);
        //envio.append("CATEGORIAS",JSON.stringify($("#CATEGORIAS").val()));
        envio.append("modificaProveedor", "ok");
        var salida = "";

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: envio,
            cache: false,
            processData: false, // utilizado para serializar el parámetro de datos, aquí debe ser falso; si es verdadero, FormData se convertirá al tipo String
            contentType: false, // Algunas cargas de archivos están relacionadas con el protocolo http, Baidu, si hay archivos cargados, solo se puede establecer en false
            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                //resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                alert("Datos modificados");
                $("#guardarFormProveedor").hide();
                $('.botonEditar').show();
                $('.activarInput').attr('disabled', true);
                $("#divErrores").hide();
                table.setData();
            },

        });
    }
}

//CONTABILIDAD

// añadir contabilidad

function addContabilidad() {
    var error = false;
    errorString = "";
    contabilidadElegida = comunidadID.ID;

    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR // 1. AÑADIMOS A LA VARIABLE STRING EL ERROR // 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#contabilidadForm')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("addContabilidad", "ok");
        formularioEnvio.append("COMUNIDADID", contabilidadElegida);
        var salida = "";
        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {

                $("#divErrores").hide();
                alert("contabilidad creada");
                // $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaContabilidadComunidades.html');
                $("#modalDiv").hide();
            },
        });
    }
};

function addPropiedad() {
    comunidadElegida = comunidadID.ID;
    console.log(comunidadElegida);
    var error = false;
    errorString = "";

    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR // 1. AÑADIMOS A LA VARIABLE STRING EL ERROR // 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#añadirPropiedadForm')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("addPropiedad", "ok");
        formularioEnvio.append("comunidadID", comunidadElegida)
        var salida = "";
        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                alert("propiedad creada");
                // $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaPropiedades.html');
                $("#modalDiv").hide();
            },
        });
    }
};



//modificar datos contabilidad

function modificaContabilidad() {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        //SI NO HAY ERRORES, RECOGE DATOS Y ENVIA AL SERVIDOR
        console.log('todo OK')
        form = $('#contabilidadForm');
        envio = new FormData(form[0]);
        envio.append("modificaContabilidad", "ok");
        var salida = "";

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: envio,
            cache: false,
            processData: false, // utilizado para serializar el parámetro de datos, aquí debe ser falso; si es verdadero, FormData se convertirá al tipo String
            contentType: false, // Algunas cargas de archivos están relacionadas con el protocolo http, Baidu, si hay archivos cargados, solo se puede establecer en false
            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                //resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                alert("Datos modificados");
                $("#guardarFormTercero").hide();
                $('.botonEditar').show();
                $('.activarInput').attr('disabled', true);
                table.setData();
                $("#modalDiv").hide();
                $('.main').load('LISTAS/listaContabilidadComunidades.html');

            },

        });
    }
}


//RECIBOS

function addReciboComunidad() {
    var error = false;
    errorString = "";
    reciboElegido = comunidadID.ID;

    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR // 1. AÑADIMOS A LA VARIABLE STRING EL ERROR // 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#reciboForm')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("addReciboComunidad", "ok");
        formularioEnvio.append("comunidadID", reciboElegido);
        formularioEnvio.append("nombreTercero", $("#TERCERO_NOMBRE").val());
        var salida = "";
        console.log('datosFormulario', formularioEnvio);
        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                alert("recibo creado");
                // $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaRecibosComunidades.html');
                $("#modalDiv").hide();
            },
        });
    }
};



//AÑADIR RECIBOS MASIVOS

function addRecibosMasivosComunidad() {
    var error = false;
    errorString = "";
    reciboElegido = comunidadID.ID;

    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR // 1. AÑADIMOS A LA VARIABLE STRING EL ERROR // 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {

        // alert($('#PROPIEDAD_NOMBRE').val());
        // form = $('#recibosMasivosForm')[0];
        // var formularioEnvio = new FormData(form);
        // formularioEnvio.append("addRecibosMasivosComunidad", "ok");
        // formularioEnvio.append("comunidadID", reciboElegido);
        // formularioEnvio.append("nombreTercero", $("#PROPIEDAD_NOMBRE").val());
        // var salida = "";
        // console.log('datosFormulario2' + JSON.stringify(formularioEnvio));
        var PROPIEDAD_NOMBRE = $('#PROPIEDAD_NOMBRE').val();
        var IMPORTE = $('#IMPORTE').val();
        var REFERENCIA = $('#REFERENCIA').val();
        var DESCRIPCION = $('#DESCRIPCION').val();
        var FECHA = $('#FECHA').val();

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",

            // data: {
            //     addRecibosMasivosComunidad: "ok",
            //     formularioEnvio,
            data: {
                addRecibosMasivosComunidad: "ok",
                PROPIEDAD_NOMBRE: JSON.stringify(PROPIEDAD_NOMBRE),
                IMPORTE: IMPORTE,
                COMUNIDAD_ID: comunidadID.ID,
                REFERENCIA: REFERENCIA,
                DESCRIPCION: DESCRIPCION,
                FECHA: FECHA,
            },
            // cache: false,
            // processData: false,
            // contentType: false,
            // async: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log('addRecibosMasivosComunidad: ' + respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                alert("recibo creado");
                $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaRecibosComunidades.html');
                $("#modalDiv").hide();
            },
        });
    }
};

function modificaReciboComunidad() {
    var error = false;
    errorString = "";
    reciboElegido = reciboID.ID;
    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        //SI NO HAY ERRORES, RECOGE DATOS Y ENVIA AL SERVIDOR
        console.log('todo OK')
        form = $('#reciboForm');
        envio = new FormData(form[0]);
        envio.append("modificaReciboComunidad", "ok");
        envio.append("reciboID", reciboElegido);
        var salida = "";

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: envio,
            cache: false,
            processData: false, // utilizado para serializar el parámetro de datos, aquí debe ser falso; si es verdadero, FormData se convertirá al tipo String
            contentType: false, // Algunas cargas de archivos están relacionadas con el protocolo http, Baidu, si hay archivos cargados, solo se puede establecer en false
            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                //resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                alert("Datos modificados");
                $('.main').load('LISTAS/listaRecibosComunidades.html');
                $('.botonEditar').show();
                $('.activarInput').attr('disabled', true);
                table.setData();
                $("#modalDiv").hide();

            },

        });
    }
}

//ELIMINAR Recibo

function eliminarRecibo() {
    reciboID = reciboID.ID;

    var salida = "";
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            eliminarRecibo: "ok",
            reciboElegido: reciboID,
        },
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },
        success: function (respuesta) {
            resString = "";
            //resString = JSON.parse(respuesta);
            resString = respuesta;
            console.log(respuesta);
        },
        complete: function () {
            if (resString == 'ok') {

                // $("#cuerpoModal").empty();
                $("#modalDiv").hide();
                aviso("<p><img src='img/ok.gif' width='90px'></p><p>Recibo eliminado correctamente</p>");
                table.setData();
            }
        }

    })
}


//ELIMINAR RECIBOS SELECCIONADOS

function eliminarRecibosSeleccionados() {
    var recibosSeleccionados = tablaRecibos.getSelectedData();
    // if (existe(recibosSeleccionados)) {
    //     $.each(recibosSeleccionados, function (key, value) {
    //         idRecibos.push(value['0']);
    //     });

    // }


    var salida = "";

    var idRecibosString = JSON.stringify(recibosSeleccionados);

    console.log('idRecibosString', idRecibosString)

    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            eliminarRecibosSeleccionados: "ok",
            recibosID: idRecibosString,
        },
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },
        success: function (respuesta) {
            resString = "";
            //resString = JSON.parse(respuesta);
            resString = respuesta;
            console.log(respuesta);
        },
        complete: function () {
            if (resString == 'ok') {
                // $("#cuerpoModal").empty();
                $("#modalDiv").hide();
                aviso("<p><img src='img/ok.gif' width='90px'></p><p>Recibos eliminados correctamente</p>");
                tablaRecibos.setData();

                console.log("se elimina", resString)
            }
        }

    });
    $('#supRecibo').hide();
    $('#eliminarReciboSeleccionado').show()
}


//DOCUMENTOS

function addDocumento() {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#añadirComunidadForm')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("addDocumento", "ok");
        var salida = "";
        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                alert("Nuevo documento");
                // $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaDocumentos.html');
                $("#modalDiv").hide();
            },
        });
    }
};

//ELIMINAR PROPIEDAD

function eliminarDocumento() {
    documentoID = documentoID.ID;
    var salida = "";
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            eliminarDocumento: "ok",
            documentoElegido: documentoID,
        },
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },
        success: function (respuesta) {
            resString = "";
            //resString = JSON.parse(respuesta);
            resString = respuesta;
            console.log(respuesta);
        },
        complete: function () {
            if (resString == 'ok') {
                // $("#cuerpoModal").empty();
                $("#modalDiv").hide();
                aviso("<p><img src='img/ok.gif' width='90px'></p><p>documento eliminado correctamente</p>");
                table.setData();
            }
        }

    })
}

//AÑADIR TESORERIA

function addTesoreriaComunidad() {
    //Recuperamos la ID porque está vinculada a una comunidad
    financieraElegida = contabilidadID.ID;
    terceroElegido = terceroID;
    console.log(terceroElegido);
    var error = false;
    errorString = "";

    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR // 1. AÑADIMOS A LA VARIABLE STRING EL ERROR // 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#formPagoCobro')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("addTesoreriaComunidad", "ok");
        formularioEnvio.append("financieraID", financieraElegida);
        formularioEnvio.append("terceroID", terceroElegido)
        var salida = "";
        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                alert("añadido a tesorería");
                $('.fichaPagosCobros').hide();
                table.setData();
            },
        });
    }
};

//MODIFICA TESORERIA COMUNIDAD

function modificaTesoreriaComunidad() {
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requerido2").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        //SI NO HAY ERRORES, RECOGE DATOS Y ENVIA AL SERVIDOR

        form = $('form');
        envio = new FormData(form[0]);
        envio.append("modificaTesoreriaComunidad", "ok");
        var salida = "";

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: envio,
            cache: false,
            processData: false, // utilizado para serializar el parámetro de datos, aquí debe ser falso; si es verdadero, FormData se convertirá al tipo String
            contentType: false, // Algunas cargas de archivos están relacionadas con el protocolo http, Baidu, si hay archivos cargados, solo se puede establecer en false
            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                //resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                alert("Datos modificados");
                $("#modificaPagoCobro").hide();
                $('.botonEditar').show();
                $('.activarInput').attr('disabled', true);
                $("#listadoPagosCobros").load("LISTAS/listaTesoreriaComunidades.html");
            },

        });
    }
}


//AÑADIR BANCO

function addBanco() {
    comunidadElegida = comunidadID.ID;
    var error = false;
    errorString = "";
    //1º VERIFICAMOS CAMPOS
    $(".requerido").each(function (key) {
        //RECORREMOS TODOS LOS INPUTS CON CLASE REQUERIDO
        if (!existe($(this).val())) {
            //SI ESTA VACIO SU VALOR 1. AÑADIMOS A LA VARIABLE STRING EL ERROR Y 2.DAMOS VALOR FALSE A ERROR.
            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {
        //SI HAY ERRORES 1. AÑADE EL STRING CON LOS ERRORES AL DIV DE ERRORES Y 2. MUESTRA EL DIV CONTENEDOR DE ERRORES.
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#bancosForm')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("addBanco", "ok");
        formularioEnvio.append("comunidadID", comunidadElegida)
        var salida = "";

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                alert("Banco creado");
                // $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaBancosComunidades.html');
                $("#modalDiv").hide();

            },
        });
    }
};

//ELIMINAR BANCO

function eliminarBanco() {
    bancoID = bancoID.ID;

    var salida = "";
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            eliminarBanco: "ok",
            bancoElegido: bancoID,
        },
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },
        success: function (respuesta) {
            resString = "";
            //resString = JSON.parse(respuesta);
            resString = respuesta;
            console.log(respuesta);
        },
        complete: function () {
            if (resString == 'ok') {
                // $("#cuerpoModal").empty();
                $("#modalDiv").hide();
                aviso("<p><img src='img/ok.gif' width='90px'></p><p>Banco eliminado correctamente</p>");
                table.setData();
            }
        }

    })
}

//MODIFICAR BANCO

function modificaBanco() {
    var error = false;
    errorString = "";

    $(".requerido").each(function (key) {
        if (!existe($(this).val())) {

            errorString += "<p>El campo está vacio en " + $(this).attr('concepto') + "</p>";
            error = true;
        }
    });

    if (error) {

        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {

        form = $('form');
        envio = new FormData(form[0]);
        envio.append("modificaBanco", "ok");
        var salida = "";

        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: envio,
            cache: false,
            processData: false,
            contentType: false,
            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                console.log(respuesta);
            },
            complete: function () {
                alert("Datos modificados");
                $("#guardarFormPropiedad").hide();
                $('.botonEditar').show();
                $('.activarInput').attr('disabled', true);
                $('.main').load('LISTAS/listaBancosComunidades.html');
                $("#modalDiv").hide();
                $('#inputBreadCrump').html(comunidadID.DESCRIPCION);
            },

        });
    }
}



function crearXML() {
    var error = false;
    reciboElegido = comunidadID.ID;
    errorString = "";
    if (error) {
        $("#divErrores").html(errorString);
        $("#divErrores").show();
    } else {
        form = $('#reciboForm')[0];
        var formularioEnvio = new FormData(form);
        formularioEnvio.append("crearXML", "ok");
        formularioEnvio.append("comunidadID", reciboElegido);
        formularioEnvio.append("nombreTercero", $("#PROPIEDAD_NOMBRE").val());
        var salida = "";
        $.ajax({
            url: "https://triagestion.voluta.studio/BACK/servidor.php",
            method: "POST",
            async: false,
            data: formularioEnvio,
            cache: false,
            processData: false,
            contentType: false,

            error: function () {
                alert("No se puede conectar al Servidor o no estas registrado");
            },
            success: function (respuesta) {
                resString = "";
                //resString = JSON.parse(respuesta);
                resString = respuesta;
                console.log(respuesta);
            },
            complete: function () {
                $("#divErrores").hide();
                // $("#cuerpoModal").empty();
                $('.main').load('LISTAS/listaRecibosComunidades.html');
                $("#modalDiv").hide();
            },
        });
    }
}

function categoriasComunidadTabla(comunidadID, divTabla) {

    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            categoriasComunidad: "ok",
            comunidadID: comunidadID,
        },
        method: "POST",
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },

        success: function (respuesta) {
            resString = JSON.parse(respuesta);

            console.log(resString);
        },
        complete: function () {
            $.each(resString, function (key, valor) {
                if (valor != 'CUOTA') {
                    $('#' + divTabla).append("<tbody categoria='" + valor + "'><tr><td>" + valor + "</td><td id='importeCategoria'></td><td id='previstoCategoria'></td><td id='desviacionCategoria'></td></tr></tbody>");
                }
            });
        }
    });
}

function datosCategoriasComunidad(comunidadID, ano, presupuesto) {
    //1º CARGAR DATOS DEL AÑO
    var datosAno = new Object;
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            importeTotalComunidad: "ok",
            comunidadID: comunidadID,
            ano: ano,
        },
        method: "POST",
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },

        success: function (respuesta) {
            resString = JSON.parse(respuesta);
            datosAno = resString;
            console.log(resString);
        },
        complete: function () {
            totalGastos = 0;
            totalIngresos = 0;
            $.each(resString, function (key, valor) {
                if (valor['CATEGORIA'] != 'CUOTA') {
                    console.log("valor Categoria: " + valor['CATEGORIA']);
                    $("tbody[categoria='" + valor['CATEGORIA'] + "']").find("#importeCategoria").append(valor['IMPORTE']);
                    totalGastos = totalGastos + parseFloat(valor['IMPORTE']);
                } else {
                    $("#ingresosAnuales").val(valor['IMPORTE']);
                }

            });
            $("#sinFondoImporte").val(totalGastos);
        }
    });
    //2º CARGAMOS PRESUPUESTO
    var datosPto = new Object;
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        async: false,
        data: {
            presupuestoTotalComunidad: "ok",
            pto: presupuesto,
        },
        method: "POST",
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },

        success: function (respuesta) {
            resString = JSON.parse(respuesta);
            datosAno = resString;
            console.log(resString);
        },
        complete: function () {
            totalGastos = 0;
            totalIngresos = 0;
            $.each(resString, function (key, valor) {
                if (valor['CATEGORIA'] != 'CUOTA') {
                    console.log("valor Categoria: " + valor['CATEGORIA']);
                    $("tbody[categoria='" + valor['CATEGORIA'] + "']").find("#previstoCategoria").append(valor['IMPORTE']);
                    totalGastos = totalGastos + parseFloat(valor['IMPORTE']);
                } else {
                    $("#ingresosPrevision").val(valor['IMPORTE']);
                }
            });
            $("#sinFondoPrevision").val(totalGastos);
        }
    });
};

/*------------------------------------------------------------------*/
/* LOGIN
/*------------------------------------------------------------------*/

function login() {
    var usuario = $("#form_login #usuario").val();
    var pass = $("#form_login #pass").val();
    /*---*/
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        data: {
            login: "ok",
            USUARIO: usuario,
            PASS: pass
        },
        async: false,
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },
        success: function (respuesta) {
            salida = respuesta;
            console.log(salida);
        },
        complete: function () {
            if (salida == 'ok') {
                window.open('https://triagestion.voluta.studio/FRONT/inc/index.html', '_self');
            } else {
                $("#form_login .msg-error").html('El usuario o la contraseña no son correctos');
                $("#form_login .msg-error").show();
            }
        }
    });
};

function login_verif() {
    $.ajax({
        url: "https://triagestion.voluta.studio/BACK/servidor.php",
        method: "POST",
        data: {
            login_verif: "ok",
        },
        async: false,
        error: function () {
            alert("No se puede conectar al Servidor o no estas registrado");
        },
        success: function (respuesta) {
            salida = respuesta;
            console.log('login_verif: ' + salida);
        },
        complete: function () {
            if (salida != 'ok') {
                window.open('https://triagestion.voluta.studio/FRONT/inc/index.html', '_self');
            }
        }
    });
};
