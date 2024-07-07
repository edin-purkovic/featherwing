"use client"

import { ChangeEvent, MouseEventHandler, PropsWithChildren, useEffect, useRef, useState } from "react";
import { Textarea, TextareaRef } from "../ui/textarea";
import { Button } from "../ui/button";

import { ImageIcon, VideoIcon, AudioLinesIcon, MapPinIcon, Ellipsis } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { createPost } from "@/actions/posts";

export interface CreatePostProps {
    initials: String
    fullName: String
}


const CreatePost = ({ fullName, initials, children, ...props }: PropsWithChildren<CreatePostProps>) => {
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [postMessage, setPostMessage] = useState("");
    const textareaRef = useRef<TextareaRef>(null);

    const updatePostMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostMessage(event.target.value)
    }

    const cancelPost = (event?: React.MouseEvent<HTMLButtonElement>) => {
        setPostMessage("");

        if (textareaRef.current) {
            textareaRef.current.textArea.blur();
        }
    }

    const onPost = () => {
        createPost(postMessage);
        setPostMessage("");
    }

    useEffect(() => {
        const keyboardHandler = (event: KeyboardEvent) => {
            if (event.code === "Escape" && textareaRef.current?.textArea.value) {
                setCancelDialogOpen(true);
            }
        }

        window.document.addEventListener("keydown", keyboardHandler);

        return () => {
            window.document.removeEventListener("keydown", keyboardHandler);
        };
    }, [textareaRef, setCancelDialogOpen]);

    return (
        <div className={cn("flex flex-col gap-2 p-3 rounded-lg outline-2 outline-offset-2 focus-within:outline", postMessage && "outline")}>
            <div className="flex pb-3 w-full font-mono">
                <div>
                    <Avatar className="">
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="pl-3 grow">
                    {fullName}
                    <div className="text-xs tracking-wider text-primary/60">Public</div>
                </div>

                {/* <div className="p-1 text-primary/40">
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Ellipsis size={20} />
                    </Button>
                </div> */}
            </div>

            <div>
                <Textarea
                    // className="text-md outline-none focus:outline-none focus-visible:outline-none "
                    onChange={updatePostMessage}
                    value={postMessage}
                    placeholder="Whats on your mind?"
                    maxHeight={500}
                    variant="ghost"
                    ref={textareaRef}
                />
            </div>

            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center text-primary/60">
                    <Button variant="ghost" size="icon"><ImageIcon /></Button>
                    <Button variant="ghost" size="icon"><VideoIcon /></Button>
                    <Button variant="ghost" size="icon"><AudioLinesIcon /></Button>
                    <Button variant="ghost" size="icon"><MapPinIcon /></Button>
                </div>
                <div className="flex gap-2">
                    <Dialog onOpenChange={setCancelDialogOpen} open={cancelDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className={cn("px-12", !postMessage && "hidden")}
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="-mt-12">
                            <DialogHeader>
                                <DialogTitle>Cancel Editing</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                Are you sure you want to cancel editing your post?
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="ghost">No, Continue Editing</Button>
                                </DialogClose>

                                <DialogClose asChild>
                                    <Button
                                        variant="destructive"
                                        onClick={cancelPost}
                                    >
                                        Yes, Cancel
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Button
                        className="px-12"
                        onClick={onPost}
                        disabled={!postMessage}
                    >
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}


export { CreatePost };