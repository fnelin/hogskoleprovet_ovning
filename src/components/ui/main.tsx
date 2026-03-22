import fs from "fs"
import path from "path"
import { getSubjects } from "@/lib/subjects"
import SubjectCard from "@/components/features/subjectcard"

type Question = {
    id: string
    subject: string
}

function getQuestionCounts(): Record<string, number> {
    const filePath = path.join(process.cwd(), "data", "questions.json")
    const raw = fs.readFileSync(filePath, "utf-8")
    const questions = JSON.parse(raw) as Question[]

    return questions.reduce<Record<string, number>>((acc, q) => {
        acc[q.subject] = (acc[q.subject] ?? 0) + 1
        return acc
    }, {})
}

export default function Mainsection() {
    const subjects = getSubjects()
    const counts = getQuestionCounts()

    return (
        <section className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-neutral-100 text-xl font-medium mb-2">
                Välj ämnesområde
            </h2>
            <p className="text-muted text-sm mb-8">
                Klicka på ett område för att börja öva
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {subjects.map((subject) => (
                    <SubjectCard
                        key={subject.slug}
                        subject={subject}
                        questionCount={counts[subject.slug] ?? 0}
                    />
                ))}
            </div>
        </section>
    )
}
