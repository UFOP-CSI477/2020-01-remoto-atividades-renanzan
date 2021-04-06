import * as dateFns from 'date-fns';

import LoadingTime from 'components/atomic/LoadingTime';

export default function DevPage() {
    return (
        <div>
            <LoadingTime start={new Date()} end={dateFns.addSeconds(new Date(), 5)} />
        </div>
    );
}