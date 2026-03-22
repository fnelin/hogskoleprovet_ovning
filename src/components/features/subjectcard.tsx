import Link from "next/link"
import type { Subject } from "@/lib/subjects"

const colorMap: Record<string, { card: string; badge: string; badgeText: string }> = {
    indigo: {
        card: "hover:border-[var(--color-primary)]",
        badge: "bg-[#312e81] text-[#a5b4fc]",
        badgeText: "",
    },
    teal: {
        card: "hover:border-[var(--color-secondary)]",
        badge: "bg-[#134e4a] text-[#5eead4]",
        badgeText: "",
    },
    amber: {
        card: "hover:border-[var(--color-accent)]",
        badge: "bg-[#451a03] text-[#fcd34d]",
        badgeText: "",
    },
}

type Props = {
    subject: Subject
    questionCount: number
}

export default function SubjectCard({ subject, questionCount }: Props) {
    const colors = colorMap[subject.color] ?? colorMap.indigo

    return (
        <Link
            href={`/subject/${subject.slug}`}
            className={`
        flex flex-col gap-3 p-5 rounded-2xl
        bg-surface border border-border]
        transition-colors duration-200 group
        ${colors.card}
      `}
        >
            <span className="text-2xl leading-none">{subject.icon}</span>

            <div className="flex flex-col gap-1">
                <p className="text-neutral-100 font-medium text-[15px] leading-snug">
                    {subject.title}
                </p>
                <p className="text-muted text-xs">
                    {subject.description}
                </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-2">
                <span
                    className={`text-[11px] font-medium px-2 py-1 rounded-md ${colors.badge}`}
                >
                    {subject.badge}
                </span>
                <span className="text-muted text-xs">
                    {questionCount} frågor
                </span>
            </div>
        </Link>
    )
}
