export const RESTAURANT_NOT_FOUND = (id: number) =>
  `Restaurant with id ${id} not found`;

export const MENU_NOT_FOUND = (id: number) => `Menu with id ${id} not found`;

export const CATEGORY_NOT_FOUND = (id: number) =>
  `Category with id ${id} not found`;

export const ITEM_NOT_FOUND = (name: string) =>
  `Item with name ${name} not found`;

export const ITEM_NOT_FOUND_ID = (id: number) =>
  `Item with name ${id} not found`;

export const ORDER_FULFILLED = 'fulfilled.';
export const ORDER_IN_PROGRESS = 'inProgress';
export const ORDER_CANCELLED_BY_USER = 'cancelledByUser';
export const ORDER_CANCELLED_BY_RESTAURANT = 'cancelledByRestaurant';
