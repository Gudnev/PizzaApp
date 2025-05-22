// Импорт стилей из CSS-модуля (локальные стили для компонента)
import styles from './CartItem.module.css';

// Импорт хука useDispatch из Redux — используется для отправки действий (actions)
import { useDispatch } from 'react-redux';

// Тип для функции dispatch из нашего Redux-хранилища
import { AppDispath } from '../../store/store';

// Импорт всех действий для корзины (add, remove, delete) из cart.slice
import { cartActions } from '../../store/cart.slice';

// Типизация props, которые приходят в компонент
import { CartItemProps } from './CartItem.props';

// Объявление функционального компонента с типизированными props
function CartItem(props: CartItemProps) {
	// Инициализируем dispatch с типом AppDispatch (чтобы TypeScript не ругался)
	const dispatch = useDispatch<AppDispath>();

	// Функция для увеличения количества товара
	const increase = () => {
		dispatch(cartActions.add(props.id)); // отправляем action "add" с id товара
	};

	// Функция для уменьшения количества товара
	const descrease = () => {
		dispatch(cartActions.remove(props.id)); // отправляем action "remove" с id товара
	};

	// Функция для полного удаления товара из корзины
	const remove = () => {
		dispatch(cartActions.delete(props.id)); // отправляем action "delete" с id товара
	};

	return (
		<div className={styles['item']}>
			{/* Блок с изображением товара — задаётся через backgroundImage */}
			<div
				className={styles['image']}
				style={{ backgroundImage: `url('${props.image}')` }}
			></div>

			{/* Блок с описанием товара: название и цена */}
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price}&nbsp;₽</div>
			</div>

			{/* Блок с кнопками управления товаром в корзине */}
			<div className={styles['actions']}>

				{/* Кнопка уменьшения количества товара */}
				<button className={styles['minus']} onClick={descrease}>
					<img src="/minus-icon.svg" alt="Удалить из корзины" />
				</button>

				{/* Количество товара в корзине */}
				<div className={styles['number']}>{props.count}</div>

				{/* Кнопка увеличения количества товара */}
				<button className={styles['plus']} onClick={increase}>
					<img src="/plus-icon.svg" alt="Добавить в корзину" />
				</button>

				{/* Кнопка полного удаления товара */}
				<button className={styles['remove']} onClick={remove}>
					<img src="/delete-icon.svg" alt="Удалить все" />
				</button>
			</div>
		</div>
	);
}

// Экспорт компонента по умолчанию
export default CartItem;