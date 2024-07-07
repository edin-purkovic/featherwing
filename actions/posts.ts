"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { getAuth } from "./auth";
import { Prisma } from "@prisma/client";

function toPlainObject(object: any) {
    return structuredClone(object);
    // return JSON.parse(JSON.stringify(object));
}

export async function createPost(text: string) {
    const { session } = await getAuth();

    if (!session) {
        throw "Invalid session";
    }

    const post = await prisma.post.create({
        data: {
            content: text,
            userId: session?.userId,
            likesCount: 0
        }
    })

    revalidatePath("/home")

    return post;
}

const userBasicQuery = Prisma.validator<Prisma.UserSelect>()({
    firstName: true,
    lastName: true,
    userName: true,
})

const postWithUserQuery = Prisma.validator<Prisma.PostInclude>()({
    user: {
        select: userBasicQuery
    },
    comments: true,
})

export async function getPosts() {
    const { session } = await getAuth();

    if (!session) {
        throw "Invalid session";
    }

    return prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: postWithUserQuery
    });
}

export async function getUserPosts(userId?: string) {
    const { session } = await getAuth();

    if (!session) {
        throw "Invalid session";
    }

    return prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: postWithUserQuery
    });
}

export async function getVisiblePosts() {
    const { session } = await getAuth();

    if (!session) {
        throw "Invalid session";
    }

    return prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: postWithUserQuery
    });
}

export async function getPost(postId: string) {
    const { session } = await getAuth();

    if (!session) {
        throw "Invalid session";
    }

    return prisma.post.findFirstOrThrow({
        where: {
            id: postId
        },
        include: postWithUserQuery
    });
}

export async function deletePost(postId: string) {
    const { session } = await getAuth();

    if (!session) {
        throw "Invalid session";
    }

    await prisma.post.delete({
        where: {
            id: postId,
            userId: session.userId
        }
    });

    revalidatePath("/home")
}

export type PostWithUser = Prisma.PostGetPayload<{ include: typeof postWithUserQuery }>

