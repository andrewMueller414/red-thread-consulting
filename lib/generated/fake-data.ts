import {  } from './prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeFormResponse() {
  return {
    data: JSON.stringify({"foo":"ba3c3e71-979f-4a1d-86eb-f3b9bce5861a","bar":4861003056355920,"bike":"6","a":"F","b":0.13446741650738814,"name":"Blair","prop":"0b0"}),
    reviewed_at: undefined,
  };
}
export function fakeFormResponseComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    mdxSourceId: faker.string.uuid(),
    data: JSON.stringify({"foo":"d1edbbae-9c54-4e82-8c71-15ffc2155350","bar":2486117350759602,"bike":"c","a":"X","b":0.47065934617752836,"name":"Kirk","prop":"0b1"}),
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
