export interface TodoData {
	title: string;
	dueDate: string | Date;
	checked: boolean;
	priority: 'low' | 'medium' | 'high';
	description?: string;
	notes?: string;
}

export default class Todo {
	private Title = '';

	private DueDate: Date = new Date();

	private Checked = false;

	private Priority: 'low' | 'medium' | 'high' = 'low';

	private Description?: string;

	private Notes?: string;

	public constructor(todo: TodoData) {
		Object.assign(this, todo);
	}

	public toData(): TodoData {
		return {
			title: this.title,
			dueDate: this.dueDate,
			checked: this.checked,
			priority: this.priority,
			description: this.description,
			notes: this.notes,
		};
	}

	public toggleChecked(): void {
		this.checked = !this.checked;
	}

	public get title(): string {
		return this.Title;
	}

	public set title(value: string) {
		if (!value.length) throw new Error('bad title');
		this.Title = value;
	}

	public get dueDate(): Date {
		return this.DueDate;
	}

	public set dueDate(value: Date | string) {
		this.DueDate = typeof value === 'object' ? value : new Date(value);
	}

	public get checked(): boolean {
		return this.Checked;
	}

	public set checked(value: boolean) {
		this.Checked = value;
	}

	public get priority(): 'low' | 'medium' | 'high' {
		return this.Priority;
	}

	public set priority(value: 'low' | 'medium' | 'high') {
		this.Priority = value;
	}

	public get description(): string | undefined {
		return this.Description;
	}

	public set description(value: string | undefined) {
		this.Description = value;
	}

	public get notes(): string | undefined {
		return this.Notes;
	}

	public set notes(value: string | undefined) {
		this.Notes = value;
	}
}
