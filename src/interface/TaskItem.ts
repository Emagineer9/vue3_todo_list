import type { TagItemInterface } from '@/interface/TagItem'

/**
 * Todoタスク
 */
export interface TaskItemInterface {
    id: string,
    tags: Array<TagItemInterface>,
    text: string,
    status: number,
    createDate: string,
    updateDate: string,
    isEdit: Boolean,
}