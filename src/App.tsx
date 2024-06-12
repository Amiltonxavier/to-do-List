import { ChangeEvent, useState } from "react"
import { DialogCreatTask } from "./components/Dialog/CreatTask";
import { Plus } from "lucide-react";
import { ComplianceStatus, TaskProps } from "./types";
import { Details } from "./components/Details";



function App() {

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tasks, setTask ] = useState<TaskProps[]>(JSON.parse(localStorage.getItem('tasks') || '[]'));
  const [search, setSearch] = useState('')

  
  const openDialog = () => {
    setIsDialogOpen(true);
   }

   const closeDialog = () => {
    setIsDialogOpen(false);
   }

  
   const onAddTask = (newTask: TaskProps) => {
    setTask(prev => [...prev, newTask])
    closeDialog();
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
   }

   function onCompliedTask(taskId: number | string) {
      const newTasks: TaskProps[] = tasks.map((task) => {
        if(taskId === task.id) {
          return {...task, isComplied: ComplianceStatus.Completed}
        }else{
          return task
        }
      })     
      setTask(newTasks)
      localStorage.setItem('tasks', JSON.stringify(newTasks))
   }

   function onDeleteTask(taskId: number | string) {
      const newTasks: TaskProps[] = tasks.filter((task) => taskId !== task.id)
      setTask(newTasks)
      localStorage.setItem('tasks', JSON.stringify(newTasks))
   }

   const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setSearch(e.target.value);
   }
   const filterdData = tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))


  return (
    <>
      <main className="min-h-screen w-full px-10 flex gap-4 flex-col">
        <section className="w-full py-8 border-b border-gray-600">
          <button onClick={openDialog} className="border border-zinc-700 px-3 py-2 flex rounded-md shadow items-center gap-2 justify-center hover:bg-transparent/90">
            <Plus size={18} /> Nova tarefa 
          </button>
          <section className="flex gap-2 mt-4">
          <div className="w-full border rounded-md border-gray-600">
            <input type="search" onChange={onSearch} name="search" id="search" placeholder="Pesquisar" className="bg-transparent w-full px-2 py-3" />
            </div>
        </section>
        </section>
        <section className="flex flex-col gap-2">
          {
            filterdData.sort((a, b) => a.priority - b.priority).map((task) => (
              <Details key={task.id} onDeleteTask={onDeleteTask} onCompliedTask={onCompliedTask} task={task} />
            ))
          }
        </section>
      </main>
      {
        isDialogOpen && <DialogCreatTask isOpen={isDialogOpen} onClose={closeDialog} onAddTask={onAddTask} />
      }
    </>
  )
}

export default App
