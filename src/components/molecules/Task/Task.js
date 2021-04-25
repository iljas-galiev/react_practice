import routes from "../../../config/routes";
import GLOBAL from "../../../lib/global";
import {Link, Redirect} from "react-router-dom";
import {useState} from "react";
import Alert from "../../atoms/Alert";
import useTaskCreate from "../../../hooks/useTaskCreate";
import useTaskEdit from "../../../hooks/useTaskEdit";

const Task = ({task}) => {
    const {CARDS} = routes
    if (!GLOBAL.is_logged) return <Redirect to={CARDS}/>;

    const [taskEdit] = useTaskEdit();
    const [taskCreate] = useTaskCreate();
    const [form, setForm] = useState({title: task.title, description: task.description});
    const [alertData, setAlert] = useState({text: '', type: ''});

    const [redirect, setRedirect] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();


        //некрасиво, согласен
        if (task.id > 0)
            await taskEdit(task.id, form.title, form.description).then(res => {
                    res = res.data
                    if (res.editTask !== undefined)
                        if (res.editTask.errors.length) {
                            setAlert({type: "danger", text: res.editTask.errors})
                        } else {
                            setRedirect(true)
                        }
                    else setAlert({type: "danger", text: "Что-то пошло не так"})
                }
            )
        else {
            await taskCreate(form.title, form.description, task.card_id).then(res => {
                    res = res.data
                    if (res.createTask !== undefined)
                        if (res.createTask.errors.length) {
                            setAlert({type: "danger", text: res.createTask.errors})
                        } else {
                            setRedirect(true)
                        }
                    else setAlert({type: "danger", text: "Что-то пошло не так"})
                }
            )

        }
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
            <h2 className="text-center">{task.id ? "Редактировать" : "Создать"} задачу {task.title}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Alert type={alertData.type}>{alertData.text}</Alert>
                </div>
                <div className="mb-4 form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Заголовок"
                        name="title"
                        defaultValue={task.title}
                        onChange={e => updateForm(e)}/>
                </div>
                <div className="mb-6 form-group">
                    <textarea
                        className="form-control"
                        placeholder="Описание"
                        name="description"
                        defaultValue={task.description}
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

}

export default Task;