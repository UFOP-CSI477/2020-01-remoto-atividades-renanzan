import WorldImage from 'components/_atoms/WorldImage';

import OverlapDetails from './OverlapDetails';
import MoreDetails from './MoreDetails';

import {
    WorldDetailsContainer,
    WorldSelectorButton
} from './styles';

export default function WorldDetails() {
    return (
        <WorldDetailsContainer>
            <WorldSelectorButton>
                <OverlapDetails />

                <WorldImage />
            </WorldSelectorButton>

            <MoreDetails />
        </WorldDetailsContainer>
    );
}