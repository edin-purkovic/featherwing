"use client"

import { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { Triangle, Search, CircleUser } from "lucide-react"

interface TimelineProps {
}

const Timeline = ({ children, ...props }: PropsWithChildren<TimelineProps>) => {
    return (
        // <main className="flex min-h-screen flex-col items-center justify-between bg-[#171A21]">
        <div className="flex flex-col gap-8 px-1 py-12 xs:px-12 xs:pr-16 md:px-12">
            {children}
        </div>
    )
};

export { Timeline };