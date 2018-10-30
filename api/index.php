<?php


$con = mysqli_connect('localhost', 'root', 'toor', 'todolist');
$request = $_SERVER['REQUEST_METHOD'];

switch ($request) {
  case 'GET':
    $sql = "SELECT * FROM todo";
    $result = mysqli_query($con, $sql);

    if (mysqli_num_rows($result) > 0) {
      echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
    }
    break;

  case 'POST':
    $ct = json_decode(file_get_contents('php://input'), true);
    $text = $ct['text'];
    $done = $ct['done'];

    $sql = "INSERT INTO todo (text, done) VALUES ('$text', $done)";
    $result = mysqli_query($con, $sql);

    if ($result) {
      $last_id = mysqli_insert_id($con);
      print_r(json_encode([
        'id' => $last_id, 'text' => $text, 'done' => $done
      ]));
    } else {
      print_r(json_encode(['message' => 'eror insert!!!']));
    }
    break;

  case 'DELETE':
    $id = $_GET['id'];

    $sql = "DELETE FROM todo WHERE id = $id";
    $result = mysqli_query($con, $sql);
    break;
    
  case 'PATCH':
    $id = $_GET['id'];
    $done = $_GET['done'];

    $sql = "UPDATE todo SET done=$done WHERE id = $id";
    $result = mysqli_query($con, $sql);
    break;

  default:
    # code...
    break;
}

?>
