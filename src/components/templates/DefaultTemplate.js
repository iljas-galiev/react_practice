import {Link} from "react-router-dom";
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css';
import GLOBAL from '../../lib/global';
import routes from "../../config/routes";

const DefaultTemplate = ({children}) => {


    const UserGreeting = () => {
        let user = JSON.parse(GLOBAL.user)

        return (
            <>
                {user.name} <Link to={routes.LOGOUT}>(выйти)</Link>
            </>
        );
    }

    let user_header = '';
    if (GLOBAL.is_logged) {
        user_header = UserGreeting()
    }

    return (
        <>
            <div className="main-header">
                <div className="logo">
                    <Link to="/">Rails.Trello</Link>
                </div>
                <div className="user">
                    {user_header}
                </div>
            </div>

            <div className="content">
                <div className="container">
                    {children}
                </div>
            </div>

        </>
    );
}

export default DefaultTemplate;
