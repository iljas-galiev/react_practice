import {Redirect} from 'react-router-dom'
import routes from "../../../config/routes";
import GLOBAL from "../../../lib/global";


const LogoutPage = () => {


    if (!GLOBAL.is_logged) return <Redirect to={routes.HOME}/>;

    localStorage.setItem('user', '')
    localStorage.setItem('token', '')
    localStorage.setItem('user_id', '')

document.location.reload()


}


export default LogoutPage;
