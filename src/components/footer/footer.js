import './footer.css';

export default function Footer() {
	const footer = document.createElement('div');
	footer.className = 'footer';

	const link = document.createElement('a');
	link.className = 'link';
	link.setAttribute('href', 'https://github.com/chrscmpl/odin-todo-list');
	link.textContent = 'copyright chrscmpl';
	footer.appendChild(link);

	return footer;
}
