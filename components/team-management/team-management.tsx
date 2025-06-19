'use client';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaInstagram, FaTwitter, FaWhatsapp, FaLine } from "react-icons/fa";
import { SiOnlyfans } from "react-icons/si";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input as ShadcnInput } from "@/components/ui/input";

const platforms = [
  { name: "Instagram", icon: <FaInstagram className="text-pink-500 w-4 h-4" /> },
  { name: "X (Twitter)", icon: <FaTwitter className="text-blue-400 w-4 h-4" /> },
  { name: "OnlyFans", icon: <SiOnlyfans className="text-sky-400 w-4 h-4" /> },
  { name: "WhatsApp", icon: <FaWhatsapp className="text-green-500 w-4 h-4" /> },
  { name: "Line", icon: <FaLine className="text-green-600 w-4 h-4" /> },
];

const mockMembers = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    avatar: "/avatar-alex.jpg",
    accounts: {
      Instagram: ["alex_insta"],
      "X (Twitter)": ["alice_tw"],
      OnlyFans: [],
      WhatsApp: [],
      Line: [],
    },
  },
  {
    id: 2,
    name: "Bob Lee",
    email: "bob@example.com",
    avatar: "/avatar-michael.jpg",
    accounts: {
      Instagram: [],
      "X (Twitter)": [],
      OnlyFans: ["bob_of"],
      WhatsApp: ["bob_wa"],
      Line: [],
    },
  },
];

// mock平台账号池（含头像和粉丝数）
const platformAccounts = {
  Instagram: [
    { username: "alex_insta", avatar: "/avatar-alex.jpg", followers: 125600 },
    { username: "sarah_life", avatar: "/avatar-sarah.jpg", followers: 98000 },
    { username: "brand_official", avatar: "/placeholder-logo.png", followers: 500000 },
    { username: "creator_jane", avatar: "/placeholder-user.jpg", followers: 34000 },
  ],
  "X (Twitter)": [
    { username: "alice_tw", avatar: "/avatar-michael.jpg", followers: 21000 },
    { username: "brand_tw", avatar: "/placeholder-logo.png", followers: 120000 },
    { username: "mike_tw", avatar: "/avatar-alex.jpg", followers: 4500 },
  ],
  OnlyFans: [
    { username: "bob_of", avatar: "/avatar-michael.jpg", followers: 8000 },
    { username: "star_of", avatar: "/avatar-sarah.jpg", followers: 15000 },
    { username: "fanclub", avatar: "/placeholder-logo.png", followers: 30000 },
  ],
  WhatsApp: [
    { username: "bob_wa", avatar: "/avatar-michael.jpg", followers: 0 },
    { username: "support_wa", avatar: "/placeholder-logo.png", followers: 0 },
  ],
  Line: [
    { username: "japan_line", avatar: "/placeholder-logo.png", followers: 12000 },
    { username: "brand_line", avatar: "/placeholder-logo.png", followers: 5000 },
  ],
};

export default function TeamManagement() {
  const { t } = useTranslation();
  const [members, setMembers] = useState(mockMembers);
  const [newMember, setNewMember] = useState({ name: "", email: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMemberId, setDialogMemberId] = useState<number|null>(null);
  const [dialogPlatform, setDialogPlatform] = useState<string>("");
  const [search, setSearch] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<string>("");

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) return;
    setMembers([
      ...members,
      {
        id: Date.now(),
        name: newMember.name,
        email: newMember.email,
        avatar: "/placeholder-user.jpg",
        accounts: {
          Instagram: [],
          "X (Twitter)": [],
          OnlyFans: [],
          WhatsApp: [],
          Line: [],
        },
      },
    ]);
    setNewMember({ name: "", email: "" });
  };

  const handleToggleAccount = (memberId: number, platform: string, account: string) => {
    setMembers(members =>
      members.map(m => {
        if (m.id !== memberId) return m;
        const has = m.accounts[platform].includes(account);
        return {
          ...m,
          accounts: {
            ...m.accounts,
            [platform]: has
              ? m.accounts[platform].filter((a: string) => a !== account)
              : [...m.accounts[platform], account],
          },
        };
      })
    );
  };

  const openAddAccountDialog = (memberId: number, platform: string) => {
    setDialogMemberId(memberId);
    setDialogPlatform(platform);
    setSearch("");
    setSelectedAccount("");
    setDialogOpen(true);
  };

  const handleDialogAdd = () => {
    if (!selectedAccount || dialogMemberId === null || !dialogPlatform) return;
    setMembers(members =>
      members.map(m => {
        if (m.id !== dialogMemberId) return m;
        if (m.accounts[dialogPlatform].includes(selectedAccount)) return m;
        return {
          ...m,
          accounts: {
            ...m.accounts,
            [dialogPlatform]: [...m.accounts[dialogPlatform], selectedAccount],
          },
        };
      })
    );
    setDialogOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8 p-6">
        <h2 className="text-lg font-semibold mb-4">{t("addNewMember")}</h2>
        <div className="flex gap-4 items-center">
          <Input
            placeholder={t("name")}
            value={newMember.name}
            onChange={e => setNewMember(n => ({ ...n, name: e.target.value }))}
            className="max-w-xs"
          />
          <Input
            placeholder={t("email")}
            value={newMember.email}
            onChange={e => setNewMember(n => ({ ...n, email: e.target.value }))}
            className="max-w-xs"
          />
          <Button onClick={handleAddMember} className="bg-[#7A3CEF] text-white">{t("add")}</Button>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">{t("teamMembers")}</h2>
        <div className="space-y-6">
          {members.map(member => (
            <div key={member.id} className="flex items-center gap-6 border-b pb-4 last:border-b-0 last:pb-0">
              <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="font-medium">{member.name}</div>
                <div className="text-xs text-gray-500">{member.email}</div>
                <div className="flex gap-4 mt-2 flex-wrap">
                  {platforms.map(p => (
                    <div key={p.name} className="flex items-center gap-2 bg-gray-50 rounded px-2 py-1">
                      {p.icon}
                      <span className="text-xs font-medium">{t(p.name)}</span>
                      <div className="flex gap-1">
                        {member.accounts[p.name].map((acc: string) => (
                          <span key={acc} className="bg-[#F5EDFF] text-[#7A3CEF] rounded px-2 py-0.5 text-xs ml-1">
                            {acc}
                            <button
                              className="ml-1 text-red-400 hover:text-red-600"
                              onClick={() => handleToggleAccount(member.id, p.name, acc)}
                              title={t("removeAccount")}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                        <Dialog open={dialogOpen && dialogMemberId === member.id && dialogPlatform === p.name} onOpenChange={setDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="xs"
                              variant="outline"
                              className="ml-1 border-[#7A3CEF] text-[#7A3CEF] hover:bg-[#7A3CEF] hover:text-white px-2 py-0 h-6 text-xs"
                              onClick={() => openAddAccountDialog(member.id, p.name)}
                            >
                              +
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{t("selectAccount", { platform: t(p.name) })}</DialogTitle>
                            </DialogHeader>
                            <ShadcnInput
                              placeholder={t("searchAccounts")}
                              value={search}
                              onChange={e => setSearch(e.target.value)}
                              className="mb-2"
                            />
                            <div className="max-h-40 overflow-y-auto space-y-1">
                              {(platformAccounts[p.name] || [])
                                .filter(acc => acc.username.toLowerCase().includes(search.toLowerCase()))
                                .map(acc => (
                                  <div
                                    key={acc.username}
                                    className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer text-sm ${selectedAccount === acc.username ? 'bg-[#7A3CEF] text-white' : 'hover:bg-gray-100'}`}
                                    onClick={() => setSelectedAccount(acc.username)}
                                  >
                                    <img src={acc.avatar} alt={acc.username} className="w-7 h-7 rounded-full object-cover" />
                                    <span className="font-medium">{acc.username}</span>
                                    <span className="ml-auto text-xs text-gray-500">{acc.followers.toLocaleString()} {t("followers")}</span>
                                  </div>
                                ))}
                              {((platformAccounts[p.name] || []).filter(acc => acc.username.toLowerCase().includes(search.toLowerCase())).length === 0) && (
                                <div className="text-xs text-gray-400 px-3 py-2">{t("noAccountsFound")}</div>
                              )}
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">{t("cancel")}</Button>
                              </DialogClose>
                              <Button onClick={handleDialogAdd} disabled={!selectedAccount} className="bg-[#7A3CEF] text-white">{t("add")}</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 