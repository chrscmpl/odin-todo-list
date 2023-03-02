import Swal from 'sweetalert2';

const swal = Swal.mixin({
	customClass: {
		confirmButton: 'swal-confirm-button',
		cancelButton: 'swal-cancel-button',
	},
	buttonsStyling: true,
	background: 'var(--bg-300)',
	color: 'var(--primary-100)',
	confirmButtonColor: 'var(--primary-100)',
	cancelButtonColor: 'var(--bg-200)',
	iconColor: 'var(--primary-100)',
});

export default async function showDeletePopup(): Promise<boolean> {
	return await swal
		.fire({
			title: 'Are you sure?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Go back',
			reverseButtons: true,
		})
		.then(result => result.isConfirmed);
}
