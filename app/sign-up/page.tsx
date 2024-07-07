import { SignUpForm } from "@/components/auth/sign-up-form";
import { redirect } from "next/navigation";
import { getAuth } from "@/actions/auth";

export default async function SignUpPage() {
    const { session } = await getAuth();

    if (session) {
        return redirect("/home");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pb-12">
            <h4 className="text-2xl top-6 tracking-widest mb-6">
                FEATHERWING
            </h4>

            <SignUpForm />
        </div>
    );
};
