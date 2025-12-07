import { useNavigate } from "react-router-dom"

const ItemCard = ({id, title, description, price, username, status, imageUrl, highestBid, bidCount}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/item/${id}`)
    }

    return (
        <div onClick={handleClick} className="item-card">
            <img className="item-image" src={imageUrl || "https://via.placeholder.com/300x200/ecf0f1/95a5a6?text=No+Image"} alt={title} />
            <div className="item-content">
                <span className="status-badge status-active">{status}</span>
                <h3 className="item-title">{title}</h3>
                <p className="item-description">{description}</p>
                <div className="item-footer">
                    <div>
                        <div className="item-price">{price} ₽</div>
                        {highestBid && (
                            <div className="bid-info">
                                Текущая ставка: {highestBid} ₽
                                {bidCount > 0 && <span className="bid-count">{bidCount}</span>}
                            </div>
                        )}
                    </div>
                    <div className="item-meta">
                        <span className="item-seller">Продавец: {username}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard