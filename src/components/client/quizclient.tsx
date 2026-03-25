"use client"

import { useState } from "react"
import type { Question } from "@/lib/questions"
import { formatText } from "@/lib/utils"

type Phase = "setup" | "quiz" | "result"

type Props = {
    questions: Question[]
}

const PRESETS = [5, 10, 15]

export default function QuizClient({ questions }: Props) {
    const [phase, setPhase] = useState<Phase>("setup")
    const [count, setCount] = useState(5)
    const [active, setActive] = useState<Question[]>([])
    const [index, setIndex] = useState(0)
    const [selected, setSelected] = useState<string | null>(null)
    const [confirmed, setConfirmed] = useState(false)
    const [score, setScore] = useState(0)

    const max = questions.length

    function startQuiz() {
        setActive(questions.slice(0, count))
        setIndex(0)
        setSelected(null)
        setConfirmed(false)
        setScore(0)
        setPhase("quiz")
    }

    function confirm() {
        if (!selected) return
        if (selected === active[index].answer) setScore((s) => s + 1)
        setConfirmed(true)
    }

    function next() {
        if (index + 1 >= active.length) {
            setPhase("result")
            return
        }
        setIndex((i) => i + 1)
        setSelected(null)
        setConfirmed(false)
    }

    function restart() {
        setPhase("setup")
    }

    if (phase === "setup") {
        return (
            <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-6">
                <div>
                    <p className="text-neutral-100 font-medium mb-1">
                        Hur många frågor vill du öva på?
                    </p>
                    <p className="text-muted text-xs">
                        {max} frågor tillgängliga
                    </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                    {PRESETS.filter((p) => p <= max).map((p) => (
                        <button
                            key={p}
                            onClick={() => setCount(p)}
                            className={`px-5 py-2 rounded-xl text-sm font-medium border transition-colors duration-150 ${count === p
                                ? "bg-primary border-primary text-white"
                                : "bg-transparent border-border text-muted hover:border-primary hover:text-neutral-100"
                                }`}
                        >
                            {p} frågor
                        </button>
                    ))}
                    <button
                        onClick={() => setCount(max)}
                        className={`px-5 py-2 rounded-xl text-sm font-medium border transition-colors duration-150 ${count === max
                            ? "bg-primary border-primary text-white"
                            : "bg-transparent border-border text-muted hover:border-primary hover:text-neutral-100"
                            }`}
                    >
                        Alla ({max})
                    </button>
                </div>

                <button onClick={startQuiz} className="btn-primary self-start">
                    Starta quiz
                </button>
            </div>
        )
    }

    if (phase === "result") {
        const percent = Math.round((score / active.length) * 100)
        return (
            <div className="bg-surface border border-border  rounded-2xl p-6 flex flex-col gap-6 text-center">
                <p className="text-neutral-100 text-2xl font-medium">
                    {score} / {active.length} rätt
                </p>
                <p className="text-muted text-sm">{percent}% korrekt</p>

                <div className="w-full bg-border rounded-full h-2">
                    <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${percent}%` }}
                    />
                </div>

                <p className="text-neutral-100 text-sm">
                    {percent === 100
                        ? "Perfekt! Alla rätt."
                        : percent >= 70
                            ? "Bra jobbat! Lite mer öving så sitter det."
                            : "Fortsätt öva — det tar tid att lära sig."}
                </p>

                <div className="flex gap-3 justify-center">
                    <button onClick={startQuiz} className="btn-primary">
                        Försök igen
                    </button>
                    <button onClick={restart} className="btn-secondary">
                        Byt antal frågor
                    </button>
                </div>
            </div>
        )
    }

    const current = active[index]
    const isCorrect = selected === current.answer

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-muted">
                <span>
                    Fråga {index + 1} av {active.length}
                </span>
                <span>{score} rätt</span>
            </div>

            <div className="w-full bg-border rounded-full h-1">
                <div
                    className="h-1 rounded-full bg-primary transition-all"
                    style={{ width: `${((index) / active.length) * 100}%` }}
                />
            </div>

            <div className="bg-surface border border-border  rounded-2xl p-6">
                {formatText(current.question, "text-neutral-100 font-medium text-base leading-relaxed")}
            </div>

            <div className="flex flex-col gap-2">
                {current.options.map((opt) => {
                    let style =
                        "border-border  text-neutral-100 hover:border-primary"

                    if (confirmed) {
                        if (opt === current.answer) {
                            style = "border-secondary bg-[#0f2824] text-secondary"
                        } else if (opt === selected && !isCorrect) {
                            style = "border-red-500 bg-[#2a0f0f] text-red-400"
                        } else {
                            style = "border-border  text-color-muted opacity-50"
                        }
                    } else if (selected === opt) {
                        style = "border-primary text-neutral-100"
                    }

                    return (
                        <button
                            key={opt}
                            disabled={confirmed}
                            onClick={() => setSelected(opt)}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-colors duration-150 bg-surface ${style} disabled:cursor-default`}
                        >
                            {opt}
                        </button>
                    )
                })}
            </div>

            {confirmed && (
                <div className="bg--surface border border-border  rounded-xl px-4 py-3 text-sm text-muted">
                    {formatText(current.explanation, "text-sm text-muted")}
                </div>
            )}

            <div className="flex justify-end gap-3">
                {!confirmed ? (
                    <button
                        onClick={confirm}
                        disabled={!selected}
                        className="btn-primary"
                    >
                        Bekräfta svar
                    </button>
                ) : (
                    <button onClick={next} className="btn-primary">
                        {index + 1 >= active.length ? "Visa resultat" : "Nästa fråga"}
                    </button>
                )}
            </div>
        </div>
    )
}
