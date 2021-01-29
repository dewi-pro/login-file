import React, { useState , useEffect} from "react";
import { useMutation } from "@apollo/client";
//import login from "./containers/Login"
import { ADD_USER, UPDATE } from "../graphql/queries";
import { Route, Switch, useLocation ,useHistory} from "react-router-dom";

export default function Update(id) {
    const location = useLocation();
    const history = useHistory();

    console.log("lokasi",location.state.detail);
    const MyUser = location.state.detail.id;
    const [user, setUser] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    user.id = MyUser.id;
    user.first_name = MyUser.first_name;
    user.last_name = MyUser.last_name;
    user.email = MyUser.email;
    user.password = MyUser.password;

    console.log("voila  ====",user)

    const [updateUser] = useMutation(UPDATE);

    const submituser = () => {
        
        console.log("yang mau di ganti ==>", user.first_name, user.last_name, user.email, user.password)
        updateUser({ variables: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, password: user.password } }).then(resp => {
          console.log("resp ==>", resp.data)
        }, err => {
            console.log("err ==>", err)
            alert("Error...", err)
        });
        history.push("/dash")
    };

    return (

        <form onSubmit={(e) => { e.preventDefault(); }}>
            <h3>Update Player</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text"
                    className="form-control"
                    placeholder="First name"
                    defaultValue={MyUser.first_name}
                    onChange={(e) => user.first_name = e.target.value} 
                    />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text"
                    className="form-control"
                    placeholder="Last name"
                    defaultValue={MyUser.last_name}
                    onChange={(e) => user.last_name = e.target.value} 
                    />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email"
                    className="form-control"
                    placeholder="Enter email"
                    defaultValue={MyUser.email}
                    onChange={(e) => user.email = e.target.value} 
                    />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="text"
                    className="form-control"
                    placeholder="Enter password"
                    defaultValue={user.password}
                    onChange={(e) => user.password = e.target.value} 
                    />
            </div>

            <button type="button" className="btn btn-dark btn-lg btn-block" onClick={submituser}>Update User</button>
            
           

        </form>
    );
};