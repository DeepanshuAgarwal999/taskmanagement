import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Tasks } from '@/redux/slices/task.slice'
import { Toast } from './ui/toast'
import { useToast } from '@/hooks/use-toast'

const Suggestion = ({ setSuggestedTitle }: { setSuggestedTitle: React.Dispatch<React.SetStateAction<string[] | null>> }) => {
    const titles = useSelector(Tasks).map(task => task.title)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const generateSuggestions = async () => {
        if (titles.length === 0) {
            alert('No titles available to generate suggestions.');
            return;
        }
        const prompt = `I am giving you some titles. Please suggest some other titles based on these titles. Titles: ${titles.join(', ')} and response should be in form of comma separated string title and number of title should be 10 to 15.`
        try {
            setIsLoading(true)
            const { data } = await axios({
                url: "https://gene rativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + import.meta.env.VITE_GEMINI_API_KEY,
                method: "POST",
                data: {
                    contents: [
                        {
                            parts: [{
                                text: prompt
                            },
                            ]
                        }
                    ]
                }
            })
            if (data) {
                const response = data.candidates[0].content.parts[0].text.split(',')
                // const cleanedSuggestions = response.toString().split(/\n\s*/g).map((item: any) => item.replace(/^\s*"/, '').replace(/"$/, '').trim())
                const cleanedSuggestions = response.map((item: any) => item.trim().replace(/\n$/, ''))
                setSuggestedTitle(cleanedSuggestions)
            }

        } catch (error) {
            console.log(error)
            toast({
                title: "unable to fetch title",
                description: "Seems like connectivity issue is there!",
            })
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <button disabled={isLoading} onClick={generateSuggestions} className="w-fit  mx-auto relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 disabled:cursor-not-allowed disabled:opacity-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-50 px-3 py-1 text-xl font-medium text-slate-950 backdrop-blur-3xl">
                    Get Suggestions
                </span>
            </button>

        </>
    )
}

export default Suggestion