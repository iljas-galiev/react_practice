import {gql} from "@apollo/client";

export default gql`
  mutation CreateCard( $name: String!) {
    createCard( input : {name: $name} ) {
      card {
        id
        name
      }
      errors
    }
  }
`;
