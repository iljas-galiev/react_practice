import HomeTemplate from "../../templates/HomeTemplate";
import GLOBAL from "../../../lib/global";
import LoginBtn from "../../atoms/Home/LoginBtn/LoginBtn";
import CardsBtn from "../../atoms/Home/CardsBtn";

const Home = () => {
    document.title = 'REACT-RAILS.TRELLO'

    const is_logged = GLOBAL.is_logged;

    let home_btn;

    if (is_logged) home_btn = <CardsBtn/>;
    else home_btn = <LoginBtn/>;

    return (
        <HomeTemplate>
            <div className="home-page">
                <h1>Rails.Trello</h1>
                <div className="home-desc">
                    Управляйте задачами как профи с канбан
                </div>
                <div className="home-button">
                    {home_btn}
                </div>
            </div>
        </HomeTemplate>
    );
};

export default Home;
