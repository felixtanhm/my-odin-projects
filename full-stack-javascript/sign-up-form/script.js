const form = document.getElementById('form');
const submitBtn = document.getElementById('submit');
const successDiv = document.getElementById('success-div');

form.addEventListener('submit', event => {
	event.preventDefault();
	submitBtn.textContent = "Submitting"
	setTimeout(() => {
		successDiv.classList.remove('hidden')
		submitBtn.textContent = "Submit"
		form.reset()
	}, 1000)
	setTimeout(() => {
		successDiv.classList.add('hidden')
	}, 2500)
})
