import React from "react";
import Users from "./components/pages/users";
import Main from "./components/pages/main";
import SingIn from "./components/pages/singIn";
import NavsBar from "./components/NavsBar";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <>
            <NavsBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/singin" component={SingIn} />
                <Route path="/users/:id?" component={Users} />
            </Switch>
        </>
    );
};

export default App;
