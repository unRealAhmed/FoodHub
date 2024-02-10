//NOT_FOUND MESSAGES
export const RESTAURANT_NOT_FOUND = (id: number) =>
  `Restaurant with id ${id} not found`;

export const MENU_NOT_FOUND = (id: number) => `Menu with id ${id} not found`;

export const CATEGORY_NOT_FOUND = (id: number) =>
  `Category with id ${id} not found`;

export const ITEM_NOT_FOUND = (name: string) =>
  `Item with name ${name} not found`;

export const ITEM_NOT_FOUND_ID = (id: number) =>
  `Item with name ${id} not found`;

//RESTAURANT MESSAGES
export const RESTAURANT_CREATED_SUCCESSFULLY =
  'Restaurant created successfully.';
export const LIST_OF_ALL_RESTAURANTS = 'List of all restaurants.';
export const RESTAURANT_FOUND = 'Restaurant found.';
export const RESTAURANT_UPDATED_SUCCESSFULLY =
  'Restaurant updated successfully.';
export const RESTAURANT_DELETED_SUCCESSFULLY =
  'Restaurant deleted successfully.';

//ORDER MESSAGES
export const ORDER_FULFILLED = 'fulfilled.';
export const ORDER_IN_PROGRESS = 'inProgress';
export const ORDER_CANCELLED_BY_USER = 'cancelledByUser';
export const ORDER_CANCELLED_BY_RESTAURANT = 'cancelledByRestaurant';

//MENU MESSAGES
export const LIST_OF_ALL_MENUS = 'List of all menus.';
export const MENU_FOUND = 'Menu found.';
export const MENU_CREATED_SUCCESSFULLY = 'Menu created successfully.';
export const MENU_UPDATED_SUCCESSFULLY = 'Menu updated successfully.';
export const MENU_DELETED_SUCCESSFULLY = 'Menu deleted successfully.';
