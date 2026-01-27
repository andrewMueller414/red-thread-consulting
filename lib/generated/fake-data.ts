import {  } from './prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeFormResponse() {
  return {
    data: JSON.stringify({"foo":"d5b30534-f82f-4984-80c3-a46fe66e9b71","bar":8993257571665365,"bike":"f","a":"c","b":0.5840713795648418,"name":"Tevin","prop":"0b1"}),
    reviewed_at: undefined,
  };
}
export function fakeFormResponseComplete() {
  return {
    formId: faker.string.uuid(),
    mdxSourceId: faker.string.uuid(),
    data: JSON.stringify({"foo":"7baba16b-6d29-479d-a588-160a43c09fe5","bar":1467371906489782,"bike":"5","a":"X","b":0.3959646455861766,"name":"Nicholas","prop":"0b0"}),
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
