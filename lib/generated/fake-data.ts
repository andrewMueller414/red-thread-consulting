import { PriorityId } from './prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeOnboardingResponse() {
  return {
    name_first: faker.lorem.words(1),
    name_last: faker.lorem.words(1),
    how_can_i_help: faker.lorem.paragraphs(2),
    priorities: faker.helpers.arrayElement([PriorityId.GROWTH, PriorityId.FINANCIAL_INDEPENDENCE, PriorityId.COMMITTMENT, PriorityId.IMPACT, PriorityId.GIVING_BACK, PriorityId.SOCIAL_WELFARE] as const),
    reviewed_at: undefined,
  };
}
export function fakeOnboardingResponseComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    name_first: faker.lorem.words(1),
    name_last: faker.lorem.words(1),
    how_can_i_help: faker.lorem.paragraphs(2),
    priorities: faker.helpers.arrayElement([PriorityId.GROWTH, PriorityId.FINANCIAL_INDEPENDENCE, PriorityId.COMMITTMENT, PriorityId.IMPACT, PriorityId.GIVING_BACK, PriorityId.SOCIAL_WELFARE] as const),
    ctime: new Date(),
    reviewed_at: undefined,
  };
}
