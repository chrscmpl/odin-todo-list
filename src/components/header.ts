export default function buildHeader(): HTMLElement {
	const header = document.createElement('header');
	header.className = 'bg-200 box-shadow';
	header.id = 'header';
	header.appendChild(buildTitle());
	return header;
}

function buildTitle(): HTMLElement {
	const title = document.createElement('h1');
	title.className = 'title color-text-200 ff-header';
	title.textContent = 'My Todo List';
	return title;
}
