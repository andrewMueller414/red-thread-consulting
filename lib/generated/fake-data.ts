import {  } from './prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeFormResponse() {
  return {
    data: JSON.stringify({"foo":"2dca5c55-6359-4650-836d-b3a3e47ad47b","bar":2238915014789796,"bike":"d","a":"0","b":0.8441851681253104,"name":"Cortney","prop":"0b1"}),
    reviewed_at: undefined,
  };
}
export function fakeFormResponseComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    mdxSourceId: faker.string.uuid(),
    data: JSON.stringify({"foo":"8cc5f899-43ac-40fa-bf3a-caa0a616405a","bar":1378915198169813,"bike":"6","a":"r","b":0.08756120321609184,"name":"Aiyana","prop":"0b0"}),
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
