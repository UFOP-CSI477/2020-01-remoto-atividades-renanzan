import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import storeWrapper from 'store';
import { signInValidate, signOut } from "store/modules/auth/actions";
import { setCurrentWorld } from "store/modules/world/actions";
import { getAppCookies } from "middleware/utils";

import { DefaultValues } from 'components/PolygonMap/constants';
import PolygonMap from 'components/PolygonMap';

import { setCurrentWorldConfig } from 'store/modules/world/actions';
import { getWorld } from '@api';

export default function WorldPage() {
    const config = useSelector(state => state.world.current.config);
    const router = useRouter();

    useEffect(() => {
        Router.push({
            pathname: `/world/${router.query.id}`,
            query: {
                x: config.center.x,
                y: config.center.y,
                zoom: config.scale.current
            },
        }, null, { shallow: true });
    }, [config]);

    return (
        <div> 
            <PolygonMap onClickCell={cell => console.log({ cell })} />
        </div>
    );
}

export const getServerSideProps = storeWrapper.getServerSideProps(
    async ({ req, query, store }) => {
        const { id } = query;
        const { token } = await getAppCookies(req);

        if(Boolean(token))
            await store.dispatch(await signInValidate(token));
        else {
            Router.push('/');
            store.dispatch(signOut());
            return;
        }

        const world = await getWorld(id);

        store.dispatch(setCurrentWorld(id, world));

        store.dispatch(setCurrentWorldConfig({
            x: Number(query?.x) || null,
            y: Number(query?.y) || null,
        }, {
            current: Number(DefaultValues.scale.current(query?.zoom))
        }));
    }
);