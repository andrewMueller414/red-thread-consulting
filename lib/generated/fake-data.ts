import { PriorityId } from './prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeFormResponse() {
  return {
    data: JSON.stringify({"foo":"a194ad8b-2415-4084-983a-331c6420c9eb","bar":6021608158172569,"bike":"6","a":"i","b":0.597213163538565,"name":"Reilly","prop":"0b1"}),
    reviewed_at: undefined,
  };
}
export function fakeFormResponseComplete() {
  return {
    formId: faker.string.uuid(),
    mdxSourceId: faker.string.uuid(),
    data: JSON.stringify({"foo":"2705cc13-d40b-4f3b-bcc1-8c958fa581cc","bar":2244262440868191,"bike":"3","a":"x","b":0.8603184480433282,"name":"Carleton","prop":"0b1"}),
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
