import { useState } from 'react';
import '../../styles/autorization/login-page.css';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log({ email, password });
        setTimeout(() => setLoading(false), 1500);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Войти в свою учетную запись</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Адрес электронной почты</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <a href="/forgot-password" className="forgot-password">
                            <strong>Забыли пароль?</strong>
                        </a>
                    </div>


                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Загрузка...' : 'Вход'}
                    </button>

                    <div className="signup-link">
                        <p>У вас еще нет учетной записи?</p>
                        <a href="/signup">Создать аккаунт</a>
                    </div>
                </form>
            </div>
        </div>
    );
};
