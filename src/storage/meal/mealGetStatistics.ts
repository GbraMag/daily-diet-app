import { mealGetAll } from "./mealGetAll";

export async function mealGetStatistics() {
  const meals = await mealGetAll();

  const total = meals.length;
  const onDiet = meals.filter((meal) => meal.isOnDiet).length;
  const offDiet = meals.filter((meal) => !meal.isOnDiet).length;

  const percentage = total > 0 ? (onDiet / total) * 100 : 0;

  let bestSequence = 0;
  let currentSequence = 0;

  const sortedMeals = [...meals].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("/");
    const [dayB, monthB, yearB] = b.date.split("/");

    const dateA = new Date(`${yearA}-${monthA}-${dayA}T${a.time}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}T${b.time}`);

    return dateA.getTime() - dateB.getTime();
  });

  for (const meal of sortedMeals) {
    if (meal.isOnDiet) {
      currentSequence += 1;

      if (currentSequence > bestSequence) {
        bestSequence = currentSequence;
      }
    } else {
      currentSequence = 0;
    }
  }

  return {
    total,
    onDiet,
    offDiet,
    percentage,
    bestSequence,
  };
}