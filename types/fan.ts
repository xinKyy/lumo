export interface FanTag {
  label: string
  color: string
}

export interface Fan {
  id: string
  nickname: string
  avatar: string
  platform: string
  handle: string
  priority: string
  gender?: string
  birthday?: string
  country?: string
  language?: string
  email?: string
  line?: string
  twitter?: string
  whatsapp?: string
  instagram?: string
  tags: FanTag[]
  notes?: string
  createdAt: string
  updatedAt: string
  lastInteractedAt: string
  lastInteractionChannel: string
  interactionCount7d: number
  lastCommentText?: string
  isDmSupported: boolean
  isFollowing: boolean
}
