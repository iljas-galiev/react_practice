import {useMutation} from "@apollo/client";
import createUserMutation from '../graphql/mutations/create_user';

const useCreateUser = () => {

    const [mutation, {data, error, loading}] = useMutation(createUserMutation);

    const createUser = async (name, email, password, passwordConfirmation) => {
          return mutation({variables: {name, email, password, passwordConfirmation}})
    };


    return [
        createUser,
        data,
        error,
        loading,
    ];
};

export default useCreateUser;