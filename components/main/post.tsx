"use client"

import { Children, PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { Share2, MessageCircle, Heart, Bookmark, Ellipsis } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRouter } from 'next/navigation'
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"

import { PostWithUser, deletePost } from "@/actions/posts";

interface PostProps {
    post: PostWithUser
}

const POST_ICON_SIZE = 20;

const PostDeleteModal = ({ postId }: { postId: string }) => {
    const remove = async () => {
        await deletePost(postId);
    }

    return (
        <>

            <DialogContent className="-mt-12">
                <DialogHeader>
                    <DialogTitle>Delete Post</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    Are you sure you want to delete this post?
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>

                    <Button variant="destructive" onClick={remove} >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </>
    )
}

const PostDropdown = ({ postId }: { postId: string }) => {
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Ellipsis size={POST_ICON_SIZE} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                    {/* <DropdownMenuSeparator /> */}
                    {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                    {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
                    {/* <DropdownMenuSeparator /> */}

                    <DialogTrigger asChild >
                        <DropdownMenuItem className="cursor-pointer">
                            Delete Post
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>

            <PostDeleteModal postId={postId} />
        </Dialog>
    )
}

const Post = ({ children, post, ...props }: PropsWithChildren<PostProps>) => {
    const router = useRouter();

    const onLike = () => {
    }

    const onComment = () => {
        router.push(`/u/${post.user?.userName}/posts/${post.id}?new_comment=true`, { scroll: false });
    }

    return (
        <div className="flex flex-col p-4 min-h-[100px] w-full relative">
            {/* <div className="flex flex-col p-4 min-h-[100px] w-full relative border-r border-primary/20 after:border-t after:border-r after:border-primary/20 after:bg-background after:absolute after:top-4  after:-right-2 after:w-4 after:h-4 after:rotate-45"> */}
            <div className="flex pb-3 w-full border-b border-primary/10 font-mono">
                <div>
                    <Link href={`/u/${post.user?.userName}`} scroll={false}>
                        <Avatar className="">
                            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                            <AvatarFallback>EP</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>

                <div className="pl-3 grow">
                    <Link href={`/u/${post.user?.userName}`}>
                        {post.user?.firstName} {post.user?.lastName}
                    </Link>

                    <div className="text-xs tracking-wider text-primary/60 hover:underline underline-offset-4">
                        <Link href={`/u/${post.user?.userName}/posts/${post.id}`} scroll={false}>
                            {(new Date(post.createdAt)).toLocaleString()}
                        </Link>
                    </div>
                </div>

                <div className="p-1 text-primary/40">
                    <PostDropdown postId={post.id} />
                </div>
            </div>

            <div className="p-2 max-h-[200px]">
                {post.content}
            </div>

            <div className="flex justify-between text-primary/40">
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                        <Heart size={POST_ICON_SIZE} /*fill="red" stroke="red"*/ />
                    </Button>

                    <Button variant="ghost" size="icon" onClick={onComment}>
                        <MessageCircle size={POST_ICON_SIZE} />
                    </Button>

                    <Button variant="ghost" size="icon">
                        <Share2 size={POST_ICON_SIZE} />
                    </Button>
                </div>

                <div className="flex gap-2 text-primary/40">
                    <Button variant="ghost" size="icon"><Bookmark size={POST_ICON_SIZE} /></Button>
                </div>
            </div>
        </div>
    )
};

export { Post };