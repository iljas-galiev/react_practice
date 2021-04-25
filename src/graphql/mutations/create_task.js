import {gql} from "@apollo/client";
import task from '../fragments/task'

export default gql`
  mutation CreateTask( $title: String!, $description: String!, $cardId: Int!) {
    createTask( input : {title: $title, description: $description, cardId: $cardId} ) {
      task {
        ...TaskFragment
      }
      errors
    }
  }
  ${task}
`;
