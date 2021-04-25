import {useMutation} from "@apollo/client";
import loginUserMutation from '../graphql/mutations/login_user';

const useLoginUser = () => {

    const [mutation, {data, error, loading}] = useMutation(loginUserMutation);

    const loginUser = async (email, password) => {
          return mutation({variables: {email, password}})
    };


    return [
        loginUser,
        data,
        error,
        loading,
    ];
};

export default useLoginUser;