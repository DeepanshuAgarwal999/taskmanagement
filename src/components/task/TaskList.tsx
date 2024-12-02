import { Tasks } from '@/redux/slices/task.slice'
import React from 'react'
import { useSelector } from 'react-redux'
import { TaskCard } from './TaskCard'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Button } from '../ui/button'
import { Filter } from 'lucide-react'
import { Label } from '../ui/label'

export const TaskList = () => {
    const tasks = useSelector(Tasks)
    if (!tasks || tasks.length === 0) {
        return <div className='text-center mt-20 font-semibold'>No tasks found</div>
    }
    return (
        <div className='space-y-4 max-w-3xl mx-auto'>
            <div className='flex items-center mb-4 justify-between'>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline"><Filter /></Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>Filter Tasks</DrawerTitle>
                                <DrawerDescription>Filter tasks by date</DrawerDescription>
                            </DrawerHeader>
                            <div className=''>
                                <Label>Due Date</Label>
                                
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
                <h2 className="text-center text-xl font-bold"> Tasks ({tasks.length})</h2>
            </div>
            {
                tasks?.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))
            }
        </div>
    )
}
