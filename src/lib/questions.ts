import fs from "fs"
import path from "path"

export type Question = {
  id: string
  subject: string
  question: string
  options: string[]
  answer: string
  explanation: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function getQuestionsBySubject(slug: string): Question[] {
  const filePath = path.join(process.cwd(), "data", "questions.json")
  const raw = fs.readFileSync(filePath, "utf-8")
  const all = JSON.parse(raw) as Question[]
  const filtered = all.filter((q) => q.subject === slug)
  return shuffle(filtered)
}
