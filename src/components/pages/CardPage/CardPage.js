import {Redirect, useParams} from 'react-router-dom';
import Card from '../../molecules/Card';
import DefaultTemplate from '../../templates/DefaultTemplate';
import useCard from "../../../hooks/useCard";
import GLOBAL from "../../../lib/global";
import routes from "../../../config/routes";

const CardPage = () => {

    if (!GLOBAL.is_logged) return <Redirect to={routes.HOME}/>;

    const {id: queryId} = useParams();

    const {data, loading} = useCard(queryId);

    if (loading) return (
        <DefaultTemplate>
            LOADING
        </DefaultTemplate>
    );


    return (
        <DefaultTemplate>
            <Card card={data.card}/>
        </DefaultTemplate>
    );
};

export default CardPage;
