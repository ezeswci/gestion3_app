<?php
function sumar_minutos($swci_hora_entrada,$duracion) {         
        $swci_hora_entrada=split(":",$swci_hora_entrada); 
        $duracion=split(":",$duracion); 
        $horas=(int)$swci_hora_entrada[0]+(int)$duracion[0]; 
        $minutos=(int)$swci_hora_entrada[1]+(int)$duracion[1]; 
        $horas+=(int)($minutos/60); 
        $minutos=$minutos%60; 
        if($minutos<10)$minutos="0".$minutos ; 
		if($horas<10)$horas="0".$horas ; 
        return $swci_hora_salida = $horas.":".$minutos;; 
        }  
//------------------------------------------
$fecha_desde = date('d-m-Y');
$tipser = 1;
$tip_serv = $tipser;include('../../includes/leertiposervicio_turnos.php');


?>
