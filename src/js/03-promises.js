import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs = {
	inputDelay: document.querySelector('[name="delay"]'),
	inputDealeyStep: document.querySelector('[name="step"]'),
	inputAmount: document.querySelector('[name="amount"]'),
	form: document.querySelector(".form"),
};
let counter = 0;

refs.form.addEventListener("submit", handleSubmit);

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

function convertInputValueToNumber() {
	const delay = Number(refs.inputDelay.value);
	const step = Number(refs.inputDealeyStep.value);
	const amount = Number(refs.inputAmount.value);
	return { delay, step, amount };
}

function createPromises() {
	const { delay, step, amount } = convertInputValueToNumber();

	for (let i = 0; i < amount; i += 1) {
		const totalDelay = delay + step * i;
		counter += 1;
		const position = counter;

		setTimeout(() => {
			createPromise(position, totalDelay)
				.then(({ position, delay }) => {
					Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
				})
				.catch(({ position, delay }) => {
					Notify.failure(` Rejected promise  ${position} in ${delay} ms`);
				});
			if (position === amount) {
				counter = 1;
			}
		}, totalDelay);
	}
}

function handleSubmit(e) {
	e.preventDefault();
	createPromises();
}
