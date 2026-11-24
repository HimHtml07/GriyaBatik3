// 1. Menu: tandai halaman aktif + tombol hamburger di HP
var halaman = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach(function (a) {
    if (a.getAttribute('href') === halaman) a.classList.add('active');
});
document.getElementById('menu-btn').onclick = function () {
    document.getElementById('main-nav').classList.toggle('open');
};

// 2. Beranda: salam sesuai jam
var salam = document.getElementById('salam');
if (salam) {
    var jam = new Date().getHours();
    var s = 'Selamat malam';
    if (jam >= 4 && jam < 11) s = 'Selamat pagi';
    else if (jam >= 11 && jam < 15) s = 'Selamat siang';
    else if (jam >= 15 && jam < 18) s = 'Selamat sore';
    salam.textContent = s + ', selamat datang di Griya Batik';
}

// 3. Produk: filter kategori + pencarian
var grid = document.getElementById('grid');
if (grid) {
    var kartu = grid.querySelectorAll('.card');
    var kategori = 'semua';
    var cari = document.getElementById('cari');

    function tampilkan() {
        var kata = cari.value.toLowerCase().trim();
        var jumlah = 0;
        kartu.forEach(function (k) {
            var cocokKategori = kategori === 'semua' || k.dataset.kategori === kategori;
            var cocokNama = k.dataset.nama.indexOf(kata) !== -1;
            var tampil = cocokKategori && cocokNama;
            k.style.display = tampil ? '' : 'none';
            if (tampil) jumlah++;
        });
        document.getElementById('jumlah').textContent = 'Menampilkan ' + jumlah + ' produk';
        document.getElementById('kosong').hidden = jumlah !== 0;
    }

    document.querySelectorAll('.chip').forEach(function (chip) {
        chip.onclick = function () {
            document.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
            chip.classList.add('active');
            kategori = chip.dataset.filter;
            tampilkan();
        };
    });
    cari.oninput = tampilkan;

    // kategori dari link di Beranda (produk.html?kategori=pria)
    var dariUrl = new URLSearchParams(location.search).get('kategori');
    if (dariUrl) {
        var chipTujuan = document.querySelector('.chip[data-filter="' + dariUrl + '"]');
        if (chipTujuan) chipTujuan.click();
    }
    tampilkan();
}
