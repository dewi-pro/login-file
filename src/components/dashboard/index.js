import React from 'react'
import {  useQuery } from '@apollo/client'
import { Button, List } from '@material-ui/core'

import { GET_USER, REMOVE_USER } from '../graphql/queries'

export const Dashboard = ({ history }) => {
  const { loading, error, data } = useQuery(GET_USER, {
    context: {
      headers: {
        'x-hasura-admin-secret': 'hasura' // ini harusnya jwt
      }
    }
  })

  if (loading) return 'loading ...'

  if (error) return `Error: ${error.message}`

  return (
    <>
              <Button color="primary" 
              onClick={() => history.push("/")}
              >Logout  </Button>
              
      {data.user.map(users =>
        <div key={users.id} className='row'>
          <div className='column' />
          <div className='column' style={{ textAlign: 'center' }}>
              <br></br>
             <div > 
             <List>{users.first_name}  {users.last_name} </List> 
             <Button color="primary" >UPDATE</Button>
             <Button color="primary" >DELETE</Button>
             </div>
          </div>
          <div className='column' />
        </div>
      )}
    </>

  )
}
export default Dashboard;