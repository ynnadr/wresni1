document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Logic
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
        });
    }

    // Mobile Dropdown Logic
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', function(event) {
            if (window.innerWidth < 992) {
                event.preventDefault();
                const parentItem = event.target.closest('.has-dropdown');
                parentItem.classList.toggle('dropdown-open');
                document.querySelectorAll('.has-dropdown').forEach(otherItem => {
                    if (otherItem !== parentItem) { otherItem.classList.remove('dropdown-open'); }
                });
            }
        });
    });

    // Resize Fix
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992 && mainNav.classList.contains('nav-open')) {
            mainNav.classList.remove('nav-open');
        }
    });

    // Video Looping Logic
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
            if (nextVideo.readyState >= 3) { playWhenReady(); } else {
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

    // --- NEW: Horizontal Scroll for Properties Section ---
    const scrollContainer = document.querySelector('.properties-scroll-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            // Scroll by one card width + gap (320px + 24px)
            scrollContainer.scrollBy({
                left: -344,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: 344,
                behavior: 'smooth'
            });
        });
    }
});
