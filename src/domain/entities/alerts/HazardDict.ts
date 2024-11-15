import { HazardType } from '@/domain/enums/HazardType';

export type HazardDict<T> = { [K in HazardType]: T };
