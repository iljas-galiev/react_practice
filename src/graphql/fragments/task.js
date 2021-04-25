import  {gql} from '@apollo/client';

export default gql`
    fragment TaskFragment on Task {
        id
        title
        description
        checked
    }
`;