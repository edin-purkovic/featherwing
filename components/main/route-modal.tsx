"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

const RouteModal = ({ children, }: { children: React.ReactNode }) => {
    const router = useRouter()

    const handleOpenChange = () => {
        router.back()
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogContent className="w-full min-w-full h-screen sm:min-w-[640px] sm:h-[80%] 2xl:min-w-[1540px] overflow-y-hidden" >
                {children}
            </DialogContent>
        </Dialog>
    )
}

export { RouteModal };