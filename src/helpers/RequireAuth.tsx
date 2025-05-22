// Импортируем ReactNode — тип для дочернего содержимого (текст, элементы и т.д.)
import { ReactNode } from 'react';

// Импорт хука useSelector — нужен для доступа к данным из Redux store
import { useSelector } from 'react-redux';

// Импорт компонента Navigate — используется для редиректа на другой маршрут
import { Navigate } from 'react-router-dom';

// Импорт типа RootState — глобальный тип состояния Redux
import { RootState } from '../store/store';

// Компонент RequireAuth — защищает маршруты от неавторизованных пользователей
// Принимает проп children, который должен быть ReactNode (например, <Page />)
export const RequireAuth = ({ children }: { children: ReactNode }) => {
	// Получаем JWT токен из Redux хранилища (в частности из s.user.jwt)
	const jwt = useSelector((s: RootState) => s.user.jwt);

	// Если токена нет — редиректим пользователя на страницу входа
	if (!jwt) {
		return <Navigate to="/auth/login" replace />;
	}

	// Если токен есть — возвращаем дочерние компоненты (то есть разрешаем доступ)
	return children;
};
