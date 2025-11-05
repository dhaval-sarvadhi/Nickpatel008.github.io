; (function () {

	'use strict';

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var fullHeight = function () {

		if (!isMobile.any()) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function () {
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function () {
		$(window).stellar();
	};

	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						}, k * 100, 'easeInOutExpo');
					});

				}, 50);

			}

		}, { offset: '85%' });
	};



	var goToTop = function () {

		$('.js-gotop').on('click', function (event) {

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function () {

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};

	var pieChart = function () {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor: "#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function () {
		if ($('#fh5co-skills').length > 0) {
			$('#fh5co-skills').waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(pieChart, 400);
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}

	};


	// Loading page
	var loaderPage = function () {
		$(".fh5co-loader").fadeOut("slow");
	};


	$(function () {
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());

function myFunction(e) {
	var x = e.clientX - 90;
	var y = e.clientY - 90;
	document.getElementById("tooltip").style.left = x + "px";
	document.getElementById("tooltip").style.top = y + "px";
}

new kursor({
	type: 1,
	removeDefaultCursor: true,
	color: '#000'
})

const defaults = {
	spread: 360,
	ticks: 50,
	gravity: 0,
	decay: 0.94,
	startVelocity: 30,
	shapes: ["star"],
	colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shoot() {
	confetti({
		...defaults,
		particleCount: 40,
		scalar: 1.2,
		shapes: ["star"],
	});

	confetti({
		...defaults,
		particleCount: 10,
		scalar: 0.75,
		shapes: ["circle"],
	});
}

setTimeout(shoot, 0);

function shootEmojiAndUnicorns() {
	confetti({
		...defaults,
		particleCount: 30,
		scalar: 1.2,
		shapes: ["circle", "square"],
		colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
	});

	confetti({
		...defaults,
		particleCount: 20,
		scalar: 2,
		shapes: ["text"],
		shapeOptions: {
			text: {
				value: ["🦄", "🌈"],
			},
		},
	});
}

function downloadResume() {
	const a = document.createElement('a')
	let url = "Docs/Dhaval_Resume.pdf"
	a.href = url
	a.download = url.split('/').pop()
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	shootEmojiAndUnicorns()
}

function myFun(event) {
	event.preventDefault();
	var fname = document.getElementById('fname').value.trim();
	var lname = document.getElementById('lname').value.trim();
	var email = document.getElementById('email').value.trim();
	var subject = document.getElementById('subject').value.trim();
	var message = document.getElementById('message').value.trim();
	
	// Validation
	if (!fname || !email || !message) {
		showFormMessage('Please fill in all required fields (First Name, Email, and Message).', 'error');
		return;
	}
	
	// Email validation
	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		showFormMessage('Please enter a valid email address.', 'error');
		return;
	}
	
	// Show loading state
	var submitBtn = event.target.querySelector('input[type="submit"]') || document.querySelector('#fh5co-consult input[type="submit"]');
	var originalText = submitBtn.value;
	submitBtn.value = 'Sending...';
	submitBtn.disabled = true;
	
	try {
		// Create mailto link
		var mailtoLink = 'mailto:dpatel0254@gmail.com?subject=' + encodeURIComponent(subject || 'Contact from Portfolio') + '&body=' + encodeURIComponent(
			'Name: ' + fname + (lname ? ' ' + lname : '') + '\n' +
			'Email: ' + email + '\n\n' +
			'Message:\n' + message
		);
		
		window.location.href = mailtoLink;
		
		// Show success message
		setTimeout(function() {
			showFormMessage('Thank you for your message! Your email client should open shortly.', 'success');
			// Reset form
			document.getElementById('fname').value = '';
			document.getElementById('lname').value = '';
			document.getElementById('email').value = '';
			document.getElementById('subject').value = '';
			document.getElementById('message').value = '';
			submitBtn.value = originalText;
			submitBtn.disabled = false;
		}, 100);
	} catch (error) {
		showFormMessage('An error occurred. Please try again or contact me directly at dpatel0254@gmail.com', 'error');
		submitBtn.value = originalText;
		submitBtn.disabled = false;
	}
}

function showFormMessage(message, type) {
	// Remove existing message
	var existingMsg = document.getElementById('form-message');
	if (existingMsg) {
		existingMsg.remove();
	}
	
	// Create message element
	var msgDiv = document.createElement('div');
	msgDiv.id = 'form-message';
	msgDiv.className = 'form-message form-message-' + type;
	msgDiv.textContent = message;
	
	// Insert before form
	var form = document.querySelector('#fh5co-consult form');
	form.parentNode.insertBefore(msgDiv, form);
	
	// Auto remove after 5 seconds
	setTimeout(function() {
		if (msgDiv.parentNode) {
			msgDiv.style.opacity = '0';
			setTimeout(function() {
				if (msgDiv.parentNode) {
					msgDiv.remove();
				}
			}, 300);
		}
	}, 5000);
}

// Project Details Modal Functions
const projectData = {
	dns: {
		title: 'DNS Web_Clone (Cloudflare)',
		description: 'A responsive web clone of Cloudflare\'s DNS management interface, demonstrating proficiency in front-end development and UI/UX design principles.',
		features: [
			'Responsive design for all devices',
			'Interactive DNS management interface',
			'Modern UI with smooth animations',
			'Clean and semantic HTML structure'
		],
		technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
		github: 'https://github.com/Nickpatel008/DNS_webclone',
		demo: null,
		role: 'Full Stack Developer - Designed and developed the complete front-end interface'
	},
	mouse: {
		title: 'Auto Move Mouse',
		description: 'A Python automation tool that automatically moves the mouse cursor to prevent system idle time, useful for keeping systems active during presentations or automated tasks.',
		features: [
			'Automatic mouse movement simulation',
			'Configurable movement patterns',
			'Cross-platform compatibility',
			'Lightweight and efficient'
		],
		technologies: ['Python', 'PyAutoGUI', 'Automation'],
		github: 'https://github.com/Nickpatel008/mouse_auto_move',
		demo: null,
		role: 'Developer - Created automation script with configurable parameters'
	},
	webfolio: {
		title: 'Webfolio',
		description: 'An AI-powered portfolio website builder that helps developers create professional portfolios with intelligent content suggestions and modern design templates.',
		features: [
			'AI-powered content generation',
			'Multiple portfolio templates',
			'Responsive Bootstrap framework',
			'Easy customization options'
		],
		technologies: ['AI Integration', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
		github: 'https://github.com/Nickpatel008/Webfolio',
		demo: null,
		role: 'Full Stack Developer - Integrated AI features and built responsive UI'
	},
	chatbot: {
		title: 'Chat Bot',
		description: 'A real-time chat application built with Node.js backend and React.js frontend, featuring instant messaging, user authentication, and modern UI design.',
		features: [
			'Real-time messaging with WebSocket',
			'User authentication and authorization',
			'Modern React.js interface',
			'RESTful API backend',
			'Responsive design'
		],
		technologies: ['Node.js', 'React.js', 'Express.js', 'WebSocket', 'REST API'],
		github: 'https://github.com/Nickpatel008/ChatBot',
		demo: null,
		role: 'Full Stack Developer - Built complete chat application with real-time features'
	}
};

function showProjectDetails(projectId) {
	var project = projectData[projectId];
	if (!project) return;
	
	var modal = document.getElementById('projectModal');
	var body = document.getElementById('projectModalBody');
	
	var html = '<h2>' + project.title + '</h2>';
	html += '<p class="project-description">' + project.description + '</p>';
	
	html += '<div class="project-role"><strong>Role:</strong> ' + project.role + '</div>';
	
	html += '<div class="project-features"><h3>Key Features:</h3><ul>';
	project.features.forEach(function(feature) {
		html += '<li>' + feature + '</li>';
	});
	html += '</ul></div>';
	
	html += '<div class="project-tech"><h3>Technologies Used:</h3>';
	html += '<div class="tech-badges">';
	project.technologies.forEach(function(tech) {
		html += '<span class="tech-badge">' + tech + '</span>';
	});
	html += '</div></div>';
	
	html += '<div class="project-links">';
	if (project.demo) {
		html += '<a href="' + project.demo + '" target="_blank" class="btn btn-primary">Live Demo</a> ';
	} else {
		html += '<span class="demo-coming-soon">Demo Coming Soon</span> ';
	}
	html += '<a href="' + project.github + '" target="_blank" class="btn btn-default">View on GitHub</a>';
	html += '</div>';
	
	body.innerHTML = html;
	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';
}

function closeProjectDetails() {
	var modal = document.getElementById('projectModal');
	modal.style.display = 'none';
	document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
	var modal = document.getElementById('projectModal');
	if (event.target == modal) {
		closeProjectDetails();
	}
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
	if (event.key === 'Escape') {
		closeProjectDetails();
	}
});