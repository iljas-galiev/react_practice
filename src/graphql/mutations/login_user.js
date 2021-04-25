import {gql} from "@apollo/client";


export default gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser( input : {email: $email , password: $password} ) {
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
