// Импортируем компоненты и хуки из react-router-dom:
// - NavLink — ссылка с активным стилем
// - Outlet — отображает вложенные маршруты
// - useNavigate — для программной навигации (например, после выхода)
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

// Импорт CSS-модуля для компонента Layout — стили применяются локально
import styles from './Layout.module.css';

// Импорт кастомного компонента кнопки (например, на основе <button>)
import Button from '../../components/Button/Button';

// Импорт библиотеки classnames — помогает объединять CSS-классы с условиями
import cn from 'classnames';

// Импорт хуков из react-redux:
// - useDispatch — позволяет отправлять actions
// - useSelector — позволяет читать данные из хранилища
import { useDispatch, useSelector } from 'react-redux';

// Импорт типов Redux-хранилища:
// - AppDispath — тип функции dispatch
// - RootState — общий тип состояния всего Redux store
import { AppDispath, RootState } from '../../store/store';

// Импорт действий из слайса пользователя:
// - getProfile — асинхронное получение данных профиля
// - userActions — объект с действиями (например, logout)
import { getProfile, userActions } from '../../store/user.slice';

// Импорт хука useEffect — используется для запуска побочного эффекта при монтировании
import { useEffect } from 'react';

// Основной компонент макета (layout) приложения
export function Layout() {
	// Хук навигации — используется, чтобы перейти на другую страницу программно
	const navigate = useNavigate();

	// Получаем функцию dispatch из Redux с правильным типом
	const dispatch = useDispatch<AppDispath>();

	// Получаем профиль пользователя из состояния Redux
	const profile = useSelector((s: RootState) => s.user.profile);

	// Получаем список товаров в корзине из состояния Redux
	const items = useSelector((s: RootState) => s.cart.items);

	// Загружаем профиль пользователя при первом отображении компонента
	useEffect(() => {
		dispatch(getProfile()); // Запускаем action getProfile
	}, [dispatch]); // эффект зависит только от dispatch

	// Функция выхода пользователя (logout)
	const logout = () => {
		dispatch(userActions.logout());   // очищаем пользователя в Redux
		navigate('/auth/login');          // перенаправляем на страницу входа
	};

	// Возвращаем JSX — разметку layout'а
	return (
		<div className={styles['layout']}>
			{/* Левая боковая панель */}
			<div className={styles['sidebar']}>

				{/* Блок с данными пользователя */}
				<div className={styles['user']}>
					<img
						className={styles['avatar']}
						src="/avatar.png"
						alt="Аватар пользователя"
					/>
					{/* Имя пользователя (если есть) */}
					<div className={styles['name']}>
						{profile?.name}
					</div>
					{/* Email пользователя (если есть) */}
					<div className={styles['email']}>
						{profile?.email}
					</div>
				</div>

				{/* Блок навигации */}
				<div className={styles['menu']}>

					{/* Ссылка на главную страницу (меню продуктов) */}
					<NavLink
						to="/"
						className={({ isActive }) =>
							cn(styles['link'], { [styles.active]: isActive })
						}
					>
						<img src="/menu-icon.svg" alt="Иконка меню" />
						Меню
					</NavLink>

					{/* Ссылка на страницу корзины */}
					<NavLink
						to="/cart"
						className={({ isActive }) =>
							cn(styles['link'], { [styles.active]: isActive })
						}
					>
						<img src="/cart-icon.svg" alt="Иконка корзины" />
						Корзина
						{/* Показываем общее количество товаров в корзине */}
						<span className={styles['cart-count']}>
							{items.reduce((acc, item) => acc + item.count, 0)}
						</span>
					</NavLink>
				</div>

				{/* Кнопка выхода из аккаунта */}
				<Button className={styles['exit']} onClick={logout}>
					<img src="/exit-icon.svg" alt="Иконка выхода" />
					Выход
				</Button>
			</div>

			{/* Правая часть — основное содержимое страницы */}
			<div className={styles['content']}>
				{/* Здесь отрисуется вложенный маршрут */}
				<Outlet />
			</div>
		</div>
	);
}
