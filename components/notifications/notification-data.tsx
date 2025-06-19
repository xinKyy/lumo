import type { Notification } from "./notification-drawer"

// Sample notification data
export const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "Birthday Reminder",
    description: "JennyLove has a birthday tomorrow! Don't forget to send wishes.",
    time: "10 minutes ago",
    type: "reminder",
    read: false,
  },
  {
    id: "2",
    title: "New Comment",
    description: "SakuraChan commented on your latest post: 'Love your new content! Keep it up!'",
    time: "2 hours ago",
    type: "comment",
    read: false,
  },
  {
    id: "3",
    title: "Task Completed",
    description: "Weekly newsletter has been sent to all subscribers successfully.",
    time: "Yesterday",
    type: "task",
    read: false,
  },
  {
    id: "4",
    title: "New Subscriber",
    description: "MikeRunner subscribed to your premium tier ($15.99/month).",
    time: "2 days ago",
    type: "subscription",
    read: true,
  },
  {
    id: "5",
    title: "Content Milestone",
    description: "Your latest post reached 10,000 views! This is performing better than 95% of your content.",
    time: "3 days ago",
    type: "milestone",
    read: true,
  },
]
