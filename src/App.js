import React from "react";
import Users from "./components/layouts/users";
import Main from "./components/layouts/main";
import SingIn from "./components/layouts/singIn";
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
