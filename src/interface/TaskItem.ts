/**
 * Todoタスク
 */
export interface TaskItemInterface {
    id: string | number,
    tag: Array<string>,
    text: string,
    status: string,
}