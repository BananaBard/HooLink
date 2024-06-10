import Header from "../components/ui/Header"
import Footer from "../components/ui/Footer"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <main className='flex flex-col justify-between min-h-screen'>
            <Header/>
                <Outlet/>
            <Footer/>
        </main>
    )
}

