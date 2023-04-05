<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
//header('content-type: application/json; charset=utf-8');

//LIBRERIAS, CLASES Y VARIABLES
include 'BD.php';
//require 'vendor/autoload.php';

date_default_timezone_set("Europe/Madrid");

$base = new BD();
$hoy = date("Y-m-d 00:00:00");
$ahora = date("Y-m-d H:i:s");
$hoyCorto = date("Y-m-d");
$ayer = date("Y-m-d",strtotime($hoyCorto."- 1 day"));
$fechaUnix = time();

//FUNCIONES

//SESION
ini_set('session.cache_expire', 200000);
ini_set('session.cache_limiter', 'none');
ini_set('session.cookie_lifetime', 2000000);
ini_set('session.gc_maxlifetime', 200000); //el mas importante


session_start();


$base  = new BD();

//COMUNIDADES--------------------------------------------------------------------------------------------

if (isset($_REQUEST['listadoComunidad'])){
    $comunidades = $base->query("SELECT * FROM COMUNIDADES");
    echo json_encode($comunidades);
}



if(isset($_REQUEST['modificaComunidad'])){
    //echo json_encode($_POST);
     $keys = ['DESCRIPCION','DIRECCION','CP','LOCALIDAD','REF_CATASTRAL','CIF','CUOTA','CATEGORIAS'];
     $valores = [$_POST['DESCRIPCION'],
     $_POST['DIRECCION'],
     $_POST['CP'],
     $_POST['LOCALIDAD'],
     $_POST['REF_CATASTRAL'],
     $_POST['CIF'],
     $_POST['CUOTA'],
     json_encode($_POST['CATEGORIAS'],JSON_UNESCAPED_UNICODE)
    ];
    $id = $_POST['ID'];
    $modifica = $base->modificaRegistro("COMUNIDADES",$id,$keys,$valores);
    echo $modifica;
}

if(isset($_REQUEST['addComunidad'])){
    //echo json_encode($_POST);
     $keys = ['DESCRIPCION','DIRECCION','CP','LOCALIDAD','REF_CATASTRAL','CIF','CUOTA','ACTIVO','CATEGORIAS'];
     $valores = [$_POST['DESCRIPCION'],
     $_POST['DIRECCION'],
     $_POST['CP'],
     $_POST['LOCALIDAD'],
     $_POST['REF_CATASTRAL'],
     $_POST['CIF'],
     $_POST['CUOTA'],
     1,
     json_encode($_POST['CATEGORIAS'],JSON_UNESCAPED_UNICODE)
    ];
    $comunidad = $base->nuevoRegistro("COMUNIDADES",$keys,$valores);
    echo $comunidad;
}

if (isset($_REQUEST['cambiaEstado'])){
    $id = $_POST['comunidadID'];
    $accion = $_POST['accion'];
    if($accion == 'habilitar'){
        $valor = 1;
    }else{
        $valor = 0;
    }
    $respuesta = $base->modificaID("COMUNIDADES", $id,"ACTIVO",$valor);
    echo $respuesta;
}

//PROPIEDADES--------------------------------------------------------------------------------------------

if($_REQUEST['listaPropiedades']){
    $propiedades = $base->query("SELECT 
    PROPIEDADES.*,
    TERCEROS.ID AS TERCERO_ID,
    CONCAT (TERCEROS.NOMBRE,' ',TERCEROS.APELLIDO1,' ',TERCEROS.APELLIDO2) AS TERCERO_NOMBRE
    FROM PROPIEDADES 
    LEFT JOIN PROP_TERC_FK ON PROP_TERC_FK.PROP_ID = PROPIEDADES.ID
    LEFT JOIN TERCEROS ON PROP_TERC_FK.TERC_ID = TERCEROS.ID
    WHERE COMUNIDAD_ID = '".$_REQUEST['comunidadID']."'");

    echo json_encode($propiedades);
}


if(isset($_REQUEST['addPropiedad'])){
    //echo json_encode($_POST);
     $keys = ['COMUNIDAD_ID','DIRECCION','TIPOCUOTA', 'COEF'];
     $valores = [$_POST['comunidadID'],
     $_POST['DIRECCION'],
     $_POST['TIPOCUOTA'],
     $_POST['COEF'],
    ];
    $result = $base->nuevoRegistro("PROPIEDADES",$keys,$valores);

    // RECUPERAR ID NUEVA PROPIEDAD CREADA
    $nuevaPropiedadCreada = $base->query("SELECT * FROM PROPIEDADES ORDER BY ID DESC LIMIT 1");
    $nuevaPropiedadCreadaID = $nuevaPropiedadCreada[0]['ID'];

    $keys_2 = ['PROP_ID','TERC_ID'];
    $valores_2 = [$nuevaPropiedadCreadaID, $_POST['TERCERO_NOMBRE']];
    $result_2 = $base->nuevoRegistro("PROP_TERC_FK",$keys_2,$valores_2);

    echo $result.$result_2;
}


if(isset($_REQUEST['modificaPropiedad'])){
    //echo json_encode($_POST);
     $keys = ['DIRECCION','TIPOCUOTA', 'COEF'];
     $valores = [$_POST['DIRECCION'],
     $_POST['TIPOCUOTA'],
     $_POST['COEF']
    ];
    $id = $_POST['ID'];
    $modifica = $base->modificaRegistro("PROPIEDADES",$id,$keys,$valores);


     // RECUPERAR ID NUEVA PROPIEDAD CREADA
     $propTerc_db = $base->query("SELECT * FROM PROP_TERC_FK WHERE PROP_ID = $id LIMIT 1");
     $id_2 = $propTerc_db[0]['ID'];
 
     $keys_2 = ['PROP_ID','TERC_ID'];
     $valores_2 = [$_POST['ID'], $_POST['TERCERO_NOMBRE']];
     $modifica_2 = $base->modificaRegistro("PROP_TERC_FK",$id_2,$keys_2,$valores_2);
 
     echo $modifica.$modifica_2;

    //var_dump($_POST);
}

if($_REQUEST['eliminarPropiedad']){
    $propiedadId = $_POST['propiedadElegida'];
    $propTerc_db = $base->query("SELECT * FROM PROP_TERC_FK WHERE PROP_ID = $propiedadId LIMIT 1");
    $id_2 = $propTerc_db[0]['ID'];

    $salida = $base->borrarID("PROPIEDADES", $propiedadId);
    $salida_2 = $base->borrarID("PROP_TERC_FK", $id_2);
    echo "ok";
}

//TERCEROS-----------------------------------------------------------------------------------------------

// if($_REQUEST['datosTerceros']){
//     $propiedades = $base->query("SELECT * FROM TERCEROS
    
    
//     ");

//     echo json_encode($propiedades);
// };

if($_REQUEST['datosTerceros']){
    $propiedades = $base->query("SELECT TERCEROS.*,PROPIEDADES.COMUNIDAD_ID
    FROM TERCEROS
    LEFT JOIN PROP_TERC_FK ON TERCEROS.ID = PROP_TERC_FK.TERC_ID
    INNER JOIN PROPIEDADES ON PROP_TERC_FK.PROP_ID = PROPIEDADES.ID
    WHERE PROPIEDADES.COMUNIDAD_ID = '".$_POST['comunidadID']."'");

    
    echo json_encode($propiedades);
};


if(isset($_REQUEST['addTercero'])){
    //echo json_encode($_POST);
     $keys = ['NOMBRE', 'APELLIDO1','APELLIDO2', 'CCC', 'NIF','DIRECCION','CP','LOCALIDAD','TELEFONO','ACTIVO','EMAIL'];
     $valores = [
     $_POST['NOMBRE'],
     $_POST['APELLIDO1'],
     $_POST['APELLIDO2'],
     $_POST['CCC'],
     $_POST['NIF'],
     $_POST['DIRECCION'],
     $_POST['CP'],
     $_POST['LOCALIDAD'],
     $_POST['TELEFONO'],
     '1',
     $_POST['EMAIL']
    ];
    $tercero = $base->nuevoRegistro("TERCEROS",$keys,$valores);
    $keys = ['TERCERO_ID','PASS'];
    $pass = password_hash($_POST['PASS'], PASSWORD_DEFAULT);
    $valores = [
        $tercero,$pass
    ];
    $usuario = $base->nuevoRegistro("USUARIOS",$keys,$valores);    
    echo $tercero;
}


if(isset($_REQUEST['modificaTercero'])){
    //echo json_encode($_POST);
    $keys = ['NOMBRE', 'APELLIDO1','APELLIDO2', 'CCC', 'NIF','DIRECCION','CP','LOCALIDAD','TELEFONO','ACTIVO','EMAIL'];
    $valores = [
        $_POST['NOMBRE'],
        $_POST['APELLIDO1'],
        $_POST['APELLIDO2'],
        $_POST['CCC'],
        $_POST['NIF'],
        $_POST['DIRECCION'],
        $_POST['CP'],
        $_POST['LOCALIDAD'],
        $_POST['TELEFONO'],
        'ACTIVO',
        $_POST['EMAIL']
       ];
    $id = $_POST['IDTERCERO'];
    $modifica = $base->modificaRegistro("TERCEROS",$id,$keys,$valores);
    $keys = ['TERCERO_ID','PASS'];
    $pass = password_hash($_POST['PASS'], PASSWORD_DEFAULT);
    $valores = [
        $tercero,$pass
    ];
    $usuario = $base->query("SELECT ID FROM USUARIOS WHERE TERCERO_ID = ".$modifica);
    $usuarioMidifica = $base->modificaRegistro("TERCEROS",$usuario[0][0],$keys,$valores);  
    echo $modifica;

}

if (isset($_REQUEST['cambiaEstadoTercero'])){
    $id = $_POST['IDTERCERO'];
    $accion = $_POST['accion'];
    if($accion == 'habilitar'){
        $valor = 1;
    }else{
        $valor = 0;
    }
    $respuesta = $base->modificaID("TERCEROS", $id,"ACTIVO",$valor);
    echo $respuesta;
}

if (isset($_REQUEST['cambiaEstadoMantenimiento'])){
    $id = $_POST['mantenimientoID'];
    $accion = $_POST['accion'];
    if($accion == 'habilitar'){
        $valor = 1;
    }else{
        $valor = 0;
    }
    $respuesta = $base->modificaID("MANTENIMIENTOS", $id,"ACTIVO",$valor);
    echo $respuesta;
}

//PROVEEDORES--------------------------------------------------------------------------------------------

if($_REQUEST['listadoProveedores']){
    $propiedades = $base->query("SELECT * FROM PROVEEDORES");
    echo json_encode($propiedades);
};

if(isset($_REQUEST['addProveedor'])){
    //echo json_encode($_POST);
     $keys = $keys = ['NOMBRE','ACTIVIDAD','TELEFONO','EMAIL', 'ACTIVO'];
     $valores = [$_POST['NOMBRE'],
     $_POST['ACTIVIDAD'],
     $_POST['TELEFONO'],
     $_POST['EMAIL'],
     '1',
     
    ];
    $comunidad = $base->nuevoRegistro("PROVEEDORES",$keys,$valores);
    echo $comunidad;
}

if(isset($_REQUEST['modificaProveedor'])){
    //echo json_encode($_POST);
     $keys = ['NOMBRE','ACTIVIDAD','TELEFONO','EMAIL', 'ACTIVO'];
     $valores = [$_POST['NOMBRE'],
     $_POST['ACTIVIDAD'],
     $_POST['TELEFONO'],
     $_POST['EMAIL'],
     '1',
    ];
    $id = $_POST['ID'];
    $modifica = $base->modificaRegistro("PROVEEDORES",$id,$keys,$valores);
    echo $modifica;
}




//MANTENIMIENTOS-----------------------------------------------------------------------------------------

if($_REQUEST['listaMantenimiento']){
    $propiedades = $base->query("SELECT MANTENIMIENTOS.*,COMUNIDADES.DESCRIPCION AS 'COMUNIDAD_NOMBRE' FROM MANTENIMIENTOS LEFT JOIN COMUNIDADES ON COMUNIDADES.ID = MANTENIMIENTOS.COMUNIDAD_ID");
    echo json_encode($propiedades);
}

if($_REQUEST['listaMantenimientoComunidad']){
    $propiedades = $base->query("SELECT MANTENIMIENTOS.*,COMUNIDADES.DESCRIPCION AS 'COMUNIDAD_NOMBRE' FROM MANTENIMIENTOS LEFT JOIN COMUNIDADES ON COMUNIDADES.ID = MANTENIMIENTOS.COMUNIDAD_ID where MANTENIMIENTOS.COMUNIDAD_ID = '".$_POST['COMUNIDAD']."'");
    echo json_encode($propiedades); 
}

if(isset($_REQUEST['addMantenimiento'])){
    //echo json_encode($_POST);
     $keys = ['REFERENCIA','DESCRIPCION','RECURRENTE','INTERVENCION','FINICIO','FFINAL','ESTADO','COMUNIDAD_ID'];
     $valores = [
     $_POST['NOMBRE'],
     $_POST['APELLIDO1'],
     $_POST['APELLIDO2'],
     $_POST['NIF'],
     $_POST['DIRECCION'],
     $_POST['CP'],
     $_POST['LOCALIDAD'],
     $_POST['TELEFONO'],
     '1',
     $_POST['EMAIL']
    ];

    $mantenimiento = $base->nuevoRegistro("MANTENIMIENTO",$keys,$valores); 
    echo $mantenimiento;
}
//SELECTS DINAMICOS--------------------------------------------------------------------------------------

if (isset($_REQUEST['selectComunidades'])){
    $comunidades = $base->query("SELECT ID,DESCRIPCION FROM COMUNIDADES");
    echo json_encode($comunidades);
}


if (isset($_REQUEST['selectTerceros'])){
    $terceros = $base->query("SELECT TERCEROS.*, CONCAT(TERCEROS.NOMBRE,' ',TERCEROS.APELLIDO1,' ',TERCEROS.APELLIDO2) AS TERCERONOMBRE
    FROM TERCEROS
    WHERE TERCEROS.ACTIVO = '1';
    ");

    echo json_encode($terceros);
}

if (isset($_REQUEST['selectTercerosProp'])){

    $propiedadID = $_POST['propiedad'];
    $activo = $_POST['activo'];
    $consulta = "SELECT PROP_TERC_FK.*, 
    CONCAT(TERCEROS.NOMBRE, ' ', TERCEROS.APELLIDO1, ' ', TERCEROS.APELLIDO2) AS 'TERCERO_NOMBRE', 
    PROP_TERC_FK.TERC_ID AS 'ID'
    FROM PROP_TERC_FK
    LEFT JOIN TERCEROS ON PROP_TERC_FK.TERC_ID = TERCEROS.ID
    WHERE PROP_TERC_FK.PROP_ID = '$propiedadID'";
    if ($activo == "1"){
        $consulta .=" AND TERCEROS.ACTIVO = 1 ";
    }

    $consulta .= "ORDER BY PROP_TERC_FK.TERC_ID desc";

    $comunidades = $base->query($consulta);

    echo json_encode($comunidades);
}


if (isset($_REQUEST['selectPropiedades'])){
    $comunidadID = $_POST['comunidad'];
    $comunidades = $base->query("SELECT ID, COMUNIDAD_ID, DIRECCION 
    FROM PROPIEDADES 
    WHERE COMUNIDAD_ID = '$comunidadID'");
    echo json_encode($comunidades);
}

if (isset($_REQUEST['selectBanco'])){
    $banco = $base->query("SELECT ID, COMUNIDAD_ID, NOMBRE
    FROM BANCOS
    WHERE COMUNIDAD_ID = '".$_POST['comunidad']."'");
    echo json_encode($banco);
};


if (isset($_REQUEST['selectProveedores'])){
    $comunidades = $base->query("SELECT ID, NOMBRE 
    FROM PROVEEDORES");
    echo json_encode($comunidades);
}




//FINANCIERA---------------------------------------------------------------------------------------------

if($_REQUEST['listaContabilidad']){
    $financiera = $base->query("SELECT FINANCIERA.*
    ,COMUNIDADES.DESCRIPCION AS 'COMUNIDAD_NOMBRE'
    ,PROPIEDADES.DIRECCION AS 'PROPIEDAD_NOMBRE'
    ,CONCAT(TERCEROS.NOMBRE, ' ', TERCEROS.APELLIDO1) AS 'TERCERO_NOMBRE',
    (SELECT SUM(TESORERIA.IMPORTE) FROM TESORERIA WHERE TESORERIA.FINANCIERA_ID = FINANCIERA.ID) AS 'COBRADO'
    FROM FINANCIERA 
    LEFT JOIN COMUNIDADES ON COMUNIDADES.ID = FINANCIERA.COMUNIDAD_ID 
    LEFT JOIN PROPIEDADES ON PROPIEDADES.ID = FINANCIERA.PROPIEDAD_ID
    LEFT JOIN TERCEROS ON TERCEROS.ID = FINANCIERA.TERCERO_ID");
    $salida[] = "";
    foreach($financiera as $apunte){
        $salida[] = $apunte;
        if($salida['COBRADO'] == $salida['BI']*(100+$·salida['IVA'])/100){
            if($salida['cargo']){
                $salida['estadoTesoreria'] = "Pagado";
            }else{
                $salida['estadoTesoreria'] = "Cobrado";
            }
        }else if($salida['COBRADO'] > $salida['BI']*(100+$·salida['IVA'])/100){
            if($salida['cargo']){
                $salida['estadoTesoreria'] = "Pagado en exceso";
            }else{
                $salida['estadoTesoreria'] = "Cobrado en exceso";
            }
        }else{
            if($salida['cargo']){
                $salida['estadoTesoreria'] = "Pagado parcialmente";
            }else{
                $salida['estadoTesoreria'] = "Cobrado parcialmente";
            }
        }
    }

    echo json_encode($salida);
}


//CONTABILIDAD-------------------------------------------------------------------------------------------

if($_REQUEST['listaContabilidadComunidad']){
    $propiedades = $base->query("SELECT FINANCIERA.*,
    COMUNIDADES.DESCRIPCION AS 'COMUNIDAD_NOMBRE',
    PROPIEDADES.DIRECCION AS 'PROPIEDAD_NOMBRE',
    CONCAT(TERCEROS.NOMBRE, ' ', TERCEROS.APELLIDO1) AS 'TERCERO_NOMBRE',PROPIEDADES.ID as 'PROP_ID',TERCEROS.ID as 'TERC_ID',
    (SELECT SUM(TESORERIA.IMPORTE) FROM TESORERIA WHERE TESORERIA.FINANCIERA_ID = FINANCIERA.ID) AS 'COBRADO'
    FROM FINANCIERA 
    LEFT JOIN COMUNIDADES ON COMUNIDADES.ID = FINANCIERA.COMUNIDAD_ID 
    LEFT JOIN PROPIEDADES ON PROPIEDADES.ID = FINANCIERA.PROPIEDAD_ID
    LEFT JOIN TERCEROS ON TERCEROS.ID = FINANCIERA.TERCERO_ID
    WHERE FINANCIERA.COMUNIDAD_ID = '".$_POST['comunidad']."'");
    $keys = ['CATEGORIA','FECHA','FECHA_VTO', 'DESCRIPCION', 'PROPIEDAD_ID', 'TERCERO_ID', 'TIPO', 'ESTADO', 'BI', 'IVA'];
    foreach($propiedades as $propiedad){
        //TOTAL IMPORTE FINANCIERA
        $propiedad['TOTAL'] = $propiedad['BI'] * (100+$propiedad['IVA'])/100;
        //ESTADO POR TESORERIA
                if($propiedad['COBRADO'] == $propiedad['BI']*(100+$·propiedad['IVA'])/100){
                    if($propiedad['cargo']){
                        $propiedad['estadoTesoreria'] = "Pagado";
                    }else{
                        $propiedad['estadoTesoreria'] = "Cobrado";
                    }
                }else if($propiedad['COBRADO'] > $propiedad['BI']*(100+$·propiedad['IVA'])/100){
                    if($propiedad['cargo']){
                        $propiedad['estadoTesoreria'] = "Pagado en exceso";
                    }else{
                        $propiedad['estadoTesoreria'] = "Cobrado en exceso";
                    }
                }else{
                    if($propiedad['cargo']){
                        $propiedad['estadoTesoreria'] = "Pagado parcialmente";
                    }else{
                        $propiedad['estadoTesoreria'] = "Cobrado parcialmente";
                    }
                };
        $salida[] = $propiedad;
    };
    echo json_encode($salida);
}

if(isset($_REQUEST['modificaContabilidad'])){
    //echo json_encode($_POST);
     $keys = ['CATEGORIA','FECHA','FECHA_VTO', 'DESCRIPCION', 'PROPIEDAD_ID', 'TERCERO_ID', 'TIPO', 'ESTADO', 'BI', 'IVA'];
     $valores = [$_POST['CATEGORIA'],
     $_POST['FECHA'],
     $_POST['FECHA_VTO'],
     $_POST['DESCRIPCION'],
     $_POST['PROPIEDAD_NOMBRE'],
     $_POST['TERCERO_NOMBRE'],
     $_POST['TIPO'],
     '1',
     $_POST['BI'],
     $_POST['IVA'],
    ];
    $id = $_POST['ID'];
    $modifica = $base->modificaRegistro("FINANCIERA",$id,$keys,$valores);
    echo $modifica;
    //var_dump($_POST);
}


if(isset($_REQUEST['addContabilidad'])){

     echo json_encode($_POST);
     $keys = ['COMUNIDAD_ID','CATEGORIA','FECHA','FECHA_VTO', 'DESCRIPCION', 'PROPIEDAD_ID', 'TERCERO_ID', 'TIPO', 'ESTADO', 'BI', 'IVA'];
     $valores = [$_POST['COMUNIDADID'],
     $_POST['CATEGORIA'],
     $_POST['FECHA'],
     $_POST['FECHA_VTO'],
     $_POST['DESCRIPCION'],     
     $_POST['PROPIEDAD_NOMBRE'],
     $_POST['TERCERO_NOMBRE'],
     $_POST['TIPO'],
     '1',
     $_POST['BI'],
     $_POST['IVA'],
    ];
    $comunidad = $base->nuevoRegistro("FINANCIERA",$keys,$valores);
    echo $comunidad;
    //var_dump($_POST);
}

//TESORERIA----------------------------------------------------------------------------------------------

if($_REQUEST['listaTesoreria']){
    $propiedades = $base->query("SELECT TESORERIA.*
    ,CONCAT(TERCEROS.NOMBRE, ' ', TERCEROS.APELLIDO1) AS 'TERCERO_NOMBRE'
    FROM TESORERIA 
    LEFT JOIN TERCEROS ON TERCEROS.ID = TESORERIA.TERCERO_ID");
    echo json_encode($propiedades);
}


//DATOS COMUNIDAD

if($_REQUEST['datosComunidad']){
    $propiedades = $base->query("SELECT *
    FROM COMUNIDADES
    WHERE COMUNIDAD_ID = '".$_POST['comunidad']."'");
    echo json_encode($propiedades);
}


//TESORERÍA COMUNIDAD

if($_REQUEST['listaTesoreriaComunidad']){
    $tesoreria = $base->query("SELECT TESORERIA.*, concat(TERCEROS.NOMBRE,' ',TERCEROS.APELLIDO1) as 'nombreTercero',
        (SELECT BANCOS.NOMBRE
        FROM BANCOS 
        WHERE BANCOS.ID = TESORERIA.BANCO_ID LIMIT 1) AS 'BANCONOMBRE'
    FROM TESORERIA 
    left join TERCEROS on TERCEROS.ID = TESORERIA.TERCERO_ID
    WHERE TESORERIA.TERCERO_ID = '".$_POST['terceroID']."'");
    echo json_encode($tesoreria);
}


if(isset($_REQUEST['modificaTesoreriaComunidad'])){
    //echo json_encode($_POST);
     $keys = ['BANCONOMBRE', 'nombreTercero', 'TIPO', 'IMPORTE', 'DESCRIPCION', 'FECHA'];
     $valores = [$_POST['BANCONOMBRE'],
     $_POST['nombreTercero'],
     $_POST['TIPO'],
     $_POST['IMPORTE'],
     $_POST['DESCRIPCION'],
     $_POST['FECHA']
    ];
    $id = $_POST['ID'];
    $modifica = $base->modificaRegistro("TESORERIA",$id,$keys,$valores);
     echo $modifica;
}



//DOCUMENTOS---------------------------------------------------------------------------------------------------

if($_REQUEST['listaDocumentos']){
    $documentos = $base->query("SELECT DOCUMENTOS.*,COMUNIDADES.DESCRIPCION AS 'NOMBRECOMUNIDAD' 
    FROM DOCUMENTOS
    LEFT JOIN COMUNIDADES ON COMUNIDADES.ID = DOCUMENTOS.FK_ID
    WHERE DOCUMENTOS.FK_TABLA = 'COMUNIDADES'");
    echo json_encode($documentos);
}

if($_REQUEST['eliminarDocumento']){
    $documentoId = $_POST['documentoElegido'];
    $salida = $base->borrarID("DOCUMENTOS", $documentoId);
    echo "ok";
}

//AÑADIR TESORERIA

// TENGO  QUE CREAR UN NUEVO APUNTE DE TESORERIA EFECTUADO POR UN TERCERO O PARA UN TERCERO. PERO SI QUEREMOS LLEGAR A LOS TERCEROS PROPIETARIOS ¿TENEMOS QUE PASAR POR PROPIEDADES? ¿COMO SERIA?

if(isset($_REQUEST['addTesoreriaComunidad'])){
    
     $keys = ['TERCERO_ID', 'FINANCIERA_ID', 'BANCO_ID', 'TIPO', 'DESCRIPCION','IMPORTE', 'FECHA',];
     $valores =  [
     $_POST['terceroID'],
     $_POST['financieraID'],
     $_POST['BANCO'],
     $_POST['TIPO'],
     $_POST['DESCRIPCION'],
     $_POST['IMPORTE'],
     $_POST['FECHA'],
     ];

    $result = $base->nuevoRegistro("TESORERIA",$keys,$valores);
    echo $result;
}


//BANCOS------------------------------------------------------------------------------------------------------

//LISTADO BANCOS

if($_REQUEST['listadoBancos']){
    $bancos = $base->query("SELECT BANCOS.*
    FROM BANCOS 
    WHERE COMUNIDAD_ID = '".$_REQUEST['comunidadID']."'");
    echo json_encode($bancos);
}


// AÑADIR BANCO

if(isset($_REQUEST['addBanco'])){

    $keys = ['COMUNIDAD_ID','NOMBRE', 'TIPO', 'NUMERO_CUENTA','BIC',];
    $valores = [
        $_POST['comunidadID'],
        $_POST['NOMBRE'],
        $_POST['TIPO'],
        $_POST['NUMERO_CUENTA'],
        $_POST['BIC'],
    ];

   $result = $base->nuevoRegistro("BANCOS",$keys,$valores);

   $nuevoBancoCreado = $base->query("SELECT * FROM BANCOS ORDER BY ID DESC LIMIT 1");
   $nuevoBancoCreadoID = $nuevoBancoCreado[0]['ID'];

   $valores_2 = $nuevoBancoCreadoID;
   $result_2 = $base->nuevoRegistro("BANCOS",$valores_2);

   echo $result.$result2;
   
}

//ELIMINAR BANCO

if($_REQUEST['eliminarBanco']){
    $bancoId = $_POST['bancoElegido'];


    $salida = $base->borrarID("BANCOS", $bancoId);

    echo "ok";
}


//MODIFICA BANCO

if(isset($_REQUEST['modificaBanco'])){
    //echo json_encode($_POST);
     $keys = ['NOMBRE','TIPO','NUMERO_CUENTA', 'BIC'];
     $valores = [$_POST['NOMBRE'],
     $_POST['TIPO'],
     $_POST['NUMERO_CUENTA'],
     $_POST['BIC']
    ];
    $id = $_POST['ID'];
    $modifica = $base->modificaRegistro("BANCOS",$id,$keys,$valores);
 
     echo ($modifica);
}




//*------------------------------------*//
//*               RECIBOS              *//
//*------------------------------------*//

// if(isset($_POST['listaRecibosComunidad'])){
//     $listado = $base->query("SELECT CUOTAS.ID as 'RECIBOID', CUOTAS.*, CONCAT(TERCEROS.NOMBRE,' ',TERCEROS.APELLIDO1,' ',TERCEROS.APELLIDO2) AS 'terceroNombre', TERCEROS.CCC, PROPIEDADES.COMUNIDAD_ID
//     FROM CUOTAS, TERCEROS
//     INNER JOIN CUOTA_TERC_FK ON (CUOTA_TERC_FK.TERCERO_ID = TERCEROS.ID)
//     LEFT JOIN PROP_TERC_FK ON PROP_TERC_FK.TERC_ID = TERCEROS.ID
//     LEFT JOIN PROPIEDADES ON PROPIEDADES.ID = PROP_TERC_FK.PROP_ID
//     WHERE CUOTA_TERC_FK.CUOTA_ID = CUOTAS.ID AND PROPIEDADES.COMUNIDAD_ID =".$_POST['comunidadID']);
    
//     echo json_encode($listado);

// }

if($_REQUEST['listaRecibosComunidad']){
    $recibo = $base->query("SELECT CUOTAS.*,
    CONCAT(TERCEROS.NOMBRE, ' ', TERCEROS.APELLIDO1) AS TERCERO_NOMBRE,
    TERCEROS.CCC AS CCC
         FROM CUOTAS 
         LEFT JOIN CUOTA_TERC_FK ON CUOTAS.ID = CUOTA_TERC_FK.CUOTA_ID
         LEFT JOIN TERCEROS ON TERCEROS.ID = CUOTA_TERC_FK.TERCERO_ID
         WHERE CUOTAS.COMUNIDAD_ID = '".$_POST['comunidadID']."'");
   
   
//    SELECT CUOTAS.*, CUOTA_TERC_FK.*, TERCEROS.*,
//    CONCAT(TERCEROS.NOMBRE,' ',TERCEROS.APELLIDO1,' ',TERCEROS.APELLIDO2) AS 'nombreTercero'
//    FROM CUOTAS 
//    LEFT JOIN CUOTA_TERC_FK ON CUOTA_TERC_FK.CUOTA_ID = CUOTAS.ID
//    LEFT JOIN TERCEROS ON TERCEROS.ID = CUOTA_TERC_FK.TERCERO_ID
   // WHERE CUOTAS.COMUNIDAD_ID ='".$_POST['comunidadID']."'";
     
       echo json_encode($recibo);
   }

if($_POST['addReciboComunidad']){
    //1º RECIBO 
    $keyCuota = ['COMUNIDAD_ID','IMPORTE','REFERENCIA','DESCRIPCION','FECHA'];
    $valorCuota = [$_POST['comunidadID'],$_POST['IMPORTE'],$_POST['REFERENCIA'],$_POST['DESCRIPCION'],$_POST['FECHA']];
    $cuotaId = $base->nuevoRegistro("CUOTAS",$keyCuota,$valorCuota);
    //2º FINANCIERA
    $keyFinan = ['COMUNIDAD_ID',"FECHA","FECHA_VTO","PROPIEDAD_ID","CATEGORIA","TERCERO_ID","BI","IVA","ESTADO","TIPO", "DESCRIPCION"];
    //---BUSQUEDA DE PROPIEDAD
    $consulta = "SELECT PROP_TERC_FK.PROP_ID
    FROM PROP_TERC_FK 
    INNER JOIN PROPIEDADES ON PROPIEDADES.ID = PROP_TERC_FK.PROP_ID
    WHERE PROP_TERC_FK.TERC_ID = '".$_POST['nombreTercero']."' AND PROPIEDADES.COMUNIDAD_ID = '".$_POST['comunidadID']."'";
    //  var_dump($_POST['nombreTercero']);
        $propId = $base->query($consulta);
        // echo 'consulta: '. $consulta;
    $valorFinan = [$_POST['comunidadID'],$_POST['FECHA'],$_POST['FECHA'],$propId[0][0],"banco",$_POST['nombreTercero'],$_POST['IMPORTE'],0,0,"abono", "cuota mensual"];
    $finan_id = $base->nuevoRegistro("FINANCIERA",$keyFinan,$valorFinan);
    //3º ASOCIACION
    $keyAsoc = ['TERCERO_ID',"CUOTA_ID","IMPORTE","ESTADO","FINANCIERA_ID","DATE"];
    $valorAsoc = [$_POST['nombreTercero'],$cuotaId,$_POST['IMPORTE'],"0",$finan_id,$_POST['FECHA']];
    $asociacion = $base->nuevoRegistro("CUOTA_TERC_FK",$keyAsoc,$valorAsoc);
    echo "ok";
}



if($_REQUEST['listaRecibos']){
    $propiedades = $base->query("SELECT CUOTAS.* 
    -- , COMUNIDADES.DESCRIPCION AS 'COMUNIDAD_NOMBRE',
    -- CONCAT(TERCEROS.NOMBRE, ' ', TERCEROS.APELLIDO1) AS 'TERCERO_NOMBRE', 
    -- -- TERCEROS.ID AS 'TERC_ID'
    FROM CUOTAS 
    -- LEFT JOIN COMUNIDADES ON COMUNIDADES.ID = CUOTAS.COMUNIDAD_ID
    -- LEFT JOIN TERCEROS ON TERCEROS.ID = RECIBOS.ID
    ");
    echo json_encode($propiedades);
}

// ---------------------------------------------------------------------------------------------------------

// if($_REQUEST['listaRecibos']){
//     $recibos = $base->query("SELECT CUOTAS.*
//     FROM CUOTAS 
//     WHERE CUOTAS.COMUNIDAD_ID = '".$_POST['comunidad']."'");
//     echo json_code($recibos);
// }

// ---------------------------------------------------------------------------------------------------------

//RECIBOS TERCEROS

// if($_REQUEST['listaRecibosTercero']){
//     $propiedades = $base->query("SELECT CUOTA_TERC_FK.*
//     ,CONCAT(TERCEROS.NOMBRE, ' ', TERCEROS.APELLIDO1) AS 'TERCERO_NOMBRE'
//     FROM CUOTA_TERC_FK 
//     LEFT JOIN TERCEROS ON TERCEROS.ID = CUOTA_TERC_FK.TERCERO_ID
//     WHERE CUOTA_TERC_FK.TERCERO_ID = '".$_POST['tercero']."'");
//     echo json_encode($propiedades);
// }


//ELIMINAR RECIBO

if($_REQUEST['eliminarRecibo']){
    $reciboId = $_POST['reciboElegido'];

    $salida = $base->borrarID("CUOTAS", $reciboId);

    echo "ok";
}


if($_REQUEST['eliminarRecibosSeleccionados']){
    $reciboId = json_decode($_POST['recibosID'], true);
    
    foreach($reciboId as $recibo){
        $salida = $base->borrarID("CUOTAS", $recibo['ID']);
    }

    echo "ok";
}


//MODIFICA RECIBO 

if(isset($_REQUEST['modificaReciboComunidad'])){
    //echo json_encode($_POST);
     $keys = ['IMPORTE', 'NOMBRE_FINAL', 'REFERENCIA','DESCRIPCION'];
     $valores = [$_POST['IMPORTE'],
     $_POST['NOMBRE_FINAL'],
     $_POST['REFERENCIA'],
     $_POST['DESCRIPCION']
    ];
    
    $id = $_POST['ID'];
    $modifica = $base->modificaRegistro("RECIBOS",$id,$keys,$valores);
     echo $modifica;
};

if(isset($_REQUEST['addRecibosMasivosComunidad'])){
    
    //FORM CUOTAS
    $comunidadID = $_POST['COMUNIDAD_ID'];
    $IMPORTE =  $_POST['IMPORTE'];
    $REFERENCIA =  $_POST['REFERENCIA'];
    $DESCRIPCION =  $_POST['DESCRIPCION'];
    $FECHA =  $_POST['FECHA'];
    $PROPIEDAD_IDs = json_decode($_POST['PROPIEDAD_NOMBRE']);    
    // $PROPIEDAD_IDs_ARR = explode(',', $PROPIEDAD_IDs);

    print_r($PROPIEDAD_IDs);

    foreach($PROPIEDAD_IDs as $PROPIEDAD_ID){

        // CREAR FILA CUOTA
        unset($key);
        unset($valor);
        $key = ['COMUNIDAD_ID','IMPORTE','REFERENCIA','DESCRIPCION','FECHA'];
        $valor = [
            $comunidadID,
            $IMPORTE,
            $REFERENCIA,
            $DESCRIPCION,
            $FECHA,

        ];
        $base = new BD;
        $CuotaId = $base->nuevoRegistro("CUOTAS",$key,$valor);

        // CREAR FILA FINANCIERA
        unset($key);
        unset($valor);
        $key = ['COMUNIDAD_ID',"FECHA","FECHA_VTO","PROPIEDAD_ID","CATEGORIA","TERCERO_ID","BI","IVA","ESTADO","TIPO", "DESCRIPCION"];

        $consulta = "SELECT PROP_TERC_FK.TERC_ID
        FROM PROP_TERC_FK 
        LEFT JOIN PROPIEDADES ON PROPIEDADES.ID = PROP_TERC_FK.PROP_ID
        WHERE PROP_TERC_FK.PROP_ID = '".$PROPIEDAD_ID."' AND PROPIEDADES.COMUNIDAD_ID = '".$comunidadID."'";
        $tercId = $base->query($consulta);

        print_r($tercId);

        $valor = [
            $comunidadID,
            $FECHA,
            $FECHA,
            $PROPIEDAD_ID,
            "CUOTA",
            $tercId[0][0],
            $IMPORTE,
            0,
            "1",
            "Abono",
            $DESCRIPCION,
        ];

        $FinancieraId = $base-> nuevoRegistro("FINANCIERA", $key, $valor);
 
        // UNIR FILAS CUOTAS Y FINANCIERA
        unset($key);
        unset($valor);
        $keyAsoc = ['TERCERO_ID',"CUOTA_ID","IMPORTE","ESTADO","FINANCIERA_ID","DATE"];
        $valorAsoc = [
            $tercId[0][0],
            $CuotaId,
            $IMPORTE,
            '1',
            $FinancieraId,
            $FECHA,
        ];

        $asociacionId = $base->nuevoRegistro("CUOTA_TERC_FK",$keyAsoc,$valorAsoc);
    }



    echo "ok";
                

};




//CREAR XML


if(isset($_POST['crearXML'])){

    $datos = json_decode($_POST['formularioEnvio']);
    $cuerpo = "<recibos>";
    foreach( $datos['recibo'] as $recibo){
    $cuerpo .= "<recibo>
        <nombre_propietario></nombre_propietario>
        <importe></importe>
        <descipcion>" . $recibo['IMPORTE'] . "</descipcion>
        <numero_cuenta></numero_cuenta>
        <fecha></fecha>
        </recibo>";
    }
    $cuerpo .= "</recibos>";
    echo $cuerpo;
   

}

/*--------------------------*/
/*      CONFIGURACIÓN       */
/*--------------------------*/

if(isset($_POST['listadoCategorias'])){
    $listado = $base->query("SELECT CATEGORIAS FROM CONFIGURACION");
    iF(empty($listado[0][0])){
        $arraySalida[0]['CATEGORIAS'] = "";
        echo json_encode($arraySalida);
    }else{
        echo $listado[0][0];
    }
    
}

if(isset($_POST['cambiaDatosCategoria'])){
    $respuesta = $base->modificaID("CONFIGURACION", 1,"CATEGORIAS",$_POST['datos']);
    echo $respuesta; 
}

if(isset($_POST['listadoCategoriasComunidad'])){
    $listado = $base->query("SELECT CATEGORIAS FROM COMUNIDADES WHERE ID='".$_POST['comunidad']."'");
        echo $listado[0][0];
    
}


//LOG MANTENIMIENTO

if($_REQUEST['listaLogMantenimientoComunidad']){
    $mantenimientoLog = $base->query("SELECT *
    FROM LOG_MANTENIMIENTO
    WHERE MANTENIMIENTO_ID = '".$_REQUEST['mantenimiento']."'" );
    
    echo json_encode($mantenimientoLog);
}

if(isset($_REQUEST['modificaLog'])){
    //echo json_encode($_POST);
     $keys = ['DESCRIPCION','FECHA'];
     $valores = [$_POST['DESCRIPCION'],
     $_POST['FECHA'],
    ];
    $id = $_POST['ID'];
    $modifica = $base->modificaRegistro("LOG_MANTENIMIENTO",$id,$keys,$valores);
    echo $modifica;
}

/*---------------*/
/* PRESUPUESTOS */
/*---------------*/

if(isset($_POST['categoriasComunidad'])){
    $listado = $base->query("SELECT CATEGORIAS FROM COMUNIDADES WHERE COMUNIDADES.ID =".$_POST['comunidadID']);
    echo $listado[0][0];
}

if(isset($_POST['importeTotalComunidad'])){
    $listado = $base->query("SELECT FINANCIERA.CATEGORIA, (SUM(FINANCIERA.BI)+SUM(FINANCIERA.IVA)) AS 'IMPORTE' FROM FINANCIERA WHERE FINANCIERA.COMUNIDAD_ID = ".$_POST['comunidadID']." AND YEAR(FINANCIERA.FECHA) = ".$_POST['ano']." GROUP BY FINANCIERA.CATEGORIA");
    echo json_encode($listado);
}

if(isset($_POST['presupuestoTotalComunidad'])){
    $listado = $base->query("SELECT LINEAS_PTO_GENERAL.CATEGORIA, LINEAS_PTO_GENERAL.IMPORTE FROM LINEAS_PTO_GENERAL WHERE LINEAS_PTO_GENERAL.PTO_ID = ".$_POST['pto']);
    echo json_encode($listado);
}



/*----------------------*/
/*----------------------*/
/*----------------------*/



/*------------------------------------------------------------------*/
/* LOGIN
/*------------------------------------------------------------------*/

if(isset($_REQUEST['login'])){

    $usuario = $_POST['USUARIO'];
    $pass = $_POST['PASS'];
    /*---*/
    $sql = "SELECT * 
            FROM USUARIOS 
            WHERE USUARIO = '$usuario' AND PASS = '$pass'
            LIMIT 1";
    $base = new BD();
    $resultados = $base->query($sql);
  
    if(!empty($resultados)){
      $ID = $resultados[0]['ID'];
      $token =  $ID .'.'. date_timestamp_get(date_create());
      $time = time()+3600*24*15;
      /*---*/
      unset($campos);
      unset($valores);
      $campos = [
        'TOKEN'
      ];
      $valores =[
        $token
      ];
      $base = new BD();
      $base->update_BD('USUARIOS', $ID, $campos, $valores);
      /*---*/
      setcookie("TOKEN", $token, $time);
      echo 'ok';
    } else {
      echo 'empty';
    }
  };

  if(isset($_REQUEST['login_verif'])){

    $token = $_COOKIE['TOKEN'];
    /*---*/
    if( !empty($token)) {
    $sql = "SELECT * 
            FROM USUARIOS 
            WHERE TOKEN = $token
            LIMIT 1";
    $base = new BD();
    $resultados = $base->query($sql);
    }
    
    if(!empty($resultados)){
      echo 'ok';
    } else {
      echo 'empty';
    }
  }
  

