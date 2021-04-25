import {useMutation} from "@apollo/client";
import destroyTaskMutation from '../graphql/mutations/destroy_task';
import get_cards from "../graphql/queries/get_cards";

const useDestroyTask = () => {

    const [mutation, {data, error, loading}] = useMutation(destroyTaskMutation);

    const destroyTask = async (id) => {
        id = parseInt(id)
        return mutation({
            variables: {id},
            refetchQueries: [
                {
                    query: get_cards,
                    variables: ({archived: 1})
                },
                {
                    query: get_cards,
                    variables: ({archived: 0})
                }],
        })
    };


    return [
        destroyTask,
        data,
        error,
        loading,
    ];
};

export default useDestroyTask;