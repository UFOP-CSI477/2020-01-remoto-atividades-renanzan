import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Dialog, DialogContent } from './styles';

import ModalContents from './contents';

import { openAuthenticationModal, closeAuthenticationModal } from 'store/modules/interface/actions';
import { ModalAuthenticationTypes } from 'store/modules/interface/constants';

export default function ModalAuthentication() {
    const dispatch = useDispatch();
    const isSigned = useSelector(state => Boolean(state.auth.token));
    const open = useSelector(state => state.interface.modal.authentication.open);
    const type = useSelector(state => state.interface.modal.authentication.type);
    const ModalContent = ModalContents[type];
    
    function handleClose() {
        dispatch(closeAuthenticationModal());
    }

    useEffect(() => {
        if(open && isSigned)
            dispatch(openAuthenticationModal(ModalAuthenticationTypes.SELECT_WORLD));
        else if(open && (type === ModalAuthenticationTypes.SELECT_WORLD))
            dispatch(openAuthenticationModal(ModalAuthenticationTypes.LOGIN));
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="paper"
            fullScreen={false}>
                <DialogContent>
                    <ModalContent />
                </DialogContent>
        </Dialog>
    );
}