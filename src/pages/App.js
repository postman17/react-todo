import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ContainerWithNavbarLayout } from 'src/ui/layouts/ContainerWithNavbarLayout/ContainerWithNavbarLayout'
import { Home } from './children/Home/Home';
import { Task } from './children/Task/Task'

const App = () => {
  return (
    <BrowserRouter>
        <ContainerWithNavbarLayout>
          <Switch>
            <Route path="/create_task">
                <Task />
            </Route>
            <Route path="/edit_task/:id">
                <Task />
            </Route>
            <Route path="/">
                <Home />
            </Route>
          </Switch>
        </ContainerWithNavbarLayout>
    </BrowserRouter>
  );
}

export default App;
