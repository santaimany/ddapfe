<?php
include '../db/configdb.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['email'])) {
    header('Location: login.php');
    exit;
}

$email = $_SESSION['email'];

$sql = "SELECT gps FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$user_gps = explode(",", $user['gps']);

$sqlUser = "SELECT namalengkap FROM users WHERE email = ?";
$stmtUser = $conn->prepare($sqlUser);
$stmtUser->bind_param("s", $email);
$stmtUser->execute();
$resultUser = $stmtUser->get_result();
$userName = $resultUser->fetch_assoc();

if ($user) {
    $namalengkap = $userName['namalengkap'];
} else {
    $namalengkap = "Nama Tidak Ditemukan"; // Atau penanganan lain sesuai kebutuhan
}

$sql = "SELECT id, lurah_desa, jenis_pangan, berat_pangan, harga_satuan, berat, distributor, gps, email,
        ( 6371 * acos( cos( radians(?) ) * cos( radians( SUBSTRING_INDEX(gps, ',', 1) ) ) * cos( radians( SUBSTRING_INDEX(gps, ',', -1) ) - radians(?) ) + sin( radians(?) ) * sin(radians( SUBSTRING_INDEX(gps, ',', 1) )) ) ) AS distance
        FROM pendataan
        WHERE email != ?
        ORDER BY distance";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ddds", $user_gps[0], $user_gps[1], $user_gps[0], $email);
$stmt->execute();
$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengajuan</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcqpq8QdjwYc2tngkoyvpvdZAmEjSxKM&libraries=places"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
    <link rel="stylesheet" href="/ddap/src/index.css">
</head>

<body class="bg-gray-100">

<nav class="bg-white text-black left-1 p-4 fixed w-full z-10 top-0 ml-[220px]">
    <div class="flex justify-between items-center ">
        <a href="#" class="font-semibold text-2xl">Pengajuan</a>
        <div class="flex items-center">
            <div class="mr-6">Selamat datang, <?php echo $namalengkap; ?></div>
            <div id="" class=" mr-6 relative">
                <i class="ri-account-circle-line text-3xl"></i>
            </div>
            <a href="logout" class="mr-[250px]">Keluar <i class="ri-logout-box-line ml-1"></i></a>
        </div>
    </div>
</nav>
<div class="fixed bg-gray-900 left-0 top-0 w-56 h-full z-50 pr-4">
    <a class="flex items-center pb-4 border-b border-b-gray-800 mb-10 rounded" href="#">
        <img src="../assets/img/logo/logo%20thriveterra%20putih.svg" alt="Logo Thrive Terra" class="w-full">
    </a>
    <ul class="mt-4">
        <li class="mb-1 group active">
            <a href="http://localhost:63342/ddap-project2%20-%20Copy/ddap/api/user/userdashboard.php" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md">
                <i class="ri-dashboard-horizontal-line mr-3 text-lg"></i>
                <span class="text-sm">Dashboard</span>
            </a>
        </li>
        <li class="mb-1 group active">
            <a href="http://localhost:63342/ddap-project2%20-%20Copy/ddap/api/user/pendataan.php?_ijt=k6rk6kcirvgap6csh7verm18s2&_ij_reload=RELOAD_ON_SAVE" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md">
                <i class="ri-database-2-line mr-3 text-lg"></i>
                <span class="text-sm">Pendataan</span>
            </a>
        </li>
        <li class="mb-1 group active">
            <a href="http://localhost:63342/ddap-project2%20-%20Copy/ddap/api/user/permintaan.php?_ijt=70lvsv5qrpla8hk5k6netn19o6&_ij_reload=RELOAD_ON_SAVE" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md">
                <i class="ri-git-pull-request-line mr-3 text-lg"></i>
                <span class="text-sm">Pengajuan</span>
            </a>
        </li>
        <li class="mb-1 group active">
            <a href="http://localhost:63342/ddap-project2%20-%20Copy/ddap/api/user/notifikasi.php?_ijt=m0lialuoi09mtvde2b437fllc5&_ij_reload=RELOAD_ON_SAVE" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md">
                <i class="ri-checkbox-multiple-line mr-3 text-lg"></i>
                <span class="text-sm">Persetujuan dan Riwayat Persetujuan</span>
            </a>
        </li>
        <li class="mb-1 group active">
            <a href="http://localhost:63342/ddap-project2%20-%20Copy/ddap/api/user/hasilpengajuan.php?_ijt=lmcagm3bcpfp7lguuq7lirnkei&_ij_reload=RELOAD_ON_SAVE" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md">
                <i class="ri-booklet-line mr-3 text-lg"></i>
                <span class="text-sm">Hasil</span>
            </a>
        </li>
        <li class="mb-1 group active">
            <a href="pendataan" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 rounded-md">
                <i class="ri-settings-3-line mr-3 text-lg"></i>
                <span class="text-sm">Pengaturan</span>
            </a>
        </li>
    </ul>
</div>
<div class="ml-60 mt-24 p-4">
    <div class="container mx-auto">
        <h2 class="text-3xl font-bold mb-4">Data Pendataan</h2>
        <table class="min-w-full bg-white border rounded-lg overflow-hidden shadow-md">
            <thead class="bg-gray-100">
            <?php if (isset($_SESSION['alertMessage'])) : ?>
                <div class="alert alert-warning">
                    <?php echo $_SESSION['alertMessage']; ?>
                    <?php unset($_SESSION['alertMessage']); ?>
                </div>
            <?php endif; ?>
            <tr>
                <th class="py-2 px-4 border-b">ID</th>
                <th class="py-2 px-4 border-b">Lurah Desa</th>
                <th class="py-2 px-4 border-b">Distributor</th>
                <th class="py-2 px-4 border-b">Koordinat</th>
                <th class="py-2 px-4 border-b">Jarak (km)</th>
                <th class="py-2 px-4 border-b text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            <?php
            $counter = 1;
            while ($row = $result->fetch_assoc()) :
                $berat_pangan_array = explode(',', $row["berat_pangan"]);
                $berat_pangan_not_zero = array_filter($berat_pangan_array, function ($berat) {
                    return $berat != '0';
                });

                if (!empty($berat_pangan_not_zero)) :
                    ?>
                    <tr>
                        <td class="py-2 px-4 border-b"><?php echo $counter; ?></td>
                        <td class="py-2 px-4 border-b"><?php echo $row["lurah_desa"]; ?></td>
                        <td class="py-2 px-4 border-b"><?php echo $row["distributor"]; ?></td>
                        <td class="py-2 px-4 border-b"><?php echo $row["gps"]; ?></td>
                        <td class="py-2 px-4 border-b"><?php echo floor($row["distance"]) . ' km'; ?></td>
                        <td class="py-2 px-4 border-b text-center">
                            <div class="flex justify-center gap-2">
                                <button class="btn btn-primary permintaan-btn" type="button" data-toggle="collapse" data-target="#collapse<?php echo $counter; ?>" aria-expanded="false" aria-controls="collapse<?php echo $counter; ?>" onclick="changeButtonText(this)">
                                    Tampilkan Data
                                </button>
                                <a href="pengajuan.php?id=<?php echo $row['id']; ?>&lurah_desa=<?php echo urlencode($row['lurah_desa']); ?>&distributor=<?php echo urlencode($row['distributor']); ?>&jenis_pangan=<?php echo urlencode($row['jenis_pangan']); ?>&berat_pangan=<?php echo urlencode($row['berat_pangan']); ?>" class="btn btn-success d-flex align-items-center" target="_blank">
                                    Pengajuan
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr class="collapse" id="collapse<?php echo $counter; ?>">
                        <td colspan="6">
                            <table class="inner-table w-full bg-white border rounded-lg overflow-hidden shadow-md">
                                <thead class="bg-gray-100">
                                <tr>
                                    <th class="py-2 px-4 border-b">ID</th>
                                    <th class="py-2 px-4 border-b">Jenis Pangan</th>
                                    <th class="py-2 px-4 border-b">Berat Pangan</th>
                                    <th class="py-2 px-4 border-b">Harga Satuan TON</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                $jenis_pangan = explode(',', $row["jenis_pangan"]);
                                $berat_pangan = explode(',', $row["berat_pangan"]);
                                $harga_satuan_array = explode(',', $row["harga_satuan"]);
                                $jenis_pangan_counter = 1;

                                for ($i = 0; $i < count($jenis_pangan); $i++) :
                                    if ($berat_pangan[$i] != '0') :
                                        ?>
                                        <tr>
                                            <td class="py-2 px-4 border-b"><?php echo $jenis_pangan_counter; ?></td>
                                            <td class="py-2 px-4 border-b"><?php echo $jenis_pangan[$i]; ?></td>
                                            <td class="py-2 px-4 border-b"><?php echo $berat_pangan[$i] . ' TON'; ?></td>
                                            <td class="py-2 px-4 border-b"><?php echo (isset($harga_satuan_array[$i]) ? 'Rp ' . number_format($harga_satuan_array[$i], 2, ',', '.') : 'Tidak tersedia'); ?></td>
                                        </tr>
                                        <?php
                                        $jenis_pangan_counter++;
                                    endif;
                                endfor;
                                ?>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <?php
                    $counter++;
                endif;
            endwhile;
            ?>
            </tbody>
        </table>
    </div>
</div>

</body>

</html>

<script>
    $(document).ready(function() {
        var id = $('#lurah_desa').val();

        $.ajax({
            url: 'fetch_data.php',
            method: 'POST',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(data) {
                $('#distributor').empty();
                $('#jenis_pangan[]').empty();

                $.each(data, function(key, value) {
                    $('#distributor').append('<option value="' + value.distributor + '">' + value.distributor + '</option>');
                    $('#jenis_pangan[]').append('<option value="' + value.jenis_pangan + '">' + value.jenis_pangan + '</option>');
                    $('#berat_pangan[]').val(value.berat_pangan);
                });
            }
        });
    });
</script>

<?php
$stmt->close();
$conn->close();
?>
