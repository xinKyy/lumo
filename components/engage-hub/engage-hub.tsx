"use client"

import { useState, useMemo } from 'react'
import { Search, Filter, Calendar, MessageSquare, Heart, UserPlus, Mail, Send, Image as ImageIcon, Smile, PlusCircle, Instagram, Twitter, Youtube, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import FanDetailsDrawer from "./fan-details-drawer"
import CreateTaskDrawer from "./create-task-drawer"
import type { Fan } from "@/types/fan"
import type { Task } from "@/types/task"
import { SiTiktok } from "react-icons/si"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, Sparkles, MessageCircle, Mail as MailIcon, MessageSquare as DMIcon, ThumbsUp, Send as SendIcon, Layers } from "lucide-react"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

// 模拟数据
const mockEngagements = [
  {
    id: "1",
    fanName: "佐藤さくら",
    avatar: `https://i.pravatar.cc/100?u=sakura1`,
    platform: "Instagram",
    lastMessage: "素晴らしいコンテンツをありがとう！",
    type: "Comment",
    timestamp: "2024-03-20T10:30:00Z",
    unread: true,
    messages: [
      { id: "1", content: "フォローしました！", timestamp: "2024-03-20T10:00:00Z", isFromFan: true, platform: "Instagram", type: "Follow" },
      { id: "2", content: "あなたの投稿にいいね！", timestamp: "2024-03-20T10:01:00Z", isFromFan: true, platform: "Instagram", type: "Like" },
      { id: "3", content: "あなたの旅行Vlog最高です！", timestamp: "2024-03-20T10:02:00Z", isFromFan: true, platform: "Instagram", type: "Comment" },
      { id: "4", content: "ありがとうございます！楽しんでくれて嬉しい😊", timestamp: "2024-03-20T10:03:00Z", isFromFan: false, platform: "Instagram", type: "Comment" },
      { id: "5", content: "旅行のコツをDMで聞いてもいいですか？", timestamp: "2024-03-20T10:04:00Z", isFromFan: true, platform: "Instagram", type: "DM" },
      { id: "6", content: "もちろん！いつでもDMしてください。", timestamp: "2024-03-20T10:05:00Z", isFromFan: false, platform: "Instagram", type: "DM" },
      { id: "7", content: "お礼に投げ銭送りました！💰", timestamp: "2024-03-20T10:06:00Z", isFromFan: true, platform: "Instagram", type: "Reward" },
      { id: "8", content: "コラボのアイデアをメールでも送りました。", timestamp: "2024-03-20T10:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "メール受け取りました、すぐ返信します！", timestamp: "2024-03-20T10:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "1",
      nickname: "佐藤さくら",
      avatar: `https://i.pravatar.cc/100?u=sakura1`,
      platform: "Instagram",
      handle: "@sakura_jp",
      priority: "P1",
      gender: "Female",
      birthday: "1995-05-15",
      country: "日本",
      language: "Japanese",
      email: "sakura@example.com",
      line: "sakura_line",
      twitter: "@sakura_jp",
      whatsapp: "+819012345678",
      instagram: "@sakura_jp",
      tags: [{ label: "VIP", color: "#A5B4FC" }, { label: "アクティブ", color: "#FBCFE8" }],
      notes: "とてもアクティブなサポーター、毎回コメントしてくれる",
      createdAt: "2023-01-15T10:30:00Z",
      updatedAt: "2023-05-20T14:45:00Z",
      lastInteractedAt: "2023-05-18T09:15:00Z",
      lastInteractionChannel: "Instagram",
      interactionCount7d: 12,
      lastCommentText: "新しいコンテンツ大好き！これからも頑張って！",
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "2",
    fanName: "Mike Chen",
    avatar: `https://i.pravatar.cc/100?u=mike2`,
    platform: "X",
    lastMessage: "Just followed you!",
    type: "Follow",
    timestamp: "2024-03-20T09:15:00Z",
    unread: false,
    messages: [
      { id: "1", content: "Just followed you!", timestamp: "2024-03-20T09:00:00Z", isFromFan: true, platform: "X", type: "Follow" },
      { id: "2", content: "liked your tech review!", timestamp: "2024-03-20T09:01:00Z", isFromFan: true, platform: "X", type: "Like" },
      { id: "3", content: "Your review on the new phone was super helpful.", timestamp: "2024-03-20T09:02:00Z", isFromFan: true, platform: "X", type: "Comment" },
      { id: "4", content: "Thank you! Glad it helped you decide!", timestamp: "2024-03-20T09:03:00Z", isFromFan: false, platform: "X", type: "Comment" },
      { id: "5", content: "Can I DM you about some tech questions?", timestamp: "2024-03-20T09:04:00Z", isFromFan: true, platform: "X", type: "DM" },
      { id: "6", content: "Sure, my DMs are open!", timestamp: "2024-03-20T09:05:00Z", isFromFan: false, platform: "X", type: "DM" },
      { id: "7", content: "Just sent you a tip for your awesome content!", timestamp: "2024-03-20T09:06:00Z", isFromFan: true, platform: "X", type: "Reward" },
      { id: "8", content: "Sent you an email with a collaboration idea.", timestamp: "2024-03-20T09:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-20T09:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "2",
      nickname: "Mike Chen",
      avatar: `https://i.pravatar.cc/100?u=mike2`,
      platform: "X",
      handle: "@mikechen",
      priority: "P2",
      gender: "Male",
      birthday: "1990-08-20",
      country: "Canada",
      language: "English",
      email: "mike@example.com",
      twitter: "@mikechen",
      tags: [{ label: "New", color: "#FEF3C7" }],
      notes: "New follower, interested in tech content",
      createdAt: "2024-03-20T09:15:00Z",
      updatedAt: "2024-03-20T09:15:00Z",
      lastInteractedAt: "2024-03-20T09:15:00Z",
      lastInteractionChannel: "X",
      interactionCount7d: 1,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "3",
    fanName: "山田太郎",
    avatar: `https://i.pravatar.cc/100?u=emma3`,
    platform: "Line",
    lastMessage: "次の動画が楽しみです！",
    type: "DM",
    timestamp: "2024-03-19T15:45:00Z",
    unread: true,
    messages: [
      { id: "1", content: "LINEでフォローしました！", timestamp: "2024-03-18T16:00:00Z", isFromFan: true, platform: "Line", type: "Follow" },
      { id: "2", content: "最新の投稿にいいね！", timestamp: "2024-03-18T16:01:00Z", isFromFan: true, platform: "Line", type: "Like" },
      { id: "3", content: "いつも面白いアップデート！", timestamp: "2024-03-18T16:02:00Z", isFromFan: true, platform: "Line", type: "Comment" },
      { id: "4", content: "楽しんでくれて嬉しいです！", timestamp: "2024-03-18T16:03:00Z", isFromFan: false, platform: "Line", type: "Comment" },
      { id: "5", content: "もっと情報をDMで聞いてもいいですか？", timestamp: "2024-03-18T16:04:00Z", isFromFan: true, platform: "Line", type: "DM" },
      { id: "6", content: "もちろん、いつでもメッセージください。", timestamp: "2024-03-18T16:05:00Z", isFromFan: false, platform: "Line", type: "DM" },
      { id: "7", content: "素敵なコンテンツに投げ銭送りました！", timestamp: "2024-03-18T16:06:00Z", isFromFan: true, platform: "Line", type: "Reward" },
      { id: "8", content: "質問をメールで送りました。", timestamp: "2024-03-18T16:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "メール受け取りました、すぐ返信します！", timestamp: "2024-03-18T16:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "3",
      nickname: "山田太郎",
      avatar: `https://i.pravatar.cc/100?u=emma3`,
      platform: "Line",
      handle: "yamada_t",
      priority: "P1",
      gender: "Female",
      birthday: "1992-11-10",
      country: "Japan",
      language: "Japanese",
      line: "emma_w",
      tags: [{ label: "VIP", color: "#A5B4FC" }, { label: "Japanese", color: "#DCFCE7" }],
      notes: "日本のファン、とても応援してくれる",
      createdAt: "2023-06-15T08:30:00Z",
      updatedAt: "2024-03-19T15:45:00Z",
      lastInteractedAt: "2024-03-19T15:45:00Z",
      lastInteractionChannel: "Line",
      interactionCount7d: 5,
      lastCommentText: "次の動画が待ち遠しい！",
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "4",
    fanName: "Alex Rodriguez",
    avatar: `https://i.pravatar.cc/100?u=alex4`,
    platform: "Instagram",
    lastMessage: "This outfit is 🔥🔥🔥",
    type: "Comment",
    timestamp: "2024-03-20T08:30:00Z",
    unread: false,
    messages: [
      { id: "1", content: "Just followed you!", timestamp: "2024-03-20T08:00:00Z", isFromFan: true, platform: "Instagram", type: "Follow" },
      { id: "2", content: "liked your fashion post!", timestamp: "2024-03-20T08:01:00Z", isFromFan: true, platform: "Instagram", type: "Like" },
      { id: "3", content: "Where did you get that jacket?", timestamp: "2024-03-20T08:02:00Z", isFromFan: true, platform: "Instagram", type: "Comment" },
      { id: "4", content: "Thanks! I got it from Zara, will share the link in my story.", timestamp: "2024-03-20T08:03:00Z", isFromFan: false, platform: "Instagram", type: "Comment" },
      { id: "5", content: "Can I DM you for more fashion tips?", timestamp: "2024-03-20T08:04:00Z", isFromFan: true, platform: "Instagram", type: "DM" },
      { id: "6", content: "Sure! Happy to help.", timestamp: "2024-03-20T08:05:00Z", isFromFan: false, platform: "Instagram", type: "DM" },
      { id: "7", content: "Just sent you a reward for your awesome style!", timestamp: "2024-03-20T08:06:00Z", isFromFan: true, platform: "Instagram", type: "Reward" },
      { id: "8", content: "Sent you an email about a collab.", timestamp: "2024-03-20T08:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-20T08:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "4",
      nickname: "Alex Rodriguez",
      avatar: `https://i.pravatar.cc/100?u=alex4`,
      platform: "Instagram",
      handle: "@alexrod",
      priority: "P2",
      gender: "Male",
      birthday: "1993-04-12",
      country: "Spain",
      language: "Spanish",
      email: "alex@example.com",
      instagram: "@alexrod",
      tags: [{ label: "Fashion", color: "#FEF3C7" }],
      notes: "Fashion enthusiast",
      createdAt: "2023-08-10T12:00:00Z",
      updatedAt: "2024-03-20T08:30:00Z",
      lastInteractedAt: "2024-03-20T08:30:00Z",
      lastInteractionChannel: "Instagram",
      interactionCount7d: 3,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "5",
    fanName: "Lisa Park",
    avatar: `https://i.pravatar.cc/100?u=lisa5`,
    platform: "TikTok",
    lastMessage: "This dance is so fun!",
    type: "Comment",
    timestamp: "2024-03-20T07:15:00Z",
    unread: true,
    messages: [
      { id: "1", content: "Just followed you on TikTok!", timestamp: "2024-03-20T07:00:00Z", isFromFan: true, platform: "TikTok", type: "Follow" },
      { id: "2", content: "liked your dance video!", timestamp: "2024-03-20T07:01:00Z", isFromFan: true, platform: "TikTok", type: "Like" },
      { id: "3", content: "Your moves are amazing!", timestamp: "2024-03-20T07:02:00Z", isFromFan: true, platform: "TikTok", type: "Comment" },
      { id: "4", content: "Thank you! Glad you liked it!", timestamp: "2024-03-20T07:03:00Z", isFromFan: false, platform: "TikTok", type: "Comment" },
      { id: "5", content: "Can I DM you for dance tips?", timestamp: "2024-03-20T07:04:00Z", isFromFan: true, platform: "TikTok", type: "DM" },
      { id: "6", content: "Sure! Happy to share some tips.", timestamp: "2024-03-20T07:05:00Z", isFromFan: false, platform: "TikTok", type: "DM" },
      { id: "7", content: "Just sent you a reward for your great content!", timestamp: "2024-03-20T07:06:00Z", isFromFan: true, platform: "TikTok", type: "Reward" },
      { id: "8", content: "Sent you an email with a question.", timestamp: "2024-03-20T07:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-20T07:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "5",
      nickname: "Lisa Park",
      avatar: `https://i.pravatar.cc/100?u=lisa5`,
      platform: "TikTok",
      handle: "@lisapark",
      priority: "P1",
      gender: "Female",
      birthday: "1998-09-25",
      country: "South Korea",
      language: "Korean",
      email: "lisa@example.com",
      tiktok: "@lisapark",
      tags: [{ label: "Dance", color: "#FBCFE8" }, { label: "Active", color: "#DCFCE7" }],
      notes: "Dance enthusiast, very interactive",
      createdAt: "2023-10-05T14:20:00Z",
      updatedAt: "2024-03-20T07:15:00Z",
      lastInteractedAt: "2024-03-20T07:15:00Z",
      lastInteractionChannel: "TikTok",
      interactionCount7d: 8,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "6",
    fanName: "David Kim",
    avatar: `https://i.pravatar.cc/100?u=david6`,
    platform: "YouTube",
    lastMessage: "Great video! Very informative",
    type: "Comment",
    timestamp: "2024-03-19T20:30:00Z",
    unread: false,
    messages: [
      { id: "1", content: "Just subscribed to your channel!", timestamp: "2024-03-19T20:00:00Z", isFromFan: true, platform: "YouTube", type: "Follow" },
      { id: "2", content: "liked your latest tech review!", timestamp: "2024-03-19T20:01:00Z", isFromFan: true, platform: "YouTube", type: "Like" },
      { id: "3", content: "Your explanation of the new laptop was super clear.", timestamp: "2024-03-19T20:02:00Z", isFromFan: true, platform: "YouTube", type: "Comment" },
      { id: "4", content: "Thank you! Glad you found it helpful.", timestamp: "2024-03-19T20:03:00Z", isFromFan: false, platform: "YouTube", type: "Comment" },
      { id: "5", content: "Can I DM you for some advice on buying a laptop?", timestamp: "2024-03-19T20:04:00Z", isFromFan: true, platform: "YouTube", type: "DM" },
      { id: "6", content: "Sure, feel free to DM me anytime.", timestamp: "2024-03-19T20:05:00Z", isFromFan: false, platform: "YouTube", type: "DM" },
      { id: "7", content: "Just sent you a reward for your great content!", timestamp: "2024-03-19T20:06:00Z", isFromFan: true, platform: "YouTube", type: "Reward" },
      { id: "8", content: "Sent you an email with a business proposal.", timestamp: "2024-03-19T20:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-19T20:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "6",
      nickname: "David Kim",
      avatar: `https://i.pravatar.cc/100?u=david6`,
      platform: "YouTube",
      handle: "@davidkim",
      priority: "P2",
      gender: "Male",
      birthday: "1989-12-08",
      country: "United States",
      language: "English",
      email: "david@example.com",
      youtube: "@davidkim",
      tags: [{ label: "Educational", color: "#FEF3C7" }],
      notes: "Interested in educational content",
      createdAt: "2023-07-20T16:45:00Z",
      updatedAt: "2024-03-19T20:30:00Z",
      lastInteractedAt: "2024-03-19T20:30:00Z",
      lastInteractionChannel: "YouTube",
      interactionCount7d: 4,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "7",
    fanName: "Maria Garcia",
    avatar: `https://i.pravatar.cc/100?u=maria7`,
    platform: "WhatsApp",
    lastMessage: "Hi! I love your content",
    type: "DM",
    timestamp: "2024-03-19T18:20:00Z",
    unread: true,
    messages: [
      { id: "1", content: "Just followed you on WhatsApp!", timestamp: "2024-03-19T18:00:00Z", isFromFan: true, platform: "WhatsApp", type: "Follow" },
      { id: "2", content: "liked your status update!", timestamp: "2024-03-19T18:01:00Z", isFromFan: true, platform: "WhatsApp", type: "Like" },
      { id: "3", content: "Your travel photos are beautiful!", timestamp: "2024-03-19T18:02:00Z", isFromFan: true, platform: "WhatsApp", type: "Comment" },
      { id: "4", content: "Thank you! Glad you liked them!", timestamp: "2024-03-19T18:03:00Z", isFromFan: false, platform: "WhatsApp", type: "Comment" },
      { id: "5", content: "Can I DM you for some travel tips?", timestamp: "2024-03-19T18:04:00Z", isFromFan: true, platform: "WhatsApp", type: "DM" },
      { id: "6", content: "Of course! Feel free to message me anytime.", timestamp: "2024-03-19T18:05:00Z", isFromFan: false, platform: "WhatsApp", type: "DM" },
      { id: "7", content: "Just sent you a reward for your amazing content!", timestamp: "2024-03-19T18:06:00Z", isFromFan: true, platform: "WhatsApp", type: "Reward" },
      { id: "8", content: "Sent you an email with a question.", timestamp: "2024-03-19T18:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-19T18:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "7",
      nickname: "Maria Garcia",
      avatar: `https://i.pravatar.cc/100?u=maria7`,
      platform: "WhatsApp",
      handle: "maria_g",
      priority: "P1",
      gender: "Female",
      birthday: "1994-03-18",
      country: "Mexico",
      language: "Spanish",
      email: "maria@example.com",
      whatsapp: "+525512345678",
      tags: [{ label: "VIP", color: "#A5B4FC" }, { label: "Long-term", color: "#FEF3C7" }],
      notes: "Long-term supporter, very loyal",
      createdAt: "2023-01-10T11:15:00Z",
      updatedAt: "2024-03-19T18:20:00Z",
      lastInteractedAt: "2024-03-19T18:20:00Z",
      lastInteractionChannel: "WhatsApp",
      interactionCount7d: 6,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "8",
    fanName: "James Wilson",
    avatar: `https://i.pravatar.cc/100?u=james8`,
    platform: "Email",
    lastMessage: "Business collaboration inquiry",
    type: "Email",
    timestamp: "2024-03-19T16:45:00Z",
    unread: false,
    messages: [
      { id: "1", content: "Just followed you on Instagram!", timestamp: "2024-03-19T16:00:00Z", isFromFan: true, platform: "Instagram", type: "Follow" },
      { id: "2", content: "liked your business post!", timestamp: "2024-03-19T16:01:00Z", isFromFan: true, platform: "Instagram", type: "Like" },
      { id: "3", content: "Your business tips are very helpful.", timestamp: "2024-03-19T16:02:00Z", isFromFan: true, platform: "Instagram", type: "Comment" },
      { id: "4", content: "Thank you! Glad you found them useful.", timestamp: "2024-03-19T16:03:00Z", isFromFan: false, platform: "Instagram", type: "Comment" },
      { id: "5", content: "Can I DM you for more advice?", timestamp: "2024-03-19T16:04:00Z", isFromFan: true, platform: "Instagram", type: "DM" },
      { id: "6", content: "Sure, happy to help!", timestamp: "2024-03-19T16:05:00Z", isFromFan: false, platform: "Instagram", type: "DM" },
      { id: "7", content: "Just sent you a reward for your great content!", timestamp: "2024-03-19T16:06:00Z", isFromFan: true, platform: "Instagram", type: "Reward" },
      { id: "8", content: "Sent you an email with a business proposal.", timestamp: "2024-03-19T16:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-19T16:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "8",
      nickname: "James Wilson",
      avatar: `https://i.pravatar.cc/100?u=james8`,
      platform: "Email",
      handle: "james.wilson",
      priority: "P0",
      gender: "Male",
      birthday: "1985-06-22",
      country: "United States",
      language: "English",
      email: "james@startup.com",
      tags: [{ label: "Business", color: "#FFD700" }, { label: "High Priority", color: "#FF6B6B" }],
      notes: "Business contact, potential collaboration",
      createdAt: "2024-03-19T16:45:00Z",
      updatedAt: "2024-03-19T16:45:00Z",
      lastInteractedAt: "2024-03-19T16:45:00Z",
      lastInteractionChannel: "Email",
      interactionCount7d: 1,
      isDmSupported: false,
      isFollowing: false
    } as Fan
  },
  {
    id: "9",
    fanName: "Sophie Chen",
    avatar: `https://i.pravatar.cc/100?u=sophie9`,
    platform: "Instagram",
    lastMessage: "Your makeup looks perfect!",
    type: "Comment",
    timestamp: "2024-03-19T14:20:00Z",
    unread: false,
    messages: [
      { id: "1", content: "Just followed you!", timestamp: "2024-03-19T14:00:00Z", isFromFan: true, platform: "Instagram", type: "Follow" },
      { id: "2", content: "liked your makeup tutorial!", timestamp: "2024-03-19T14:01:00Z", isFromFan: true, platform: "Instagram", type: "Like" },
      { id: "3", content: "Your makeup skills are amazing!", timestamp: "2024-03-19T14:02:00Z", isFromFan: true, platform: "Instagram", type: "Comment" },
      { id: "4", content: "Thank you! Glad you liked the tutorial!", timestamp: "2024-03-19T14:03:00Z", isFromFan: false, platform: "Instagram", type: "Comment" },
      { id: "5", content: "Can I DM you for product recommendations?", timestamp: "2024-03-19T14:04:00Z", isFromFan: true, platform: "Instagram", type: "DM" },
      { id: "6", content: "Of course! Happy to help.", timestamp: "2024-03-19T14:05:00Z", isFromFan: false, platform: "Instagram", type: "DM" },
      { id: "7", content: "Just sent you a reward for your awesome content!", timestamp: "2024-03-19T14:06:00Z", isFromFan: true, platform: "Instagram", type: "Reward" },
      { id: "8", content: "Sent you an email with a collaboration idea.", timestamp: "2024-03-19T14:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-19T14:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "9",
      nickname: "Sophie Chen",
      avatar: `https://i.pravatar.cc/100?u=sophie9`,
      platform: "Instagram",
      handle: "@sophiechen",
      priority: "P2",
      gender: "Female",
      birthday: "1996-11-30",
      country: "Canada",
      language: "English",
      email: "sophie@example.com",
      instagram: "@sophiechen",
      tags: [{ label: "Beauty", color: "#FBCFE8" }],
      notes: "Beauty enthusiast",
      createdAt: "2023-09-15T13:40:00Z",
      updatedAt: "2024-03-19T14:20:00Z",
      lastInteractedAt: "2024-03-19T14:20:00Z",
      lastInteractionChannel: "Instagram",
      interactionCount7d: 2,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "10",
    fanName: "Tom Anderson",
    avatar: `https://i.pravatar.cc/100?u=tom10`,
    platform: "X",
    lastMessage: "This is hilarious! 😂",
    type: "Comment",
    timestamp: "2024-03-19T12:10:00Z",
    unread: false,
    messages: [
      { id: "1", content: "Just followed you!", timestamp: "2024-03-19T12:00:00Z", isFromFan: true, platform: "X", type: "Follow" },
      { id: "2", content: "liked your funny tweet!", timestamp: "2024-03-19T12:01:00Z", isFromFan: true, platform: "X", type: "Like" },
      { id: "3", content: "Your jokes always make my day!", timestamp: "2024-03-19T12:02:00Z", isFromFan: true, platform: "X", type: "Comment" },
      { id: "4", content: "Thank you! Glad you enjoy my humor!", timestamp: "2024-03-19T12:03:00Z", isFromFan: false, platform: "X", type: "Comment" },
      { id: "5", content: "Can I DM you for some comedy tips?", timestamp: "2024-03-19T12:04:00Z", isFromFan: true, platform: "X", type: "DM" },
      { id: "6", content: "Sure! Happy to share some tips.", timestamp: "2024-03-19T12:05:00Z", isFromFan: false, platform: "X", type: "DM" },
      { id: "7", content: "Just sent you a reward for your great content!", timestamp: "2024-03-19T12:06:00Z", isFromFan: true, platform: "X", type: "Reward" },
      { id: "8", content: "Sent you an email with a question.", timestamp: "2024-03-19T12:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-19T12:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "10",
      nickname: "Tom Anderson",
      avatar: `https://i.pravatar.cc/100?u=tom10`,
      platform: "X",
      handle: "@tomanderson",
      priority: "P3",
      gender: "Male",
      birthday: "1991-07-14",
      country: "Australia",
      language: "English",
      email: "tom@example.com",
      twitter: "@tomanderson",
      tags: [{ label: "Comedy", color: "#FEF3C7" }],
      notes: "Enjoys comedy content",
      createdAt: "2023-12-05T10:30:00Z",
      updatedAt: "2024-03-19T12:10:00Z",
      lastInteractedAt: "2024-03-19T12:10:00Z",
      lastInteractionChannel: "X",
      interactionCount7d: 3,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "11",
    fanName: "Yuki Tanaka",
    avatar: `https://i.pravatar.cc/100?u=yuki11`,
    platform: "Line",
    lastMessage: "今日の動画、とても良かったです！",
    type: "Comment",
    timestamp: "2024-03-19T10:02:00Z",
    unread: true,
    messages: [
      { id: "1", content: "Just followed you on Line!", timestamp: "2024-03-19T10:00:00Z", isFromFan: true, platform: "Line", type: "Follow" },
      { id: "2", content: "liked your latest post!", timestamp: "2024-03-19T10:01:00Z", isFromFan: true, platform: "Line", type: "Like" },
      { id: "3", content: "今日の動画、とても良かったです！", timestamp: "2024-03-19T10:02:00Z", isFromFan: true, platform: "Line", type: "Comment" },
      { id: "4", content: "ありがとうございます！励みになります。", timestamp: "2024-03-19T10:03:00Z", isFromFan: false, platform: "Line", type: "Comment" },
      { id: "5", content: "Can I DM you for more tips?", timestamp: "2024-03-19T10:04:00Z", isFromFan: true, platform: "Line", type: "DM" },
      { id: "6", content: "Of course! Feel free to message me anytime.", timestamp: "2024-03-19T10:05:00Z", isFromFan: false, platform: "Line", type: "DM" },
      { id: "7", content: "Just sent you a reward for your great content!", timestamp: "2024-03-19T10:06:00Z", isFromFan: true, platform: "Line", type: "Reward" },
      { id: "8", content: "Sent you an email with a question.", timestamp: "2024-03-19T10:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-19T10:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "11",
      nickname: "Yuki Tanaka",
      avatar: `https://i.pravatar.cc/100?u=yuki11`,
      platform: "Line",
      handle: "yuki_tanaka",
      priority: "P1",
      gender: "Female",
      birthday: "1997-02-28",
      country: "Japan",
      language: "Japanese",
      line: "yuki_tanaka",
      tags: [{ label: "Japanese", color: "#DCFCE7" }, { label: "Supportive", color: "#FBCFE8" }],
      notes: "Japanese fan, very supportive and polite",
      createdAt: "2023-05-20T09:15:00Z",
      updatedAt: "2024-03-19T10:30:00Z",
      lastInteractedAt: "2024-03-19T10:30:00Z",
      lastInteractionChannel: "Line",
      interactionCount7d: 7,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "12",
    fanName: "Carlos Mendez",
    avatar: `https://i.pravatar.cc/100?u=carlos12`,
    platform: "Instagram",
    lastMessage: "Amazing photography skills!",
    type: "Comment",
    timestamp: "2024-03-19T08:45:00Z",
    unread: false,
    messages: [
      { id: "1", content: "Just followed you!", timestamp: "2024-03-19T08:00:00Z", isFromFan: true, platform: "Instagram", type: "Follow" },
      { id: "2", content: "liked your photo!", timestamp: "2024-03-19T08:01:00Z", isFromFan: true, platform: "Instagram", type: "Like" },
      { id: "3", content: "Your photography skills are amazing!", timestamp: "2024-03-19T08:02:00Z", isFromFan: true, platform: "Instagram", type: "Comment" },
      { id: "4", content: "Thank you! Glad you like my photos!", timestamp: "2024-03-19T08:03:00Z", isFromFan: false, platform: "Instagram", type: "Comment" },
      { id: "5", content: "Can I DM you for camera tips?", timestamp: "2024-03-19T08:04:00Z", isFromFan: true, platform: "Instagram", type: "DM" },
      { id: "6", content: "Of course! Happy to help.", timestamp: "2024-03-19T08:05:00Z", isFromFan: false, platform: "Instagram", type: "DM" },
      { id: "7", content: "Just sent you a reward for your great content!", timestamp: "2024-03-19T08:06:00Z", isFromFan: true, platform: "Instagram", type: "Reward" },
      { id: "8", content: "Sent you an email with a question.", timestamp: "2024-03-19T08:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-19T08:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "12",
      nickname: "Carlos Mendez",
      avatar: `https://i.pravatar.cc/100?u=carlos12`,
      platform: "Instagram",
      handle: "@carlosmendez",
      priority: "P2",
      gender: "Male",
      birthday: "1992-10-05",
      country: "Brazil",
      language: "Portuguese",
      email: "carlos@example.com",
      instagram: "@carlosmendez",
      tags: [{ label: "Photography", color: "#FEF3C7" }],
      notes: "Photography enthusiast",
      createdAt: "2023-11-12T15:20:00Z",
      updatedAt: "2024-03-19T08:45:00Z",
      lastInteractedAt: "2024-03-19T08:45:00Z",
      lastInteractionChannel: "Instagram",
      interactionCount7d: 4,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "13",
    fanName: "Anna Kowalski",
    avatar: `https://i.pravatar.cc/100?u=anna13`,
    platform: "TikTok",
    lastMessage: "This recipe looks delicious!",
    type: "Comment",
    timestamp: "2024-03-18T22:15:00Z",
    unread: false,
    messages: [
      { id: "1", content: "Just followed you on TikTok!", timestamp: "2024-03-18T22:00:00Z", isFromFan: true, platform: "TikTok", type: "Follow" },
      { id: "2", content: "liked your recipe video!", timestamp: "2024-03-18T22:01:00Z", isFromFan: true, platform: "TikTok", type: "Like" },
      { id: "3", content: "Your cooking tips are so helpful!", timestamp: "2024-03-18T22:02:00Z", isFromFan: true, platform: "TikTok", type: "Comment" },
      { id: "4", content: "Thank you! Glad you enjoyed the recipe!", timestamp: "2024-03-18T22:03:00Z", isFromFan: false, platform: "TikTok", type: "Comment" },
      { id: "5", content: "Can I DM you for more recipes?", timestamp: "2024-03-18T22:04:00Z", isFromFan: true, platform: "TikTok", type: "DM" },
      { id: "6", content: "Of course! Feel free to message me anytime.", timestamp: "2024-03-18T22:05:00Z", isFromFan: false, platform: "TikTok", type: "DM" },
      { id: "7", content: "Just sent you a reward for your great content!", timestamp: "2024-03-18T22:06:00Z", isFromFan: true, platform: "TikTok", type: "Reward" },
      { id: "8", content: "Sent you an email with a question.", timestamp: "2024-03-18T22:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-18T22:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "13",
      nickname: "Anna Kowalski",
      avatar: `https://i.pravatar.cc/100?u=anna13`,
      platform: "TikTok",
      handle: "@annakowalski",
      priority: "P2",
      gender: "Female",
      birthday: "1995-01-20",
      country: "Poland",
      language: "Polish",
      email: "anna@example.com",
      tiktok: "@annakowalski",
      tags: [{ label: "Cooking", color: "#FBCFE8" }],
      notes: "Cooking enthusiast",
      createdAt: "2023-08-25T19:30:00Z",
      updatedAt: "2024-03-18T22:15:00Z",
      lastInteractedAt: "2024-03-18T22:15:00Z",
      lastInteractionChannel: "TikTok",
      interactionCount7d: 5,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "14",
    fanName: "Ryan Thompson",
    avatar: `https://i.pravatar.cc/100?u=ryan14`,
    platform: "YouTube",
    lastMessage: "Subscribed! Love your gaming content",
    type: "Follow",
    timestamp: "2024-03-18T20:30:00Z",
    unread: false,
    messages: [
      { id: "1", content: "Just subscribed to your channel!", timestamp: "2024-03-18T20:00:00Z", isFromFan: true, platform: "YouTube", type: "Follow" },
      { id: "2", content: "liked your gaming video!", timestamp: "2024-03-18T20:01:00Z", isFromFan: true, platform: "YouTube", type: "Like" },
      { id: "3", content: "Your gameplay is awesome!", timestamp: "2024-03-18T20:02:00Z", isFromFan: true, platform: "YouTube", type: "Comment" },
      { id: "4", content: "Thank you! Glad you enjoyed it!", timestamp: "2024-03-18T20:03:00Z", isFromFan: false, platform: "YouTube", type: "Comment" },
      { id: "5", content: "Can I DM you for some gaming tips?", timestamp: "2024-03-18T20:04:00Z", isFromFan: true, platform: "YouTube", type: "DM" },
      { id: "6", content: "Sure! Happy to help.", timestamp: "2024-03-18T20:05:00Z", isFromFan: false, platform: "YouTube", type: "DM" },
      { id: "7", content: "Just sent you a reward for your great content!", timestamp: "2024-03-18T20:06:00Z", isFromFan: true, platform: "YouTube", type: "Reward" },
      { id: "8", content: "Sent you an email with a question.", timestamp: "2024-03-18T20:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-18T20:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "14",
      nickname: "Ryan Thompson",
      avatar: `https://i.pravatar.cc/100?u=ryan14`,
      platform: "YouTube",
      handle: "@ryanthompson",
      priority: "P2",
      gender: "Male",
      birthday: "1994-06-15",
      country: "United States",
      language: "English",
      email: "ryan@example.com",
      youtube: "@ryanthompson",
      tags: [{ label: "Gaming", color: "#FEF3C7" }, { label: "New", color: "#DCFCE7" }],
      notes: "New subscriber, gaming enthusiast",
      createdAt: "2024-03-18T20:30:00Z",
      updatedAt: "2024-03-18T20:30:00Z",
      lastInteractedAt: "2024-03-18T20:30:00Z",
      lastInteractionChannel: "YouTube",
      interactionCount7d: 1,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "15",
    fanName: "Isabella Silva",
    avatar: `https://i.pravatar.cc/100?u=isabella15`,
    platform: "WhatsApp",
    lastMessage: "Thank you for the shoutout!",
    type: "DM",
    timestamp: "2024-03-18T18:00:00Z",
    unread: false,
    messages: [
      { id: "1", content: "Just followed you on WhatsApp!", timestamp: "2024-03-18T18:00:00Z", isFromFan: true, platform: "WhatsApp", type: "DM" },
      { id: "2", content: "You're welcome! Your content is amazing", timestamp: "2024-03-18T18:05:00Z", isFromFan: false, platform: "WhatsApp", type: "DM" },
      { id: "3", content: "I gained so many new followers!", timestamp: "2024-03-18T18:10:00Z", isFromFan: true, platform: "WhatsApp", type: "DM" },
      { id: "4", content: "That's fantastic! You deserve it", timestamp: "2024-03-18T18:15:00Z", isFromFan: false, platform: "WhatsApp", type: "DM" },
      { id: "5", content: "We should collaborate sometime", timestamp: "2024-03-18T18:20:00Z", isFromFan: true, platform: "WhatsApp", type: "DM" },
      { id: "6", content: "I'd love that! Let's plan something", timestamp: "2024-03-18T18:25:00Z", isFromFan: false, platform: "WhatsApp", type: "DM" },
      { id: "7", content: "Perfect! I'll send you some ideas", timestamp: "2024-03-18T18:30:00Z", isFromFan: true, platform: "WhatsApp", type: "DM" }
    ],
    fan: {
      id: "15",
      nickname: "Isabella Silva",
      avatar: `https://i.pravatar.cc/100?u=isabella15`,
      platform: "WhatsApp",
      handle: "isabella_silva",
      priority: "P1",
      gender: "Female",
      birthday: "1993-08-12",
      country: "Brazil",
      language: "Portuguese",
      email: "isabella@example.com",
      whatsapp: "+5511987654321",
      tags: [{ label: "Creator", color: "#FFD700" }, { label: "Collaboration", color: "#A5B4FC" }],
      notes: "Fellow content creator, potential collaboration partner",
      createdAt: "2023-04-10T14:20:00Z",
      updatedAt: "2024-03-18T18:00:00Z",
      lastInteractedAt: "2024-03-18T18:00:00Z",
      lastInteractionChannel: "WhatsApp",
      interactionCount7d: 8,
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "16",
    fanName: "LilyStar",
    avatar: `https://i.pravatar.cc/100?u=lilystar16`,
    platform: "OnlyFans",
    lastMessage: "Your exclusive content is amazing!",
    type: "Comment",
    timestamp: "2024-03-18T17:02:00Z",
    unread: true,
    messages: [
      { id: "1", content: "Just followed you on OnlyFans!", timestamp: "2024-03-18T17:00:00Z", isFromFan: true, platform: "OnlyFans", type: "Follow" },
      { id: "2", content: "liked your latest post!", timestamp: "2024-03-18T17:01:00Z", isFromFan: true, platform: "OnlyFans", type: "Like" },
      { id: "3", content: "Your exclusive content is amazing!", timestamp: "2024-03-18T17:02:00Z", isFromFan: true, platform: "OnlyFans", type: "Comment" },
      { id: "4", content: "Thank you! Glad you enjoy it!", timestamp: "2024-03-18T17:03:00Z", isFromFan: false, platform: "OnlyFans", type: "Comment" },
      { id: "5", content: "Can I DM you for a special request?", timestamp: "2024-03-18T17:04:00Z", isFromFan: true, platform: "OnlyFans", type: "DM" },
      { id: "6", content: "Sure! Happy to chat.", timestamp: "2024-03-18T17:05:00Z", isFromFan: false, platform: "OnlyFans", type: "DM" },
      { id: "7", content: "Just sent you a reward for your great work!", timestamp: "2024-03-18T17:06:00Z", isFromFan: true, platform: "OnlyFans", type: "Reward" },
      { id: "8", content: "Sent you an email with a suggestion.", timestamp: "2024-03-18T17:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-18T17:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "16",
      nickname: "LilyStar",
      avatar: `https://i.pravatar.cc/100?u=lilystar16`,
      platform: "OnlyFans",
      handle: "@lilystar",
      priority: "P1",
      gender: "Female",
      birthday: "1997-03-21",
      country: "UK",
      language: "English",
      email: "lily@example.com",
      instagram: "@lilystar",
      tags: [{ label: "VIP", color: "#A5B4FC" }, { label: "Supporter", color: "#FBCFE8" }],
      notes: "Top OnlyFans supporter.",
      createdAt: "2023-03-01T10:00:00Z",
      updatedAt: "2023-05-10T10:00:00Z",
      lastInteractedAt: "2023-05-10T10:00:00Z",
      lastInteractionChannel: "OnlyFans",
      interactionCount7d: 8,
      lastCommentText: "Love your work!",
      isDmSupported: true,
      isFollowing: true
    } as Fan
  },
  {
    id: "17",
    fanName: "ChrisGreen",
    avatar: `https://i.pravatar.cc/100?u=chrisgreen17`,
    platform: "Line",
    lastMessage: "Your updates are always interesting!",
    type: "Comment",
    timestamp: "2024-03-18T16:02:00Z",
    unread: false,
    messages: [
      { id: "1", content: "Just followed you on Line!", timestamp: "2024-03-18T16:00:00Z", isFromFan: true, platform: "Line", type: "Follow" },
      { id: "2", content: "liked your latest post!", timestamp: "2024-03-18T16:01:00Z", isFromFan: true, platform: "Line", type: "Like" },
      { id: "3", content: "Your updates are always interesting!", timestamp: "2024-03-18T16:02:00Z", isFromFan: true, platform: "Line", type: "Comment" },
      { id: "4", content: "Thank you! Glad you enjoy my updates!", timestamp: "2024-03-18T16:03:00Z", isFromFan: false, platform: "Line", type: "Comment" },
      { id: "5", content: "Can I DM you for more info?", timestamp: "2024-03-18T16:04:00Z", isFromFan: true, platform: "Line", type: "DM" },
      { id: "6", content: "Of course! Feel free to message me anytime.", timestamp: "2024-03-18T16:05:00Z", isFromFan: false, platform: "Line", type: "DM" },
      { id: "7", content: "Just sent you a reward for your great content!", timestamp: "2024-03-18T16:06:00Z", isFromFan: true, platform: "Line", type: "Reward" },
      { id: "8", content: "Sent you an email with a question.", timestamp: "2024-03-18T16:07:00Z", isFromFan: true, platform: "Email", type: "Email" },
      { id: "9", content: "Received your email, will reply soon!", timestamp: "2024-03-18T16:08:00Z", isFromFan: false, platform: "Email", type: "Email" }
    ],
    fan: {
      id: "17",
      nickname: "ChrisGreen",
      avatar: `https://i.pravatar.cc/100?u=chrisgreen17`,
      platform: "Line",
      handle: "@chrisgreen",
      priority: "P4",
      gender: "Male",
      birthday: "1988-09-09",
      country: "Japan",
      language: "Japanese",
      line: "chris_line",
      tags: [{ label: "Occasional", color: "#FFE1E1" }],
      notes: "Rarely interacts.",
      createdAt: "2023-01-01T07:00:00Z",
      updatedAt: "2023-05-13T07:00:00Z",
      lastInteractedAt: "2023-05-13T07:00:00Z",
      lastInteractionChannel: "Line",
      interactionCount7d: 1,
      lastCommentText: "Nice update!",
      isDmSupported: true,
      isFollowing: true
    } as Fan
  }
]

// 快捷回复模板
const quickReplies = [
  "Thank you for your support!",
  "I appreciate your kind words!",
  "Stay tuned for more content!",
  "Let me know if you have any questions!",
  "I'm glad you enjoyed it!"
]

// smart-content页面的内容模板mock数据
const sampleTemplates = [
  {
    id: "1",
    name: "Birthday Wishes",
    variables: ["fan_name", "creator_name", "special_date"],
    type: "Custom",
    content:
      "Happy birthday, {{fan_name}}! Thank you for your continued support. Wishing you all the best on your special day! - {{creator_name}}",
    createdAt: "2023-04-15T10:30:00Z",
    audioFile: "",
    videoFile: "",
  },
  {
    id: "2",
    name: "New Content Notification",
    variables: ["fan_name", "content_title", "content_link"],
    type: "AI Generated",
    tone: "Exciting",
    content:
      "Hey {{fan_name}}! I just released a new video '{{content_title}}'. Check it out here: {{content_link}} and let me know what you think!",
    createdAt: "2023-05-10T14:45:00Z",
    keywords: "new content, video release, exclusive",
  },
  {
    id: "3",
    name: "Thank You for Donation",
    variables: ["fan_name", "donation_amount", "creator_name"],
    type: "Custom",
    content:
      "Thank you so much, {{fan_name}}, for your generous donation of {{donation_amount}}! Your support means the world to me and helps me continue creating content you love. - {{creator_name}}",
    createdAt: "2023-03-22T09:15:00Z",
    audioFile: "/thank-you-message.mp3",
    videoFile: "",
  },
  // ...可继续补充其它模板 ...
]

export default function EngageHub() {
  const { t, i18n } = useTranslation()
  const [selectedEngagement, setSelectedEngagement] = useState<string | null>(null)
  const [timeFilter, setTimeFilter] = useState("today")
  const [typeFilter, setTypeFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [message, setMessage] = useState("")
  const [showFanDetails, setShowFanDetails] = useState(false)
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [showInteractionLog, setShowInteractionLog] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<string>("")
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [templateSearch, setTemplateSearch] = useState("")
  const [templatePage, setTemplatePage] = useState(1)
  const templatesPerPage = 8

  const selectedEngagementData = mockEngagements.find(e => e.id === selectedEngagement)

  const getEngagementIcon = (type: string) => {
    switch (type) {
      case "Follow":
        return <UserPlus className="h-4 w-4" />
      case "Like":
        return <Heart className="h-4 w-4" />
      case "Comment":
        return <MessageSquare className="h-4 w-4" />
      case "DM":
        return <MessageSquare className="h-4 w-4" />
      case "Email":
        return <Mail className="h-4 w-4" />
      default:
        return null
    }
  }

  const getEngagementColor = (type: string) => {
    switch (type) {
      case "Follow":
        return "bg-blue-100 text-blue-700"
      case "Like":
        return "bg-pink-100 text-pink-700"
      case "Comment":
        return "bg-green-100 text-green-700"
      case "DM":
        return "bg-purple-100 text-purple-700"
      case "Email":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />
      case "X":
        return <Twitter className="h-4 w-4 text-black" />
      case "Line":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "WhatsApp":
        return <Mail className="h-4 w-4 text-green-600" />
      case "TikTok":
        return <SiTiktok className="h-4 w-4 text-black" />
      case "YouTube":
        return <Youtube className="h-4 w-4 text-red-500" />
      case "Email":
        return <Mail className="h-4 w-4 text-orange-500" />
      default:
        return <User className="h-4 w-4 text-gray-400" />
    }
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    // 这里添加发送消息的逻辑
    setMessage("")
  }

  const handleCreateTask = (task: Task) => {
    // 这里添加创建任务的逻辑
    setShowCreateTask(false)
  }

  // 搜索和分页逻辑
  const filteredTemplates = useMemo(() => {
    return sampleTemplates.filter(
      tpl => tpl.name.toLowerCase().includes(templateSearch.toLowerCase()) || tpl.content.toLowerCase().includes(templateSearch.toLowerCase())
    )
  }, [templateSearch])
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage)
  const pagedTemplates = filteredTemplates.slice((templatePage - 1) * templatesPerPage, templatePage * templatesPerPage)

  // 互动类型多语言映射
  const engagementTypeMap = {
    en: { Comment: "Comment", Like: "Like", Follow: "Follow", DM: "DM", Reward: "Reward", Email: "Email" },
    ja: { Comment: "コメント", Like: "いいね", Follow: "フォロー", DM: "DM", Reward: "投げ銭", Email: "メール" },
    zh: { Comment: "评论", Like: "点赞", Follow: "关注", DM: "私信", Reward: "打赏", Email: "邮件" }
  }

  return (
    <div className="flex h-full w-full">
      {/* 左侧互动列表 */}
      <div className="w-80 border-l border-r bg-white flex flex-col">
        {/* 固定的顶部区域 */}
        <div className="p-4 border-b space-y-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t('engagements')}</h2>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={t('searchEngagements')}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[130px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder={t('time')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">{t('today')}</SelectItem>
                  <SelectItem value="7days">{t('last7days')}</SelectItem>
                  <SelectItem value="30days">{t('last30days')}</SelectItem>
                  <SelectItem value="custom">{t('custom')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder={t('type')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allTypes')}</SelectItem>
                  <SelectItem value="Follow">{t('follow')}</SelectItem>
                  <SelectItem value="Like">{t('like')}</SelectItem>
                  <SelectItem value="Comment">{t('comment')}</SelectItem>
                  <SelectItem value="DM">{t('dm')}</SelectItem>
                  <SelectItem value="Email">{t('email')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 可滚动的列表区域 */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="px-2 py-1 divide-y divide-gray-200">
              {mockEngagements.map((engagement, idx) => (
                <div
                  key={engagement.id}
                  className={`cursor-pointer px-2 py-2 transition-colors hover:bg-gray-50 ${
                    selectedEngagement === engagement.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedEngagement(engagement.id)}
                >
                  <div className="flex items-start gap-2">
                    <Avatar>
                      <AvatarImage src={engagement.avatar} />
                      <AvatarFallback>{engagement.fanName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate block max-w-[110px]">{engagement.fanName}</span>
                        <Badge variant="outline" className={getEngagementColor(engagement.type)}>
                          {getEngagementIcon(engagement.type)}
                          <span className="ml-1">{engagementTypeMap[i18n.language]?.[engagement.type] || engagement.type}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 truncate block max-w-[140px]">{engagement.lastMessage}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{new Date(engagement.timestamp).toLocaleDateString('en-CA').replace(/-/g, '/')} {new Date(engagement.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* 右侧主对话区 */}
      <div className="flex-1 bg-gray-50 flex flex-col min-h-0">
        {selectedEngagementData ? (
          <div className="h-full flex flex-col">
            {/* 消息展示区 */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
              {selectedEngagementData.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isFromFan ? "justify-start" : "justify-end"}`}
                >
                  <div className={`flex gap-2 max-w-[70%] ${msg.isFromFan ? "flex-row" : "flex-row-reverse"}`}>
                    {msg.isFromFan && (
                      <Avatar 
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => setShowFanDetails(true)}
                      >
                        <AvatarImage src={selectedEngagementData.avatar} />
                        <AvatarFallback>{selectedEngagementData.fanName[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="space-y-1 w-full">
                      {/* 类型Badge */}
                      <div className="mb-1">
                        <Badge variant="outline" className={getEngagementColor(msg.type || selectedEngagementData.type)}>
                          {getEngagementIcon(msg.type || selectedEngagementData.type)}
                          <span className="ml-1 text-xs">{engagementTypeMap[i18n.language]?.[msg.type || selectedEngagementData.type] || msg.type || selectedEngagementData.type}</span>
                        </Badge>
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          msg.isFromFan
                            ? "bg-white border"
                            : "bg-[#F56DB6] text-white"
                        }`}
                      >
                        <p>{msg.content}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{getPlatformIcon(msg.platform)}</span>
                        <span>{new Date(msg.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 输入框区域 */}
            <div className="p-4 space-y-4 border-t bg-white flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold">{t('quickReply')}</span>
                <Button
                  onClick={() => setShowCreateTask(true)}
                  className="flex items-center bg-[#7A3CEF] text-white hover:bg-[#6a2ed9] border-none"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {t('createTask')}
                </Button>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Textarea
                    placeholder={t('typeYourMessage')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="pr-20 min-h-[160px]"
                    rows={4}
                  />
                  <div className="absolute right-2 bottom-2 flex gap-2">
                    {/* 选择渠道icon */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Layers className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedChannel("DM")}> <DMIcon className="h-4 w-4 mr-2" /> {t('directMessage')}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedChannel("Comment")}> <MessageCircle className="h-4 w-4 mr-2" /> {t('comment')}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedChannel("Email")}> <MailIcon className="h-4 w-4 mr-2 text-orange-500" /> {t('email')}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedChannel("Line")}> <MessageCircle className="h-4 w-4 mr-2 text-green-500" /> {t('line')}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedChannel("WhatsApp")}> <MailIcon className="h-4 w-4 mr-2 text-green-600" /> {t('whatsApp')}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* 选择内容模板icon */}
                    <Button variant="ghost" size="icon" onClick={() => setShowTemplateDialog(true)}>
                      <FileText className="h-4 w-4" />
                    </Button>
                    {/* 其它icon和发送按钮 */}
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleSendMessage}>
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* 显示已选渠道 */}
                  {selectedChannel && (
                    <div className="absolute left-2 bottom-2 text-xs text-violet-600 bg-violet-50 px-2 py-1 rounded">
                      {t('channel')}: {selectedChannel}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">{t('selectEngagement')}</p>
          </div>
        )}
      </div>

      {/* 粉丝详情抽屉 */}
      {selectedEngagementData && showFanDetails && (
        <FanDetailsDrawer
          fan={selectedEngagementData.fan}
          onClose={() => setShowFanDetails(false)}
          onViewInteractionLog={() => {
            setShowFanDetails(false)
            setShowInteractionLog(true)
          }}
          onRemove={() => {
            // 这里添加移除粉丝的逻辑
            setShowFanDetails(false)
          }}
        />
      )}

      {/* 创建任务抽屉 */}
      {selectedEngagementData && showCreateTask && (
        <CreateTaskDrawer
          fan={selectedEngagementData.fan}
          onSubmit={handleCreateTask}
          onClose={() => setShowCreateTask(false)}
        />
      )}
      {/* 内容模板选择弹窗 */}
      <Dialog open={showTemplateDialog} onOpenChange={open => { setShowTemplateDialog(open); if (!open) { setTemplateSearch(""); setTemplatePage(1); } }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('selectContentTemplate')}</DialogTitle>
          </DialogHeader>
          <div className="mb-3">
            <input
              type="text"
              placeholder={t('searchTemplates')}
              value={templateSearch}
              onChange={e => { setTemplateSearch(e.target.value); setTemplatePage(1); }}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 max-h-[50vh] overflow-y-auto">
            {pagedTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="border rounded-lg p-4 cursor-pointer hover:bg-violet-50"
                onClick={() => {
                  setMessage(tpl.content)
                  setShowTemplateDialog(false)
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {tpl.type === "AI Generated" ? (
                    <Sparkles className="h-4 w-4 text-violet-500" />
                  ) : (
                    <FileText className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="font-medium">{tpl.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">{tpl.type}</span>
                </div>
                <div className="text-sm text-gray-700 whitespace-pre-line">{tpl.content}</div>
              </div>
            ))}
            {pagedTemplates.length === 0 && (
              <div className="text-center text-gray-400 py-8">{t('noTemplatesFound')}</div>
            )}
          </div>
          {/* 分页控件 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={templatePage === 1} onClick={() => setTemplatePage(p => Math.max(1, p - 1))}>{t('prev')}</Button>
              <span className="text-sm">{t('page')} {templatePage} / {totalPages}</span>
              <Button variant="outline" size="sm" disabled={templatePage === totalPages} onClick={() => setTemplatePage(p => Math.min(totalPages, p + 1))}>{t('next')}</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 