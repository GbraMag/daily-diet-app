import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEAL_COLLECTION } from "../../data/storageConfig";
import { Meal } from "../../types/meal";

export async function mealGetAll(): Promise<Meal[]> {
  try {
    const storage = await AsyncStorage.getItem(MEAL_COLLECTION);
    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw error;
  }
}