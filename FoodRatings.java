import java.util.*;

class FoodRatings {
    // {cuisine: {(rating, food)}}
    private Map<String, TreeSet<Pair<Integer, String>>> cuisineToRatingAndFoods = new HashMap<>();
    private Map<String, String> foodToCuisine = new HashMap<>();
    private Map<String, Integer> foodToRating = new HashMap<>();

    public FoodRatings(String[] foods, String[] cuisines, int[] ratings) {
        for (int i = 0; i < foods.length; ++i) {
            cuisineToRatingAndFoods.putIfAbsent(
                cuisines[i],
                new TreeSet<>(
                    Comparator.comparing(Pair<Integer, String>::getKey, Comparator.reverseOrder())
                        .thenComparing(Pair<Integer, String>::getValue)));
            cuisineToRatingAndFoods.get(cuisines[i]).add(new Pair<>(ratings[i], foods[i]));
            foodToCuisine.put(foods[i], cuisines[i]);
            foodToRating.put(foods[i], ratings[i]);
        }
    }

    public void changeRating(String food, int newRating) {
        final String cuisine = foodToCuisine.get(food);
        final int oldRating = foodToRating.get(food);
        TreeSet<Pair<Integer, String>> ratingAndFoods = cuisineToRatingAndFoods.get(cuisine);
        ratingAndFoods.remove(new Pair<>(oldRating, food));
        ratingAndFoods.add(new Pair<>(newRating, food));
        foodToRating.put(food, newRating);
    }

    public String highestRated(String cuisine) {
        return cuisineToRatingAndFoods.get(cuisine).first().getValue();
    }

    // Simple Pair class implementation
    static class Pair<K, V> {
        private final K key;
        private final V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Pair<?, ?> pair = (Pair<?, ?>) obj;
            return Objects.equals(key, pair.key) && Objects.equals(value, pair.value);
        }

        @Override
        public int hashCode() {
            return Objects.hash(key, value);
        }
    }
}
