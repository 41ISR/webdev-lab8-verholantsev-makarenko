
const ItemCard = ({title, description, price, username, status, imageUrl, highestBid, bidCount}) => {

    return(
         <>
        <div className="items-grid">
            <div className="item-card">
                <img className="item-image" src={imageUrl} />
                <div className="item-content">
                    <span className="status-badge status-active">{status}</span>
                    <h3 className="item-title">{title}</h3>
                    <p className="item-description">{description}</p>
                    <div className="item-footer">
                        <div>
                            <div className="item-price">{price}</div>
                            <div className="bid-info">
                                {highestBid}
                                <span className="bid-count">{bidCount}</span>
                            </div>
                        </div>
                        <div className="item-meta">
                            <span className="item-seller">{username}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ItemCard