<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "kviz podatoci";

    $con = new mysqli($servername, $username, $password, $database);
    if ($con->connect_error) {
        die("Грешка:".$con->connect_error);
    }

    $korisnickoIme = $_POST['I'];
    $god = $_POST['G'];
    $poeni = $_POST['P'];
    $sql = "INSERT INTO podatoci(username, god, Poeni)
            VALUES ('$korisnickoIme','$god', $poeni)";
    if ($con->query($sql) === TRUE) {
        header("Location:Index.html");
        exit();
    }
    else {
        echo "Грешка:".$con->connect_error;
    }
    $con->close();

?>