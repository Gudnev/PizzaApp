// Импорт компонента Outlet из react-router-dom
// Outlet нужен для отображения вложенных маршрутов (например, /auth/login или /auth/register)
import { Outlet } from 'react-router-dom';

// Импорт CSS-модуля с локальными стилями для макета страницы авторизации
import styles from './AuthLayout.module.css';

// Компонент AuthLayout — обёртка (layout) для всех страниц авторизации
export function AuthLayout() {
	return (
		// Основной контейнер layout'а
		<div className={styles['layout']}>

			{/* Логотип компании, обычно отображается сверху или сбоку */}
			<div className={styles['logo']}>
				<img src="/logo.svg" alt="Логотип компании" />
			</div>

			{/* Контентная часть: сюда будут подставляться вложенные страницы (login, register и т.д.) */}
			<div className={styles['content']}>
				<Outlet /> {/* Подключение вложенного маршрута */}
			</div>
		</div>
	);
}