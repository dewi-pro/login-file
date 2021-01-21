import { gql } from "@apollo/client";

export const GET_USER= gql`
  query getuser {
    user {
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
          first_name
          last_name
          email
          password
        }
    }
  }
`;

export const TOGGLE_COMPLETED = gql`
  mutation($id: Int!,$successed: Boolean!) {
    update_user_by_pk(
      pk_columns: { id: $id }
      _set: { successed: $successed }
    ) {
      id
    }
  }
`;

export const REMOVE_USER = gql`
  mutation($id: Int!) {
    delete_user_by_pk(id: $id) {
      id
    }
  }
`;

export const LOGIN = gql`
query ($email: String!, $password: String!) {
  user
  ( where: 
    {
      email: {email: $email}, 
      password: {password: $password}
    }
  ) 
  {
    email
    password
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