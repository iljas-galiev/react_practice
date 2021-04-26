import DefaultTemplate from '../../templates/DefaultTemplate';
import useCards from "../../../hooks/useCards";
import {Link, Redirect, useLocation} from "react-router-dom";
import routes from "../../../config/routes";
import {Modal} from 'react-bootstrap';
import {useState} from "react";
import useTask from "../../../hooks/useTask";
import useCheckTask from "../../../hooks/useCheckTask";
import useDestroyCard from "../../../hooks/useDestroyCard";
import useDestroyTask from "../../../hooks/useDestroyTask";
import GLOBAL from "../../../lib/global"

const TasksPage = () => {

    document.title = 'Задачи'

    if (!GLOBAL.is_logged) return <Redirect to={routes.HOME}/>;

    const [modalIsOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState({});

    const {getTask} = useTask();


    const [checkTask] = useCheckTask();
    const [destroyCard] = useDestroyCard();
    const [destroyTask] = useDestroyTask();


    const openModal = async (e) => {
        e.preventDefault();
        const {task} = await getTask(e.target.attributes.task_id.value)
        setTask(task)

        setIsOpen(true);
    }


    const handleCheckTask = async (e) => {
        e.target.previousElementSibling.classList.toggle('card-task-done');

        await checkTask(e.target.attributes.task_id.value)
    }

    const handleDelete = async (e) => {
        if (!confirm('Удалить?')) return false;

        await destroyCard(e.target.parentNode.attributes.card_id.value).then(r => {
            if (r.data.deleteCard != undefined && r.data.deleteCard.errors != undefined && r.data.deleteCard.errors.length) alert(r.data.deleteCard.errors[0])
        })
    }
    const handleDeleteTask = async (e) => {
        if (!confirm('Удалить?')) return false;

        await destroyTask(e.target.attributes.task_id.value).then(r => {
            if (r.data.deleteTask != undefined && r.data.deleteTask.errors != undefined && r.data.deleteTask.errors.length) alert(r.data.deleteTask.errors[0])

            setIsOpen(false);
        })
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const search = useLocation().search;
    const archived = new URLSearchParams(search).get('archived');

    const {cards, loading} = useCards(archived);

    let empty_header;
    let archived_link;

    if (cards === undefined || cards.length == 0)
        empty_header = <h3 className="text-primary text-center">Карточек нет. Добавьте новую</h3>;

    if (archived !== undefined && archived)
        archived_link = <Link to={routes.CARDS} className="btn btn-success">Показать все</Link>;
    else archived_link = <Link to={routes.CARDS + '?archived=1'} className="btn btn-warning">Архивные</Link>;


    if(loading) return (
        <DefaultTemplate>
            <h2 className="text-center">Загрузка...</h2>
        </DefaultTemplate>
    );

    return (
        <DefaultTemplate>
            <div className="overflow-hidden mb-3">
                <div className="float-left">
                    <Link to={routes.CARD_CREATE} className="btn btn-success">Добавить</Link>
                </div>
                <div className="float-right">
                    {archived_link}
                </div>
            </div>

            {empty_header}

            <div className="cards row">
                {cards.map((el, key) => {
                        let no_tasks;
                        if (el.tasks === undefined || el.tasks.length == 0) no_tasks =
                            <span className="text-danger">Нет задач</span>;
                        return (
                            <div key={key} className="col-md-4 col-sm-6 col-12">
                                <div className="card">
                                    <div className="card-body">

                                        <div className="overflow-hidden">
                                            <div className="float-left h3">
                                                {el.name}
                                            </div>
                                            <div className="float-right">
                                                <Link to={`cards/${el.id}/edit`}><i className="bi bi-pencil d-inline-block"/></Link>
                                                <Link to="#" card_id={el.id} onClick={handleDelete}><i
                                                    className="bi bi-trash d-inline-block"/></Link>
                                            </div>
                                        </div>
                                        <div>
                                            {no_tasks}
                                            {el.tasks.map((task, task_key) => {
                                                return (
                                                    <div key={task_key}
                                                         className={`card-task clearfix`}
                                                    >
                                                        <Link
                                                            className={"float-left " + (task.checked > 0 ? 'card-task-done' : '')}
                                                            onClick={openModal}
                                                            task_id={task.id}
                                                            to={`tasks/${task.id}`}>
                                                            {task.title}

                                                        </Link>
                                                        <input type="checkbox"
                                                               className="float-right"
                                                               defaultChecked={task.checked > 0}
                                                               onChange={handleCheckTask}
                                                               task_id={task.id}
                                                               style={{
                                                                   position: "relative",
                                                                   top: "5px"
                                                               }}/>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                        <Link to={`task/${el.id}/new`} className="mt-3 btn btn-primary btn-sm">Добавить
                                            задачу</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )}

            </div>

            <Modal show={modalIsOpen}
                   onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{task.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {task.description ? task.description :
                            <span className="text-danger">описание не заполнено</span>}
                    </p>
                </Modal.Body>
                <Modal.Footer>

                    <Link to="#" onClick={handleDeleteTask} task_id={task.id} className="btn btn-danger d-inline-block">Удалить</Link>
                    <Link to={`tasks/${task.id}/edit`} className="btn btn-primary d-inline-block">Редактировать</Link>

                </Modal.Footer>
            </Modal>

        </DefaultTemplate>
    );
};

export default TasksPage;
