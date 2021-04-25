import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import routes from './config/routes';
import SignupPage from "./components/pages/SignupPage";

import {ApolloProvider} from '@apollo/client/react';
import apolloClient from './lib/apolloClient';
import TasksPage from "./components/pages/TasksPage";
import TaskPage from "./components/pages/TaskPage";
import GLOBAL from "./lib/global";
import LoginPage from "./components/pages/LoginPage";
import CardPage from "./components/pages/CardPage/CardPage";
import TaskCreatePage from "./components/pages/TaskCreatePage";
import LogoutPage from "./components/pages/LogoutPage";

const App = () => {
    const {HOME, SIGNUP, CARDS, LOGIN, TASK_EDIT, CARD_EDIT, CARD_CREATE, TASK_CREATE, LOGOUT} = routes;


    if (localStorage.getItem('token') && localStorage.getItem('token').length) GLOBAL.is_logged = true;
    if (localStorage.getItem('user_id') && localStorage.getItem('user_id').length) GLOBAL.user_id = localStorage.getItem('user_id');
    if (localStorage.getItem('user') && localStorage.getItem('user').length) GLOBAL.user = localStorage.getItem('user');


    return (
        <ApolloProvider client={apolloClient}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={HOME}>
                        <Home/>
                    </Route>
                    <Route exact path={LOGIN}>
                        <LoginPage/>
                    </Route>
                    <Route exact path={SIGNUP}>
                        <SignupPage/>
                    </Route>
                    <Route exact path={CARDS}>
                        <TasksPage/>
                    </Route>
                    <Route exact path={TASK_EDIT}>
                        <TaskPage/>
                    </Route>
                    <Route exact path={TASK_CREATE}>
                        <TaskCreatePage/>
                    </Route>
                    <Route path={CARD_EDIT}>
                        <CardPage/>
                    </Route>
                    <Route path={CARD_CREATE}>
                        <CardPage/>
                    </Route>
                    <Route path={LOGOUT}>
                        <LogoutPage/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;
