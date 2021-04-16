import Router from 'next/router';
import WorldImage from 'components/_atoms/WorldImage';

import { joinWorld } from '@api';

import { Item, ItemLabel } from './styles';

export default function WorldItem({ world }) {
    const href = `/world/${world._id}`;
    
    async function handleJoinWorld() {
        if(!Boolean(world?.info.playing))
            await joinWorld(world._id);
        
        Router.push(href);
    }

    return (
        <Item
            disabled={(world.info.status !== "OPEN")}
            joined={Boolean(world.info?.playing)}
            onClick={handleJoinWorld}>
                <ItemLabel>MUNDO {world.info.world}</ItemLabel>
                <WorldImage />
        </Item>
    );
}