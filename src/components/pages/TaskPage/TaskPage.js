import {Redirect, useParams} from 'react-router-dom';
import useTask from '../../../hooks/useTask';
import DefaultTemplate from '../../templates/DefaultTemplate';
import Task from "../../molecules/Task";
import GLOBAL from "../../../lib/global"
import routes from "../../../config/routes";

const TaskPage = () => {
        document.title = 'Редактировать задачу'

        if (!GLOBAL.is_logged) return <Redirect to={routes.HOME}/>;

        const {id: queryId} = useParams();

        const {data, loading} = useTask(false, queryId);

        if (loading) return (
            <DefaultTemplate>
                LOADING
            </DefaultTemplate>
        );

        return (
            <DefaultTemplate>
                <Task task={data.task}/>
            </DefaultTemplate>
        )
    }
;

export default TaskPage;
