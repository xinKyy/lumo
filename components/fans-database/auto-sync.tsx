"use client"

import { useState } from "react"
import { RefreshCw, Instagram, Twitter, Youtube, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface AutoSyncProps {
  onClose: () => void
}

export default function AutoSync({ onClose }: AutoSyncProps) {
  const { t } = useTranslation()
  const [platforms, setPlatforms] = useState({
    instagram: false,
    twitter: true,
    youtube: false,
    tiktok: false,
    onlyfans: false,
    whatsapp: false,
    line: true,
  })

  const [isSyncing, setIsSyncing] = useState(false)

  const handleToggle = (platform: keyof typeof platforms) => {
    setPlatforms({
      ...platforms,
      [platform]: !platforms[platform],
    })
  }

  const handleSync = () => {
    setIsSyncing(true)

    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false)
      onClose()
    }, 2000)
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('autoSync.title')}</SheetTitle>
          <SheetDescription>{t('autoSync.description')}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <Alert>
            <RefreshCw className="h-4 w-4" />
            <AlertDescription>
              {t('autoSync.alertDescription')}
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t('autoSync.selectPlatforms')}</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Instagram className="h-5 w-5 text-[#E1306C]" />
                  <Label htmlFor="instagram" className="cursor-pointer">
                    Instagram
                  </Label>
                </div>
                <Switch
                  id="instagram"
                  checked={platforms.instagram}
                  onCheckedChange={() => handleToggle("instagram")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                  <Label htmlFor="twitter" className="cursor-pointer">
                    X (Twitter)
                  </Label>
                </div>
                <Switch id="twitter" checked={platforms.twitter} onCheckedChange={() => handleToggle("twitter")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Youtube className="h-5 w-5 text-[#FF0000]" />
                  <Label htmlFor="youtube" className="cursor-pointer">
                    YouTube
                  </Label>
                </div>
                <Switch id="youtube" checked={platforms.youtube} onCheckedChange={() => handleToggle("youtube")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-[#000000]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                  </svg>
                  <Label htmlFor="tiktok" className="cursor-pointer">
                    TikTok
                  </Label>
                </div>
                <Switch id="tiktok" checked={platforms.tiktok} onCheckedChange={() => handleToggle("tiktok")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-[#00AFF0]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-8c-.828 0-1.5-.671-1.5-1.5S7.672 11 8.5 11s1.5.671 1.5 1.5S9.328 14 8.5 14zm7 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5 1.5.671 1.5 1.5-.672 1.5-1.5 1.5zm-3.5 2c-1.5 0-2.5.5-3.5 1.5 1 1 2 1.5 3.5 1.5s2.5-.5 3.5-1.5c-1-1-2-1.5-3.5-1.5z" />
                  </svg>
                  <Label htmlFor="onlyfans" className="cursor-pointer">
                    OnlyFans
                  </Label>
                </div>
                <Switch id="onlyfans" checked={platforms.onlyfans} onCheckedChange={() => handleToggle("onlyfans")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <Label htmlFor="whatsapp" className="cursor-pointer">
                    WhatsApp
                  </Label>
                </div>
                <Switch id="whatsapp" checked={platforms.whatsapp} onCheckedChange={() => handleToggle("whatsapp")} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-[#00B900]" />
                  <Label htmlFor="line" className="cursor-pointer">
                    Line
                  </Label>
                </div>
                <Switch id="line" checked={platforms.line} onCheckedChange={() => handleToggle("line")} />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              {t('autoSync.cancel')}
            </Button>
            <Button
              className="btn-primary"
              onClick={handleSync}
              disabled={isSyncing || !Object.values(platforms).some(Boolean)}
            >
              {isSyncing ? (
                <>{t('autoSync.syncing')}</>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t('autoSync.syncNow')}
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
