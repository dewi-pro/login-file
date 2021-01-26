// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { LOGIN_query } from "./graphql/queries";
import { Col, OverlayTrigger, Popover } from 'react-bootstrap';
import { useHistory } from "react-router-dom";


export default () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  ///reff => https://www.apollographql.com/docs/react/data/queries/#executing-queries-manually
  const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_query);

  /// check if any change in query
  useEffect(() => {
    if (!data) {
      if (loading) {
        console.log('loading==>', loading)
      }
      if (error) {
        console.error(error);
      }
    }
    else {
      console.log("data==>", data)
      if(data.user.length === 0)
        alert("not found")
      else
        //setScreen(true)
        history.push('/dash')
        ;
    }
  }, [data, loading, error])

  const SubmitTask = () => {
    console.log("submit task")
    loginUser({ variables: { email: email, password: password } })
  };

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Col >
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
            <button type="button" className="btn btn-dark btn-lg btn-block" onClick={() => { SubmitTask() }} disabled={!email || !password}>Sign in</button>
          </OverlayTrigger>


          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>

        </form>
    </Col>
  );

};
