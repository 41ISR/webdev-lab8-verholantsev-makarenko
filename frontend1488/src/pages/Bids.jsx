import { Link } from "react-router-dom"
import "./Bids.css"
import { useItemStore } from "../store/useItemStore"
import { useEffect } from "react"

const Bids = () => {
    const { myBids, fetchMyBids } = useItemStore()

    useEffect(() => {
        fetchMyBids()

    }, [])
    return (

        <>


            <div className="page-header">
                <h1>Мои ставки</h1>
                <p className="page-subtitle">История ваших ставок на товары</p>
            </div>

            <div className="bids-summary">
                <div className="summary-card">
                    <span className="summary-value">{ }</span>
                    <span className="summary-label">Всего ставок</span>
                </div>
                <div className="summary-card winning">
                    <span className="summary-value">{ }</span>
                    <span className="summary-label">Лидирующих ставок</span>
                </div>
                <div className="summary-card">
                    <span className="summary-value">{ }</span>
                    <span className="summary-label">Общая сумма</span>
                </div>
            </div>


{
    myBids.length > 0 ? ( <div className="bids-list">
                {myBids.map((Bids, i) => (
                    <Bids key={i} {...Bids} />
                ))}
            </div>) :
            (<div className="no-bids">
                <div className="no-bids-icon">💸</div>
                <h2>Вы еще не делали ставок</h2>
                <p>Просмотрите доступные товары и сделайте первую ставку!</p>
                <Link to="/" className="btn-browse">Посмотреть товары</Link>
            </div>)
}
           

            
        </>
    )
}

export default Bids




