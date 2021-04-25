import {gql} from "@apollo/client";

export default gql`
  mutation DestroyTask($id: ID!) {
    deleteTask( input : {id: $id } ) {
      res
      errors
    }
  }
`;
