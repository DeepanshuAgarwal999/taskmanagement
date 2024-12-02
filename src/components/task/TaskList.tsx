import { Tasks } from '@/redux/slices/task.slice'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TaskCard } from './TaskCard'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Button } from '../ui/button'
import { Filter } from 'lucide-react'
import { Label } from '../ui/label'
import { Calendar } from '../ui/calendar'
import { Checkbox } from '../ui/checkbox'

export const TaskList = () => {
    const tasks = useSelector(Tasks);
    const [filter, setFilter] = useState<{ dueDate: Date | undefined; overdue: boolean }>({
        dueDate: undefined,
        overdue: false,
    });

    const filterTasks = (tasks: Task[]) => {
        return tasks.filter((task) => {
            const dueDate = task.dueDate ? new Date(task.dueDate) : null;
            const isOverdue = dueDate && dueDate < new Date();

            if (filter.dueDate) {

                // console.log(dueDate && dueDate< filter.dueDate)
                console.log(dueDate)
                console.log(filter.dueDate)
                return dueDate && dueDate.toDateString() <= filter.dueDate.toDateString();
            }
            if (filter.overdue) {
                return isOverdue;
            }

            return true; // No filter applied
        });
    };

    const filteredTasks = filterTasks(tasks);

    const handleDueDateChange = (date: Date | undefined) => {
        setFilter((prev) => ({ ...prev, dueDate: date }));
    };

    const handleOverdueToggle = () => {
        setFilter((prev) => ({ ...prev, overdue: !prev.overdue }));
    };

    if (!tasks || tasks.length === 0) {
        return <div className='text-center mt-20 font-semibold'>No tasks found</div>;
    }

    return (
        <div className='space-y-4 max-w-3xl mx-auto'>
            <div className='flex items-center mb-4 justify-between'>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline">
                            <Filter />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="w-full mx-auto max-w-lg">
                            <DrawerHeader>
                                <DrawerTitle>Filter Tasks</DrawerTitle>
                                <DrawerDescription>Filter tasks by date</DrawerDescription>
                            </DrawerHeader>
                            <div className='space-y-4 flex justify-between flex-wrap py-8'>
                                <div>
                                    <Label>Due Date</Label>
                                    <Calendar
                                        disabled={(date) =>
                                            date < new Date()
                                        }
                                        mode='single'
                                        selected={filter.dueDate || undefined}
                                        onSelect={handleDueDateChange}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex items-center space-x-2 self-start">
                                    <Checkbox
                                        checked={filter.overdue}
                                        onCheckedChange={handleOverdueToggle}
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
            {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};
