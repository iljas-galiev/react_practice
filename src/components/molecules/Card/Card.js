import routes from "../../../config/routes";
import GLOBAL from "../../../lib/global";
import {Link, Redirect} from "react-router-dom";
import useCardEdit from "../../../hooks/useCardEdit";
import {useState} from "react";
import Alert from "../../atoms/Alert";
import useCardCreate from "../../../hooks/useCardCreate";


const Card = ({card}) => {

    document.title = (card.id ? "Редактировать" : "Создать" )+ ' карточку'

    const {CARDS} = routes

    if (!GLOBAL.is_logged) return <Redirect to={CARDS}/>;


    const [cardEdit] = useCardEdit();
    const [cardCreate] = useCardCreate();

    const [form, setForm] = useState({name: card.name});
    const [alertData, setAlert] = useState({text: '', type: ''});

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (card.id)
            await cardEdit(card.id, form.name).then(res => {
                    res = res.data
                    if (res.editCard !== undefined)
                        if (res.editCard.errors.length) {
                            setAlert({type: "danger", text: res.editCard.errors})
                        } else {
                            setRedirect(true)
                        }
                    else setAlert({type: "danger", text: "Что-то пошло не так"})
                }
            )
        else
            await cardCreate(form.name).then(res => {
                    res = res.data
                    if (res.createCard !== undefined)
                        if (res.createCard.errors.length) {
                            setAlert({type: "danger", text: res.createCard.errors})
                        } else {
                            setRedirect(true)
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


    if (redirect)
        return <Redirect to={CARDS}/>;

    return (
        <>
            <Link className="btn btn-success" to={routes.CARDS}>Назад</Link>
            <h2 className="text-center">{card.id ? "Редактировать" : "Создать"} карточку {card.name}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Alert type={alertData.type}>{alertData.text}</Alert>
                </div>
                <div className="mb-4 form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Название"
                        name="name"
                        defaultValue={card.name}
                        onChange={e => updateForm(e)}/>
                </div>
                <button
                    className="btn btn-primary"
                    type="submit">
                    Сохранить
                </button>
            </form>
        </>
    )
};

export default Card;