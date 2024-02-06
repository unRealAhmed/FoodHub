import { Restaurant } from 'src/api/restaurants/restaurant.entity';

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
