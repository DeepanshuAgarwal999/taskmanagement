import { Tasks } from '@/redux/slices/task.slice'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TaskCard } from './TaskCard'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Button } from '../ui/button'
import { Filter } from 'lucide-react'
import { Label } from '../ui/label'
import { addFilter } from '@/redux/actions' // Assuming you have an action to add filter

export const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(Tasks)
    const [filter, setFilter] = useState({ dueDate: '', overdue: false });

    const filterTasks = (tasks) => {
        return tasks.filter((task) => {
            const dueDate = task.dueDate ? new Date(task.dueDate) : null;
            const isOverdue = dueDate && dueDate < new Date();

            if (filter.dueDate) {
                // Filter tasks by dueDate
                return dueDate && dueDate.toLocaleDateString() === new Date(filter.dueDate).toLocaleDateString();
            }

            if (filter.overdue) {
                // Filter overdue tasks
                return isOverdue;
            }

            return true; // No filter applied
        });
    };

    const filteredTasks = filterTasks(tasks);

    const handleDueDateChange = (e) => {
        const newDueDate = e.target.value;
        setFilter(prev => ({ ...prev, dueDate: newDueDate }));
    };

    const handleOverdueToggle = () => {
        setFilter(prev => ({ ...prev, overdue: !prev.overdue }));
    };

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
                            <div className='space-y-4'>
                                <div>
                                    <Label>Due Date</Label>
                                    <input
                                        type="date"
                                        value={filter.dueDate}
                                        onChange={handleDueDateChange}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filter.overdue}
                                        onChange={handleOverdueToggle}
                                        className="h-4 w-4"
                                    />
                                    <Label>Show Overdue Tasks Only</Label>
                                </div>
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
                <h2 className="text-center text-xl font-bold"> Tasks ({filteredTasks.length})</h2>
            </div>
            {
                filteredTasks?.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))
            }
        </div>
    )
}
