let dateTimeTextInput = function(input, options = {}) {

	let type = "datetime";
	let date_separator = "/";

	const getNextInput = function(form, current_input) {

		// Get all form inputs
		const inputs = Array.from(form.querySelectorAll('input, select, textarea, button'));

		// Find the index of the current input
		const currentIndex = inputs.indexOf(event.target);

		// Select the next input
		const nextInput = inputs[currentIndex + 1];

		if (nextInput) {
		  // Focus on the next input
		  nextInput.focus();
		} else {
		  console.log('This is the last input');
		}

	};

	let short_cuts = [
		{
			string: "Y|y",
			then: (input) => {
				input.value = new Date().getFullYear() + "/";
			},
		}
	];

	let patterns = {
		two_digits_divider: {
			regex: /^\d{2}[-/]$/,
			then: (input) => {
				input.value = new Date().getFullYear().toString().slice(0, 2) + input.value;
			}
		},
		year: {
			regex: /^\d{4}$/,
			then: (input, event) => {
				input.value = input.value + date_separator;
			}
		},
		year_month: {
			regex: /^\d{4}[-/]\d{2}$/,
			then: (input, event) => {
				if(event.key !== "Backspace") {
					input.value = input.value + date_separator;
				}
			}
		},
		year_month_day: {
			regex: /^\d{4}[-/]\d{1,2}[-/]\d{2}$/,
			then: (input) => {
				if (type === "datetime") {
					input.value = input.value + " ";
				}
			}
		},
		year_month_day_hour: {
			regex: /^\d{4}[-/]\d{1,2}[-/]\d{2} \d{2}$/,
			then: (input) => {
				input.value = input.value + ":";
			}
		},
		year_month_day_hour_min: {
			regex: /^\d{4}[-/]\d{1,2}[-/]\d{2} \d{1,2}:\d{2}$/,
			then: (input) => {
				getNextInput(event.target.closest('form'), input);
			}
		}
	};

	const handleInput = (event) => {
		const value = input.value;

		if(event.key === "Backspace") {
			return;
		}

		if(event.code === "Space") {
			console.log(patterns.year_month_day.regex.source);
			let year_month_day_space = new RegExp(patterns.year_month_day.regex.source.slice(0, -1) + '\\s?');

			console.log(year_month_day_space);

			if(!year_month_day_space.test(value)) {
				console.log("asf");
			} else {
				console.log("NO");
			}
		}

		for (let short_cut of short_cuts) {
		    let keys = short_cut.string.split("|");
		    let then = short_cut.then;
		    for (let key of keys) {
		        if(value === key) {
		        	then(input);
		        	break;
		        }
		    }
		}

		for (const [key, { regex, then }] of Object.entries(patterns)) {
       		if (regex.test(value)) {
            	then(input, event); // Execute action associated with the matching pattern
            	break; // Stop the loop after the first match
        	}
    	}
	};
	
	input.addEventListener('keyup', handleInput);
};

document.querySelectorAll(".date-time-text").forEach(function(input) {
	const inline = input.dataset.datetimetextinput ? JSON.parse(input.dataset.datetimetextinput) : {};
	
	const defaults = {
		type: "datetime",
	};

	const options = {
    	...defaults,
    	...inline,
  	};

  	dateTimeTextInput(input, options);
});
	
window.dateTimeTextInput = dateTimeTextInput;