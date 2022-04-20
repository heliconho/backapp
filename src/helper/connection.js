import * as Realm from "realm-web";
const appKey = process.env.REACT_APP_KEY;
const app = new Realm.App({ id: "cms-chclo" });
export { app };