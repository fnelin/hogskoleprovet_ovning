import { notFound } from "next/navigation"
import { getSubjects } from "@/lib/subjects"
import { getQuestionsBySubject } from "@/lib/questions"
import QuizClient from "@/components/client/quizclient"
import FlashClient from "@/components/client/flashclient"

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-2">
                    <p className="text-muted text-xs uppercase tracking-widest">Quiz</p>
                    <QuizClient questions={questions} />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-muted text-xs uppercase tracking-widest">Flashkort</p>
                    <FlashClient questions={questions} />
                </div>
            </div>
        </section>
    )
}