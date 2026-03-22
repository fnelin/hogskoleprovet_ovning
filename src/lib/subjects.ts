import fs from "fs"
import path from "path"

export type Subject = {
  slug: string
  title: string
  badge: string
  icon: string
  color: string
  description: string
}

export function getSubjects(): Subject[] {
  const filePath = path.join(process.cwd(), "data", "subjects.json")
  const raw = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(raw) as Subject[]
}
