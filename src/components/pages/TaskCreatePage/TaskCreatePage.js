import {Redirect, useParams} from 'react-router-dom';
import DefaultTemplate from '../../templates/DefaultTemplate';
import Task from "../../molecules/Task";
import useCard from "../../../hooks/useCard";
import GLOBAL from "../../../lib/global";
import routes from "../../../config/routes";

const TaskCreatePage = () => {

    document.title = 'Создать задачу'
    if (!GLOBAL.is_logged) return <Redirect to={routes.HOME}/>;
        const {id: queryId} = useParams();

        const {data, loading} = useCard(queryId);


        if (loading) return (
            <DefaultTemplate>
                LOADING
            </DefaultTemplate>
        );
        const task = {
            id: 0,
            title: '',
            description: '',
            card_id: data.card.id
        }

        return (
            <DefaultTemplate>
                <Task task={task}/>
            </DefaultTemplate>
        )
    }
;

export default TaskCreatePage;
