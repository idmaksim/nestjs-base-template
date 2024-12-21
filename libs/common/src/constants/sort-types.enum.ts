import { registerEnumType } from '@nestjs/graphql';

export enum SortTypes {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortTypes, {
  name: 'SortTypes',
});
