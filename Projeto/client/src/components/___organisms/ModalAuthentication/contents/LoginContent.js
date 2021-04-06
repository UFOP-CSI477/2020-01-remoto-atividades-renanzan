import styled from 'styled-components';

import WorldDetails from 'components/__molecules/WorldDetails';
import LoginForm from 'components/__molecules/LoginForm';

const LoginContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function LoginContent() {    
    return (
        <LoginContentContainer>
            <WorldDetails />

            <LoginForm />
        </LoginContentContainer>
    );
}