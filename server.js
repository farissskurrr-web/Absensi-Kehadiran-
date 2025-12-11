// server.js (Contoh Sederhana dengan Express, tanpa koneksi DB untuk disederhanakan)

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware untuk mem-parsing body dari request (JSON dan urlencoded)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Array (sementara) untuk menyimpan data absensi
const daftarAbsensi = [];

// Endpoint untuk menerima data absensi (POST)
app.post('/api/absensi', (req, res) => {
    const { nis, nama, status, keterangan } = req.body;
    const waktu = new Date().toLocaleString();
    
    // Validasi dasar
    if (!nis || !nama || !status) {
        return res.status(400).send({ message: 'NIS, Nama, dan Status kehadiran wajib diisi.' });
    }

    const dataAbsen = {
        nis: nis,
        nama: nama,
        status: status, // Contoh: 'Hadir', 'Izin', 'Alpha'
        keterangan: keterangan || '',
        waktu: waktu
    };

    daftarAbsensi.push(dataAbsen);
    console.log('Absensi baru dicatat:', dataAbsen);
    
    // Mengirim respon sukses
    res.status(201).send({ 
        message: 'Absensi berhasil dicatat!',
        data: dataAbsen 
    });
});

// Endpoint untuk melihat semua data absensi (GET) - Hanya untuk debugging/Admin
app.get('/api/absensi', (req, res) => {
    res.status(200).json(daftarAbsensi);
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
