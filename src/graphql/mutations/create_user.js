import {gql} from "@apollo/client";


export default gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
    createUser( input : {name: $name, email: $email , password: $password , passwordConfirmation: $passwordConfirmation } ) {
      user {
        id
        name
        email
        token
      }
      errors
    }
  }
`;
