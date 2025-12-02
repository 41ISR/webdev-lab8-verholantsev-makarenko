import "./ItemsList.css"
import { useEffect } from "react"
import { useItemStore } from "../store/useItemStore"
import { useUserStore } from "../store/useUserStore"
import ItemCard from "../components/ItemCard"
import Stats from "../components/Stats"

const ItemsList = () => {
    const { items, getItem } = useItemStore()
    // const [timerId, setTimerId] = useState(undefined)
    // const { session } = useUserStore()
    useEffect(() => {
        getItem()
        // setTimerId(setInterval(()=> {getItem()}, 5000))
        // return () => {clearInterval(timerId)}
    }, [])
    return (
        <>
            <div className="page-header">
                <h1>Все товары</h1>
            </div>
            <Stats/>

            {/* <div className="stats">
                <div className="stat-item">
                    <span className="stat-value">{totalitems}</span>
                    <span className="stat-label">Товаров</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{totalbids}</span>
                    <span className="stat-label">Ставок</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{activeitems}</span>
                    <span className="stat-label">Активных</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{averageitemprice}</span>
                    <span className="stat-label">Средняя цена</span>
                </div>
            </div> */}
            <div className="items-grid">
                {items.map((item, i)=> (
                    <ItemCard key={i} {...item} />
                ))} 
                </div>
        </>
    )
}

export default ItemsList