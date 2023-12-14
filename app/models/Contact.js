import Realm from 'realm';

class Contact extends Realm.Object {}

Contact.schema = {
  name: 'Contact',
  properties: {
    _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
    name: 'string',
    phone: 'string',
    imageUrl: { type: 'string', optional: true },
    landmark: { type: 'string', optional: true },
    favorite: {type: 'bool', optional: false}
  },
  primaryKey: "_id"
};

export default Contact;
