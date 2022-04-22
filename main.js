// UI Variables
const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const service = document.querySelector('#service');

document.querySelector('#tip-form').addEventListener('submit', (e) => {
	e.preventDefault();

	// Hide results
	document.querySelector('#results').style.display = 'none';

	// Show loader
	document.querySelector('#loader').style.display = 'block';

	if (
		bill.value === '' ||
		bill.value == null ||
		people.value === '' ||
		people.value == null
	) {
		showError('Please enter all values.');
	} else {
		// Load results after 2 seconds
		setTimeout(calculateResults, 2000);
	}
});

// Calculate results
function calculateResults() {
	// Results
	const tip = document.querySelector('#tip-amount');
	const total = document.querySelector('#total-amount');
	const personOwed = document.querySelector('#per-person-amount');

	const calcTip = parseFloat(bill.value * (service.value / 100));
	const calcTotal = calcTip + parseFloat(bill.value);
	const calcOwed = calcTotal / parseFloat(people.value);

	if (isFinite(calcTip)) {
		tip.innerText = calcTip.toFixed(2);
		total.innerText = calcTotal.toFixed(2);
		personOwed.innerText = calcOwed.toFixed(2);

		// Hide loader
		document.querySelector('#loader').style.display = 'none';

		// Show results
		document.querySelector('#results').style.display = 'block';

		clearInputs();
	} else {
		showError('Error with input');
	}
}

function clearInputs() {
	const inputs = document.querySelectorAll('.form-control');

	inputs.forEach((input) => {
		input.value = '';
	});
}

function showError(message) {
	// Hide loader
	document.querySelector('#loader').style.display = 'none';

	// Hide results
	document.querySelector('#results').style.display = 'none';

	// Create a div
	const errorDiv = document.createElement('div');

	// Get elements
	const card = document.querySelector('.card-body');
	const form = document.querySelector('#tip-form');

	// Add Bootstrap classes
	errorDiv.className = 'alert alert-danger';

	// Create text node and append to div
	errorDiv.appendChild(document.createTextNode(message));

	// Insert error above heading
	card.insertBefore(errorDiv, form);

	// Clear error after 3 seconds
	setTimeout(clearError, 5000);
}

function clearError() {
	document.querySelector('.alert').remove();
}
