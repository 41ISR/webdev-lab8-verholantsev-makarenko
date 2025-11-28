import { Outlet } from "react-router-dom"
import "./Layout.css"
import NavBar from "../components/NavBar"

const Layout = () => {
    return (
        <>
            <NavBar />
            <main>
                <div id="outlet">
                    <Outlet />
                </div>
            </main>

            <footer>
                <p>&copy; 2025 Маркетплейс. Все права защищены.</p>
            </footer>
        </>)
}

export default Layout