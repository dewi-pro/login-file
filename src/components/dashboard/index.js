import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Button, List, makeStyles, Table, TableBody } from '@material-ui/core'

import Update from './update'
import { GET_USER, REMOVE_USER } from '../graphql/queries'
import { Route, Switch, useHistory } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'

/*const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    minHeight: "auto",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '10px 30px',
  },
  MuiButtonBaseroot: {
    cursor: "not allowed",
    pointerevents: "auto",
   },
};

const useStyles = makeStyles(styles);
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'first_name', headerName: 'First name', width: 130 },
  { field: 'last_name', headerName: 'Last name', width: 130 },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('first_name') || ''} ${params.getValue('last_name') || ''}`,
  },
]; */

export const Dashboard = ({ history }) => {
  useHistory();
  const [userId, setUserId] = useState(null);
  const [deleteUser] = useMutation(REMOVE_USER);

  const submitForm = (id, first_name,last_name, email, password ) => {
    history.push({
      pathname: "/update",
      state: { detail: {id} }
  });
 }

  const removeuser = (id) => {
    deleteUser({
      variables: { id:id },
      optimisticResponse: true,
      update: (cache) => {
        const existinguser = cache.readQuery({ query: GET_USER });
        const user = existinguser.user.filter((t) => t.id !== id);
        cache.writeQuery({
          query: GET_USER,
          data: { user },
        });
      },
    });
  };

  const { loading, error, data } = useQuery(GET_USER, {
    context: {
      headers: {
        'x-hasura-admin-secret': 'hasura' // ini harusnya jwt
      }
    }
  })

  if (loading) return 'loading ...'

  if (error) return `Error: ${error.message}`

      return <div>
      <h2>Baseball Players</h2>
      <Button color="secondary" onClick={() => history.push("/add")}> New Player</Button>
      
        {data.user.map(({ id, first_name, last_name,email, password })=>
        <div>
        <List key={id}> {id} {first_name} {last_name}
        <Button color="primary" onClick={() => submitForm({id, first_name,last_name, email, password })}> update</Button>
        <Button color="primary" onClick={()=> removeuser(id)}> delete</Button>
        </List>
        </div>
          )}
      {userId && <Update id={userId}></Update>}

      <Button color="secondary" onClick={() => history.push("/")}>Logout  </Button>
    </div>;
             
     

}
export default Dashboard;