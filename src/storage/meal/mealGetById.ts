import { Meal } from "../../types/meal";
import { mealGetAll } from "./mealGetAll";

export async function mealGetById(id: string): Promise<Meal | null> {
  const meals = await mealGetAll();

  const meal = meals.find((item) => item.id === id);

  return meal ?? null;
}