import 'normalize.css';
import './style.css';
import Project from './dataObjects/Project';
import DAO from './DataAccessObject';
import buildHeader from './components/header';
import buildFooter from './components/footer';
import buildSidebar from './components/sidebar';
import buildMain from './components/main';
import ProjectList from './projectList';
import TodoList from './todoList';
import EventHandler from './eventHandler';

const projects: Project[] = DAO.getStoredProjects();
const currentProject: Project =
	projects[0] ?? new Project({ title: 'Default Project' });

const content = document.createElement('div');
content.id = 'content';
const header = buildHeader();
const footer = buildFooter();
const sidebar = buildSidebar();
const main = buildMain();
const projectList = new ProjectList(projects);
const todoList = new TodoList(currentProject);

EventHandler.buildEventHandler(projects, currentProject, todoList, projectList);

main.appendChild(todoList.element);
sidebar.appendChild(projectList.element);
content.appendChild(header);
content.appendChild(footer);
content.appendChild(sidebar);
content.appendChild(main);
document.body.appendChild(content);

projectList.fill(projects[0]);
