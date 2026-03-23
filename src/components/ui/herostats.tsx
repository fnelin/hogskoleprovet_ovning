import fs from "fs"
import path from "path"
import { getSubjects } from "@/lib/subjects"

function getTotalQuestions(): number {
  const base = path.join(process.cwd(), "data", "questions")
  if (!fs.existsSync(base)) return 0

  return fs.readdirSync(base).reduce((acc, file) => {
    if (!file.endsWith(".json")) return acc
    const raw = fs.readFileSync(path.join(base, file), "utf-8")
    const questions = JSON.parse(raw) as unknown[]
    return acc + questions.length
  }, 0)
}

export default function Herostats() {
  const subjects = getSubjects()
  const totalQuestions = getTotalQuestions()

  const verbalCount = subjects.filter((s) => s.section === "verbal").length
  const kvantitativCount = subjects.filter((s) => s.section === "kvantitativ").length

  const stats = [
    { label: "Övningsfrågor", value: totalQuestions },
    { label: "Delprov", value: subjects.length },
    { label: "Verbala delar", value: verbalCount },
    { label: "Kvantitativa delar", value: kvantitativCount },
  ]

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 max-w-xs">
      <p className="text-muted text-xs uppercase tracking-widest">Innehåll</p>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-2xl font-medium text-neutral-100">
              {stat.value}
            </span>
            <span className="text-xs text-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
