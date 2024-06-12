
import { FormEvent } from 'react'
import { Dialog } from '..'
import { ComplianceStatus, TaskProps } from '../../../types'
import { CONSTANTS } from '../../../constants'



type DialogCreatTaskProps = {
    isOpen: boolean,
    onClose: () => void,
    onAddTask: (newTask: TaskProps) => void
}

export function DialogCreatTask({isOpen, onClose, onAddTask} : DialogCreatTaskProps) {


    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const title = formData.get('title') as string
        const category = formData.get('category') as string
        const description = formData.get('description') as string
        const priority = formData.get('priority') as string
        
        const newTask = {
            id: Math.round(Math.random() * 100 / 2),
            title,
            category,
            description,
            priority: Number(priority),
            createdAt: new Date(),
            isComplied: ComplianceStatus.NotCompleted
        }

        onAddTask(newTask) 

    }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
        <div className='p-2'>
        <h3 className='text-xl font-medium mb-2'>Cria uma nova tarefa</h3>
        <form onSubmit={onSubmit} className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="">Título da tarefa</label>
                <input type="text" name='title' placeholder="Título da tarefa" className=' focus-visible:border-blue-800 bg-transparent border border-gray-700 rounded-md px-2 py-3 outline-none' />
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col gap-2'>
                    <label>Categoria</label>
                    <div className='grid'>
                    <select 
                        name="category" 
                        id="category" 
                        className='focus-visible:border-blue-800 border border-gray-700 px-2 py-3 text-gray-200 outline-none rounded-md row-start-1 col-start-1 bg-slate-900 '
                    >
                            {
                                CONSTANTS.Category.map((category) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))
                            }
                    </select>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <label>Prioridade</label>
                    <div className='grid'>
                    <select 
                        name="priority" 
                        id="priority" 
                        className='focus-visible:border-blue-800 border border-gray-700 px-2 py-3 text-gray-200 outline-none rounded-md appearance-none row-start-1 col-start-1 bg-slate-900 '
                    >
                            <option selected disabled>Selecione</option>
                            {
                                CONSTANTS.Priority.map((priority) => (
                                    <option key={priority.id} value={priority.id}>{priority.name}</option>
                                ))
                            }
                    </select>
                    </div>
                </div>
            </div>
            
           <div>
            <label>Decrição da Tarefa</label>
            <textarea name="description" id="" className='focus-visible:border-blue-800 bg-transparent border border-gray-700 rounded-md resize-y outline-none w-full p-4' />
           </div>
           <button className='px-2 py-3 bg-blue-800 rounded-md shadow text-gray-300'>Criar tarefa</button>
        </form>
        </div>
        
    </Dialog>
  )
}
