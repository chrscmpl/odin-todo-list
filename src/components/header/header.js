import './header.css';

export default function Header() {
	const header = document.createElement('div');
	header.className = 'header';

	const heading = document.createElement('h1');
	heading.className = 'heading';
	heading.innerText = 'My TODO List';
	header.appendChild(heading);

	return header;
}
