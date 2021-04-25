import DefaultTemplate from "../../templates/DefaultTemplate";


import useCreateUser from "../../../hooks/useCreateUser";
import {useState} from "react";

import {Link, Redirect} from 'react-router-dom'

import routes from "../../../config/routes";
import Alert from "../../atoms/Alert/Alert";
import GLOBAL from "../../../lib/global"


const SignupPage = () => {

    document.title = 'Регистрация'

    const {CARDS} = routes

    if (GLOBAL.is_logged) return <Redirect to={CARDS}/>;


    const [createUser] = useCreateUser();
    const [form, setForm] = useState({name: '', email: '', password: '', passwordConfirmation: ''});
    const [alertData, setAlert] = useState({text: '', type: ''});

    //const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();


        await createUser(form.name, form.email, form.password, form.passwordConfirmation).then(data => {
                data = data.data
                if (data.createUser !== undefined)
                    if (data.createUser.errors.length) {
                        setAlert({type: "danger", text: data.createUser.errors})
                    } else {
                        localStorage.setItem('token', data.createUser.user.token);
                        localStorage.setItem('user_id', data.createUser.user.id);
                        localStorage.setItem('user', JSON.stringify(data.createUser.user));
                        document.location.reload()
                    }
                else setAlert({type: "danger", text: "Что-то пошло не так"})
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
            <h1 className="text-center">Регистрация</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Alert type={alertData.type}>{alertData.text}</Alert>
                </div>
                <div className="mb-4 form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Имя"
                        name="name"
                        onChange={e => updateForm(e)}/>
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
                <div className="mb-6 form-group">
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Повторите пароль"
                        name="passwordConfirmation"
                        onChange={e => updateForm(e)}/>
                </div>

                <button
                    className="btn btn-primary"
                    type="submit">
                    Регистрация
                </button>
            </form>
            <div>
                <Link to={routes.LOGIN}>Войти</Link>
            </div>
        </DefaultTemplate>
    )


}


export default SignupPage;
