import { useNavigate, useParams } from "react-router-dom"
import Input from "../components/Input"
import Button from "../components/Button"
import { useItemStore } from "../store/useItemStore"
import { useEffect, useState } from "react"
import { api } from "../api/api"

const ItemDetail = () => {
    const { id } = useParams()
    const [item, setItem] = useState(undefined)
    const navigate = useNavigate()
    const { items, getItem } = useItemStore()
    const handleDelete = async () => {
        await api.deleteItem(id)
        await getItem()
    }
    const hanldeBid =  async () =>{
        await api.getBidsDetails(id)
        await getItem()
    } 
    useEffect(() => {
        setItem(items.find((el) => el.id == id))
    }, [id, items])

    useEffect(() => {
       getItem()
    }, [])

    if (!item) 
        return <></>

    
    return (
        <>
            <div className="item-detail">
                <div className="item-header">
                    <div>
                        <img src="https://via.placeholder.com/600x400/3498db/ffffff?text=Laptop" className="item-image-large" />
                    </div>

                    <div className="item-info">
                        <span className="item-status">{item.status}</span>

                        <h1 className="item-title-large">{item.title}</h1>

                        <div className="item-seller-info">
                            <div className="seller-avatar">{item.imageUrl}</div>
                            <div className="seller-details">
                                <div className="seller-name">{item.username}</div>
                                <div className="seller-date">{item.createdAt}</div>
                            </div>
                        </div>

                        <div className="item-description-full">
                            {item.description}
                        </div>

                        <div className="price-section">
                            <div className="starting-price">Начальная цена:</div>
                            <div className="current-price">{item.price}</div>
                            <div className="highest-bid">Текущая ставка: {item.highestBid}</div>

                            <form className="bid-form">
                                <Input
                                    type="number"
                                    className="bid-input"
                                    placeholder="Введите вашу ставку (мин. 70 001 ₽)"
                                    min="70001"
                                    step="100"
                                />
                                <Button onClick={hanldeBid} type="submit" className="btn-bid">Сделать ставку</Button>
                            </form>
                        </div>

                        <Button onClick={handleDelete} className="btn-delete">Удалить товар</Button>
                    </div>
                </div>

                <div className="bids-section">
                    <div className="bids-header">
                        <h2 className="bids-title">История ставок</h2>
                        <span className="bids-count">{item.bidCount}</span>
                    </div>

                    <div className="bids-list">
                        <div className="bid-item highest-bid-item">
                            <div className="bid-user">
                                <div className="bid-avatar"></div>
                                <div className="bid-details">
                                    <span className="bid-username">{item.username}</span>
                                    <span className="bid-time">{item.createdAt}</span>
                                </div>

                                <span className="highest-badge">🏆 Лидирует</span>
                            </div>
                            <div className="bid-amount">70 000 ₽</div>
                        </div>

                    </div>

                    <div className="no-bids">
                        <p>Ставок пока нет. Станьте первым!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemDetail