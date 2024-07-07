"use client"

import { UserSuggestion } from "@/actions/friends";
import { PropsWithChildren } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

interface SuggestionItemProps {
    suggestion: UserSuggestion
}

const SuggestionItem = ({ suggestion, children, ...props }: PropsWithChildren<SuggestionItemProps>) => {
    return (
        <div className="flex gap-3 items-center p-2  border-t first-of-type:border-none">
            <div>
                <Avatar className="">
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback>{suggestion.initials}</AvatarFallback>
                </Avatar>
            </div>

            <div className="grow">
                {suggestion.firstName}  {suggestion.lastName}
            </div>

            <Button variant="ghost">Follow</Button>
        </div>
    )
}


interface SuggestionListProps { }

const SuggestionList = ({ children, ...props }: PropsWithChildren<SuggestionListProps>) => {
    return (
        <div className="flex flex-col gap-3 px-1 py-12 xs:px-12 xs:pr-16 md:px-12">
            {children}
        </div>
    )
};

export { SuggestionItem, SuggestionList };