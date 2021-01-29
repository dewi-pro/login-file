import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_USER } from "../graphql/queries";
import { useHistory } from "react-router-dom";
import { Refresh } from "@material-ui/icons";

export default () => {
    const history = useHistory();
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    const [adduser] = useMutation(ADD_USER);

    const submituser = () => {
        console.log("data ==>", user.first_name, user.last_name, user.email, user.password)
        adduser({ variables: { first_name: user.first_name, last_name: user.last_name, email: user.email, password: user.password } }).then(resp => {
            console.log("resp ==>", resp.data)
        }, err => {
            console.log("err ==>", err)
            alert("Error...", err)
        });
        setUser({
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        })
        history.push("/dash")
    };

    return (

        <form onSubmit={(e) => { e.preventDefault(); }}>
            <h3>Register</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text"
                    className="form-control"
                    placeholder="First name"
                    value={user.first_name}
                    onChange={(e) => setUser({...user, first_name: e.target.value})} />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={user.last_name}
                    onChange={(e) => setUser({...user, last_name: e.target.value})} />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="text"
                    className="form-control"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})} />
            </div>

            <button type="button" className="btn btn-dark btn-lg btn-block" onClick={submituser}>Add Player</button>
            

        </form>
    );
};