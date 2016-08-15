<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
	die("Insecure connection");
}

echo "<br>";

if (empty($_POST['username']) || empty($_POST['password']) || empty($_POST['wing']) || empty($_POST['workshop'])) {
	// die ("No input supplied");
}

// config
$db_username = 'root';
$db_password = '';
$db_name = 'attendance';

// get post data 
$username = $_POST['username'];
$wing = $_POST['wing'];
$students = $_POST['student'];
static $connection;
$connection = mysqli_connect('localhost', $db_username, $db_password, $db_name);
if ($connection == false) {
	die ("Could not connect to database");
}

function db_query($conn, $query) {
	$result = mysqli_query($conn, $query);
	return $result;
}


function db_select($conn, $query) {
    $rows = array();
    $result = db_query($conn, $query);

    // If query failed, return `false`
    if($result === false) {
        return false;
    }

    // If query was successful, retrieve all the rows into an array
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    return $rows;
}


$rows = db_select($connection, "select * from tutors where roll= '".$username."'");

if (count($rows) != 1) {
	die("Unauthorized");
}

foreach ($students as $key => $val) {
	$rows = db_select($connection, "SELECT roll from students where roll='".$val."'");
	if (count($rows) == 0) {
		$query = "INSERT INTO students VALUES ('".$val."', '','','','','','','')";
		$result = db_query($connection, $query);
		if ($result == false) {
			die("Some error occured");
		}
	}
	$count = db_select($connection, "SELECT workshop_no from workshops where wing='".$wing."'");
	if (count($count) == 0) {
		die("Invalid group / values");
	}
	$count = $count[0]['workshop_no'];	

	$query = "SELECT ".$wing." from students where roll='".$val."'";
	$result = db_select($connection, $query);
	if ($result == false || count($result) > 1) {
		die("Some error occured");
	}
	$mystr = $result[0][$wing];
	$mystr = $mystr.','.$count;
	$query = "UPDATE students SET ".$wing." = '".$mystr."' where roll = '".$val."'";

	$result = db_query($connection, $query);
	if ($result == false) {
		die ("Some error occured");
	}
}

echo "The following students have been marked present. In case of errors, contact the admin. <br>";

foreach ($students as $key => $val) {
	echo $val. "<br>";
}

?>