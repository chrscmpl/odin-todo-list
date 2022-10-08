import 'normalize.css';
import './index.css';

import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import addProjectBtn from './components/project/add-project-btn';
import addTodoBtn from './components/todo/add-todo-btn';

// ////////////// REMOVE ////////////////////
import Todo from './app/todo';
import Project from './app/project';
import TodoDiv from './components/todo/todo';
import ProjectDiv from './components/project/project';
// ////////////// REMOVE ////////////////////

document.querySelector(':root').setAttribute('lang', 'en');

const content = document.createElement('div');
content.id = 'content';

const sidebar = Sidebar();
sidebar.appendChild(addProjectBtn(() => console.log('add project')));

const main = Main();
main.appendChild(addTodoBtn(() => console.log('add todo')));

content.appendChild(Header());
content.appendChild(sidebar);
content.appendChild(main);
content.appendChild(Footer());

document.body.appendChild(content);

// ////////////// REMOVE ////////////////////
const proj = new Project('Default Project');
for (let i = 0; i < 4; i++) {
	proj.push(
		new Todo({
			title: 'title',
			description: 'description',
			dueDate: '25/12/2000',
			notes: 'notes',
			priority: i % 3 ? 'normal' : i % 2 ? 'low' : 'high',
			checked: i % 2,
		})
	);
}
proj.todo
	.map(todo => TodoDiv(todo))
	.forEach(todo => document.querySelector('.main').prepend(todo));

document.querySelector('.sidebar').prepend(ProjectDiv(proj));
// ////////////// REMOVE ////////////////////
