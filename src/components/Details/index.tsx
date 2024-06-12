import { ComponentProps } from 'react'
import { ComplianceStatus, TaskProps } from '../../types'
import { Check, Trash } from 'lucide-react'


type DetailsProps = ComponentProps<'details'> & {
    task: TaskProps,
    onDeleteTask: (taskId: number | string) => void,
    onCompliedTask: (taskId: number | string) => void
}
export  function Details({onDeleteTask, onCompliedTask ,task, ...props}: DetailsProps) {
  
    function renderPriority(priority: number) {
        const priorities = {
          1: 'Alta',
          2: 'Média',
          3: 'Baixa'
        }
    
        return priorities[priority]
       }
  
    return (
    <details {...props} className='w-full border rounded-md border-gray-600 p-4  gap-2 shadow-md'>
        <summary 
            className={`text-xl cursor-pointer ${task.isComplied.includes(ComplianceStatus.NotCompleted) ? '' : 'line-through'}`}
        >
            {task.title}
        </summary>
        <div className="flex flex-col gap-2">
                    <span className="text-gray-300 text-sm flex items-center gap-1">
                      {task.category} 
                      <span className="size-2 bg-gray-700 rounded-full flex self-center" /> 
                      {renderPriority(task.priority)}
                    </span>
                    <p className="text-gray-300"> {task.description}</p>
                    <div className="flex gap-2 justify-end items-end">
                      <button 
                        title="Excluir" 
                        className="p-2 border rounded-md border-red-700 text-red-700 hover:bg-red-700 hover:text-gray-200" 
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <Trash className="size-4 sm:size-5" />
                      </button>
                    {
                      task.isComplied.includes(ComplianceStatus.NotCompleted) && (
                        <button 
                          title="Concluído" 
                          key={Math.round(Math.random() * 100 / 2)} 
                          className="p-2 border rounded-md border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-200" 
                          onClick={() =>onCompliedTask(task.id)}
                        >
                          <Check className="size-4 sm:size-5"/>
                        </button>         
                      )
                    }
                  </div>
                </div>
    </details>
  )
}
