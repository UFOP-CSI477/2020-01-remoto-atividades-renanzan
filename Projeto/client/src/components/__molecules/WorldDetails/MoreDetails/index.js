import { useState } from 'react';

import {
    People as UsersIcon,
    PhotoSizeSelectSmall as MapSizeIcon,
    Flag as StartIcon,
    PlayArrow as StatusIcon
} from '@material-ui/icons';

import {
    ModeDerailsContainer,
    List,
    ListItem,
    ListItemContent,
    ToggleExpandButton
} from './styles';

function DetailItem({ icon, label, value }) {
    return (
        <ListItem>
            {icon}
            <ListItemContent>
                <label>{label}</label>
                <strong>{value}</strong>
            </ListItemContent>
        </ListItem>
    );
}

export default function MoreDetails() {
    const [collapsed, setCollapsed] = useState(false);
    
    function handleToggleCollapse() {
        setCollapsed(state => !state);
    }

    return (
        <ModeDerailsContainer>
            <List collapsed={collapsed}>
                <DetailItem icon={<UsersIcon />} label="Jogadores:" value="17" />
                <DetailItem icon={<MapSizeIcon />} label="Mapa:" value="Pequeno" />
                <DetailItem icon={<StartIcon />} label="Idade do mungo:" value="22 dias" />
                <DetailItem icon={<StatusIcon />} label="Status:" value="Ativo" />
            </List>

            <ToggleExpandButton collapsed={collapsed} onClick={handleToggleCollapse}>
                {collapsed ? "Mostrar menos" : "Mostrar mais"}
            </ToggleExpandButton>
        </ModeDerailsContainer>
    );
}