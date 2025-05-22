// Хуки для работы с Redux: useDispatch — отправка действий, useSelector — чтение состояния
import { useDispatch, useSelector } from 'react-redux';

// Заголовок страницы (настраиваемый компонент <h1>)
import Headling from '../../components/Headling/Headling';

// Типы для Redux-хранилища: dispatch и общее состояние
import { AppDispath, RootState } from '../../store/store';

// Компонент одного товара в корзине
import CartItem from '../../components/CartItem/CartItem';

// Хуки React: useEffect — для загрузки при изменениях, useState — для локального состояния
import { useEffect, useState } from 'react';

// Интерфейс товара: содержит id, name, image, price, description и т.д.
import { Product } from '../../interfaces/product.interface';

// Axios — для HTTP-запросов к API
import axios from 'axios';

// Базовый адрес API (например, http://localhost:3000/api)
import { PREFIX } from '../../helpers/API';

// Стили для компонента корзины
import styles from './Cart.module.css';

// Кастомная кнопка
import Button from '../../components/Button/Button';

// Навигация между страницами
import { useNavigate } from 'react-router-dom';

// Действия для корзины: очистка, добавление, удаление и т.д.
import { cartActions } from '../../store/cart.slice';

// Фиксированная стоимость доставки
const DELIVERY_FEE = 169;

// Основной компонент страницы "Корзина"
export function Cart() {
	// Список всех товаров с полными данными (название, цена и т.д.)
	const [cartProducts, setCardProducts] = useState<Product[]>([]);

	// Товары в корзине из Redux (только id и count)
	const items = useSelector((s: RootState) => s.cart.items);

	// JWT токен пользователя — нужен для оформления заказа
	const jwt = useSelector((s: RootState) => s.user.jwt);

	// Redux dispatch и навигация
	const dispatch = useDispatch<AppDispath>();
	const navigate = useNavigate();

	// Считаем итоговую сумму всех товаров без доставки
	const total = items
		.map(i => {
			// Ищем товар с полными данными по id
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) return 0; // если товар не найден — 0
			return i.count * product.price; // цена * количество
		})
		.reduce((acc, i) => acc + i, 0); // суммируем

	// Получение одного товара с сервера по id
	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	// Загружаем все товары из корзины (по id из Redux)
	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCardProducts(res); // сохраняем результат в state
	};

	// Оформление заказа
	const checkout = async () => {
		await axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}` // передаём токен авторизации
			}
		});

		dispatch(cartActions.clean()); // очищаем корзину после оформления
		navigate('/success'); // переходим на страницу успешного оформления
	};

	// Загружаем полные данные о товарах при изменении корзины
	useEffect(() => {
		loadAllItems();
	}, [items]);

	return (
		<>
			{/* Заголовок страницы */}
			<Headling className={styles['headling']}>Корзина</Headling>

			{/* Список товаров в корзине */}
			{items.map(i => {
				const product = cartProducts.find(p => p.id === i.id);
				if (!product) return null;

				// Отображаем один товар в корзине
				return (
					<CartItem
						key={product.id}
						count={i.count}
						{...product}
					/>
				);
			})}

			{/* Сумма товаров (без доставки) */}
			<div className={styles['line']}>
				<div className={styles['text']}>Итог</div>
				<div className={styles['price']}>
					{total}&nbsp;<span>₽</span>
				</div>
			</div>

			{/* Разделительная линия */}
			<hr className={styles['hr']} />

			{/* Стоимость доставки */}
			<div className={styles['line']}>
				<div className={styles['text']}>Доставка</div>
				<div className={styles['price']}>
					{DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>

			{/* Разделительная линия */}
			<hr className={styles['hr']} />

			{/* Общая сумма заказа с учётом доставки */}
			<div className={styles['line']}>
				<div className={styles['text']}>
					Итог <span className={styles['total-count']}>({items.length})</span>
				</div>
				<div className={styles['price']}>
					{total + DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>

			{/* Кнопка оформления заказа */}
			<div className={styles['checkout']}>
				<Button appearence="big" onClick={checkout}>
					оформить
				</Button>
			</div>
		</>
	);
}
