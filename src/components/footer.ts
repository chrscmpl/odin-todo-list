import EventHandler from '../eventHandler';

export default function buildFooter() {
	const footer = document.createElement('footer');
	footer.id = 'footer';
	footer.className = 'centered-box bg-300 position-relative';
	footer.appendChild(buildLink());
	footer.appendChild(buildSampleDataBtn());
	return footer;
}

function buildSampleDataBtn(): HTMLButtonElement {
	const btn = document.createElement('button');
	btn.setAttribute('type', 'button');
	btn.addEventListener('click', () =>
		EventHandler.getEventHandler().startSampleMode(btn)
	);
	btn.className =
		'sample-data-btn position-absolute primary-100 color-text-300 no-border round';
	btn.textContent = 'Use sample data';
	return btn;
}

function buildLink() {
	const link = document.createElement('a');
	link.innerHTML = `chrscmpl <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg>`;
	link.className = 'footer-link color-text-100 no-text-decoration';
	link.setAttribute('href', 'https://github.com/chrscmpl/odin-todo-list');
	link.setAttribute('target', '_blank');
	return link;
}
