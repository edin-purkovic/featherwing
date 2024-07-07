import { PostWithUser, getPost } from "@/actions/posts";
import { Post } from "@/components/main/post";
import { RouteModal } from "@/components/main/route-modal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
    params: {
        postId: string
    }
}

export default async function PostPage({ params }: Props) {
    const post = await getPost(params.postId);

    return (
        <RouteModal>
            <DialogHeader>
                <DialogTitle>
                    {post.user?.firstName} {post.user?.lastName} - {post.createdAt.toLocaleString()}
                </DialogTitle>
            </DialogHeader>
            <Post post={post} />
        </RouteModal>
    )
}
