import { Link, Outlet } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import "./CreateItem.css"
import { api } from "../api/api"
import { useItemStore } from "../store/useItemStore"

const CreateItem = () => {
    const { getItem } = useItemStore()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const item = {
            title: e.target.title.value,
            description: e.target.description.value,
            price: e.target.price.value,
            imageUrl: e.target.imageUrl.value
        }

        try {
            await api.sendItem(item)
            await getItem()
            e.target.reset()
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <>
            <div classNameName="page-header">
                <h1>Создать новый товар</h1>
            </div>

            <div classNameName="form-container">
                <form onSubmit={handleSubmit} id="create-item-form">
                    <div classNameName="form-group">
                        <label classNameName="form-label">
                            Название товара <span classNameName="required">*</span>
                        </label>
                        <Input 
                            type="text" 
                            classNameName="form-input" 
                            name="title"
                            placeholder="Например: iPhone 14 Pro 256GB"
                            maxLength="100"
                            required
                        />
                        <div classNameName="char-counter">
                            <span classNameName="current">0</span> / 100
                        </div>
                    </div>

                    <div classNameName="form-group">
                        <label classNameName="form-label">
                            Описание <span classNameName="required">*</span>
                        </label>
                        <textarea 
                            classNameName="form-textarea" 
                            name="description"
                            placeholder="Подробно опишите товар, его состояние, характеристики..."
                            maxLength="1000"
                            required
                        ></textarea>
                        <div classNameName="char-counter">
                            <span classNameName="current">0</span> / 1000
                        </div>
                        <div classNameName="form-hint">
                            Чем подробнее описание, тем больше шансов продать товар
                        </div>
                    </div>

                    <div classNameName="form-group">
                        <label classNameName="form-label">
                            Начальная цена <span classNameName="required">*</span>
                        </label>
                        <div classNameName="input-group">
                            <Input 
                                type="number" 
                                classNameName="form-input with-prefix" 
                                name="price"
                                placeholder="5000"
                                min="1"
                                required
                            />
                            <span classNameName="input-prefix">₽</span>
                        </div>
                        <div classNameName="form-hint">
                            Укажите минимальную цену, с которой начнутся торги
                        </div>
                    </div>

                    <div classNameName="form-group">
                        <label classNameName="form-label">
                            URL изображения
                        </label>
                        <Input 
                            type="url" 
                            classNameName="form-input" 
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg"
                        />
                        <div classNameName="form-hint">
                            Вставьте ссылку на изображение товара (опционально)
                        </div>
                        <div classNameName="image-preview" id="image-preview">
                            <img alt="Предпросмотр"/>
                        </div>
                    </div>

                    <div classNameName="form-actions">
                        <Link href="/" classNameName="btn-cancel">Отмена</Link>
                        <Button type="submit" classNameName="btn-submit">Создать товар</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateItem