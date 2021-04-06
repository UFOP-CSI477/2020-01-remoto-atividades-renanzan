import styled from 'styled-components';

export const WorldDetailsContainer = styled.div`
    width: 400px;
`;

export const WorldSelectorButton = styled.div`
    position: relative;
    height: 120px;
    width: 100%;
    border-radius: 4px 4px 0px 0px;
    overflow: hidden;
    cursor: pointer;

    &::after {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #FFFFFF;
        background: rgba(0, 0, 0, .3);
        transition: opacity 250ms;
        opacity: 0;
        content: "Mudar mundo do jogo";
        font-size: 16px;
        font-weight: bold;
        text-shadow: 2px 2px rgba(0, 0, 0, .2);
    }

    &:hover::after {
        opacity: 1;
    }
`;

const DetailLabel = styled.label`
    position: absolute;
    display: flex;
    align-items: center;
    gap: 4px;
    color: #FFFFFF;
    font-size: 16px;

    & svg {
        height: 22px;
        width: 22px;
    }
`;

export const WorldLabel = styled(DetailLabel)`
    position: absolute;
    top: 8px;
    left: 8px;
    
`;

export const SpeedLabel = styled(DetailLabel)`
    position: absolute;
    bottom: 8px;
    right: 8px;
`;