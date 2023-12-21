import { type colors } from '../utils/Constants'
import { type genId } from '../utils/genId'

export type ColorsUnion = typeof colors[number]

export interface TaskType {
  id: ReturnType<typeof genId>
  title: string
  completed: boolean
  color: ColorsUnion
}

export type ActionType =
  | { type: 'add', payload: { title: string } }
  | { type: 'edit', payload: Omit<Partial<TaskType>, 'id'> & Pick<TaskType, 'id'> } // makes every property optional except Id
  | { type: 'delete', payload: { id: TaskType['id'] } }
