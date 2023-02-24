export default function buildSidebar(): HTMLElement {
	const sidebar = document.createElement('div');
	sidebar.id = 'sidebar';
	sidebar.className = 'bg-200 flexbox-column';
	return sidebar;
}
