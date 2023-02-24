export default function buildMain(): HTMLElement {
	const main = document.createElement('main');
	main.id = 'main';
	main.className = 'bg-100 flexbox-column';
	return main;
}
