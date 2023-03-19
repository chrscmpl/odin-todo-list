import Project, { ProjectData } from './dataObjects/Project';

const defaultValue = [new Project({ title: 'Default Project' })];
const defaultStringValue = JSON.stringify(defaultValue);

let isEnabled = true;

export function enable(enabled: boolean) {
	isEnabled = enabled;
}

export function getStoredProjects(): Project[] {
	try {
		const projects = (
			JSON.parse(
				localStorage.getItem('projects') ?? defaultStringValue
			) as ProjectData[]
		).map(project => new Project(project));
		projects.forEach(sortTodos);
		return projects;
	} catch {
		console.error(
			`value
			${localStorage.getItem('projects')}
			of variable 'projects' is not convertible to ProjectData[]`
		);
		alert("Couldn't load projects");
		localStorage.setItem('projects', defaultStringValue);
		return defaultValue;
	}
}

export function storeProjects(projects: Project[]) {
	if (!isEnabled) return;
	localStorage.setItem(
		'projects',
		JSON.stringify(projects.map(project => project.toData()))
	);
}

function sortTodos(project: Project): void {
	project.todoList = project.todoList.sort(
		(todo1, todo2) => todo1.dueDate.getTime() - todo2.dueDate.getTime()
	);
}

const DAO = { enable, getStoredProjects, storeProjects };
export default DAO;
