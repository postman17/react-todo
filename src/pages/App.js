import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ContainerWithNavbarLayout } from 'src/ui/layouts/ContainerWithNavbarLayout/ContainerWithNavbarLayout'
import { Home } from './children/Home/Home';
import { CreateTask } from './children/CreateTask/CreateTask'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create_task">
            <ContainerWithNavbarLayout>
                <CreateTask />
            </ContainerWithNavbarLayout>
        </Route>
        <Route path="/">
            <ContainerWithNavbarLayout>
                <Home />
            </ContainerWithNavbarLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
