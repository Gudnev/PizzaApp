// Импорт Link — для перехода на страницу логина
// useNavigate — для программного перехода после регистрации
import { Link, useNavigate } from 'react-router-dom';

// Импорт компонентов: кнопка, заголовок, поле ввода
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';

// Используем те же стили, что и для Login (один стиль логина и регистрации)
import styles from '../Login/Login.module.css';

// Импорт типов и хуков
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';

// Импорт экшенов: регистрация и очистка ошибки
import { register, userActions } from '../../store/user.slice';

// Тип формы регистрации — для извлечения значений полей из DOM
export type RegisterForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
};

// Основной компонент страницы регистрации
export function Register() {
	const navigate = useNavigate(); // хук навигации
	const dispatch = useDispatch<AppDispath>(); // типизированный dispatch

	// Получаем токен и сообщение об ошибке регистрации из Redux
	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

	// Если пользователь уже авторизован — переходим на главную
	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	// Обработчик отправки формы регистрации
	const submit = async (e: FormEvent) => {
		e.preventDefault(); // отменяем перезагрузку страницы

		dispatch(userActions.clearRegisterError()); // очищаем прошлые ошибки

		// Достаём значения полей из формы
		const target = e.target as typeof e.target & RegisterForm;
		const { email, password, name } = target;

		// Отправляем данные на регистрацию
		dispatch(register({
			email: email.value,
			password: password.value,
			name: name.value
		}));
	};

	// Возвращаем JSX
	return (
		<div className={styles['login']}>
			{/* Заголовок страницы */}
			<Headling>Регистрация</Headling>

			{/* Сообщение об ошибке, если есть */}
			{registerErrorMessage && (
				<div className={styles['error']}>{registerErrorMessage}</div>
			)}

			{/* Форма регистрации */}
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

				{/* Поле name */}
				<div className={styles['field']}>
					<label htmlFor="name">Ваше имя</label>
					<Input id="name" name="name" placeholder="Имя" />
				</div>

				{/* Кнопка отправки */}
				<Button appearence="big">Зарегистрироваться</Button>
			</form>

			{/* Ссылки под формой */}
			<div className={styles['links']}>
				<div>Есть аккаунт?</div>
				<Link to="/auth/login">Войти</Link>
			</div>
		</div>
	);
}
