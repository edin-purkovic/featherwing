import Link from "next/link";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signIn } from "@/actions/auth";

const SignInForm = () => {
    return (
        <form action={signIn} className="p-4 flex flex-col gap-y-2 max-w-md w-full">
            <Input
                name="email"
                type="email"
                placeholder="Email"
            />

            <Input
                name="password"
                type="password"
                placeholder="Password"
            />

            <div className="mb-3" />

            <Button type="submit">
                Sign-In
            </Button>

            <div className="mt-3 mb-12 text-center">
                ...or <Link href="/sign-up" className="text-blue-500 hover:text-blue-400">Sign-Up</Link>.
            </div>
        </form>
    );
};

export { SignInForm };