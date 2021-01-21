import React, {  useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_USER, GET_USER } from "./graphql/queries";
import { Route, Switch } from "react-router-dom";

import login from "./login";

const updateCache = (cache, { data }) => {
    const existinguser = cache.readQuery({
      query: GET_USER,
    });

    const newuser = data.insert_user;
  cache.writeQuery({
    query: GET_USER,
    data: { user: [...existinguser.user, newuser] },
  });
};

export default  () => {
        const [first_name, setfn] = useState("");
        const [last_name, setln] = useState("");
        const [email, sete] = useState("");
        const [password, setp] = useState("");
        const [adduser] = useMutation(ADD_USER, { update: updateCache});

        const submituser = () => {
            adduser({ variables: { first_name, last_name, email, password } });
            setfn("");setln("");sete("");setp("");
            };

        return (

            <form onSubmit={(e)=>{e.preventDefault();}}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" 
                            className="form-control" 
                            placeholder="First name"
                            value={first_name}
                            onChange={(e) => setfn(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" 
                            className="form-control" 
                            placeholder="Last name" 
                            value={last_name}
                            onChange={(e) => setln(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" 
                            className="form-control" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={(e) => sete(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" 
                            className="form-control" 
                            placeholder="Enter password" 
                            value={password}
                            onChange={(e) => setp(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={submituser}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">log in?</a>
                </p>
                <Switch>

                <Route path="/sign-in" component={login} />
                </Switch>

            </form>
        );
        };