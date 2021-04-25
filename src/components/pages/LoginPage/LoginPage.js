import DefaultTemplate from "../../templates/DefaultTemplate";


import useLoginUser from "../../../hooks/useLoginUser";
import {useState} from "react";

import {Link, Redirect} from 'react-router-dom'

import routes from "../../../config/routes";
import Alert from "../../atoms/Alert/Alert";
import GLOBAL from "../../../lib/global"


const LoginPage = () => {

    document.title = 'Авторизация'
    const {CARDS} = routes

    if (GLOBAL.is_logged) return <Redirect to={CARDS}/>;


    const [loginUser] = useLoginUser();
    const [form, setForm] = useState({ email: '', password: ''});
    const [alertData, setAlert] = useState({text: '', type: ''});

    const handleSubmit = async (e) => {
        e.preventDefault();


        await loginUser( form.email, form.password).then(data => {
                data = data.data
                if (data.loginUser !== undefined)
                    if (data.loginUser.errors.length) {
                        setAlert({type: "danger", text: data.loginUser.errors})
                    } else {
                        localStorage.setItem('token', data.loginUser.user.token);
                        localStorage.setItem('user_id', data.loginUser.user.id);
                        localStorage.setItem('user',  JSON.stringify(data.loginUser.user));
                        document.location.reload()
                    }
                else setAlert({type: "danger", text: "Something went wrong"})
            }
        )

    }

    const updateForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };



    return (
        <DefaultTemplate>
            <h1 className="text-center">Авторизация</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Alert type={alertData.type}>{alertData.text}</Alert>
                </div>
                <div className="mb-6 form-group">
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={e => updateForm(e)}/>
                </div>
                <div className="mb-6 form-group">
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        onChange={e => updateForm(e)}/>
                </div>

                <button
                    className="btn btn-primary"
                    type="submit">
                    Войти
                </button>
            </form>
            <div>
                <Link to={routes.SIGNUP}>Регистрация</Link>
            </div>
        </DefaultTemplate>
    )


}


export default LoginPage;
