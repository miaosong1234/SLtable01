<?php
// 假设你已经建立了数据库连接
$host = 'localhost';
$dbname = 'databasetest1';
$username = 'root';
$password = 'root';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//    echo "Connected to the database successfully.<br>";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}

// 检查是否有搜索关键词或性别过滤条件
//$searchKey = isset($_GET['searchKey']) ? $_GET['searchKey'] : '';
//$sexFilter = isset($_GET['sexFliter']) ? intval($_GET['sexFliter']) : -1;

$sql = "SELECT * FROM users";
$params = [];
$where = [];

//if ($searchKey) {
//    $where[] = "name LIKE ?";
//    $params[] = "%$searchKey%";
//}
//
//if ($sexFilter != -1) {
//    $where[] = "sex = ?";
//    $params[] = $sexFilter;
//}
//
//if (!empty($where)) {
//    $sql .= " WHERE " . implode(" AND ", $where);
//}

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 将结果转换为与mock相似的格式
    $response = array_map(function($user) {
        return [
            'name' => $user['name'],
            'sex' => $user['sex']
        ];
    }, $users);

    // 设置HTTP响应头为JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} catch(PDOException $e) {
    echo "Query failed: " . $e->getMessage();
}

$pdo = null;
?>