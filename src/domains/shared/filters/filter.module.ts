import { APP_FILTER } from "@nestjs/core";
import { FilterRequest } from "./filter.request";

export const FilterModule = [
  {
    provide: APP_FILTER,
    useClass: FilterRequest,
  },
];
