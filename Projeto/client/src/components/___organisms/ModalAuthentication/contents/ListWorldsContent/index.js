import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ListWorlds from 'components/__molecules/ListWorlds';

import { openAuthenticationModal } from 'store/modules/interface/actions';
import { ModalAuthenticationTypes } from 'store/modules/interface/constants';

export default function ListWorldsContent() {
    const dispatch = useDispatch();
    const isSigned = useSelector(state => Boolean(state.auth.token));

    useEffect(() => {
        if(!isSigned)
            dispatch(openAuthenticationModal(ModalAuthenticationTypes.LOGIN));
    }, [isSigned]);
    
    return (
        <ListWorlds />
    );
}