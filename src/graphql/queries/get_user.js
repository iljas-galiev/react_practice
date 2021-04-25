import {gql} from "@apollo/client/core";

export default gql`
query GetUser($id: ID!, $token: String!){
  user( id: $id, token: $token ) {
      id
      name
      email
  }
}
`;