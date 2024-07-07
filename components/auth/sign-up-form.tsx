import Link from "next/link";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUp } from "@/actions/auth";

const SignUpForm = () => {
    return (
        <form action={signUp} className="p-4 flex flex-col gap-y-2 max-w-md w-full">
            <Input
                name="userName"
                type="text"
                placeholder="Username"
            />

            <Input
                name="firstName"
                type="text"
                placeholder="First Name"
            />

            <Input
                name="lastName"
                type="text"
                placeholder="Last Name"
            />

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

            <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
            />

            <div className="mb-3" />

            <Button type="submit">
                Sign-Up
            </Button>

            <div className="mt-3 mb-12 text-center">
                ...or <Link href="/sign-in" className="text-blue-500 hover:text-blue-400">Sign-In</Link>.
            </div>
        </form>

    );
};

export { SignUpForm };