import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEAL_COLLECTION } from "../../data/storageConfig";
import { mealGetAll } from "./mealGetAll";

export async function mealRemove(id: string) {
  try {
    const storedMeals = await mealGetAll();

    const filteredMeals = storedMeals.filter((meal) => meal.id !== id);

    await AsyncStorage.setItem(MEAL_COLLECTION, JSON.stringify(filteredMeals));
  } catch (error) {
    throw error;
  }
}