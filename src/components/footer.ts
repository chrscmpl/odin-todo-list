export default function buildFooter() {
	const footer = document.createElement('footer');
	footer.id = 'footer';
	footer.className = 'bg-300 centered-box';
	footer.textContent = 'chrscmpl';
	return footer;
}
