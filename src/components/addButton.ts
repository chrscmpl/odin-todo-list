export default function buildAddButton(
	callBackFunction: () => void
): HTMLElement {
	const addBtn = document.createElement('div');
	addBtn.className = 'add-btn bg-300 round bordered-primary-300 centered-box';
	addBtn.addEventListener('click', callBackFunction);
	addBtn.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="80%" ><title>plus-thick</title><path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" /></svg>';
	return addBtn;
}
