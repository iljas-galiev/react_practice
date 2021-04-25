import {gql} from "@apollo/client";

export default gql`
  mutation DestroyCard($id: ID!) {
    deleteCard( input : {id: $id } ) {
      res
      errors
    }
  }
`;
