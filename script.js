
// Logic for portofolio interactions
document.addEventListener('DOMContentLoaded', function () {
	// Current year in footer
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Scroll Animations (IntersectionObserver)
	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	const fadeElements = document.querySelectorAll('.fade-in-up');
	fadeElements.forEach(el => observer.observe(el));


	// Sticky Header on Scroll
	const header = document.querySelector('.site-header');
	window.addEventListener('scroll', () => {
		if (window.scrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});

	// Mobile Menu Toggle
	const navToggle = document.querySelector('.mobile-nav-toggle');
	const mainNav = document.querySelector('.main-nav');

	if (navToggle && mainNav) {
		navToggle.addEventListener('click', () => {
			const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', !isExpanded);
			mainNav.classList.toggle('active');
		});

		// Close menu when clicking a link
		document.querySelectorAll('.nav-link').forEach(link => {
			link.addEventListener('click', () => {
				navToggle.setAttribute('aria-expanded', 'false');
				mainNav.classList.remove('active');
			});
		});
	}

	// Smooth Scroll to Anchor
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href !== '#') {
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) {
					const headerOffset = 80;
					const elementPosition = target.getBoundingClientRect().top;
					const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: "smooth"
					});
				}
			}
		});
	});
});
