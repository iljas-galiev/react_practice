import {gql} from "@apollo/client";
import task from '../fragments/task'

export default gql`
  mutation EditTask($id: Int!, $title: String!, $description: String!) {
    editTask( input : {id: $id, title: $title, description:$description} ) {
      task {
        ...TaskFragment
      }
      errors
    }
  }
  ${task}
`;
