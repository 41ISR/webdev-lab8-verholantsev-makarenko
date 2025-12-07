import { Link } from "react-router-dom"
import { useItemStore } from "../store/useItemStore"
import { useEffect, useState } from "react"

const BidItem = ({ id, amount, itemId, itemTitle, createdAt, isWinning }) => {
    const { items, getItem } = useItemStore()
    const [item, setItem] = useState(null)

    useEffect(() => {
        const loadItem = async () => {
            if (items.length === 0) {
                await getItem()
            }
            const itemIdNum = parseInt(itemId)
            const itemData = items.find((el) => el.id === itemIdNum || el.id === itemId)
            if (itemData) {
                setItem(itemData)
            }
        }
        loadItem()
    }, [itemId, items, getItem])

    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        const now = new Date()
        const diff = now - date
        
        if (diff < 0) return "только что"
        if (diff < 60000) return "только что"
        
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return "только что"
        if (minutes < 60) return `${minutes} ${minutes === 1 ? 'минуту' : minutes < 5 ? 'минуты' : 'минут'} назад`
        if (hours < 24) return `${hours} ${hours === 1 ? 'час' : hours < 5 ? 'часа' : 'часов'} назад`
        return `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'} назад`
    }

    if (!item) return null

    return (
        <div className={`bid-item ${isWinning ? "winning" : ""}`}>
            <img 
                src={item.imageUrl || "https://via.placeholder.com/80x80/3498db/ffffff?text=No+Image"} 
                alt={itemTitle} 
                className="bid-item-image" 
            />
            <div className="bid-item-content">
                <div className="bid-item-header">
                    <Link to={`/item/${itemId}`} className="bid-item-title">{itemTitle}</Link>
                    {isWinning ? (
                        <span className="winning-badge">🏆 Лидирую</span>
                    ) : (
                        <span className="outbid-badge">Перебита</span>
                    )}
                </div>
                <div className="bid-item-meta">
                    <span>⏰ {formatDate(createdAt)}</span>
                    <span>💰 Начальная: {item.price} ₽</span>
                </div>
            </div>
            <div className="bid-item-amount">
                <span className="bid-amount">{amount} ₽</span>
                <span className="bid-status">Моя ставка</span>
                {!isWinning && item.highestBid && (
                    <div className="current-highest">Текущая: {item.highestBid} ₽</div>
                )}
            </div>
        </div>
    )
}

export default BidItem
