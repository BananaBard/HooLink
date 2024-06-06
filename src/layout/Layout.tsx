import { ReactNode } from "react"
import Header from "../components/ui/Header"
import Footer from "../components/ui/Footer"

interface LayoutProps {
    children: ReactNode
}

export default function Layout({children}: LayoutProps) {
    return (
        <main className='flex flex-col justify-between min-h-screen'>
            <Header/>
                {children}
            <Footer/>
        </main>
    )
}

