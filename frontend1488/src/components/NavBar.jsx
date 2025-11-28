import { Link } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"
import "../pages/Layout.css"

const NavBar = () => {
    const { session } = useUserStore()

    return (
        <header>
            <nav>
                <Link className="logo" to={"/"}>🛒 Маркетплейс1488</Link>
                <ul className="nav-links">
                    <li>
                        <Link className="active" to={"/"}>Товары</Link>
                    </li>
                    {!session?.user ? (
                        <>
                            <li>
                                <Link to={"/SignIn"}>Войти</Link>
                            </li>
                            <li>
                                <Link to={"/SignUp"}>Регистрация</Link>
                                </li>
                                </>
                                ) : (
                                <>
                                    <li>
                                        <Link to={"/mybids"}>Мои ставки</Link>
                                    </li>
                                    <li>
                                        <Link to={"/createitem"}>+ Создать товар</Link>
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