import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Error from './components/Errror/Error';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Manage from './components/manage/Manage';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <h3 style={{marginTop:'150px'}}>{loggedInUser.email}</h3>
       
      <Router>
      <Header></Header>
        <Switch>
        
          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>

         <Route path="/login">
           <Login></Login>
         </Route>

          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>

         
          <Route path="/product/:productKey">
              <ProductDetail></ProductDetail>
          </Route>
          
          <Route path="/manage">
            <Manage></Manage>
          </Route>
          
          <Route path="*">
              <Error></Error>
          </Route>
        </Switch>
      </Router>


      
    </UserContext.Provider>
  );
}

export default App;
