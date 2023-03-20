import EventHandler from '../eventHandler';

export default function buildFooter() {
	const footer = document.createElement('footer');
	footer.id = 'footer';
	footer.className = 'centered-box bg-300 position-relative';
	footer.textContent = 'chrscmpl';
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
