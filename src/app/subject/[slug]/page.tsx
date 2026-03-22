import { notFound } from "next/navigation"
import { getSubjects } from "@/lib/subjects"
import { getQuestionsBySubject } from "@/lib/questions"
import QuizClient from "@/components/features/quizclient"

type Props = {
    params: Promise<{ slug: string }>
}

export default async function SubjectPage({ params }: Props) {
    const { slug } = await params

    const subjects = getSubjects()
    const subject = subjects.find((s) => s.slug === slug)

    if (!subject) notFound()

    const questions = getQuestionsBySubject(slug)

    return (
        <section className="max-w-2xl mx-auto px-4 py-12">
            <div className="mb-8">
                <span className="text-3xl">{subject.icon}</span>
                <h1 className="text-neutral-100 text-2xl font-medium mt-3 mb-1">
                    {subject.title}
                </h1>
                <p className="text-muted text-sm">{subject.description}</p>
            </div>

            <QuizClient questions={questions} />
        </section>
    )
}