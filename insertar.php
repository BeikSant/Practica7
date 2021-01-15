
<?php
include('database.php');
if(isset($_POST ['firstName'])){
    $firstName = $_POST ['firstName'];
    $lastName = $_POST ['lastName'];
    $query = "INSERT INTO person(firstName, lastName) VALUES ('$firstName','$lastName')";
    $resultado = mysqli_query($conexion,$query);
    if(!$resultado){
        die('senetencia ha fallado');
    }
    echo "se registro correctamente";
}

?>
