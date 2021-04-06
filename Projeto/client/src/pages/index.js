import { HomeTemplate } from "components/____templates";
import { listWorld } from "@api";
import { getAppCookies } from "middleware/utils";

import storeWrapper from "store";
import { setAvailableWordList } from "store/modules/world/actions";
import { signInValidate, signOut } from "store/modules/auth/actions";

export default function Home() {
  return ( <HomeTemplate /> );
}

export const getServerSideProps = storeWrapper.getServerSideProps(
    async ({ req, store }) => {
        const { token } = await getAppCookies(req);

        if(Boolean(token)) {
            await store.dispatch(await signInValidate(token));
        } else
            store.dispatch(signOut());

        try {
            const worlds = await listWorld().then((res) => res.data);

            store.dispatch(setAvailableWordList(worlds));
        } catch (err) {
            console.log(err);
        }
    }
);