import { useSelector, useDispatch } from 'react-redux';

import { signOut } from 'store/modules/auth/actions';

import WorldItem from './WorldItem';

import {
    ListWorldsContainer,
    WelcomeMessageContainer,
    List
} from './styles';

export default function ListWorlds() {
    const dispatch = useDispatch();
    const username = useSelector(state => state.auth?.user?.username);
    const availableWordList = useSelector(state => state.world.availableWordList);

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <ListWorldsContainer>
            <WelcomeMessageContainer>
                <h2>Bem-vindo, {username}</h2>
                <span>Não é você? <a onClick={handleSignOut}>Clique aqui para desconectar</a>.</span>
            </WelcomeMessageContainer>

            <List>
                {(availableWordList?.map((world, index) => (
                    <WorldItem key={index} world={world} />
                )))}
            </List>
        </ListWorldsContainer>
    );
}