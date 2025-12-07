
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


	// Stiky Header on Scroll
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

	// Modal Logic
	const scheduleBtn = document.getElementById('schedule-btn');
	const modal = document.getElementById('schedule-modal');
	const modalCloseEls = modal ? modal.querySelectorAll('[data-modal-close]') : [];
	const schedForm = document.getElementById('schedule-form');
	const schedDate = document.getElementById('sched-date');

	function openModal() {
		if (!modal) return;
		modal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden'; // Prevent body scroll
	}

	function closeModal() {
		if (!modal) return;
		modal.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
	}

	if (scheduleBtn) {
		scheduleBtn.addEventListener('click', openModal);
	}

	modalCloseEls.forEach(el => el.addEventListener('click', closeModal));

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeModal();
	});

	if (schedDate) {
		const today = new Date().toISOString().split('T')[0];
		schedDate.setAttribute('min', today);
	}

	// Form Subject -> WhatsApp
	if (schedForm) {
		schedForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = new FormData(schedForm);
			const data = Object.fromEntries(formData);

			if (!data.date || !data.time) {
				alert('Por favor complete la fecha y hora.');
				return;
			}

			// Formatting date
			let formattedDate = data.date;
			try {
				const [y, m, d] = data.date.split('-');
				formattedDate = `${d}/${m}/${y}`;
			} catch (e) { }

			let text = `Hola Juan, deseo agendar una cita.`;
			text += `%0A📅 Fecha: ${formattedDate}`;
			text += `%0A⏰ Hora: ${data.time}`;
			if (data.name) text += `%0A👤 Nombre: ${data.name}`;
			if (data.phone) text += `%0A📞 Teléfono: ${data.phone}`;
			if (data.message) text += `%0A📝 Mensaje: ${data.message}`;

			window.open(`https://wa.me/18099664860?text=${text}`, '_blank');
			closeModal();
			schedForm.reset();
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
