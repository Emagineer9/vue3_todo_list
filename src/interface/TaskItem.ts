/**
 * Todoタスク
 */
export interface TaskItemInterface {
    id: string,
    tags: Array<string>,
    text: string,
    status: string,
    isEdit: Boolean,
}