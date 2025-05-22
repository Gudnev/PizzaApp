// Импортируем Link (для перехода на регистрацию) и useNavigate (для перехода после входа)
import { Link, useNavigate } from 'react-router-dom';

// Кастомные компоненты
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';

// Стили для страницы логина
import styles from './Login.module.css';

// Импорт типов и хуков
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';

// Импорт действий: логин и очистка ошибки
import { login, userActions } from '../../store/user.slice';

// Типизация формы логина (чтобы достать значения email и password из события)
export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

// Основной компонент страницы логина
export function Login() {
	const navigate = useNavigate(); // Хук для перехода между страницами
	const dispatch = useDispatch<AppDispath>(); // Redux dispatch

	// Получаем из Redux: jwt — если вошли; loginErrorMessage — если была ошибка
	const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

	// Если есть токен — сразу переходим на главную страницу
	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	// Обработчик отправки формы
	const submit = async (e: FormEvent) => {
		e.preventDefault(); // Отменяем стандартное поведение
		dispatch(userActions.clearLoginError()); // Сначала очищаем возможную ошибку

		// Достаём поля email и password из формы
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;

		// Отправляем данные на логин
		await sendLogin(email.value, password.value);
	};

	// Функция отправки логина
	const sendLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }));
	};

	// Возвращаем JSX — разметку страницы
	return (
		<div className={styles['login']}>

			{/* Заголовок */}
			<Headling>Вход</Headling>

			{/* Если есть сообщение об ошибке — показываем */}
			{loginErrorMessage && (
				<div className={styles['error']}>{loginErrorMessage}</div>
			)}

			{/* Форма авторизации */}
			<form className={styles['form']} onSubmit={submit}>
				{/* Поле email */}
				<div className={styles['field']}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" name="email" placeholder="Email" />
				</div>

				{/* Поле password */}
				<div className={styles['field']}>
					<label htmlFor="password">Ваш пароль</label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Пароль"
					/>
				</div>

				{/* Кнопка отправки */}
				<Button appearence="big">Вход</Button>
			</form>

			{/* Ссылки под формой */}
			<div className={styles['links']}>
				<div>Нет акканута?</div>
				<Link to="/auth/register">Зарегистрироваться</Link>
			</div>
		</div>
	);
}
