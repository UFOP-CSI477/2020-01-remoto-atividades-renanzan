import { HomeTemplate } from "components/____templates";
import { listWorld } from "@api";
import { getAppCookies } from "middleware/utils";

import storeWrapper from "store";
import { setAvailableWordList } from "store/modules/world/actions";
import { signInValidate, signOut } from "store/modules/auth/actions";

import axios from 'axios';

export default function Home() {
    async function handleTeste() {
        try {
            const teste = await axios.post("localhost:5000/auth/teste");

            cosole.log({ teste });
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <button onClick={handleTeste}>Teste</button>
            <HomeTemplate />
        </div>
    );
}

export const getServerSideProps = storeWrapper.getServerSideProps(
    async ({ req, store }) => {
        const { token } = await getAppCookies(req);

        if(Boolean(token))
            await store.dispatch(await signInValidate(token));
        else
            store.dispatch(signOut());

        try {
            const worlds = await listWorld();

            store.dispatch(setAvailableWordList(worlds));
        } catch (err) {
            console.log(err);
        }
    }
);