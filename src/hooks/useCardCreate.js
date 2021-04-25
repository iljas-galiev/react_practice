import {useMutation} from "@apollo/client";
import createCardMutation from '../graphql/mutations/create_card';
import get_cards from "../graphql/queries/get_cards";

const useCardCreate = () => {

    const [mutation, {data, error, loading}] = useMutation(createCardMutation);

    const createCard = async (name) => {
        return mutation({
            variables: {name},
            refetchQueries: [{query: get_cards, variables: ({archived: 1})},{query: get_cards, variables: ({archived: 0})}],
        })
    };

    return [
        createCard,
        data,
        error,
        loading,
    ];
};

export default useCardCreate;