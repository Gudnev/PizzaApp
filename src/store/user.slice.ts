// Импорт из Redux Toolkit: createSlice — создание слайса, createAsyncThunk — асинхронные действия
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Импорт функции загрузки состояния из localStorage
import { loadState } from './storage';

// Тип данных, который возвращает сервер при логине или регистрации
import { LoginResponse } from '../interfaces/auth.interface';

// Импорт axios для HTTP-запросов и обработки ошибок
import axios, { AxiosError } from 'axios';

// Базовый URL API
import { PREFIX } from '../helpers/API';

// Тип профиля пользователя
import { Profile } from '../interfaces/user.interface';

// Типизация состояния всего Redux-хранилища
import { RootState } from './store';

// Ключ для хранения JWT в localStorage
export const JWT_PERSISTENT_STATE = 'userData';

// Тип данных, которые сохраняются в localStorage
export interface UserPersistentState {
	jwt: string | null;
}

// Основное состояние user-слайса
export interface UserState {
	jwt: string | null;                // токен авторизации
	loginErrorMessage?: string;       // сообщение об ошибке логина
	registerErrorMessage?: string;    // сообщение об ошибке регистрации
	profile?: Profile;                // профиль пользователя
}

// Начальное состояние — загружаем jwt из localStorage, если есть
const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

// ✅ Thunk для логина
export const login = createAsyncThunk('user/login',
	async (params: { email: string, password: string }) => {
		try {
			// Отправляем запрос на /auth/login
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			});
			return data; // возвращаем ответ сервера
		} catch (e) {
			if (e instanceof AxiosError) {
				// Пробрасываем сообщение об ошибке из API
				throw new Error(e.response?.data.message);
			}
		}
	}
);

// ✅ Thunk для регистрации
export const register = createAsyncThunk('user/register',
	async (params: { email: string, password: string, name: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
				email: params.email,
				password: params.password,
				name: params.name
			});
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

// ✅ Thunk для получения профиля
export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
	'user/getProfile',
	async (_, thunkApi) => {
		const jwt = thunkApi.getState().user.jwt; // получаем токен из store

		// Отправляем запрос с токеном в заголовке
		const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		return data;
	}
);

// 🧩 Создание user-slice
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// Выход из аккаунта
		logout: (state) => {
			state.jwt = null;
		},
		// Очистка ошибки логина
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		// Очистка ошибки регистрации
		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		// После успешного логина сохраняем токен
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.jwt = action.payload.access_token;
		});
		// Если логин не удался — сохраняем ошибку
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});

		// После успешного получения профиля — сохраняем профиль
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});

		// После успешной регистрации сохраняем токен
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.jwt = action.payload.access_token;
		});
		// Если регистрация не удалась — сохраняем ошибку
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
	}
});

// Экспорт reducer'а для подключения в store.ts
export default userSlice.reducer;

// Экспорт всех actions (logout, clearLoginError, clearRegisterError)
export const userActions = userSlice.actions;
