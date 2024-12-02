import React, { useEffect } from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar"
import { cn } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '@/redux/slices/task.slice';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    title: z.string().min(1, "Task title is required."),
    message: z.string().min(1, "Task message is required."),
    dueDate: z.date().min(new Date(), "Task due date must be in the future."),
});

export default function TaskForm({ action, taskToEdit }: { action: "create" | "update", taskToEdit?: Task | null }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            message: "",
            dueDate: new Date(),
        },
    });
    const { toast } = useToast()
    useEffect(() => {
        if (action === 'update' && taskToEdit) {
            form.setValue('title', taskToEdit.title)
            form.setValue('message', taskToEdit.message)
            form.setValue('dueDate', new Date(taskToEdit.dueDate))
        }
    }, [action, taskToEdit])
    const dispatch = useDispatch()
    // Handle form submission
    async function onSubmit(data: any) {
        console.log(data);
        if (action === "update" && taskToEdit) {
            data.updatedAt = new Date()
            dispatch(updateTask({ ...data, id: taskToEdit.id, createdAt: taskToEdit.createdAt }))
            toast({
                title: "Success",
                description: "Task updated successfully",
            })
        }
        else {
            data.createdAt = new Date()
            dispatch(addTask({ ...data, id: Date.now() }))
            toast({
                title: "Success",
                description: "Task added successfully",
            })
        }
        form.reset()
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter task title" {...field} />
                            </FormControl>
                            <FormDescription>{action === 'create' ? "Add" : "Edit"} the title of your task.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Message</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter task message" {...field} />
                            </FormControl>
                            <FormDescription>{action === 'create' ? "Add" : "Edit"} the message of your task.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Due Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date()
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                {action === 'create' ? "Add" : "Edit"} the due date of your task.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">{action === "create" ? "Add Task" : "Update Task"}</Button>
            </form>
        </Form>
    );
}
