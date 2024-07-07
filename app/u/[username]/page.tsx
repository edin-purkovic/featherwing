import { getAuth } from "@/actions/auth";
import { CreatePost } from "@/components/main/create-post";
import { Layout, LayoutLeft, LayoutRight } from "@/components/main/layout";
import { Sidebar } from "@/components/main/sidebar";
import { Timeline } from "@/components/main/timeline";
import { redirect } from "next/navigation";

interface Props {
	params: {
		username: string
	}
}

export default async function UserPage({ params }: Props) {
	const { user } = await getAuth();

	if(user?.userName === params.username) {
		redirect("/profile")
		return null;
	}

	return (
		<main className="flex min-h-screen w-full justify-center px-2 xs:px-10">
			<Layout>
				<LayoutLeft>
					<Sidebar current="profile" />
				</LayoutLeft>

				<LayoutRight>
					<Timeline>
						<CreatePost />
					</Timeline>
				</LayoutRight>
			</Layout>
		</main>
	);
}
