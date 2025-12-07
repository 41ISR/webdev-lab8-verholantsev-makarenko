import { useNavigate, useParams, Link } from "react-router-dom"
import Input from "../components/Input"
import Button from "../components/Button"
import { useItemStore } from "../store/useItemStore"
import { useUserStore } from "../store/useUserStore"
import { useEffect, useState } from "react"
import { api } from "../api/api"
import "./ItemDetail.css"

const ItemDetail = () => {
    const { id } = useParams()
    const [item, setItem] = useState(undefined)
    const [bids, setBids] = useState([])
    const [bidAmount, setBidAmount] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { items, getItem, bids: storeBids, fetchBids, createBid } = useItemStore()
    const { session } = useUserStore()

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

    const getInitials = (username) => {
        if (!username) return "?"
        return username.substring(0, 2).toUpperCase()
    }

    const handleDelete = async () => {
        if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
            try {
                await api.deleteItem(id)
                await getItem()
                navigate("/")
            } catch (error) {
                alert(error.response?.data?.error || "Ошибка при удалении товара")
            }
        }
    }

    const handleBidSubmit = async (e) => {
        e.preventDefault()
        if (!bidAmount || parseFloat(bidAmount) <= 0) {
            alert("Введите корректную сумму ставки")
            return
        }

        const minBid = item.highestBid || item.price
        if (parseFloat(bidAmount) <= minBid) {
            alert(`Ставка должна быть выше ${minBid} ₽`)
            return
        }

        setLoading(true)
        try {
            await createBid(id, parseFloat(bidAmount))
            setBidAmount("")
            await getItem()
            const updatedBids = await fetchBids(id)
            setBids(updatedBids)
        } catch (error) {
            alert(error.response?.data?.error || "Ошибка при создании ставки")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            await getItem()
            const bidsData = await fetchBids(id)
            setBids(bidsData)
        }
        loadData()
    }, [id, fetchBids])

    useEffect(() => {
        const itemIdNum = parseInt(id)
        const itemData = items.find((el) => el.id === itemIdNum || el.id === id)
        if (itemData) {
            setItem(itemData)
        }
    }, [id, items])

    if (!item) 
        return <div>Загрузка...</div>

    const isOwner = session?.user && (session.user.id === item.userId || session.user.id === parseInt(item.userId))
    const canBid = session && !isOwner && item.status === "active"
    const minBid = item.highestBid || item.price
    const highestBidAmount = bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : null

    return (
        <>
            <Link to="/" className="back-link">← Вернуться к списку товаров</Link>
            <div className="item-detail">
                <div className="item-header">
                    <div>
                        <img 
                            src={item.imageUrl || "https://via.placeholder.com/600x400/3498db/ffffff?text=No+Image"} 
                            alt={item.title}
                            className="item-image-large" 
                        />
                    </div>

                    <div className="item-info">
                        <span className="item-status">{item.status}</span>

                        <h1 className="item-title-large">{item.title}</h1>

                        <div className="item-seller-info">
                            <div className="seller-avatar">{getInitials(item.username)}</div>
                            <div className="seller-details">
                                <div className="seller-name">{item.username}</div>
                                <div className="seller-date">Опубликовано: {formatDate(item.createdAt)}</div>
                            </div>
                        </div>

                        <div className="item-description-full">
                            {item.description}
                        </div>

                        <div className="price-section">
                            <div className="starting-price">Начальная цена:</div>
                            <div className="current-price">{item.price} ₽</div>
                            {item.highestBid && (
                                <div className="highest-bid">Текущая ставка: {item.highestBid} ₽</div>
                            )}

                            {canBid && (
                                <form className="bid-form" onSubmit={handleBidSubmit}>
                                    <Input
                                        type="number"
                                        className="bid-input"
                                        placeholder={`Введите вашу ставку (мин. ${minBid + 1} ₽)`}
                                        min={minBid + 1}
                                        step="100"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        disabled={loading}
                                    />
                                    <Button type="submit" className="btn-bid" disabled={loading}>
                                        {loading ? "Отправка..." : "Сделать ставку"}
                                    </Button>
                                </form>
                            )}

                            {!session && (
                                <p style={{ color: "#7f8c8d", fontSize: "14px" }}>
                                    Войдите, чтобы сделать ставку
                                </p>
                            )}
                        </div>

                        {isOwner && (
                            <Button onClick={handleDelete} className="btn-delete">Удалить товар</Button>
                        )}
                    </div>
                </div>

                <div className="bids-section">
                    <div className="bids-header">
                        <h2 className="bids-title">История ставок</h2>
                        <span className="bids-count">{item.bidCount || 0}</span>
                    </div>

                    {bids.length > 0 ? (
                        <div className="bids-list">
                            {bids.map((bid) => {
                                const isHighest = bid.amount === highestBidAmount
                                return (
                                    <div 
                                        key={bid.id} 
                                        className={`bid-item ${isHighest ? "highest-bid-item" : ""}`}
                                    >
                                        <div className="bid-user">
                                            <div className="bid-avatar">{getInitials(bid.username)}</div>
                                            <div className="bid-details">
                                                <span className="bid-username">{bid.username}</span>
                                                <span className="bid-time">{formatDate(bid.createdAt)}</span>
                                            </div>
                                            {isHighest && (
                                                <span className="highest-badge">🏆 Лидирует</span>
                                            )}
                                        </div>
                                        <div className="bid-amount">{bid.amount} ₽</div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="no-bids">
                            <p>Ставок пока нет. Станьте первым!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ItemDetail