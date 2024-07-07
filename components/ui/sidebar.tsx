"use client"

import { PropsWithChildren, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface SidebarGroupProps {
    grow?: boolean
}

const SidebarGroup = ({ children, grow, ...props }: PropsWithChildren<SidebarGroupProps>) => (
    <div className={cn("flex flex-col gap-2", grow && "grow")}>
        {children}
    </div>
)

export interface SidebarButtonProps {
    href: string
    icon?: ReactNode | null,
    active?: boolean
}

const SidebarButton = ({ children, icon, active, href, ...props }: PropsWithChildren<SidebarButtonProps>) => (
    <Link
        href={href}
        className={
            cn(
                "flex w-full p-3 items-center justify-end tracking-wide rounded-md cursor-pointer hover:bg-primary/5 transition-colors font-mono text-xl",
                active && "font-[500]",
                // active && "border-primary rounded-none border-b-2",
            )
        }
    >
        <div className="hidden lg:block">
            {children}
        </div>

        {icon && <i className="ml-3">{icon}</i>}
    </Link>
)

export interface SidebarProps {
}

const Sidebar = ({ children, ...props }: PropsWithChildren<SidebarProps>) => {
    return (
        <div className="flex flex-col fixed top-0 w-[40px] lg:w-[280px] h-screen py-12">
            {children}
        </div>
    )
};

export { SidebarGroup, SidebarButton, Sidebar };