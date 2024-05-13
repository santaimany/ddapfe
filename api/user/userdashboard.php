<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    header("Location: login");
    exit;
}

$email = $_SESSION['email'];

// Query untuk mendapatkan nama lengkap dari tabel users
$sqlUser = "SELECT namalengkap FROM users WHERE email = ?";
$stmtUser = $conn->prepare($sqlUser);
$stmtUser->bind_param("s", $email);
$stmtUser->execute();
$resultUser = $stmtUser->get_result();
$user = $resultUser->fetch_assoc();

if ($user) {
    $namalengkap = $user['namalengkap'];
} else {
    $namalengkap = "Nama Tidak Ditemukan"; // Atau penanganan lain sesuai kebutuhan
}

// Query untuk mendapatkan data persetujuan berdasarkan email_pengaju
$sqlApproval = "SELECT * FROM persetujuan WHERE email_desa = ?";
$stmtApproval = $conn->prepare($sqlApproval);
$stmtApproval->bind_param("s", $email);
$stmtApproval->execute();
$resultApproval = $stmtApproval->get_result();

// Query untuk mendapatkan jumlah notifikasi dari tabel pengajuanrequest
$sqlNotifications = "SELECT COUNT(*) AS num_notifications FROM pengajuanrequest WHERE email_tujuan = ?";
$stmtNotifications = $conn->prepare($sqlNotifications);
$stmtNotifications->bind_param("s", $email);
$stmtNotifications->execute();
$resultNotifications = $stmtNotifications->get_result();
$rowNotifications = $resultNotifications->fetch_assoc();

$num_notifications = $rowNotifications ? $rowNotifications['num_notifications'] : 0;

// Query untuk mendapatkan data pendataan berdasarkan email
$sql = "SELECT * FROM pendataan WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "<div id='content'>";
    echo "<h2>Data Pendataan di Desa Anda!</h2>";
    echo "<table class='table table-bordered'>";
    echo "<thead><tr><th>ID</th><th>Lurah Desa</th><th>Jenis Pangan</th><th>Distributor</th><th>GPS</th><th>Email Desa Anda</th><th>Total Harga</th></tr></thead>";
    echo "<tbody>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . htmlspecialchars($row['lurah_desa']) . "</td>";
        echo "<td>";
        $jenis_pangan = explode(',', $row['jenis_pangan']);
        $berat_pangan = explode(',', $row['berat_pangan']);
        $harga_satuan = explode(',', $row['harga_satuan']);
        foreach ($jenis_pangan as $index => $jenis) {
            echo htmlspecialchars($jenis) . " " . htmlspecialchars($berat_pangan[$index]) . " TON - Rp " . number_format($harga_satuan[$index], 0, '', ',') . "<br>";
        }
        echo "</td>";
        echo "<td>" . htmlspecialchars($row['distributor']) . "</td>";
        echo "<td><a href='https://www.google.com/maps/search/?api=1&query=" . urlencode($row['gps']) . "' target='_blank'>Buka di Google Maps</a></td>";
        echo "<td>" . htmlspecialchars($row['email']) . "</td>";
        echo "<td>" . number_format((float)$row['total_harga'], 0, '', ',') . "</td>";
        echo "</tr>";
    }
    echo "</tbody>";
    echo "</table>";
    echo "</div>";
} else {
    echo "<div id='content'><h2>Belum ada data di desa anda!</h2></div>";
}

if ($resultApproval->num_rows > 0) {
    echo "<div id='content'>";
    echo "<h2>Data Persetujuan Pengiriman</h2>";
    echo "<table class='table table-bordered'>";
    echo "<thead><tr><th>ID</th><th>Lurah Desa</th><th>Jenis Pangan</th><th>Distributor</th><th>GPS</th><th>Email Pengaju</th><th>Total Harga</th><th>Actions</th></tr></thead>";
    echo "<tbody>";
    while ($rowApproval = $resultApproval->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $rowApproval['id'] . "</td>";
        echo "<td>" . htmlspecialchars($rowApproval['balai_desa']) . "</td>";
        echo "<td>";
        $jenis_pangan = explode(',', $rowApproval['jenis_pangan']);
        $berat_pangan = explode(',', $rowApproval['berat_pangan']);
        $harga_satuan = explode(',', $rowApproval['harga_satuan']);
        foreach ($jenis_pangan as $index => $jenis) {
            echo htmlspecialchars($jenis) . " " . htmlspecialchars($berat_pangan[$index]) . " TON - Rp " . number_format($harga_satuan[$index], 0, '', ',') . "<br>";
        }
        echo "</td>";
        // echo "<td>" . htmlspecialchars($rowApproval['berat_pangan']) . "</td>";
        echo "<td>" . htmlspecialchars($rowApproval['distributor']) . "</td>";
        echo "<td><a href='https://www.google.com/maps/search/?api=1&query=" . urlencode(htmlspecialchars($rowApproval['balai_desa'])) . "' target='_blank'>Buka di Google Maps</a></td>";
        echo "<td>" . htmlspecialchars($rowApproval['email_pengaju']) . "</td>";
        echo "<td>" . number_format($rowApproval['total_harga'], 2) . "</td>";
        echo "<td><a href='print_action.php?id=" . $rowApproval['id'] . "'><i class='fas fa-print'></i></a> <a href='checklist_action.php?id=" . $rowApproval['id'] . "' style='color: green;'><i class='fas fa-check'></i></a></td>";
        echo "</tr>";
    }
    echo "</tbody></table>";
    echo "</div>";
} else {
    echo "<div id='content'><h2>Belum ada data persetujuan.</h2></div>"; // Menampilkan pesan jika tidak ada data persetujuan
}




$conn->close();
?>

<!DOCTYPE html>
<html>

<head>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="/ddap/src/index.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css">
    <link
            href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
            rel="stylesheet"
    />

    <style>


        #notificationTooltip {
            position: relative;
            /* other styles... */
        }

        #content {
            margin-left: 220px;
            padding: 20px;
            padding-top: 140px;
        }

        .navbar-text {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 100%;
        }

        .modal-dialog {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .notification-group {
            display: flex;
            align-items: center;
            position: relative;
        }

        .bell-icon {
            font-size: 1.5rem;
        }

        .notification-bubble {
            position: absolute;
            top: -10px;
            right: -10px;
            background-color: red;
            color: white;
            border-radius: 50%;
            padding: 5px 10px;
            font-size: 0.45rem;
        }
    </style>
</head>

<body>
<nav class="bg-gray-900 text-white p-4 fixed w-full z-10 top-0 ml-[220px]">
    <div class="flex justify-between items-center">
        <a href="#" class="text-white">Dashboard</a>
        <div class="flex items-center">
            <div class="mr-6">Selamat datang, <?php echo $namalengkap; ?></div>
            <div id="notification-icon" class="notification-group mr-6 relative">
                <i class="ri-notification-3-line bell-icon text-white text-3xl cursor-pointer"></i>
                <span class="notification-bubble absolute top-[-10px] right-[-10px] bg-red-600 text-white text-xs rounded-full px-2 py-1">0</span>
            </div>
            <a href="logout" class="mr-[250px]">Keluar <i class="ri-logout-box-line ml-1"></i></a>
        </div>
    </div>
</nav>

<div id="notificationTooltip" class=" p-2 ml-[550px] rounded shadow-md fixed left-1/8 bottom-[630px] mt-16 mr-[300px] z-50 ">
    <button id="closeTooltip" class=""><i class="ri-close-line"></i></button>
    <!-- Content of notifikasi.php will be loaded here -->
</div>


<!--    <div id="sidebar" class="fixed left-0 top-0 w-64 h-full bg-gray-500 p-4">-->
<!--        <ul class="nav flex items-center">-->
<!--            <li class="nav-item">-->
<!--                <a class="nav-link mt-2" href="pendataan">Pendataan User</a>-->
<!--            </li>-->
<!--            <li class="nav-item">-->
<!--                <a class="nav-link" href="hasilpengajuan">Hasil Pengajuan</a>-->
<!--            </li>-->
<!--            <li class="nav-item">-->
<!--                <a class="nav-link" href="riwayatpersetujuan">Riwayat Persetujuan</a>-->
<!--            </li>-->
<!--        </ul>-->
<!--    </div>-->
    <div id="content">
    </div>

<!--    Sidebar New -->

    <div class="fixed left-0 top-0 w-56 h-full bg-gray-900 ">
        <a class="flex items-center pb-4 border-b border-b-gray-800 shadow-white shadow-lg mb-10 rounded" href="#">
            <img src="../assets/img/logo/ThriveTerra_Logo.png" alt="Logo Thrive Terra" class="w-full">
        </a>
        <ul class="mt-4">
            <li class="mb-1 group active">
                <a href="pendataan" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md  ">
                    <i class="ri-dashboard-horizontal-line mr-3 text-lg"></i>
                    <span class="text-sm">Dashboard</span>
                </a>
            </li>
            <li class="mb-1 group active">
                <a href="pendataan" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md  ">
                    <i class="ri-dashboard-horizontal-line mr-3 text-lg"></i>
                    <span class="text-sm">Pendataan</span>
                </a>
            </li>
            <li class="mb-1 group active">
                <a href="pendataan" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md  ">
                    <i class="ri-guide-line mr-3 text-lg"></i>
                    <span class="text-sm">Pengajuan</span>
                </a>
            </li>
            <li class="mb-1 group active">
                <a href="pendataan" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md  ">
                    <i class="ri-settings-3-line mr-3 text-lg"></i>
                    <span class="text-sm">Persetujuan</span>
                </a>
            </li>
            <li class="mb-1 group active">
                <a href="pendataan" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md  ">
                    <i class="ri-settings-3-line mr-3 text-lg"></i>
                    <span class="text-sm">Hasil</span>
                </a>
            </li>
            <li class="mb-1 group active">
                <a href="pendataan" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md  ">
                    <i class="ri-settings-3-line mr-3 text-lg"></i>
                    <span class="text-sm">Pengaturan</span>
                </a>
            </li>




        </ul>








    </div>



    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script>
        $(document).ready(function() {
            // Fungsi untuk memperbarui jumlah notifikasi
            function updateNotificationCount() {
                $.get('get_notification_count.php', function(data) {
                    $('.notification-bubble').text(data);
                });
            }

            // Panggil fungsi ini setiap 500 milidetik
            setInterval(updateNotificationCount, 500);

            $('#notification-icon').click(function() {
                $.get('notifikasi.php', function(data) {
                    $('#notificationTooltip').html(data);
                    $('#notificationTooltip').show();
                    $('#notificationTooltip').tooltip();
                });
            });

            // Attach the click event handler to the close button using the on() method
            $(document).on('click', '#closeTooltip', function() {
                $('#notificationTooltip').hide();
            });

            // Hide the tooltip when anywhere else on the page is clicked
            $(document).click(function(event) {
                if (!$(event.target).closest('#notification-icon').length && !$(event.target).is('#closeTooltip')) {
                    $('#notificationTooltip').hide();
                }
            });
        });
    </script>

</body>

</html>