import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEAL_COLLECTION } from "../../data/storageConfig";
import { Meal } from "../../types/meal";
import { mealGetAll } from "./mealGetAll";

export async function mealUpdate(updatedMeal: Meal) {
  try {
    const storedMeals = await mealGetAll();

    const mealsUpdated = storedMeals.map((meal) =>
      meal.id === updatedMeal.id ? updatedMeal : meal
    );

    await AsyncStorage.setItem(MEAL_COLLECTION, JSON.stringify(mealsUpdated));
  } catch (error) {
    throw error;
  }
}