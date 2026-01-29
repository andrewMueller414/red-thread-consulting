import {  } from './prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeFormResponse() {
  return {
    data: JSON.stringify({"foo":"dc3ef707-bc83-4f02-b2fa-f703aa5968cf","bar":351069459981835,"bike":"0","a":"f","b":0.5133048000896631,"name":"Kory","prop":"0b1"}),
    reviewed_at: undefined,
  };
}
export function fakeFormResponseComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    mdxSourceId: faker.string.uuid(),
    data: JSON.stringify({"foo":"675c4636-a6dc-42bb-b464-f0e345ebe8fd","bar":2162811789692410,"bike":"9","a":"t","b":0.9789810477325115,"name":"Paula","prop":"0b1"}),
    ctime: new Date(),
    reviewed_at: undefined,
  };
}
export function fakeMdxContent() {
  return {
    body: faker.lorem.words(5),
  };
}
export function fakeMdxContentComplete() {
  return {
    id: faker.string.uuid(),
    body: faker.lorem.words(5),
    ctime: new Date(),
    utime: new Date(),
  };
}
