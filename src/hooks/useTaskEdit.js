import {useMutation} from "@apollo/client";
import editTaskMutation from '../graphql/mutations/edit_task';

const useTaskEdit = () => {

    const [mutation, {data, error, loading}] = useMutation(editTaskMutation);

    const editTask = async (id, title, description) => {
        id = parseInt(id);
        return mutation({variables: {id, title, description}})
    };

    return [
        editTask,
        data,
        error,
        loading,
    ];
};

export default useTaskEdit;