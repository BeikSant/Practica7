<?php
    $conexion = mysqli_connect('localhost','root','beiksant','practica7');
    if(!$conexion){
    echo "<p> Error al conectar la base de datos" . mysql_connect_error() . "</p>"; 
    }
?>