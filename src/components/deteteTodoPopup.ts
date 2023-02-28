import Swal from 'sweetalert2';

const swal = Swal.mixin({
	customClass: {
		confirmButton: 'confirm-delete-button',
		cancelButton: 'cancel-delete-button',
	},
	buttonsStyling: true,
	background: 'var(--bg-300)',
	color: 'var(--primary-100)',
	confirmButtonColor: 'var(--primary-100)',
	cancelButtonColor: 'var(--bg-200)',
	iconColor: 'var(--primary-100)',
});

//big premise: I don't know async and await so I did this randomly
//I hope I got it right :)
export default async function showDeleteTodoPopup(): Promise<boolean> {
	let res: boolean = false;
	await swal
		.fire({
			title: 'Are you sure?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Go back',
			reverseButtons: true,
		})
		.then(result => {
			if (result.isConfirmed) {
				res = true;
			}
		});
	return res;
}
