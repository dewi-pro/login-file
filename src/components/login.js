// eslint-disable-next-line
import React,  { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import { useMutation,useQuery } from "@apollo/client";

import { LOGIN_query, LOGIN} from "./graphql/queries";
import {Col, Card, Alert, OverlayTrigger, Popover} from 'react-bootstrap';


export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [screen, setScreen] = useState(false); 

const LoginUser = () => {
  const { loading, error, data } = useQuery(LOGIN_query);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return <Dashboard />;
};

  const SubmitTask = () => {
    LoginUser({ variables: { email:'se@sa.cd', password:'123456' } });
              };
           
        return (
          <Col > 
          {screen === false ? ( 
                <form onSubmit={(e)=>{e.preventDefault();}}>                   
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" 
                    value={email}
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      required
                                  />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <OverlayTrigger placement="right" overlay={
                          !email || !password ? (
                            <Popover id="Popover-disabled">Fill out the form to enable button !</Popover>
                          ) : (
                            <Popover id="Popover-disabled">Enabled!</Popover>
                          )}>
                          <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={SubmitTask} disabled={!email || !password}>Sign in</button>
                        </OverlayTrigger>

                
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                
                </form>
                 ) : ( 
                <Dashboard screen={screen} />
            )}
        </Col> 
                       );
                    
                };
