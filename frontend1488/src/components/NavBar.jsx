import { Link, useLocation } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"
import "../pages/Layout.css"

const NavBar = () => {
    const { session } = useUserStore()
    const location = useLocation()

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/"
        }
        return location.pathname.startsWith(path)
    }

    return (
        <header>
            <nav>
                <Link className="logo" to={"/"}>🛒 Маркетплейс1488</Link>
                <ul className="nav-links">
                    <li>
                        <Link className={isActive("/") ? "active" : ""} to={"/"}>Товары</Link>
                    </li>
                    {!session?.user ? (
                        <>
                            <li>
                                <Link className={isActive("/signin") ? "active" : ""} to={"/signin"}>Войти</Link>
                            </li>
                            <li>
                                <Link className={isActive("/signup") ? "active" : ""} to={"/signup"}>Регистрация</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className={isActive("/bids") ? "active" : ""} to={"/bids"}>Мои ставки</Link>
                            </li>
                            <li>
                                <Link className={isActive("/createitem") ? "active" : ""} to={"/createitem"}>+ Создать товар</Link>
                            </li>
                            <li style={{ color: "white", padding: "8px 16px" }}>
                                {session.user?.username}
                            </li>
                            <li>
                                <Link to={"/logout"}>Выйти</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

                export default NavBar