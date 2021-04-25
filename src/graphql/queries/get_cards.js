import {gql} from '@apollo/client';
import task from "../fragments/task";

export default gql`
  query getCards ($archived:Int) {
    cards (archived:$archived) {
      id
      name
      tasks {
         ...TaskFragment
      }
    }
  }
  ${task}
`;
