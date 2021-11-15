// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Categories } = initSchema(schema);

export {
  User,
  Categories
};