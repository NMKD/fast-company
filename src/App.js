import React from "react";
import Users from "./components/pages/users";
import Main from "./components/pages/main";
import SignIn from "./components/pages/signIn";
import NavsBar from "./components/ui/NavsBar";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <>
            <NavsBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/singin" component={SignIn} />
                <Route path="/users/:id?" component={Users} />
            </Switch>
        </>
    );
};

export default App;
