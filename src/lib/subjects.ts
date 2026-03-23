import subjectsData from "@/../data/subjects.json"
 
export type Subject = {
  slug: string
  title: string
  badge: string
  icon: string
  color: string
  description: string
  section: string
}
 
export function getSubjects(): Subject[] {
  return subjectsData as Subject[]
}