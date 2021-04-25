import {Link} from "react-router-dom";
import routes from "../../../../config/routes";

const CardsBtn = () => {
    return (
        <>
            <Link className="btn" to={routes.CARDS}>Перейти к доске</Link>
        </>
    );
}
export default CardsBtn;