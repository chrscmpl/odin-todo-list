import 'normalize.css';
import './index.css';

import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import Footer from './components/footer/footer';

// ////////////// REMOVE ////////////////////
import Todo from './todo-list/todo';
import Project from './todo-list/project';
import TodoDiv from './components/todo/todo';
import ProjectDiv from './components/project/project';
// ////////////// REMOVE ////////////////////

document.querySelector(':root').setAttribute('lang', 'en');

const content = document.createElement('div');
content.id = 'content';

content.appendChild(Header());
content.appendChild(Sidebar());
content.appendChild(Main());
content.appendChild(Footer());

document.body.appendChild(content);

// ////////////// REMOVE ////////////////////
const proj = new Project();
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
	.forEach(todo => document.querySelector('.main').appendChild(todo));

document.querySelector('.sidebar').appendChild(ProjectDiv(proj));
// ////////////// REMOVE ////////////////////
