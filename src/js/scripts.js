// HTMX
import 'htmx.org';
window.htmx = require('htmx.org');

// Ramda (if we want to utilize "surreal" and "ramda" we need it in the head)
// import * as R from "ramda"
// R.identity();


// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', (event) => {
	// Select all code blocks
	const codeBlocks = document.querySelectorAll('pre code');
	
	codeBlocks.forEach((codeBlock) => {
	  	// Create the copy button
	  	const copyButton = document.createElement('button');
	  	copyButton.className = 'copy-btn';
	  	copyButton.textContent = 'Copy';
		
	  	// Insert the copy button before the code block
	  	const pre = codeBlock.parentNode;
	  	pre.style.position = 'relative';  // Ensure the button is placed correctly
	  	pre.appendChild(copyButton);
		
	  	// Event listener for the copy button
	  	copyButton.addEventListener('click', () => {
	  	  // Create a temporary textarea to hold the code text
	  	  const tempTextArea = document.createElement('textarea');
	  	  tempTextArea.value = codeBlock.innerText;
	  	  document.body.appendChild(tempTextArea);
	  	  tempTextArea.select();
	  	  document.execCommand('copy');
	  	  document.body.removeChild(tempTextArea);
		
	  	  // Optionally, provide feedback that the code was copied
	  	  copyButton.textContent = 'Copied!';
	  	  setTimeout(() => {
	  	    copyButton.textContent = 'Copy';
	  	  }, 2000);
	  	});
	});
});