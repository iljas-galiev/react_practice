import {gql} from "@apollo/client/core";
import task from "../fragments/task";

export default gql`
query GetTask($id: ID!){
  task( id: $id ) {
      ...TaskFragment
  }
}
${task}
`;