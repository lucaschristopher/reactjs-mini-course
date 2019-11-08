import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Product from "./pages/product";

const Routes = () => (
  // Basically, it defines that we are using the routes through a browser.
  <BrowserRouter>
    {/* Allows a single route to be called at the same time. */}
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/products/:id" component={Product} />
    </Switch>
  </BrowserRouter>
);

export default Routes;