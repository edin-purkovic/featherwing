import { Layout, LayoutLeft, LayoutRight } from "@/components/main/layout";
import { Sidebar } from "@/components/main/sidebar";


export default function NotificationsPage() {
	return (
		<main className="flex min-h-screen w-full justify-center px-10">
			<Layout>
				<LayoutLeft>
					<Sidebar current="notifications" />
				</LayoutLeft>

				<LayoutRight>
				</LayoutRight>
			</Layout>
		</main>
	);
}
