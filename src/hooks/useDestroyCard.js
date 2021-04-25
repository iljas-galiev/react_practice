import {useMutation} from "@apollo/client";
import destroyCardMutation from '../graphql/mutations/destroy_card';
import get_cards from "../graphql/queries/get_cards";

const useDestroyCard = () => {

    const [mutation, {data, error, loading}] = useMutation(destroyCardMutation);

    const destroyCard = async (id) => {
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
        destroyCard,
        data,
        error,
        loading,
    ];
};

export default useDestroyCard;