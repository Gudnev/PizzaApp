// Импорт типов и функций из Redux Toolkit
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Импорт функции загрузки сохранённого состояния из localStorage
import { loadState } from './storage';

// Ключ, под которым будет храниться состояние корзины в localStorage
export const CART_PERSISTENT_STATE = 'cartData';

// Интерфейс одного элемента корзины
export interface CartItem {
	id: number;      // id товара
	count: number;   // количество товара
}

// Интерфейс состояния корзины
export interface CartState {
	items: CartItem[]; // массив товаров
}

// Начальное состояние: загружаем из localStorage или начинаем с пустой корзины
const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
	items: []
};

// Создаём slice — набор reducer'ов и состояния под именем "cart"
export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// Очистка корзины
		clean: (state) => {
			state.items = [];
		},

		// Удаление товара полностью по id
		delete: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(i => i.id !== action.payload);
		},

		// Уменьшение количества товара на 1. Если был 1 — удаляем полностью
		remove: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (!existed) return;

			if (existed.count === 1) {
				// если остался 1 — удаляем товар
				state.items = state.items.filter(i => i.id !== action.payload);
			} else {
				// иначе — уменьшаем количество
				state.items.map(i => {
					if (i.id === action.payload) {
						i.count -= 1;
					}
					return i;
				});
			}
		},

		// Добавление товара. Если он уже есть — увеличиваем count на 1
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (!existed) {
				// если товара ещё нет — добавляем с count = 1
				state.items.push({ id: action.payload, count: 1 });
			} else {
				// если есть — увеличиваем count
				state.items.map(i => {
					if (i.id === action.payload) {
						i.count += 1;
					}
					return i;
				});
			}
		}
	}
});

// Экспорт reducer'а для подключения в store.ts
export default cartSlice.reducer;

// Экспорт всех действий: add, remove, delete, clean
export const cartActions = cartSlice.actions;
