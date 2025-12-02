import { useNavigate } from "react-router-dom"
import Input from "../components/Input"
import Button from "../components/Button"

const ItemDetail = () =>{
    const navigate = useNavigate()

    

    return(
        <>
        <div class="item-detail">
        <div class="item-header">
            <div>
                <img src="https://via.placeholder.com/600x400/3498db/ffffff?text=Laptop" alt="Ноутбук Dell XPS 15" class="item-image-large" />
            </div>

            <div class="item-info">
                <span class="item-status">Активно</span>
                
                <h1 class="item-title-large">Ноутбук Dell XPS 15</h1>
                
                <div class="item-seller-info">
                    <div class="seller-avatar">TS</div>
                    <div class="seller-details">
                        <div class="seller-name">techseller</div>
                        <div class="seller-date">Опубликовано: 15 октября 2025</div>
                    </div>
                </div>

                <div class="item-description-full">
                    Мощный ноутбук для работы и игр в отличном состоянии. 
                    
                    
                    <strong>Характеристики:</strong>
                    <ul>
                        <li>Процессор: Intel Core i7-12700H (12 ядер)</li>
                        <li>Оперативная память: 16GB DDR5</li>
                        <li>Видеокарта: NVIDIA GeForce RTX 3050 (4GB)</li>
                        <li>Накопитель: 512GB NVMe SSD</li>
                        <li>Дисплей: 15.6" FHD (1920x1080), 144Hz</li>
                        <li>Операционная система: Windows 11 Pro</li>
                    </ul>

                    
                    Ноутбук используется около года, в идеальном состоянии. Все аксессуары в комплекте: зарядное устройство, коробка, документы. 
                    Гарантия действует еще 1 год.
                </div>

                <div class="price-section">
                    <div class="starting-price">Начальная цена:</div>
                    <div class="current-price">65 000 ₽</div>
                    <div class="highest-bid">Текущая ставка: 70 000 ₽</div>

                    <form class="bid-form">
                        <Input 
                            type="number" 
                            class="bid-input" 
                            placeholder="Введите вашу ставку (мин. 70 001 ₽)"
                            min="70001"
                            step="100"
                        />
                        <Button type="submit" class="btn-bid">Сделать ставку</Button>
                    </form>
                </div>

                <Button class="btn-delete">Удалить товар</Button>
            </div>
        </div>

        <div class="bids-section">
            <div class="bids-header">
                <h2 class="bids-title">История ставок</h2>
                <span class="bids-count">5</span>
            </div>

            <div class="bids-list">
                <div class="bid-item highest-bid-item">
                    <div class="bid-user">
                        <div class="bid-avatar">BB</div>
                        <div class="bid-details">
                            <span class="bid-username">buyer_best</span>
                            <span class="bid-time">2 часа назад</span>
                        </div>
                        <span class="highest-badge">🏆 Лидирует</span>
                    </div>
                    <div class="bid-amount">70 000 ₽</div>
                </div>

                <div class="bid-item">
                    <div class="bid-user">
                        <div class="bid-avatar">JD</div>
                        <div class="bid-details">
                            <span class="bid-username">john_doe</span>
                            <span class="bid-time">5 часов назад</span>
                        </div>
                    </div>
                    <div class="bid-amount">68 000 ₽</div>
                </div>

                <div class="bid-item">
                    <div class="bid-user">
                        <div class="bid-avatar">AL</div>
                        <div class="bid-details">
                            <span class="bid-username">alice_tech</span>
                            <span class="bid-time">1 день назад</span>
                        </div>
                    </div>
                    <div class="bid-amount">67 000 ₽</div>
                </div>

                <div class="bid-item">
                    <div class="bid-user">
                        <div class="bid-avatar">MK</div>
                        <div class="bid-details">
                            <span class="bid-username">mike_k</span>
                            <span class="bid-time">1 день назад</span>
                        </div>
                    </div>
                    <div class="bid-amount">66 000 ₽</div>
                </div>

                <div class="bid-item">
                    <div class="bid-user">
                        <div class="bid-avatar">ST</div>
                        <div class="bid-details">
                            <span class="bid-username">sarah_tech</span>
                            <span class="bid-time">2 дня назад</span>
                        </div>
                    </div>
                    <div class="bid-amount">65 500 ₽</div>
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