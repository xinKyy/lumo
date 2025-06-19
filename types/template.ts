export interface Template {
  id: string
  name: string
  variables: string[]
  type: "AI Generated" | "Custom" | "Manual"
  content: string
  createdAt: string

  // Custom template fields
  audioFile?: string
  videoFile?: string

  // AI template fields
  tone?: string
  keywords?: string
}
