import styled from 'styled-components';

export const Image = styled.div`
    width: 400px;
    height: 120px;
    box-shadow: inset 0px 0px 100px #000000;
    background-image: ${props => `url(${props.src})`};
`;