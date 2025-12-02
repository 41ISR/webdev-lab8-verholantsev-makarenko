const myBids = ({ bids }) => {
    return (


        <div className="bid-item">
            <img src="https://via.placeholder.com/80x80/e74c3c/ffffff?text=iPhone" alt="iPhone" className="bid-item-image" />
            <div className="bid-item-content">
                <div className="bid-item-header">
                    <Link href="/items/2" className="bid-item-title">iPhone 14 Pro 256GB</Link>
                    <span className="outbid-badge">Перебита</span>
                </div>
                <div className="bid-item-meta">
                    <span>⏰ 1 день назад</span>
                    <span>💰 Начальная: 85 000 ₽</span>
                </div>
            </div>
            <div className="bid-item-amount">
                <span className="bid-amount">88 000 ₽</span>
                <span className="bid-status">Моя ставка</span>
                <div className="current-highest">Текущая: 90 000 ₽</div>
            </div>
        </div>
    )
}

export default myBids
