<?php

//Creating an associative array which will then be encoded as json
/*Taking the key which stores the variable in the array and passing it to the 
method and stores it in $orig.*/
$orig = $_POST['searchInput'];



$dbConnection = $query = $lastID ="";

/*Function that creates the database once its called*/
function connectToDB(){
define("HOST", "127.0.0.1:3307");
define("USERNAME", "root");
define("PASSWORD", "");
define("DB", "webtechclass");

global $dbConnection;
$dbConnection = new mysqli(HOST, USERNAME, PASSWORD, DB);

}

function select_query($keyword){
    global $dbConnection, $query;
    $query = 'SELECT username, gender, color FROM webtechtable WHERE(username LIKE '. "'%$keyword%'" .') ';
    $result = $dbConnection->query($query);
   
return $result;
}


function getSearchResults($par){
    $userDeets = select_query($par);

    if($userDeets->num_rows > 0){
        $names = $genders  = $colors = array();

        while($row = $userDeets->fetch_assoc()){
           array_push($names, $row["username"]);
           array_push($genders,$row["gender"] );
           array_push($colors , $row["color"]);
        }

          $fetchedUserDeets = array(
            'user_name' => $names,
            'user_gender' => $genders,
            'user_color' => $colors,
            'dataSize' => $userDeets->num_rows
        
            );
            $data = json_encode($fetchedUserDeets);
            echo $data;
       
    }
    
    
}
function init(){
    /*echo "Initialising.";*/
    global $orig;
    connectToDB();
    getSearchResults($orig);    
    
 
}


/*Begin*/
init();


?>