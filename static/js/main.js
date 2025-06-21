function scrollInfinite(id, direction) {
    const container = document.getElementById(id);
    const scrollAmount = 160 * direction;

    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    setTimeout(() => {
        const children = Array.from(container.children);
        if (direction === 1) {
            const first = children[0];
            container.appendChild(first.cloneNode(true));
            container.removeChild(first);
            container.scrollLeft -= first.offsetWidth + 15;
        } else {
            const last = children[children.length - 1];
            container.insertBefore(last.cloneNode(true), children[0]);
            container.removeChild(last);
            container.scrollLeft += last.offsetWidth + 15;
        }
    }, 300);
}
document.addEventListener('DOMContentLoaded', () => {
    const banners = document.querySelectorAll('.side-banner img');
    const topOffset = document.querySelector('.carousel-section')?.offsetTop || 300;
    const footer = document.querySelector('footer');

    const updateBannerHeight = () => {
        const footerTop = footer.getBoundingClientRect().top + window.scrollY;
        const height = footerTop - topOffset;
        banners.forEach(img => {
            img.style.height = height + 'px';
        });
    };

    updateBannerHeight();
    window.addEventListener('resize', updateBannerHeight);
});
