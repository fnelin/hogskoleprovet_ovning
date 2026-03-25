import fs from "fs"
import path from "path"

/*
Eftersom vi inte vet vilken ämneskategori av frågor vi ska läsa 
in måste vi bygga sökvägen dynamiskt då json filerna är namngivna 
efter kategori-slug
*/

export type Question = {
  id: string
  slug: string
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
  const filePath = path.join(process.cwd(), "data", "questions", `${slug}.json`)
  if (!fs.existsSync(filePath)) return []
  const raw = fs.readFileSync(filePath, "utf-8")
  return shuffle(JSON.parse(raw) as Question[])
}