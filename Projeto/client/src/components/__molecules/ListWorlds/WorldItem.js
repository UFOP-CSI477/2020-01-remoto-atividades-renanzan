import Router from 'next/router';
import WorldImage from 'components/_atoms/WorldImage';

import { Item, ItemLabel } from './styles';

export default function WorldItem({ index, world }) {
    const href = `/world/${world._id}`;
    
    function handleJoinWorld() {
        Router.push(href);
    }

    return (
        <Item
            disabled={(world.info.status !== "OPEN")}
            joined={index%2===0}
            onClick={handleJoinWorld}>
                <ItemLabel>MUNDO {world.info.world}</ItemLabel>
                <WorldImage />
        </Item>
    );
}