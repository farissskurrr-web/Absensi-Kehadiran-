// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendance-form');
    const messageElement = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah form submit default

        // Mengambil data dari form
        const nis = document.getElementById('nis').value;
        const nama = document.getElementById('nama').value;
        const status = document.getElementById('status').value;
        const keterangan = document.getElementById('keterangan').value;

        const data = { nis, nama, status, keterangan };

        try {
            // Mengirim data ke API backend
            const response = await fetch('/api/absensi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            // Menampilkan pesan sukses/gagal
            messageElement.textContent = result.message;
            messageElement.classList.remove('hidden', 'success', 'error');

            if (response.ok) {
                messageElement.classList.add('success');
                form.reset(); // Kosongkan form setelah sukses
            } else {
                messageElement.classList.add('error');
            }

            messageElement.classList.remove('hidden');

        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            messageElement.textContent = 'Gagal terhubung ke server. Silakan coba lagi.';
            messageElement.classList.remove('hidden', 'success');
            messageElement.classList.add('error');
        }
    });
});
