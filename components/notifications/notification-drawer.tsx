"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Bell, X, Check, Clock, MessageSquare, Calendar, Gift, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: "reminder" | "comment" | "task" | "subscription" | "milestone" | string
  read: boolean
}

interface NotificationDrawerProps {
  triggerElement?: React.ReactNode
  notifications: Notification[]
  onNotificationsChange?: (notifications: Notification[]) => void
}

export default function NotificationDrawer({
  triggerElement,
  notifications: initialNotifications,
  onNotificationsChange,
}: NotificationDrawerProps) {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [notificationCount, setNotificationCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  // Update notification count when notifications change
  useEffect(() => {
    setNotificationCount(initialNotifications.filter((n) => !n.read).length)
    setNotifications(initialNotifications)
  }, [initialNotifications])

  // Update parent component when notifications change
  const updateNotifications = (updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications)
    if (onNotificationsChange) {
      onNotificationsChange(updatedNotifications)
    }
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({ ...notification, read: true }))
    updateNotifications(updatedNotifications)
    setNotificationCount(0)
  }

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id && !notification.read) {
        setNotificationCount((prev) => Math.max(0, prev - 1))
        return { ...notification, read: true }
      }
      return notification
    })
    updateNotifications(updatedNotifications)
  }

  const deleteNotification = (id: string) => {
    const notification = notifications.find((n) => n.id === id)
    if (notification && !notification.read) {
      setNotificationCount((prev) => Math.max(0, prev - 1))
    }
    const updatedNotifications = notifications.filter((notification) => notification.id !== id)
    updateNotifications(updatedNotifications)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Calendar className="h-5 w-5 text-[#FFB300]" />
      case "comment":
        return <MessageSquare className="h-5 w-5 text-[#7A3CEF]" />
      case "task":
        return <Check className="h-5 w-5 text-[#32C48D]" />
      case "subscription":
        return <Gift className="h-5 w-5 text-[#F56DB6]" />
      case "milestone":
        return <Clock className="h-5 w-5 text-[#7A3CEF]" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  // Default trigger element if none provided
  const defaultTrigger = (
    <div className="relative cursor-pointer">
      <Bell className="h-6 w-6 text-gray-500 hover:text-[#7A3CEF] transition-colors" />
      {notificationCount > 0 && (
        <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F56DB6] p-0 text-xs text-white">
          {notificationCount}
        </Badge>
      )}
    </div>
  )

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{triggerElement || defaultTrigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>{t("notifications")}</SheetTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              {t("markAllAsRead")}
            </Button>
          </div>
        </SheetHeader>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">{t("all")}</TabsTrigger>
            <TabsTrigger value="unread">{t("unread")}</TabsTrigger>
            <TabsTrigger value="read">{t("read")}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative rounded-lg border p-4 ${notification.read ? "bg-white" : "bg-[#F9F5FF]"}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5]">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}>
                        {t(notification.title)}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">{t(notification.description)}</p>
                      <p className="mt-1 text-xs text-gray-400">{t(notification.time)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 absolute top-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notification.id)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-gray-500">{t("noNotifications")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="mt-4 space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto">
            {notifications.filter((n) => !n.read).length > 0 ? (
              notifications
                .filter((notification) => !notification.read)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className="relative rounded-lg border p-4 bg-[#F9F5FF]"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5]">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{t(notification.title)}</h3>
                        <p className="mt-1 text-sm text-gray-600">{t(notification.description)}</p>
                        <p className="mt-1 text-xs text-gray-400">{t(notification.time)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-gray-500">{t("noUnreadNotifications")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="read" className="mt-4 space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto">
            {notifications.filter((n) => n.read).length > 0 ? (
              notifications
                .filter((notification) => notification.read)
                .map((notification) => (
                  <div key={notification.id} className="relative rounded-lg border p-4 bg-white">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5]">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-700">{t(notification.title)}</h3>
                        <p className="mt-1 text-sm text-gray-600">{t(notification.description)}</p>
                        <p className="mt-1 text-xs text-gray-400">{t(notification.time)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-gray-500">{t("noReadNotifications")}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
