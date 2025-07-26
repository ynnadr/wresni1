document.addEventListener('DOMContentLoaded', function() {

    // --- Logika Menu Mobile ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
        });
    }

    // --- LOGIKA BARU UNTUK DROPDOWN MOBILE ---
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    dropdownItems.forEach(item => {
        // Kita targetkan link utama di dalam item yang punya dropdown
        const link = item.querySelector('a');
        link.addEventListener('click', function(event) {
            // HANYA jalankan logika ini di tampilan mobile
            if (window.innerWidth < 992) {
                // Mencegah link berpindah halaman saat diklik di mobile
                event.preventDefault();

                // Toggle kelas 'dropdown-open' pada <li> parent
                const parentItem = event.target.closest('.has-dropdown');
                parentItem.classList.toggle('dropdown-open');

                // Opsional: Tutup dropdown lain yang mungkin terbuka
                document.querySelectorAll('.has-dropdown').forEach(otherItem => {
                    if (otherItem !== parentItem) {
                        otherItem.classList.remove('dropdown-open');
                    }
                });
            }
        });
    });

    // --- Perbaikan untuk Layout yang Rusak Saat Resize ---
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992 && mainNav.classList.contains('nav-open')) {
            mainNav.classList.remove('nav-open');
        }
    });

    // --- Logika Looping Video (Tidak berubah) ---
    const videos = document.querySelectorAll('.video-background video');
    let currentVideoIndex = 0;

    if (videos.length > 1) {
        function switchVideo() {
            videos[currentVideoIndex].classList.remove('active');
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            const nextVideo = videos[currentVideoIndex];
            nextVideo.classList.add('active');

            const playWhenReady = () => {
                nextVideo.play().catch(error => console.error("Video play was prevented:", error));
                nextVideo.removeEventListener('canplaythrough', playWhenReady);
                nextVideo.removeEventListener('loadeddata', playWhenReady);
            };

            if (nextVideo.readyState >= 3) {
                playWhenReady();
            } else {
                nextVideo.addEventListener('canplaythrough', playWhenReady);
                nextVideo.addEventListener('loadeddata', playWhenReady);
            }
        }
        videos.forEach(video => video.addEventListener('ended', switchVideo));
        const firstVideo = videos[0];
        const startFirstVideo = () => {
            firstVideo.play().catch(error => console.error("Initial video play was prevented:", error));
            firstVideo.removeEventListener('canplaythrough', startFirstVideo);
        };
        if (firstVideo.readyState >= 3) { startFirstVideo(); } else { firstVideo.addEventListener('canplaythrough', startFirstVideo); }
    }
});
