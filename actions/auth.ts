"use server"

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/lib/lucia';
import { generateId } from 'lucia';
import { prisma } from '@/lib/prisma';
import { cache } from 'react';
import type { Session, User } from 'lucia';

export interface SignUpResult {
    error: string;
}

const signUp = async (formData: FormData): Promise<SignUpResult> => {
    try {
        const formDataRaw = {
            userName: formData.get('userName') as string,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
        };

        if (formDataRaw.password !== formDataRaw.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const initials =
            formDataRaw.firstName.charAt(0).toUpperCase() +
            formDataRaw.lastName.charAt(0).toUpperCase();

        const passwordHash = await new Argon2id().hash(formDataRaw.password);
        const userId = generateId(15);

        await prisma.user.create({
            data: {
                id: userId,
                userName: formDataRaw.userName,
                firstName: formDataRaw.firstName,
                lastName: formDataRaw.lastName,
                initials: initials,
                email: formDataRaw.email,
                hashedPassword: passwordHash,
            },
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return redirect('/home');
    } catch (error: any) {
        return { error: "Something went wrong!" };
    }
};

const signIn = async (formData: FormData) => {
    try {
        const formDataRaw = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        const user = await prisma.user.findUnique({
            where: { email: formDataRaw.email },
        });

        if (!user) {
            throw new Error('Incorrect email or password');
        }

        const validPassword = await new Argon2id().verify(user.hashedPassword, formDataRaw.password);

        if (!validPassword) {
            throw new Error('Incorrect email or password');
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return redirect('/home');
    } catch (error) {
    }
};


const signOut = async (/*_formData: FormData*/) => {
    try {
        const { session } = await validateRequest();

        if (!session) {
            return redirect('/sign-in');
        }

        await lucia.invalidateSession(session.id);

        const sessionCookie = lucia.createBlankSessionCookie();

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return redirect('/sign-in');
    } catch (error) {
    }
};

const validateRequest = cache(
    async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

        if (!sessionId) {
            return { user: null, session: null, };
        }

        const result = await lucia.validateSession(sessionId);

        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id);

                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();

                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
        } catch { }

        return result;
    }
);

const getAuth = validateRequest;

export {
    signUp,
    signIn,
    signOut,
    getAuth
};