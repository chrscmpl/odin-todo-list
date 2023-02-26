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

const projects: Project[] = getStoredProjects();
projects.forEach(addProjectElement);
fillTodoList(projects[0]);
sidebar.children[0]?.classList.add('project-selected');
console.log(JSON.stringify(projects[0].toData()));

function addProjectElement(project: Project): void {
	const element: HTMLElement = buildProjectElement(project);
	element.addEventListener('click', () => {
		sidebar
			.querySelector('.project-selected')
			?.classList.remove('project-selected');
		element.classList.add('project-selected');
		fillTodoList(project);
	});
	sidebar.appendChild(element);
}

function fillTodoList(project: Project): void {
	todoList.innerHTML = '';
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

// function storeProjects() {
// 	localStorage.setItem(
// 		'projects',
// 		JSON.stringify(projects.map(project => project.toData()))
// 	);
// }

function getStoredProjects(): Project[] {
	const defaultValue = '[{title: "Default Project"}]';
	try {
		return (
			JSON.parse(
				localStorage.getItem('projects') ?? defaultValue
			) as ProjectData[]
		).map(project => new Project(project));
	} catch {
		console.error(
			`value
			${localStorage.getItem('projects')}
			of variable 'projects' is not convertible to ProjectData[]`
		);
		alert("Couldn't load projects");
		localStorage.setItem('projects', defaultValue);
		return [new Project({ title: 'Default Project' })];
	}
}
