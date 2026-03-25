"use client"

import { useState } from "react"
import type { Question } from "@/lib/questions"
import QuizClient from "@/components/client/quizclient"
import FlashClient from "@/components/client/flashclient"

type Mode = "quiz" | "flash"

type Props = {
    questions: Question[]
}

export default function ModeSelector({ questions }: Props) {
    const [mode, setMode] = useState<Mode>("quiz")

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-2">
                <button
                    onClick={() => setMode("quiz")}
                    className={`px-5 py-2 rounded-xl text-sm font-medium border transition-colors duration-150 ${mode === "quiz"
                        ? "bg-primary border-primary text-white"
                        : "bg-transparent border-border text-muted hover:border-primary hover:text-neutral-100"
                        }`}
                >
                    Quiz
                </button>
                <button
                    onClick={() => setMode("flash")}
                    className={`px-5 py-2 rounded-xl text-sm font-medium border transition-colors duration-150 ${mode === "flash"
                        ? "bg-primary border-primary text-white"
                        : "bg-transparent border-border text-muted hover:border-primary hover:text-neutral-100"
                        }`}
                >
                    Flashkort
                </button>
            </div>

            <div className="max-w-2xl">
                {mode === "quiz" ? (
                    <QuizClient questions={questions} />
                ) : (
                    <FlashClient questions={questions} />
                )}
            </div>
        </div>
    )
}
