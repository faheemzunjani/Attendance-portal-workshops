<?php

session_start();

header("Content-type: text/plain");

function chk_user( $uid, $pwd ) {

		if ($pwd) {
			$ds = ldap_connect("172.31.1.42");
			ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
			$a = ldap_search($ds, "dc=iiita,dc=ac,dc=in", "uid=$uid" );
			$b = ldap_get_entries( $ds, $a );
			$dn = $b[0]["dn"];
			$ldapbind=@ldap_bind($ds, $dn, $pwd);
			if ($ldapbind) {
				return 1;
			} else {
				return 0;
			}
			ldap_close($ds);
		} else {
			die('403');
		}
	}
		
	function get_name($uid) {
		$ds=ldap_connect("172.31.1.42");
		

		ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
		if ($ds)
		{
			$bnd=ldap_bind($ds);
			$srch=ldap_search($ds, "dc=iiita,dc=ac,dc=in", "uid={$uid}");
			$info=ldap_get_entries($ds, $srch);
			ldap_close($ds);

			$userdn=$info[0]["dn"];
			$usernm=$info[0]["cn"][0];

			return $info[0]["cn"][0];
		} else {
			return "Not available";
		}
	}
	static $connection;
	$connection = mysqli_connect('localhost', 'root', '', 'attendance');
	if ($connection == false) {
		die("404");
	}


	$user=$_REQUEST['roll'];
	$pass=$_REQUEST['pass'];

	$result = mysqli_query($connection, "SELECT * FROM tutors where roll='".strtolower($user)."'");
	if ($result === false) {
		die("Can't connect to DB");
	}
	$row = mysqli_fetch_assoc($result);
	if ($user != $row['roll']) {
		die('401');
	}
	$true=chk_user($user, $pass);
	$data = "";

	if($true){
		$name=get_name($user);
		$arr = explode("-",$name);
		$fname1=substr($name, 0, strrpos($name, "-"));
		$fname=str_replace("-", " ", $fname1);
		$_SESSION['name']=$name;
		$_SESSION['fname']=$fname;
	
		$data = "200";
	}
	else{
		$data = "403";
	}

	// 200 means login true, 404 means login false
	
	echo $data;
	// $new = '<meta http-equiv="refresh" content="0; url=http://localhost/checklogin/'.$data.'" />'
	

?>
