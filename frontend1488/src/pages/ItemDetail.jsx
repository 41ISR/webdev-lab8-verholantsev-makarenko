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
    const { items, getItems } = useItemStore()
    const handleDelete = async () => {
        await api.deleteItem(id)
        await getItems()
    }
    const hanldeBid =  async () =>{
        await api.getBidsDetails(id)
        await getItems()
    } 
    useEffect(() => {
        setItem(items.find((el) => el.id == id))
    }, [id, items])


    return (
        <>
            <div class="item-detail">
                <div class="item-header">
                    <div>
                        <img src="https://via.placeholder.com/600x400/3498db/ffffff?text=Laptop" alt="Ноутбук Dell XPS 15" class="item-image-large" />
                    </div>

                    <div class="item-info">
                        <span class="item-status">{items.status}</span>

                        <h1 class="item-title-large">{items.title}</h1>

                        <div class="item-seller-info">
                            <div class="seller-avatar">{items.imageUrl}</div>
                            <div class="seller-details">
                                <div class="seller-name">{item.username}</div>
                                <div class="seller-date">{item.createdAt}</div>
                            </div>
                        </div>

                        <div class="item-description-full">
                            {item.description}
                        </div>

                        <div class="price-section">
                            <div class="starting-price">Начальная цена:</div>
                            <div class="current-price">{items.price}</div>
                            <div class="highest-bid">Текущая ставка: {items.highestBid}</div>

                            <form class="bid-form">
                                <Input
                                    type="number"
                                    class="bid-input"
                                    placeholder="Введите вашу ставку (мин. 70 001 ₽)"
                                    min="70001"
                                    step="100"
                                />
                                <Button onClick={hanldeBid} type="submit" class="btn-bid">Сделать ставку</Button>
                            </form>
                        </div>

                        <Button onClick={handleDelete} class="btn-delete">Удалить товар</Button>
                    </div>
                </div>

                <div class="bids-section">
                    <div class="bids-header">
                        <h2 class="bids-title">История ставок</h2>
                        <span class="bids-count">{items.bidCount}</span>
                    </div>

                    <div class="bids-list">
                        <div class="bid-item highest-bid-item">
                            <div class="bid-user">
                                <div class="bid-avatar">BB</div>
                                <div class="bid-details">
                                    <span class="bid-username">{items.username}</span>
                                    <span class="bid-time">{items.createdAt}</span>
                                </div>

                                <span class="highest-badge">🏆 Лидирует</span>
                            </div>
                            <div class="bid-amount">70 000 ₽</div>
                        </div>

                    </div>

                    <div class="no-bids">
                        <p>Ставок пока нет. Станьте первым!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemDetail