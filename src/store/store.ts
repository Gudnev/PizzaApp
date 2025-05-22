// Импорт функции configureStore из Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Импорт userSlice и ключа для сохранения JWT в localStorage
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';

// Импорт функции сохранения состояния
import { saveState } from './storage';

// Импорт cartSlice и ключа для сохранения корзины в localStorage
import cartSlice, { CART_PERSISTENT_STATE } from './cart.slice';

// Создаём Redux-хранилище со слайсами user и cart
export const store = configureStore({
	reducer: {
		user: userSlice, // состояние пользователя (логин, JWT, ошибки)
		cart: cartSlice  // состояние корзины (товары, количество)
	}
});

// Подписка на изменения store:
// Каждый раз при изменении состояния — сохраняем нужные части в localStorage
store.subscribe(() => {
	// Сохраняем только jwt из user-состояния
	saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);

	// Сохраняем всё состояние корзины
	saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

// Тип состояния всего Redux store (используется в useSelector)
export type RootState = ReturnType<typeof store.getState>;

// Тип dispatch-функции Redux (используется в useDispatch)
export type AppDispath = typeof store.dispatch;
