import {gql} from "@apollo/client";
import task from '../fragments/task'

export default gql`
  mutation CheckTask($id: Int!) {
    checkTask( input : {id: $id } ) {
      task {
        ...TaskFragment
      }
    }
  }
  ${task}
`;
