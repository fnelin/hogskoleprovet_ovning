import fs from "fs"
import path from "path"
import { getSubjects, type Subject } from "@/lib/subjects"
import SubjectCard from "@/components/features/subjectcard"

const SECTION_LABELS: Record<string, string> = {
    verbal: "Verbal del",
    kvantitativ: "Kvantitativ del",
}

function getQuestionCounts(): Record<string, number> {
    const base = path.join(process.cwd(), "data", "questions")
    if (!fs.existsSync(base)) return {}

    return fs.readdirSync(base).reduce<Record<string, number>>((acc, file) => {
        if (!file.endsWith(".json")) return acc
        const slug = file.replace(".json", "")
        const raw = fs.readFileSync(path.join(base, file), "utf-8")
        const questions = JSON.parse(raw) as unknown[]
        acc[slug] = questions.length
        return acc
    }, {})
}

function groupBySection(subjects: Subject[]): Record<string, Subject[]> {
    return subjects.reduce<Record<string, Subject[]>>((acc, s) => {
        const key = s.section
        acc[key] = [...(acc[key] ?? []), s]
        return acc
    }, {})
}

export default function Mainsection() {
    const subjects = getSubjects()
    const counts = getQuestionCounts()
    const grouped = groupBySection(subjects)

    return (
        <section className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-12">
            {Object.entries(grouped).map(([section, items]) => (
                <div key={section}>
                    <h2 className="text-neutral-100 text-lg font-medium mb-1">
                        {SECTION_LABELS[section] ?? section}
                    </h2>
                    <p className="text-muted text-sm mb-6">
                        Klicka på ett delprov för att börja öva
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {items.map((subject) => (
                            <SubjectCard
                                key={subject.slug}
                                subject={subject}
                                questionCount={counts[subject.slug] ?? 0}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}
