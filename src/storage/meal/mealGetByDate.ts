import { Meal } from "../../types/meal";
import { mealGetAll } from "./mealGetAll";

type SectionData = {
  title: string;
  data: Meal[];
};

type SortType = "recent" | "oldest";

export async function mealGetByDate(sort: SortType = "recent"): Promise<SectionData[]> {
  const meals = await mealGetAll();

  const sortedMeals = [...meals].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("/");
    const [dayB, monthB, yearB] = b.date.split("/");

    const dateA = new Date(`${yearA}-${monthA}-${dayA}T${a.time}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}T${b.time}`);

    if (sort === "recent") {
      return dateB.getTime() - dateA.getTime();
    }

    return dateA.getTime() - dateB.getTime();
  });

  const grouped = sortedMeals.reduce((acc: SectionData[], meal) => {
    const existingGroup = acc.find((item) => item.title === meal.date);

    if (existingGroup) {
      existingGroup.data.push(meal);
    } else {
      acc.push({
        title: meal.date,
        data: [meal],
      });
    }

    return acc;
  }, []);

  return grouped;
}