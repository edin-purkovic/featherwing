"use server"

import { prisma } from "@/lib/prisma"
import { getAuth } from "./auth";
import { Prisma } from "@prisma/client";

const suggestionBasicQuery = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    userName: true,
    firstName: true,
    lastName: true,
    initials: true,
})

export async function followSuggestion(id: string) {
    const { session } = await getAuth();

    if (!session) {
        throw "Invalid session";
    }

    const result = await prisma.follows.create({
        data: {
            followedById: session.userId,
            followingId: id
        }
    });

}

export async function unfollowSuggestion(id: string) {
    const { session } = await getAuth();

    if (!session) {
        throw "Invalid session";
    }

    const result = await prisma.follows.delete({
        where: {
            followingId_followedById: {
                followedById: session.userId,
                followingId: session.userId
            }
        }
    });
}

export async function getFriendSuggestions() {
    const { session } = await getAuth();

    if (!session) {
        throw "Invalid session";
    }

    return prisma.user.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            id: {
                not: session.userId
            }
        },
        select: suggestionBasicQuery,
    });
}

export type UserSuggestion = Prisma.UserGetPayload<{ select: typeof suggestionBasicQuery }>
