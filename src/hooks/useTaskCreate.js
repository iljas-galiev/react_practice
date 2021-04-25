import {useMutation} from "@apollo/client";
import createTaskMutation from '../graphql/mutations/create_task';
import get_cards from "../graphql/queries/get_cards";

const useTaskCreate = () => {

    const [mutation, {data, error, loading}] = useMutation(createTaskMutation);

    const createTask = async (title, description, cardId) => {
        cardId = parseInt(cardId)
        return mutation({
            variables: {title, description, cardId},
            refetchQueries: [{query: get_cards, variables: ({archived: 1})},{query: get_cards, variables: ({archived: 0})}],
        })
    };

    return [
        createTask,
        data,
        error,
        loading,
    ];
};

export default useTaskCreate;