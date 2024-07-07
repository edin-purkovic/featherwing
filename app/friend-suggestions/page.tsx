import { getFriendSuggestions } from "@/actions/friends";
import { Layout, LayoutLeft, LayoutRight } from "@/components/main/layout";
import { Sidebar } from "@/components/main/sidebar";

import { redirect } from "next/navigation";
import { getAuth } from "@/actions/auth";
import { SuggestionItem, SuggestionList } from "@/components/friends/suggestions";

export default async function SearchPage() {
	const { user } = await getAuth();

	if (!user) {
		redirect('/sign-in');
	}

	const suggestions = await getFriendSuggestions();

	return (
		<main className="flex min-h-screen w-full justify-center px-10">
			<Layout>
				<LayoutLeft>
					<Sidebar current="friend-suggestions" />
				</LayoutLeft>

				<LayoutRight>
					<SuggestionList>
						{suggestions.map(suggestion => <SuggestionItem key={suggestion.id} suggestion={suggestion} />)}
					</SuggestionList>

				</LayoutRight>
			</Layout>
		</main>
	);
}
