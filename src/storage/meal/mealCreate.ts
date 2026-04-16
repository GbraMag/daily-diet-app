import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEAL_COLLECTION } from "../../data/storageConfig";
import { Meal } from "../../types/meal";
import { mealGetAll } from "./mealGetAll";

export async function mealCreate(newMeal: Meal) {
  try {
    const storedMeals = await mealGetAll();

    const storage = JSON.stringify([...storedMeals, newMeal]);

    await AsyncStorage.setItem(MEAL_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}