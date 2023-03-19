export default function buildAddButton(): HTMLElement {
	const addBtn = document.createElement('div');
	addBtn.className = 'add-btn bg-300 round bordered-primary-300 centered-box';
	addBtn.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="80%" ><title>add todo</title><path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" /></svg>';
	return addBtn;
}
