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

    if (videos.length > 0) {
        // Atur agar semua video bisa diputar (terutama di iOS)
        videos.forEach(video => {
            video.playsInline = true;
        });
        
        // Mulai video pertama
        videos[currentVideoIndex].play();
        videos[currentVideoIndex].classList.add('active');

        videos.forEach((video, index) => {
            video.addEventListener('ended', () => {
                // Sembunyikan video yang sekarang
                videos[currentVideo_index].classList.remove('active');

                // Pindah ke video berikutnya, loop jika sudah di akhir
                currentVideoIndex = (currentVideoIndex + 1) % videos.length;
                
                // Tampilkan dan putar video berikutnya
                const nextVideo = videos[currentVideoIndex];
                nextVideo.classList.add('active');
                nextVideo.play();
            });
        });
    }

});
