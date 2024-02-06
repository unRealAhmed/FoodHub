import { Restaurant } from 'src/api/restaurants/restaurant.entity';
import { CategoryItem } from 'src/api/category-item/category-item.entity';

export interface ItemsSearchCriteria {
  price?: number | string;
}

export interface RestaurantSearchCriteria {
  name?: string;
  rating?: string | number;
  location?: string;
}

export function filterRestaurants(
  restaurants: Restaurant[],
  searchCriteria: RestaurantSearchCriteria,
): Restaurant[] {
  const { name, rating, location } = searchCriteria;

  return restaurants.filter((restaurant) => {
    let matchesName = true;
    let matchesRating = true;
    let matchesLocation = true;

    if (name) {
      matchesName = restaurant.name.toLowerCase().includes(name.toLowerCase());
    }

    if (rating !== undefined && rating !== null) {
      if (typeof rating === 'string') {
        const [operator, ratingValue] =
          rating.match(/^(gt|lt)(\d+(\.\d+)?)$/)?.slice(1) || [];
        if (operator && ratingValue) {
          matchesRating =
            operator === 'gt'
              ? restaurant.rating > parseFloat(ratingValue)
              : restaurant.rating < parseFloat(ratingValue);
        }
      } else {
        matchesRating = restaurant.rating === rating;
      }
    }

    if (location) {
      matchesLocation = restaurant.location
        .toLowerCase()
        .includes(location.toLowerCase());
    }

    return matchesName && matchesRating && matchesLocation;
  });
}

// export function filterItems(
//   items: CategoryItem[],
//   searchCriteria: ItemsSearchCriteria,
// ): CategoryItem[] {
//   const { price } = searchCriteria;

//   return items.filter((item) => {
//     let matchesPrice = true;
//     const itemPrice = parseFloat(item.item.price);

//     // If price isn't undefined or null, proceed with the filtering logic
//     if (price !== undefined && price !== null) {
//       if (typeof price === 'string') {
//         const priceRegex = /^(gt|lt)(\d+(\.\d+)?)$/;
//         const priceMatch = price.match(priceRegex);

//         if (priceMatch) {
//           const operator = priceMatch[1];
//           const priceValue = parseFloat(priceMatch[2]);

//           if (operator === 'gt') {
//             matchesPrice = itemPrice > priceValue;
//           } else if (operator === 'lt') {
//             matchesPrice = itemPrice < priceValue;
//           }
//         } else {
//           // Assuming that a plain number string should be an exact match
//           matchesPrice = itemPrice === parseFloat(price);
//         }
//       } else if (typeof price === 'number') {
//         // Handle case where price is a number
//         matchesPrice = itemPrice === price;
//       }
//     }

//     return matchesPrice;
//   });
// }
