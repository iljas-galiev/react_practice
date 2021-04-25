import {useMutation} from "@apollo/client";
import checkTaskMutation from '../graphql/mutations/check_task';

const useCheckTask = () => {

    const [mutation, {data, error, loading}] = useMutation(checkTaskMutation);

    const checkTask = async (id) => {
        id = parseInt(id)
        return mutation({variables: {id}})
    };


    return [
        checkTask,
        data,
        error,
        loading,
    ];
};

export default useCheckTask;