import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs = {
	inputDelay: document.querySelector('[name="delay"]'),
	inputDealeyStep: document.querySelector('[name="step"]'),
	inputAmount: document.querySelector('[name="amount"]'),
	form: document.querySelector(".form"),
};

let counter = 1;

function createPromise(position, delay) {
	return new Promise((resolve, reject) => {
		const shouldResolve = Math.random() > 0.3;
		setTimeout(() => {
			if (shouldResolve) {
				resolve({ position, delay });
			} else {
				reject({ position, delay });
			}
		}, delay);
	});
}

function createPromises() {
	const amount = Number(refs.inputAmount.value);
	const delay = Number(refs.inputDelay.value);
	const step = Number(refs.inputDealeyStep.value);

	for (let i = 0; i < amount; i += 1) {
		const position = counter;
		counter += 1;
		setTimeout(() => {
			createPromise(position, delay + step * i)
				.then(({ position, delay }) => {
					Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
				})
				.catch(({ position, delay }) => {
					Notify.failure(` Rejected promise  ${position} in ${delay} ms`);
				});
			if (position === amount) {
				counter = 1;
			}
		}, delay + step * i);
	}
}

function handleSubmit(e) {
	e.preventDefault();
	createPromises();
}

refs.form.addEventListener("submit", handleSubmit);
