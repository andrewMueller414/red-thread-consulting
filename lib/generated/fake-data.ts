import {  } from './prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeFormResponse() {
  return {
    data: JSON.stringify({"foo":"484c501c-3cc1-4834-ad2d-ec26bdb7dc8a","bar":7911572521087724,"bike":"9","a":"I","b":0.20995576108043068,"name":"Skyla","prop":"0b0"}),
    reviewed_at: undefined,
  };
}
export function fakeFormResponseComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    mdxSourceId: faker.string.uuid(),
    data: JSON.stringify({"foo":"f4e51b1b-6b86-47fe-ad4f-896e266c39b4","bar":7424437530278400,"bike":"f","a":"L","b":0.46420699382389474,"name":"Kelli","prop":"0b1"}),
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
