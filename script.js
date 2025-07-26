document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle Functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
        });
    }


    // Video Background Looping Functionality
    const videos = document.querySelectorAll('.video-background video');
    let currentVideoIndex = 0;

    if (videos.length > 1) { // Hanya jalankan loop jika ada lebih dari 1 video
        videos.forEach((video, index) => {
            // Ketika sebuah video selesai diputar
            video.addEventListener('ended', () => {
                // Sembunyikan video yang sekarang (hapus class 'active')
                videos[currentVideoIndex].classList.remove('active');

                // Pindah ke indeks video berikutnya, kembali ke 0 jika sudah di akhir
                currentVideoIndex = (currentVideoIndex + 1) % videos.length;
                
                // Ambil video berikutnya
                const nextVideo = videos[currentVideoIndex];
                
                // Tampilkan video berikutnya (tambah class 'active')
                nextVideo.classList.add('active');
                
                // Putar video berikutnya
                nextVideo.play().catch(error => {
                    // Menangkap error jika browser memblokir autoplay
                    console.error("Autoplay was prevented: ", error);
                });
            });
        });
    }
});
