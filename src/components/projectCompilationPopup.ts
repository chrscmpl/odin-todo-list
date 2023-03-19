import Swal from 'sweetalert2';
import Project from '../dataObjects/Project';

const swal = Swal.mixin({
	customClass: {
		container: 'swal-project-compilation-popup',
		confirmButton: 'swal-confirm-button',
		cancelButton: 'swal-cancel-button',
		validationMessage: 'swal-validation-message',
	},
	buttonsStyling: true,
	background: 'var(--bg-300)',
	color: 'var(--text-100)',
	confirmButtonColor: 'var(--primary-100)',
	cancelButtonColor: 'var(--bg-200)',
});

export default async function showProjectCompilationPopup(project?: Project) {
	return (await swal
		.fire({
			title: project ? 'Edit title' : 'New project',
			showCancelButton: true,
			allowOutsideClick: true,
			input: 'text',
			inputValue: project?.title ?? '',
			inputValidator: input => (input.length === 0 ? 'Insert a title' : null),
			confirmButtonText: 'Enter',
		})
		.then(result => result.value ?? null)) as string | null;
}
