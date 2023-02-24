import 'normalize.css';
import './style.css';
import buildHeader from './components/header';
import buildFooter from './components/footer';
import buildSidebar from './components/sidebar';
import buildMain from './components/main';
import Todo from './dataObjects/Todo';
import Project from './dataObjects/Project';
import buildProjectElement from './components/projectElement';
import buildTodoElement from './components/todoElement';

const content = document.createElement('div');
content.id = 'content';
const header = buildHeader();
const footer = buildFooter();
const sidebar = buildSidebar();
const main = buildMain();
content.appendChild(header);
content.appendChild(footer);
content.appendChild(sidebar);
content.appendChild(main);
document.body.appendChild(content);
const proj: Project = new Project({
	title: 'default',
	todoList: [
		new Todo({
			title: 'Meeting',
			checked: false,
			dueDate: new Date('2023-03-02T09:00'),
			priority: 'high',
			description: 'Room A12',
			notes: 'Bring documents',
		}),
	],
});
sidebar.appendChild(buildProjectElement(proj));
main.appendChild(buildTodoElement(proj.todoList[0]));
