import * as Realm from "realm-web";

const app = new Realm.App({id:"cms-chclo"});
const client = app.currentUser.mongoClient('mongodb-atlas')
export {app,client};