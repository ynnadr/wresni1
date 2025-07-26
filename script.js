// --- Logika Menu Mobile ---
const menuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    // Tambahkan event listener untuk klik pada tombol hamburger
    menuToggle.addEventListener('click', () => {
        // Menambah atau menghapus kelas 'nav-open' pada navigasi utama
        mainNav.classList.toggle('nav-open');
    });
}

// --- Perbaikan untuk Layout yang Rusak Saat Resize ---
// Tambahkan event listener pada jendela browser untuk mendeteksi perubahan ukuran
window.addEventListener('resize', () => {
    // Jika lebar jendela lebih besar atau sama dengan 992px (batas desktop)
    // DAN menu mobile sedang dalam keadaan terbuka...
    if (window.innerWidth >= 992 && mainNav.classList.contains('nav-open')) {
        // ...maka secara otomatis hapus kelas 'nav-open' untuk mereset layout ke desktop.
        mainNav.classList.remove('nav-open');
    }
});

// --- Logika Looping Video (Paling Stabil) ---
const videos = document.querySelectorAll('.video-background video');
let currentVideoIndex = 0;

// Hanya jalankan logika jika ada lebih dari satu video
if (videos.length > 1) {

    // Fungsi pusat untuk mengganti dan memutar video berikutnya
    function switchVideo() {
        // 1. Sembunyikan video yang sedang aktif
        videos[currentVideoIndex].classList.remove('active');

        // 2. Hitung indeks video berikutnya, kembali ke 0 jika sudah di akhir
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        const nextVideo = videos[currentVideoIndex];

        // 3. Tampilkan video berikutnya (secara visual)
        nextVideo.classList.add('active');

        // 4. Periksa apakah video berikutnya siap diputar untuk menghindari stutter
        // 'canplaythrough' adalah event yang menandakan browser yakin video bisa diputar sampai habis.
        const playWhenReady = () => {
            // Setelah siap, putar videonya
            nextVideo.play().catch(error => {
                console.error("Video play was prevented by browser:", error);
            });
            // Penting: Hapus listener ini setelah digunakan agar tidak menumpuk
            nextVideo.removeEventListener('canplaythrough', playWhenReady);
        };

        // Jika video sudah di-cache, readyState-nya mungkin sudah tinggi.
        // readyState 4 (HAVE_ENOUGH_DATA) adalah kondisi ideal.
        if (nextVideo.readyState >= 4) {
            playWhenReady();
        } else {
            // Jika belum siap, pasang listener untuk menunggu sinyal 'canplaythrough'.
            nextVideo.addEventListener('canplaythrough', playWhenReady);
        }
    }

    // 5. Pasang "pendengar" di semua video. Ketika sebuah video selesai (`ended`),
    // ia akan memanggil fungsi switchVideo.
    videos.forEach(video => {
        video.addEventListener('ended', switchVideo);
    });

    // 6. Penanganan khusus untuk video pertama saat halaman baru dimuat
    const firstVideo = videos[0];
    const startFirstVideo = () => {
        firstVideo.play().catch(error => {
            console.error("Initial video play was prevented by browser:", error);
        });
        firstVideo.removeEventListener('canplaythrough', startFirstVideo);
    };
    
    if (firstVideo.readyState >= 4) {
        startFirstVideo();
    } else {
        firstVideo.addEventListener('canplaythrough', startFirstVideo);
    }
}
