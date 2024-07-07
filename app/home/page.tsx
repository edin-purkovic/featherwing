import { CreatePost } from "@/components/main/create-post";
import { Layout, LayoutLeft, LayoutRight } from "@/components/main/layout";
import { Post } from "@/components/main/post";
import { Sidebar } from "@/components/main/sidebar";
import { Timeline } from "@/components/main/timeline";

import { getPosts } from "@/actions/posts";
import { redirect } from "next/navigation";
import { getAuth } from "@/actions/auth";

export default async function HomePage() {
	const { user } = await getAuth();

	if (!user) {
		redirect('/sign-in');
	}

	const posts = await getPosts();

	return (
		<main className="flex min-h-screen w-full justify-center px-2 xs:px-10">
			<Layout>
				<LayoutLeft>
					<Sidebar current="home" />
				</LayoutLeft>

				<LayoutRight>
					<Timeline>
						{/* {JSON.stringify(user)} */}
						<CreatePost
							fullName={`${user.firstName} ${user.lastName}`}
							initials={user.initials}
						/>

						{posts.map(post => <Post post={post} key={post.id} />)}
					</Timeline>
				</LayoutRight>
			</Layout>
		</main>
	);
}
