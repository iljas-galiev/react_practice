import {Link} from "react-router-dom";
import routes from "../../../../config/routes";

const LoginBtn = () => {
    return (
        <>
            <Link className="btn" to={routes.SIGNUP}>Начать работу</Link>
            <Link className="link" to={routes.LOGIN}>Войти</Link>
        </>
    );
}
export default LoginBtn;