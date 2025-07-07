export interface Creator {
  id: string
  // Basic Info
  name: string
  ggtkId: string
  tiktokId: string
  numberId: string
  joinDate: string
  shorts?: string
  
  // Demographics
  gender?: string
  age?: number
  birthday?: string
  occupation?: string
  jobDescription?: string
  maritalStatus?: string
  
  // Personality
  type?: 'Idol' | 'Calm' | 'Friendly' | 'Talent' | 'Men'
  streamingEnvironment?: string
  communicationSkill?: '高' | '普通' | '低'
  innerQualities?: string
  cheerfulness?: string
  learningAbility?: string
  productionSkills?: string
  
  // Agency Info
  inPart: 'Partner' | 'Inhouse'
  group: string
  unit: string
  contactChannel?: string
  channelDetail?: string
  recruiter?: string
  managerId?: string
  
  // Dream Info
  dream?: string
  dreamDetail?: string
  
  // Status
  status: 'Active' | 'Inactive' | 'Trial' | 'Blacklist'
  
  // Notes
  notes?: string
  
  // Timestamps
  createdAt: string
  updatedAt: string
}

export interface CreatorPerformance {
  id: string
  creatorId: string
  totalRewards: number
  liveStreams: LiveStream[]
}

export interface LiveStream {
  id: string
  date: string
  duration: number // in minutes
  rewards: Reward[]
}

export interface Reward {
  id: string
  amount: number
  timestamp: string
  type: string
} 