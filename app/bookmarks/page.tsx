import { Layout, LayoutLeft, LayoutRight } from "@/components/main/layout";
import { Sidebar } from "@/components/main/sidebar";


export default function BookmarksPage() {
	return (
		<main className="flex min-h-screen w-full justify-center px-10">
			<Layout>
				<LayoutLeft>
					<Sidebar current="bookmarks" />
				</LayoutLeft>

				<LayoutRight>
				</LayoutRight>
			</Layout>
		</main>
	);
}
