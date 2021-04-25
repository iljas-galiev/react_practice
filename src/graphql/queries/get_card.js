import {gql} from "@apollo/client/core";

export default gql`
query GetCard($id: ID!){
  card( id: $id ) {
      id
      name
  }
}
`;