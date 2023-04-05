<?php

/**
 * Acceso a BD
 *
 * @author Benito Barrios Voluta Estudio
 */

class BD {

    //put your code here
    //Defincion para la base de datos
    private $usuario = 'voluta';
    private $pass = "Boliche@0064";
    private $servidor = '217.76.154.138';
    private $bd = 'triagestion';

    

    // ACCESO
    public function accesoBD() {
        try {
            $base = new PDO("mysql:host=$this->servidor;dbname=$this->bd", $this->usuario, $this->pass);
            $base->exec("set names utf8");
            $base->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $base;
        } catch (PDOException $e) {
            //return $error = false;
           //echo $error_listado->getMessage();
        }
    }
    
    public function consultaID($tabla, $valor,$campo){
         try {
             $base = $this->accesoBD();       
             $consulta = $base->prepare("SELECT `".$campo."` FROM `".$tabla."` WHERE(`id` = '".$valor."')");
             $consulta->execute();
             $listado = $consulta->fetchAll();
             return $listado[0][0];
             $consulta = null;
        } catch (PDOException $error_listado) {
            //echo $error_listado->getMessage();
        }
    }

    public function consultaRowid($tabla, $valor,$campo){
        try {
            $base = $this->accesoBD();       
            $consulta = $base->prepare("SELECT `".$campo."` FROM `".$tabla."` WHERE(`rowid` = '".$valor."')");
            $consulta->execute();
            $listado = $consulta->fetchAll();
            return $listado[0][0];
            $consulta = null;
       } catch (PDOException $error_listado) {
           //echo $error_listado->getMessage();
       }
   }
    
    public function modificaID($tabla, $valor,$campo,$valorCampo){
         try {
             $base = $this->accesoBD();       
             $consulta = $base->prepare("UPDATE `".$tabla."` SET `".$campo."` = '".$valorCampo."' WHERE(`ID` = '".$valor."')");
             $consulta->execute();
             return "ok";
             $consulta = null;
        } catch (PDOException $error_listado) {
            //echo "ko";
            echo $error_listado->getMessage();
        }
    }
    
    public function registroID($tabla, $valor){
         try {
             $base = $this->accesoBD();       
             $consulta = $base->prepare("SELECT * FROM `".$tabla."` WHERE(`id` = '".$valor."')");
             $consulta->execute();
             $listado = $consulta->fetchAll();
             return $listado[0];
             $consulta = null;
        } catch (PDOException $error_listado) {
            //echo $error_listado->getMessage();
        }
    }
    
    public function registroRowid($tabla, $valor){
        try {
            $base = $this->accesoBD();       
            $consulta = $base->prepare("SELECT * FROM `".$tabla."` WHERE(`rowid` = '".$valor."')");
            $consulta->execute();
            $listado = $consulta->fetchAll();
            return $listado[0];
            $consulta = null;
       } catch (PDOException $error_listado) {
           //echo $error_listado->getMessage();
           //echo $error_listado->getMessage();
       }
   }

    public function selectMYSQL($select,$tabla,$where){
         try {
             $base = $this->accesoBD();       
             $consulta = $base->prepare("SELECT ".$select." FROM `".$tabla."` WHERE ".$where);
             $consulta->execute();
             $listado = $consulta->fetchAll();
             return $listado;
             $consulta = null;
        } catch (PDOException $error_listado) {
            //echo $error_listado->getMessage();
        }
    }
    
    public function borrarID($tabla, $valor){
         try {
             $base = $this->accesoBD();       
             $consulta = $base->prepare("DELETE FROM ".$tabla." WHERE ".$tabla.".ID = '".$valor."' ");
             $consulta->execute();
             return "ok";
             $consulta = null;
        } catch (PDOException $error_listado) {
            echo $error_listado->getMessage();
        }
    }
    
    public function nuevoRegistro($tabla, $keys,$valores){
        
         try {
             //$Array asociativo
             $datos = $valores;
             $numCampos = count($datos);
             $sql = "INSERT INTO ".$tabla." (";
             for ($i = 0;$i<$numCampos;$i++){
                 $sql.=$keys[$i];
                 if ($i == $numCampos-1){
                     
                 }else{
                    $sql.=", "; 
                 }
             }
             $sql.=") VALUES (";
             for ($i = 0;$i<$numCampos;$i++){
                 $sql.="'".$datos[$i]."'";
                 if ($i == $numCampos-1){
                    $sql.=")";  
                 }else{
                    $sql.=", "; 
                 }
             }
             
             $base = $this->accesoBD();
             $consulta = $base->prepare($sql);
             $consulta->execute();
             //return "ok";
             return $base->lastInsertId();
             $consulta = null;
        } catch (PDOException $error_listado) {
            echo $error_listado->getMessage();
            //echo $error_listado->getMessage();
        }
    }

    public function modificaRegistro($tabla,$id, $keys,$valores){
        
        try {
            //$Array asociativo
            $datos = $valores;
            $numCampos = count($datos);
            $sql = "UPDATE ".$tabla." SET ";
            for ($i = 0;$i<$numCampos;$i++){
                $sql.=$keys[$i]. " = '".$valores[$i]."'";
                if ($i == $numCampos-1){
                    
                }else{
                   $sql.=", "; 
                }
            }
            
            $sql.=" WHERE ID=".$id; 
            $base = $this->accesoBD();
            $consulta = $base->prepare($sql);
            $consulta->execute();
            return "ok";
            //return $base->lastInsertId();
            $consulta = null;
       } catch (PDOException $error_listado) {
           //return "error";
           return $error_listado->getMessage();
           // echo $sql;
       }
   }
    
    public function query($string){
         try {
             $base = $this->accesoBD();       
             $consulta = $base->prepare($string);
             $consulta->execute();
             $listado = $consulta->fetchAll();
             return $listado;
             $consulta = null;
        } catch (PDOException $error_listado) {
            //echo $error_listado->getMessage();
            //return "";
            //echo $error_listado->getMessage();
        }
    }

    public function modificaRowid($tabla, $valor,$campo,$valorCampo){
        try {
            $base = $this->accesoBD();       
            $consulta = $base->prepare("UPDATE ".$tabla." SET ".$campo." = '".$valorCampo."' WHERE(rowid = '".$valor."')");
            $consulta->execute();
            return "ok";
            $consulta = null;
       } catch (PDOException $error_listado) {
           //echo "ko";
           //echo $error_listado->getMessage();
       }
   }

  
}