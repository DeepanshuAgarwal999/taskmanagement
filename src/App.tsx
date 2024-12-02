import { useState } from "react"
import Suggestion from "./components/Suggestion"
import TaskForm from "./components/forms/TaskForm"
import CommonLayout from "./components/layout/CommonLayout"
import Navbar from "./components/shared/Navbar"
import { TaskList } from "./components/task/TaskList"
import { Button } from "./components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog"

const App = () => {
  const [suggestions, setSuggestions] = useState<string[] | null>([])
  console.log( suggestions)
  return (
    <CommonLayout>
      <main className=" flex md:flex-row flex-col max-md:items-center gap-4">
        <div className=" flex-1  px-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4 ml-4">Add Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <TaskForm action="create" />
            </DialogContent>
          </Dialog>
          <div className="mt-5 flex justify-center">
            <div className="flex flex-col gap-2">
              <Suggestion setSuggestedTitle={setSuggestions} />
              {
                <p className="text-center">Get <span className="font-semibold">AI</span> powered suggestions</p>
              }
              <div className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-4">
                {suggestions?.map((suggestion, index) => (
                  <p className="text-gray-500" key={index}>{suggestion}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="sticky top-24 right-0 h-[calc(100vh-4.5rem)] w-72 bg-sidebar-background border min-w-[400px] p-4 overflow-y-auto">
          <TaskList />
        </div>
      </main>
    </CommonLayout>
  )
}

export default App