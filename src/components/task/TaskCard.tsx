import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '../ui/dialog'
import TaskForm from '../forms/TaskForm'
import { useDispatch } from 'react-redux'
import { deleteTask } from '@/redux/slices/task.slice'
import { PenIcon, Trash } from 'lucide-react'
import { format } from 'date-fns'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'

export const TaskCard = ({ task }: { task: Task }) => {
    const dispatch = useDispatch()
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label>Task Message</Label>
                    <Textarea readOnly value={task.message} className='outline-none border focus:ring-0 text-sm ring-0 focus-visible:ring-0 resize-none' />
                </CardContent>
                <CardFooter className='inline-flex items-center gap-2 justify-between w-full'>
                    <div className='inline-flex items-center gap-2'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" aria-label="Edit Task"><PenIcon />   </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <TaskForm action="update" taskToEdit={task} />
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive"><Trash /></Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <p>Are you sure you want to delete this task?</p>

                                <DialogFooter>
                                    <div className="mt-4 flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => dispatch(deleteTask(task))}>Delete</Button>
                                        <DialogClose>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>
                    <div className='flex flex-col gap-1 text-muted-foreground text-xs'>
                        created at: {format(task.createdAt, 'PPP')}
                        {task.updatedAt && <span>updated at: {format(task.updatedAt, 'PPP')}</span>}
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}
