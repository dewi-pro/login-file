import { gql } from "@apollo/client";

export const GET_USER= gql`
  query getuser {
    user {
        id
        first_name
        last_name
        email
        password
    }
  }
`;

export const GET_USERs = gql`
query MyQuery($id: Int!) {
  user(where: {id: {_eq: $id}}) 
  {
    id
    first_name
    last_name
    email
    password 
  }
}
`;

export const ADD_USER = gql`
  mutation($first_name: String!,$last_name: String!,$email: String!,$password: String!) {
    insert_user(objects: [{ first_name: $first_name, last_name: $last_name, email: $email, password: $password }]) 
    {
        affected_rows
        returning {
          id
          first_name
          last_name
          email
          password
        }
    }
  }
`;

export const REMOVE_USER = gql`
mutation ($id: Int) {
      delete_user (
        where: {
          id: {
            _eq: $id
          }
        }
      ) {
        affected_rows
      }
    }
  `;

export const LOGIN_query = gql`
  query MyQuery($email: String!, $password: String!) {
  user(where: {email: {_eq: $email}, password: {_eq: $password}}) {
    email
    password
    id
  }
}
`;
export const UPDATE = gql`
mutation($id: Int!,$first_name: String!,$last_name: String!,$email: String!,$password: String!) {
  update_user(
    where: {id: {_eq: $id}},
    _set: {
      first_name: $first_name,
      last_name: $last_name, 
      email: $email, 
      password: $password
    }
    )
  {
      returning {
        id
      }
  }
}
`;