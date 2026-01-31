import {  } from './prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeFormResponse() {
  return {
    data: JSON.stringify({"foo":"d37d83ab-e09c-4eb4-bf7f-9a0c0cf6c24c","bar":752259726267810,"bike":"8","a":"q","b":0.11329905174630928,"name":"Hershel","prop":"0b0"}),
    reviewed_at: undefined,
  };
}
export function fakeFormResponseComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    mdxSourceId: faker.string.uuid(),
    data: JSON.stringify({"foo":"8b1ddfb5-3688-455f-90e2-fe1d53e3a5be","bar":5661062677997356,"bike":"5","a":"j","b":0.6637793799288498,"name":"Carter","prop":"0b1"}),
    ctime: new Date(),
    reviewed_at: undefined,
  };
}
export function fakeMdxContent() {
  return {
    formFieldNames: faker.lorem.words(5).split(' '),
    body: faker.lorem.words(5),
  };
}
export function fakeMdxContentComplete() {
  return {
    id: faker.string.uuid(),
    formFieldNames: faker.lorem.words(5).split(' '),
    body: faker.lorem.words(5),
    ctime: new Date(),
    utime: new Date(),
  };
}
