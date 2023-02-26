import 'normalize.css';
import './style.css';
import buildHeader from './components/header';
import buildFooter from './components/footer';
import buildSidebar from './components/sidebar';
import buildMain from './components/main';
import buildTodoList from './components/todoList';
import Project, { ProjectData } from './dataObjects/Project';
import buildProjectElement from './components/projectElement';
import buildTodoElement from './components/todoElement';

const content = document.createElement('div');
content.id = 'content';
const header = buildHeader();
const footer = buildFooter();
const sidebar = buildSidebar();
const main = buildMain();
const todoList = buildTodoList();
main.appendChild(todoList);
content.appendChild(header);
content.appendChild(footer);
content.appendChild(sidebar);
content.appendChild(main);
document.body.appendChild(content);

function getStoredProjects(): Project[] {
	try {
		return (<ProjectData[]>(
			JSON.parse(localStorage.getItem('projects') ?? '[]')
		)).map(project => new Project(project));
	} catch {
		alert("Couldn't load projects");
		localStorage.setItem('projects', '[]');
		return [];
	}
}

const projects: Project[] = getStoredProjects();
for (const project of projects) {
	sidebar.appendChild(buildProjectElement(project));
	fillTodoList(project);
}
sidebar.children[0]?.classList.add('project-selected');

function fillTodoList(project: Project): void {
	const todoElements: HTMLElement[] = project.todoList.map(todo =>
		buildTodoElement(todo)
	);
	todoElements.forEach(todo => {
		todo.addEventListener('click', () => todoSelection(todo));
		todoList.appendChild(todo);
	});
}

function todoSelection(selectedTodo: Element): void {
	if (selectedTodo.classList.contains('todo-selected')) {
		selectedTodo.classList.remove('todo-selected');
		return;
	}
	todoList.querySelector('.todo-selected')?.classList.remove('todo-selected');
	selectedTodo.classList.add('todo-selected');
}
