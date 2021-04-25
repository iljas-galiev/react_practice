import {gql} from "@apollo/client";

export default gql`
  mutation EditCard($id: ID!, $name: String!) {
    editCard( input : {id: $id, name: $name} ) {
      card {
        id
        name
      }
      errors
    }
  }
`;
