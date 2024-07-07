import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const robotoMono = Roboto_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
	title: "FEATHERWING",
	description: "Lets connect and share ideas",
};

export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body className={cn(robotoMono.className, inter.className, "dark")}>
				{modal}
				{children}
			</body>
		</html>
	);
}
