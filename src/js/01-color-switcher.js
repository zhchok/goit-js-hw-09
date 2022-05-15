const refs = {
	body: document.querySelector("body"),
	startBtn: document.querySelector("[data-start]"),
	stopBtn: document.querySelector("[data-stop]"),
};
let timerId = null;

refs.startBtn.addEventListener("click", changeBodyColor);
refs.stopBtn.addEventListener("click", stopInterval);

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
	timerId = setInterval(() => {
		refs.body.style.backgroundColor = getRandomHexColor();
	}, 1000);

	refs.startBtn.setAttribute("disabled", true);
}

function stopInterval() {
	clearInterval(timerId);

	refs.startBtn.removeAttribute("disabled");
}
