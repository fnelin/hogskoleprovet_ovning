"use client"

import { useState, useCallback } from "react"
import type { Question } from "@/lib/questions"
import { formatText } from "@/lib/utils"

type Props = {
    questions: Question[]
}

function pickRandom(questions: Question[], exclude?: string): Question {
    const pool = questions.length > 1
        ? questions.filter((q) => q.id !== exclude)
        : questions
    return pool[Math.floor(Math.random() * pool.length)]
}

export default function FlashClient({ questions }: Props) {
    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState<Question | null>(null)
    const [selected, setSelected] = useState<string | null>(null)
    const [flipped, setFlipped] = useState(false)
    const [contentVisible, setContentVisible] = useState(true)

    const openCard = useCallback(() => {
        setCurrent(pickRandom(questions))
        setSelected(null)
        setFlipped(false)
        setOpen(true)
    }, [questions])

    const nextCard = useCallback(() => {
        setFlipped(false)
        setContentVisible(false)
        setTimeout(() => {
            setCurrent((prev) => pickRandom(questions, prev?.id))
            setSelected(null)
            setContentVisible(true)
        }, 550)
    }, [questions])

    const close = () => setOpen(false)

    const confirm = () => {
        if (!selected) return
        setFlipped(true)
    }

    const isCorrect = current && selected === current.answer

    return (
        <>
            <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4">
                <div>
                    <p className="text-neutral-100 font-medium mb-1">Flashkort</p>
                    <p className="text-muted text-sm">
                        Öva på slumpvisa frågor ett kort i taget.
                    </p>
                </div>
                <p className="text-muted text-xs">{questions.length} frågor tillgängliga</p>
                <button onClick={openCard} className="btn-primary self-start">
                    Dra ett kort
                </button>
            </div>

            {open && current && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60"
                    onClick={(e) => { if (e.target === e.currentTarget) close() }}
                >
                    <div
                        className="w-full max-w-lg"
                        style={{ perspective: "1200px" }}
                    >
                        <div
                            style={{
                                display: "grid",
                                transformStyle: "preserve-3d",
                                transition: "transform 0.55s cubic-bezier(0.4,0.2,0.2,1)",
                                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            }}
                        >
                            {/* FRONT */}
                            <div
                                className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4"
                                style={{
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    gridArea: "1 / 1",
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-muted text-xs uppercase tracking-widest">
                                        Flashkort
                                    </span>
                                    <button
                                        onClick={close}
                                        className="text-muted hover:text-neutral-100 text-lg leading-none"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div
                                    style={{
                                        transition: "opacity 0.2s ease",
                                        opacity: contentVisible ? 1 : 0,
                                    }}
                                    className="flex flex-col gap-4"
                                >
                                    {formatText(current.question, "text-neutral-100 font-medium text-base leading-relaxed")}

                                    <div className="flex flex-col gap-2">
                                        {current.options.map((opt) => (
                                            <button
                                                key={opt}
                                                disabled={flipped}
                                                onClick={() => setSelected(opt)}
                                                className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-colors duration-150 bg-surface disabled:cursor-default ${selected === opt
                                                    ? "border-primary text-neutral-100"
                                                    : "border-border text-neutral-100 hover:border-primary"
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={confirm}
                                        disabled={!selected}
                                        className="btn-primary self-end"
                                    >
                                        Bekräfta svar
                                    </button>
                                </div>
                            </div>

                            {/* BACK */}
                            <div
                                className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4"
                                style={{
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)",
                                    gridArea: "1 / 1",
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-muted text-xs uppercase tracking-widest">
                                        Svar
                                    </span>
                                    <button
                                        onClick={close}
                                        className="text-muted hover:text-neutral-100 text-lg leading-none"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${isCorrect
                                        ? "bg-[#0f2824] border border-secondary text-secondary"
                                        : "bg-[#2a0f0f] border border-red-500 text-red-400"
                                        }`}
                                >
                                    {isCorrect ? "✓ Rätt svar!" : "✗ Fel svar"}
                                </div>

                                <div>
                                    <p className="text-muted text-xs mb-1">Rätt svar</p>
                                    <p className="text-neutral-100 font-medium">{current.answer}</p>
                                </div>

                                <div>
                                    <p className="text-muted text-xs mb-1">Förklaring</p>

                                    {formatText(current.explanation, "text-sm text-muted leading-relaxed")}

                                </div>

                                <div className="flex gap-3 mt-auto pt-2">
                                    <button onClick={close} className="btn-secondary flex-1">
                                        Stäng
                                    </button>
                                    <button onClick={nextCard} className="btn-primary flex-1">
                                        Nytt kort
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
