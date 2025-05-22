// Импорт компонента Link из react-router-dom — нужен для перехода по маршрутам без перезагрузки страницы
import { Link } from 'react-router-dom';

// Импорт локальных стилей из CSS-модуля
import styles from './ProductCard.module.css';

// Импорт типа пропсов для компонента ProductCard
import { ProductCardProps } from './ProductCard.props';

// Импорт типа MouseEvent из React — используется для типизации событий клика
import { MouseEvent } from 'react';

// Импорт хука dispatch из Redux для отправки действий
import { useDispatch } from 'react-redux';

// Импорт типа AppDispath — типизированная функция dispatch из нашего стора
import { AppDispath } from '../../store/store';

// Импорт действий для корзины (добавление товара)
import { cartActions } from '../../store/cart.slice';


// Основной компонент ProductCard
function ProductCard(props: ProductCardProps) {
	// Получаем функцию dispatch с правильным типом
	const dispatch = useDispatch<AppDispath>();

	// Обработчик клика по кнопке "Добавить в корзину"
	const add = (e: MouseEvent) => {
		e.preventDefault(); // предотвращаем переход по ссылке при клике на кнопку
		dispatch(cartActions.add(props.id)); // отправляем action на добавление товара в корзину
	};

	return (
		// Оборачиваем всю карточку в ссылку: при клике откроется страница конкретного товара
		<Link to={`/product/${props.id}`} className={styles['link']}>
			<div className={styles['card']}>

				{/* Верхняя часть карточки с изображением товара */}
				<div
					className={styles['head']}
					style={{ backgroundImage: `url('${props.image}')` }}
				>

					{/* Отображение цены */}
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>

					{/* Кнопка "Добавить в корзину" */}
					<button className={styles['add-to-cart']} onClick={add}>
						<img src="/cart-button-icon.svg" alt="Добавить в корзину" />
					</button>

					{/* Рейтинг товара */}
					<div className={styles['rating']}>
						{props.rating}&nbsp;
						<img src="/star-icon.svg" alt="Иконка звезды" />
					</div>
				</div>

				{/* Нижняя часть карточки — название и описание */}
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.name}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
}

// Экспорт компонента по умолчанию
export default ProductCard;