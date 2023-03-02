import Swal from 'sweetalert2';
import Todo from '../dataObjects/Todo';
import buildTodoCompilationForm from './todoCompilationForm';

const swal = Swal.mixin({
	customClass: {
		container: 'swal-todo-compilation-popup',
		confirmButton: 'swal-confirm-button',
		cancelButton: 'swal-cancel-button',
		validationMessage: 'swal-validation-message',
	},
	buttonsStyling: true,
	background: 'var(--bg-300)',
	color: 'var(--primary-100)',
	confirmButtonColor: 'var(--primary-100)',
	cancelButtonColor: 'var(--bg-200)',
});

// TODO: make form
export default async function showTodoCompilationPopup(todo?: Todo) {
	const form = buildTodoCompilationForm(todo);

	return (await swal
		.fire({
			title: 'New Todo',
			showCancelButton: true,
			confirmButtonText: 'Enter',
			html: form.form,
			preConfirm: () => {
				try {
					return new Todo({
						title: form.title.value,
						dueDate: form.dueDate.value,
						description: form.description.value,
						notes: form.notes.value,
						priority: getPriority(form.priority),
						checked: false,
					});
				} catch (e) {
					swal.showValidationMessage('Invalid input');
					return null;
				}
			},
		})
		.then(result => result.value ?? null)) as Todo;
}

function getPriority(prioritySection: HTMLElement): 'low' | 'medium' | 'high' {
	const formPriority = [...prioritySection.children]
		.find(radioBox => (radioBox as HTMLInputElement).checked)
		?.getAttribute('value');
	const validPriorities: any[] = ['low', 'medium', 'high'];
	if (!validPriorities.includes(formPriority))
		throw new Error('bad todo priority');
	return formPriority as 'low' | 'medium' | 'high';
}
