import "./LoginPage.css"
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useUserLoginMutation} from "../../features/user/userAPI.js";
import {toast} from "react-toastify";


const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login] = useUserLoginMutation()

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await login({
                email,
                password
            }).unwrap()
            navigate("/dashboard")
        } catch(e) {
            toast.error(e.data.detail)
        }
    }
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <img src={'/logo.jpg'} width="200" height="200"
                     style={{borderRadius: '50%', marginTop: '-130px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'}}/>
                <div className={'title'}>
                    З поверненням!
                </div>
                <input type="email" id="email" name="email" placeholder="Пошта" required
                       onChange={e => setEmail(e.target.value)}/>
                <input type="password" id="password" name="password" placeholder="Пароль" required
                       onChange={e => setPassword(e.target.value)}/>
                <button type="submit" className="login-button">Увійти</button>
                <div className="signup-link">
                    Немає аккаунту? <NavLink to="/auth/register">Створи його тут</NavLink>
                </div>
            </form>
        </div>
    );
};

export default LoginPage