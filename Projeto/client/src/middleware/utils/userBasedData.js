import { setAvailableWordList } from 'store/modules/world/actions';
import { listWorld } from '@api';

export async function updateUserBasedData(dispatch) {
    console.log("UserBasedData", "UPDATE");

    try {
        const worlds = await listWorld();

        dispatch(setAvailableWordList(worlds));
    } catch (error) {
        console.error("Error on loading world list", error);
    }
}

export function clearUserBasedData(dispatch) {
    dispatch(setAvailableWordList([]));
}