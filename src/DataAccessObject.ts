import Project, { ProjectData } from './dataObjects/Project';

const defaultValue = [new Project({ title: 'Default Project' })];
const defaultStringValue = JSON.stringify(defaultValue);

export function getStoredProjects(): Project[] {
	try {
		return (
			JSON.parse(
				localStorage.getItem('projects') ?? defaultStringValue
			) as ProjectData[]
		).map(project => new Project(project));
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
	localStorage.setItem(
		'projects',
		JSON.stringify(projects.map(project => project.toData()))
	);
}

const DAO = { getStoredProjects, storeProjects };
export default DAO;
