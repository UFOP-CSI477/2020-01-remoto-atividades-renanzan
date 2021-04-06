import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';
import ListWorldsContent from './ListWorldsContent';
import { ModalAuthenticationTypes } from 'store/modules/interface/constants';

export default {
    [ModalAuthenticationTypes.LOGIN]: LoginContent,
    [ModalAuthenticationTypes.REGISTER]: RegisterContent,
    [ModalAuthenticationTypes.SELECT_WORLD]: ListWorldsContent
}