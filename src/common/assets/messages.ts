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

//MENU MESSAGES
export const LIST_OF_ALL_MENUS = 'List of all menus.';
export const MENU_FOUND = 'Menu found.';
export const MENU_CREATED_SUCCESSFULLY = 'Menu created successfully.';
export const MENU_UPDATED_SUCCESSFULLY = 'Menu updated successfully.';
export const MENU_DELETED_SUCCESSFULLY = 'Menu deleted successfully.';

//ITEMS
export const ITEM_CREATED_SUCCESSFULLY = 'Item created successfully.';
export const LIST_ALL_ITEMS = 'List of all items.';
export const ITEM_FOUND = 'Item found.';
export const ITEM_UPDATED_SUCCESSFULLY = 'Item updated successfully.';
export const ITEM_DELETED_SUCCESSFULLY = 'Item deleted successfully.';
export const ITEM_ASSOCIATED_WITH_CATEGORY_SUCCESSFULLY =
  'Item associated with the category successfully.';
export const LIST_ITEMS_IN_CATEGORY = 'List of items in a category.';
export const ITEM_DELETED_FROM_CATEGORY_SUCCESSFULLY =
  'Item deleted from the category successfully.';

//CATEGORY MESSAGES
export const LIST_ALL_CATEGORIES = 'List of all categories.';
export const CATEGORY_FOUND = 'Category found.';
export const CATEGORY_CREATED_SUCCESSFULLY = 'Category created successfully.';
export const CATEGORY_UPDATED_SUCCESSFULLY = 'Category updated successfully.';
export const CATEGORY_DELETED_SUCCESSFULLY = 'Category deleted successfully.';

//USER MESSAGES
export const USER_CREATED_SUCCESSFULLY = 'User created successfully.';
export const LIST_ALL_USERS = 'List of all users.';
export const USER_UPDATED_SUCCESSFULLY = 'User updated successfully.';

//ORDER MESSAGES
export const ORDER_CREATED_SUCCESSFULLY = 'Order created successfully.';
export const LIST_ALL_ORDERS = 'List of all orders.';
export const ORDER_FOUND = 'Order found.';
export const ORDER_CANCELLED_SUCCESSFULLY = 'Order cancelled successfully.';
export const ORDER_FULFILLED = 'fulfilled.';
export const ORDER_IN_PROGRESS = 'inProgress';
export const ORDER_CANCELLED_BY_USER = 'cancelledByUser';
export const ORDER_CANCELLED_BY_RESTAURANT = 'cancelledByRestaurant';
