import Realm from 'realm';
import Contact from '../models/Contact';
const databaseOptions = {
  path: 'myRealmDatabase.realm',
  schema: [Contact], // Add other models as needed
  schemaVersion: 0,
};

const realm = new Realm(databaseOptions);

export default realm;
