import { Lucia } from 'lucia';
import { prisma } from './prisma';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production',
        },
    },
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email,
            userName: attributes.userName,
            firstName: attributes.firstName,
            lastName: attributes.lastName,
            initials: attributes.initials,
        };
    },
});

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    initials: string;
}