import { CreatePost } from "@/components/main/create-post";
import { Layout, LayoutLeft, LayoutRight } from "@/components/main/layout";
import { Post } from "@/components/main/post";
import { Sidebar } from "@/components/main/sidebar";
import { Timeline } from "@/components/main/timeline";


export default function ProfilePage() {
	return (
		<main className="flex min-h-screen w-full justify-center px-2 xs:px-10">
			<Layout>
				<LayoutLeft>
					<Sidebar current="profile" />
				</LayoutLeft>

				<LayoutRight>
					<Timeline>
						<CreatePost />
						{/* <Post /> */}
					</Timeline>
				</LayoutRight>
			</Layout>
		</main>
	);
}
