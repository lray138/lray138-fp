import flatpickr from "flatpickr";

document.querySelectorAll("[data-flatpickr").forEach(function(input) {
	const inline = input.dataset.flatpickr ? JSON.parse(input.dataset.flatpickr) : {};
	const defaults = {
		allowInput: true,
		altInput: true,
		altFormat: "Y/m/d H:i",
		enableTime: true,
		time_24hr: true
	};

	const options = {
    	...defaults,
    	...inline,
  	};

	flatpickr(input, options);
});

window.flatpickr = flatpickr;