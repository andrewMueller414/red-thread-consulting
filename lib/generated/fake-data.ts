import { PriorityId } from './prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeFormResponse() {
  return {
    data: JSON.stringify({"foo":"11567573-f88f-4228-bebd-1547ca376725","bar":3797587730190474,"bike":"d","a":"0","b":0.32012295423664305,"name":"Grant","prop":"0b1"}),
    formId: faker.lorem.words(5),
    reviewed_at: undefined,
  };
}
export function fakeFormResponseComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    data: JSON.stringify({"foo":"ed65e427-a6f2-4cc1-9df0-0dead65fb2c6","bar":85197500957130,"bike":"6","a":"k","b":0.9080578642275996,"name":"Richard","prop":"0b0"}),
    formId: faker.lorem.words(5),
    ctime: new Date(),
    reviewed_at: undefined,
  };
}
export function fakeMdxContent() {
  return {
    body: faker.lorem.words(5),
    formId: undefined,
  };
}
export function fakeMdxContentComplete() {
  return {
    id: faker.string.uuid(),
    body: faker.lorem.words(5),
    formId: undefined,
    ctime: new Date(),
    utime: new Date(),
  };
}
