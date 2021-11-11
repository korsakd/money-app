// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Income, Costs } = initSchema(schema);

export {
  User,
  Income,
  Costs
};