import { PostWithUser, getPost } from "@/actions/posts";
import { Post } from "@/components/main/post";

interface Props {
    params: {
        postId: string
    }
}

export default async function PostPage({ params }: Props) {
    const post = await getPost(params.postId);

    return (
        <div>
            <Post post={post}/>
        </div>
    )
}
