<?php
include('database.php');
if(isset($_POST ['id'])){
    $id = $_POST['id'];
    $firstName = $_POST ['firstName'];
    $lastName = $_POST ['lastName'];
    $query = "UPDATE person SET firstName = '$firstName', lastName = '$lastName' WHERE id = $id";
    $resultado = mysqli_query($conexion,$query);
    if(!$resultado){
        die('senetencia ha fallado');
    }
    echo "se registro correctamente";
}

?>
