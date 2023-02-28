import Swal from 'sweetalert2';

const swal = Swal.mixin({
	customClass: {
		confirmButton: '',
		cancelButton: '',
	},
	buttonsStyling: false,
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
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				res = false;
			}
		});
	return res;
}
