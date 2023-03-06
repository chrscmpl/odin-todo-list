import 'normalize.css';
import './style.css';
import Project from './dataObjects/Project';
import Todo from './dataObjects/Todo';
import DAO from './DataAccessObject';
import buildHeader from './components/header';
import buildFooter from './components/footer';
import buildSidebar from './components/sidebar';
import buildMain from './components/main';
import buildTodoList from './components/todoList';
import buildProjectElement from './components/projectElement';
import buildTodoElement from './components/todoElement';
import showDeletePopup from './components/deletePopup';
import showTodoCompilationPopup from './components/todoCompilationPopup';
// import sampleData from './sample.json';

const content = document.createElement('div');
content.id = 'content';
const header = buildHeader();
const footer = buildFooter();
const sidebar = buildSidebar();
const main = buildMain();
const todoList = buildTodoList();
const projects: Project[] = DAO.getStoredProjects();
let currentProject: Project;

function todoSelection(selectedTodo: Element): void {
	if (selectedTodo.classList.contains('todo-checked')) return;
	if (selectedTodo.classList.contains('todo-selected')) {
		selectedTodo.classList.remove('todo-selected');
		return;
	}
	todoList.querySelector('.todo-selected')?.classList.remove('todo-selected');
	selectedTodo.classList.add('todo-selected');
}

function todoChecked(todo: Todo, checkedTodo: Element): void {
	todo.toggleChecked();
	checkedTodo.classList.toggle('todo-checked');
	DAO.storeProjects(projects);
}

function deleteTodo(todo: Todo, todoElement: HTMLElement): void {
	projects.forEach(project => project.remove(todo));
	showDeletePopup().then(result => {
		if (!result) return;
		todoElement.remove();
		DAO.storeProjects(projects);
	});
}

function editTodo(todo: Todo): void {
	showTodoCompilationPopup(todo).then(newTodo => {
		if (!(newTodo instanceof Todo)) return;
		Object.assign(todo, newTodo);
		DAO.storeProjects(projects);
		fillTodoList(currentProject);
	});
}

function addTodoElement(todo: Todo): void {
	const todoElement = buildTodoElement(todo);
	const todoSection = todoElement.querySelector('.todo')!;
	const checkbox = todoElement.querySelector('.todo-checkbox')!;
	const deleteButton = todoElement.querySelector('.todo-delete-button')!;
	const editButton = todoElement.querySelector('.todo-edit-button')!;
	todoSection.addEventListener('click', () => todoSelection(todoSection));
	checkbox.addEventListener('change', () => {
		todoChecked(todo, todoSection);
	});
	deleteButton.addEventListener('click', () => {
		deleteTodo(todo, todoElement);
	});
	editButton.addEventListener('click', () => {
		editTodo(todo);
	});
	todoList.appendChild(todoElement);
}

function fillTodoList(project: Project): void {
	todoList.innerHTML = '';
	project.todoList
		.filter(todo => !todo.checked)
		.forEach(todo => addTodoElement(todo));
	project.todoList
		.filter(todo => todo.checked)
		.forEach(todo => addTodoElement(todo));
	currentProject = project;
}

function projectSelection(selectedProject: Element, project: Project): void {
	sidebar
		.querySelector('.project-selected')
		?.classList.remove('project-selected');
	selectedProject.classList.add('project-selected');
	fillTodoList(project);
}

function addProjectElement(project: Project): void {
	const element: HTMLElement = buildProjectElement(project);
	element.addEventListener('click', () => projectSelection(element, project));
	sidebar.appendChild(element);
}

// function fillSampleData() {
// 	localStorage.setItem('projects', JSON.stringify(sampleData));
// }

main.appendChild(todoList);
content.appendChild(header);
content.appendChild(footer);
content.appendChild(sidebar);
content.appendChild(main);
document.body.appendChild(content);

projects.forEach(addProjectElement);
(sidebar.firstElementChild as HTMLElement)?.click();
