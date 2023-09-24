"use strict";
document.addEventListener("DOMContentLoaded", function () {
	//elements
	const navigationLinks = document.querySelectorAll('.header-link a');
	const hamburgerIcon = document.querySelector("header").querySelector(".hamburger");
	const headerMenu = document.querySelector("header").querySelector(".header-menu");
	const register_link = "https://hazeldaniel.github.io/get-linked-ai-template-register/"
	const register_button = document.querySelector(".header-cta button");

	// const heroMotto = document.querySelector("section.hero").querySelector("h3");
	const baseUri = 'https://backend.getlinked.ai/';
	const form = document.querySelector('.contact-form');
	let toggleCount = 0;

	const initBounce = function () {
		function removeBounceClass() {
			const elements = document.querySelectorAll('.bounce');
			elements.forEach((element) => {
				element.classList.remove('bounce');
			});
		}

		// Function to add the "bounce" class to elements when they are in view
		function addBounceClass(entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('bounce');
				}
			});
		}

		// Intersection Observer configuration
		const observerOptions = {
			root: null, // Use the viewport as the root
			rootMargin: '0px', // No margin
			threshold: 0.5, // 50% of the element must be in view
		};

		// Create an Intersection Observer
		const observer = new IntersectionObserver(addBounceClass, observerOptions);

		// Remove the "bounce" class from all elements initially
		removeBounceClass();

		// Get all elements with the class name "bounce"
		const elements = document.querySelectorAll('.bounce');

		// Observe each element
		elements.forEach((element) => {
			observer.observe(element);
		});
		
	}

	const initHeaderLinks = function() {

		navigationLinks.forEach(link => {
			link.addEventListener('click', (event) => {

				navigationLinks.forEach(navLink => {
					navLink.classList.remove('active');
				});
				link.classList.add('active');
			});
		});
	}

	const handleRenderLoader = function() {

	}

	const handleHamburgerClick = function() {
		hamburgerIcon.addEventListener('click', (_) => {
			hamburgerIcon.classList.toggle("opened");
			toggleCount++;
			if (toggleCount % 2) {
				headerMenu.style.visibility = "visible";
			}
			else
			{
				headerMenu.style.visibility = "hidden";

			}
		})
	}



	const handleContactSubmit = function () {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission behavior

      // Collect form data
      const formData = new FormData(form);
      const formObject = {};
			for (const [key, value] of formData.entries()) {
				console.log(`key : ${key} \n value : ${value}`);
				formObject[key] = value;
			}

      // Create a payload object
      const payload = {
        "email": formObject.email,
        "phone_number": formObject.phone_number,
        "first_name": formObject.first_name,
        "message": formObject.message,
      };


			if (!payload["email"] ||
				!payload["first_name"] ||
				!payload["phone_number"] ||
				!payload["message"]) {
				alert("fields not correctly filled");
				return;
			}

      // Send POST request
      fetch(baseUri + 'hackathon/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
					console.log(data);
					//handle success
        })
        .catch(error => {
          // Handle errors (e.g., show an error message)
          console.error('Error:', error);
					alert("something went wrong");
        });
			form.reset();
    });
	}

	const handle_route_register = function () {
		register_button.addEventListener('click', function() {
      window.location.href = register_link;
    });
	}


	// driver code
	initHeaderLinks();
	handleHamburgerClick();
	initBounce();
	handleContactSubmit();
	handle_route_register();

});
