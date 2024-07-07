"use client"

import { PropsWithChildren } from "react";

interface LayoutLeftProps {}

const LayoutLeft = ({ children, ...props }: PropsWithChildren<LayoutLeftProps>) => {
    return (
        <div className="relative w-[50px] min-w-[50px] lg:w-[280px] lg:min-w-[280px] hidden sm:block">
            {children}
        </div>
    )
}

interface LayoutRightProps {}

const LayoutRight = ({ children, ...props }: PropsWithChildren<LayoutRightProps>) => {
    return (
        <div className="grow">
            {children}
        </div>
    )
}


interface LayoutProps {}

const Layout = ({ children, ...props }: PropsWithChildren<LayoutProps>) => {
    return (
        <div className="flex max-w-[1080px] w-full">
            {children}
        </div>
    )
};

export { Layout, LayoutLeft, LayoutRight };