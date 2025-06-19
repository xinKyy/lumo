import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { User, Mail, Shield, ChevronDown } from "lucide-react";
import { FaInstagram, FaYoutube, FaTwitter, FaTiktok, FaWhatsapp, FaLine } from "react-icons/fa";
import { SiOnlyfans } from "react-icons/si";

const platforms = [
  { name: "Instagram", icon: <FaInstagram className="text-pink-500 w-5 h-5" /> },
  { name: "X (Twitter)", icon: <FaTwitter className="text-blue-400 w-5 h-5" /> },
  { name: "OnlyFans", icon: <SiOnlyfans className="text-sky-400 w-5 h-5" /> },
  { name: "WhatsApp", icon: <FaWhatsapp className="text-green-500 w-5 h-5" /> },
  { name: "Line", icon: <FaLine className="text-green-600 w-5 h-5" /> },
];

// mock 账号数据
const mockAccounts = {
  Instagram: [
    { id: 1, avatar: "/avatar-alex.jpg", nickname: "Alex", username: "alex_insta" },
    { id: 2, avatar: "/avatar-sarah.jpg", nickname: "Sarah", username: "sarah_life" },
  ],
  "X (Twitter)": [
    { id: 1, avatar: "/avatar-michael.jpg", nickname: "Michael", username: "mike_tw" },
  ],
  OnlyFans: [],
  WhatsApp: [],
  Line: [],
};

export default function Settings() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [emailNotify, setEmailNotify] = useState(true);
  const [accounts, setAccounts] = useState<{ [key: string]: any[] }>(mockAccounts);

  // User info (example)
  const [userInfo] = useState({
    name: "John Doe",
    username: "johndoe",
  });

  // Security related
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [thirdPartyAuth, setThirdPartyAuth] = useState({
    Google: true,
    Apple: false,
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{t("settings")}</h1>
        <Button variant="outline" className="text-[#F56DB6] border-[#F56DB6] hover:bg-[#F56DB6] hover:text-white">
          {t("saveChanges")}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5" />
              <h3 className="text-lg font-semibold">{t("userInformation")}</h3>
            </div>
            <div className="grid gap-4">
              <div>
                <Label className="text-sm text-gray-500">{t("name")}</Label>
                <Input value={userInfo.name} disabled className="mt-1.5" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5" />
              <h3 className="text-lg font-semibold">{t("emailSettings")}</h3>
            </div>
            <div className="grid gap-4">
              <div>
                <Label className="text-sm text-gray-500">{t("email")}</Label>
                <Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t("enterYourEmail")}
                  className="mt-1.5"
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch 
                  checked={emailNotify} 
                  onCheckedChange={setEmailNotify}
                  className="data-[state=checked]:bg-[#F56DB6]"
                />
                <span className="text-sm">{t("enableEmailNotifications")}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ChevronDown className="h-5 w-5" />
              <h3 className="text-lg font-semibold">{t("authorizedPlatforms")}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map(p => (
                <div key={p.name} className="flex flex-col gap-2 p-2 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{p.icon}</span>
                    <span className="text-sm font-medium">{t(p.name)}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-auto min-w-[100px] border-[#F56DB6] text-[#F56DB6] hover:bg-[#F56DB6] hover:text-white"
                      onClick={() => {
                        // Add new account (mock, should be popup or real auth in production)
                        setAccounts(a => ({
                          ...a,
                          [p.name]: [
                            ...(a[p.name] || []),
                            { id: Date.now(), avatar: '/placeholder-user.jpg', nickname: t("newAccount"), username: 'new_user' + Date.now() }
                          ]
                        }))
                      }}
                    >
                      {t("addAccount")}
                    </Button>
                  </div>
                  {/* Show bound accounts */}
                  <div className="flex flex-col gap-2 mt-2">
                    {(accounts[p.name] && accounts[p.name].length > 0) ? accounts[p.name].map((acc: any) => (
                      <div key={acc.id} className="flex items-center gap-3 bg-gray-50 rounded px-3 py-2">
                        <img src={acc.avatar} alt={acc.nickname} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{acc.nickname}</div>
                          <div className="text-xs text-gray-500">{acc.username}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-300 text-red-400 hover:bg-red-100"
                          onClick={() => {
                            setAccounts(a => ({
                              ...a,
                              [p.name]: a[p.name].filter((x: any) => x.id !== acc.id)
                            }))
                          }}
                        >
                          {t("unbind")}
                        </Button>
                      </div>
                    )) : (
                      <div className="text-xs text-gray-400 px-3 py-2">{t("noAccountsBound")}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5" />
              <h3 className="text-lg font-semibold">{t("security")}</h3>
            </div>
            <div className="grid gap-6">
              <div>
                <Label className="text-sm text-gray-500">{t("changePassword")}</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={t("newPassword")}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#F56DB6] text-[#F56DB6] hover:bg-[#F56DB6] hover:text-white"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? t("hide") : t("show")}
                  </Button>
                  <Button 
                    type="button" 
                    disabled={!password}
                    className="bg-[#F56DB6] hover:bg-[#F56DB6]/90 disabled:bg-gray-100"
                  >
                    {t("change")}
                  </Button>
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-sm text-gray-500">{t("thirdPartyLoginAuthorization")}</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    size="sm"
                    variant={thirdPartyAuth.Google ? "default" : "outline"}
                    className={
                      thirdPartyAuth.Google 
                        ? "bg-[#F56DB6] hover:bg-[#F56DB6]/90" 
                        : "border-[#F56DB6] text-[#F56DB6] hover:bg-[#F56DB6] hover:text-white"
                    }
                    onClick={() => setThirdPartyAuth(a => ({ ...a, Google: !a.Google }))}
                  >
                    Google
                  </Button>
                  <Button
                    size="sm"
                    variant={thirdPartyAuth.Apple ? "default" : "outline"}
                    className={
                      thirdPartyAuth.Apple 
                        ? "bg-[#F56DB6] hover:bg-[#F56DB6]/90" 
                        : "border-[#F56DB6] text-[#F56DB6] hover:bg-[#F56DB6] hover:text-white"
                    }
                    onClick={() => setThirdPartyAuth(a => ({ ...a, Apple: !a.Apple }))}
                  >
                    Apple
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 