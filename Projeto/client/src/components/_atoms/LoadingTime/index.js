import { useState, useEffect } from 'react';
import * as dateFns from 'date-fns';

import { LinearProgress } from './style';

export default function LoadingTime({ start, end }) {
    const [percentage, setPercentage] = useState(0);

    function calculatePercentage() {
        const totalSecounds = dateFns.differenceInSeconds(new Date(end), new Date(start));
        const runningSeconds = dateFns.differenceInSeconds(new Date(), new Date(start));
        const calculatedPercentage = ((runningSeconds/totalSecounds)*100);

        if(calculatedPercentage >= 100)
            return 100;

        return Number(calculatedPercentage.toFixed(2));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(percentage >= 100)
                return clearInterval(interval);

            setPercentage(calculatePercentage());
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    });

    return (
        <LinearProgress value={percentage} variant="determinate" />
    );
}