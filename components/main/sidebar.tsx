"use client"

import { Home, Search, MessageSquareIcon, Users2, LogOut, Settings2, Bell, Bookmark } from "lucide-react"

import { Sidebar as SidebarComponent, SidebarButton, SidebarGroup } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Logo } from "./logo";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { signOut } from "@/actions/auth";

const SIDEBAR_ICON_SIZE = 18;

interface SidebarIconProps {
    active?: boolean
}

const SidebarHomeIcon = ({ active }: SidebarIconProps) => (
    <Home
        size={SIDEBAR_ICON_SIZE}
        className={cn(active && "[&>path]:fill-primary [&>polyline]:fill-primary-foreground")}
    />
)

const SidebarSearchIcon = ({ active }: SidebarIconProps) => (
    <Search
        size={SIDEBAR_ICON_SIZE}
        strokeWidth={active ? 4 : 2}
    />
)

const SidebarMessagesIcon = ({ active }: SidebarIconProps) => (
    <MessageSquareIcon
        size={SIDEBAR_ICON_SIZE}
        className={cn(active && "[&>*]:fill-primary")}
    />
)

const SidebarFriendSuggestions = ({ active }: SidebarIconProps) => (
    <Users2
        size={SIDEBAR_ICON_SIZE}
        className={cn(active && "[&>path]:fill-primary [&>circle]:fill-primary")}
    />
)

const SidebarNotificationsIcon = ({ active }: SidebarIconProps) => (
    <Bell
        size={SIDEBAR_ICON_SIZE}
        className={cn(active && "[&>*]:fill-primary")}
    />
)

const SidebarBookmarksionsIcon = ({ active }: SidebarIconProps) => (
    <Bookmark
        size={SIDEBAR_ICON_SIZE}
        className={cn(active && "[&>*]:fill-primary")}
    />
)

const SidebarProfileIcon = ({ active }: SidebarIconProps) => (
    <Avatar className={cn("w-4 h-4", active && "outline outline-2 outline-offset-1")}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>
)

const SidebarSettingsIcon = ({ active }: SidebarIconProps) => (
    <Settings2
        size={SIDEBAR_ICON_SIZE}
        strokeWidth={active ? 3 : 2}
    />
)

interface SidebarProps {
    current?: string
}

const LogoutButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className={
                        cn("flex w-full p-3 items-center justify-end tracking-wide rounded-md cursor-pointer hover:bg-primary/5 transition-colors font-mono text-xl")
                    }
                >
                    <div className="hidden lg:block">
                        Logout
                    </div>

                    <i className="ml-3">
                        <LogOut size={18} />
                    </i>
                </button>
            </DialogTrigger>
            <DialogContent className="-mt-12">
                <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    Are you sure you want to logout?
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>

                        <Button
                            variant="default"
                            onClick={() => signOut()}
                        >
                            Logout
                        </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>


    )
}

const Sidebar = ({ current }: SidebarProps) => (
    <SidebarComponent>
        <Logo />
        <SidebarGroup grow>
            <SidebarButton
                href="/home"
                icon={<SidebarHomeIcon active={current === "home"} />}
                active={current === "home"}
            >
                Home
            </SidebarButton>

            {/* <SidebarButton
                href="/search"
                icon={<SidebarSearchIcon active={current === "search"} />}
                active={current === "search"}
            >
                Search
            </SidebarButton> */}

            <SidebarButton
                href="/messages"
                icon={<SidebarMessagesIcon active={current === "messages"} />}
                active={current === "messages"}
            >
                Messages
            </SidebarButton>

            <SidebarButton
                href="/friend-suggestions"
                icon={<SidebarFriendSuggestions active={current === "friend-suggestions"} />}
                active={current === "friend-suggestions"}
            >
                Friend Suggestions
            </SidebarButton>

            <SidebarButton
                href="/notifications"
                icon={<SidebarNotificationsIcon active={current === "notifications"} />}
                active={current === "notifications"}
            >
                Notifications
            </SidebarButton>

            <SidebarButton
                href="/bookmarks"
                icon={<SidebarBookmarksionsIcon active={current === "bookmarks"} />}
                active={current === "bookmarks"}
            >
                Bookmarks
            </SidebarButton>

            <SidebarButton
                href="/profile"
                icon={<SidebarProfileIcon active={current === "profile"} />}
                active={current === "profile"}
            >
                {/* <SidebarButton href="/profile" icon={<CircleUser size={18} />}> */}
                Profile
            </SidebarButton>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarButton
                href="/settings"
                icon={<SidebarSettingsIcon active={current === "settings"} />}
                active={current === "settings"}
            >
                Settings
            </SidebarButton>

            <LogoutButton />
        </SidebarGroup>
    </SidebarComponent>
)

export { Sidebar };
