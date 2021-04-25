import {useMutation} from "@apollo/client";
import editCardMutation from '../graphql/mutations/edit_card';

const useCardEdit = () => {

    const [mutation, {data, error, loading}] = useMutation(editCardMutation);

    const editCard = async (id, name) => {
        return mutation({variables: {id, name}})
    };

    return [
        editCard,
        data,
        error,
        loading,
    ];
};

export default useCardEdit;