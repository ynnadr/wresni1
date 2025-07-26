document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Menu Logic ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
        });
    }

    // PERBAIKAN: Reset menu saat layar diubah dari mobile ke desktop
    window.addEventListener('resize', () => {
        // Jika lebar jendela lebih besar dari 992px dan menu sedang terbuka
        if (window.innerWidth >= 992 && mainNav.classList.contains('nav-open')) {
            // Hapus kelas 'nav-open' untuk mereset ke tampilan desktop
            mainNav.classList.remove('nav-open');
        }
    });

    // --- LOGIKA VIDEO BARU YANG LEBIH STABIL ---
    const videos = document.querySelectorAll('.video-background video');
    let currentVideoIndex = 0;

    // Pastikan ada video untuk diputar
    if (videos.length > 1) {
        // Fungsi untuk memutar video berikutnya
        const playNextVideo = () => {
            // Sembunyikan video yang sedang aktif
            videos[currentVideoIndex].classList.remove('active');

            // Pindah ke indeks video berikutnya, kembali ke 0 jika sudah di akhir
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;

            // Ambil video berikutnya
            const nextVideo = videos[currentVideoIndex];

            // Tampilkan video berikutnya
            nextVideo.classList.add('active');

            // Putar video berikutnya
            nextVideo.play();
        };

        // Tambahkan event listener HANYA pada video yang sedang diputar
        videos.forEach(video => {
            video.addEventListener('ended', playNextVideo);
        });

        // Mulai video pertama secara eksplisit
        videos[0].play();
    }
});
