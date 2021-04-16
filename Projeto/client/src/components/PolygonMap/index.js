//## Referência: https://jsfiddle.net/ssLqwLj6/3/
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles.module.css';

import initialzieMap from './initializeMap';
import renderGrid from './renderGrid';

export default function PolygonIslandMap({ size, onClickCell }) {
    const dispatch = useDispatch();
    const map = useRef();
    const data = useSelector(state => state.world.current.data);
    const config = useSelector(state => state.world.current.config);

    useEffect(() => {
        initialzieMap(map.current, size);
    }, []);

    useEffect(() => {
        if(!data)
            return;
        
        renderGrid(dispatch, data, map.current, config, onClickCell);
    }, [data]);

    return (
        <div ref={map} className={styles.polygonMap}>
            <div id="ruler-top" className="ruler top"></div>
            <div id="ruler-left" className="ruler left"></div>
            <div id="ruler-bottom" className="ruler bottom"></div>
            <div id="ruler-right" className="ruler right"></div>
        </div>
    );
}