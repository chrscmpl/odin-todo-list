import './footer.css';

export default function Footer() {
	const footer = document.createElement('div');
	footer.className = 'footer';
	footer.innerHTML =
		'<a class="link" href="https://github.com/chrscmpl/odin-todo-list">copyright chrscmpl</a>';
	return footer;
}
