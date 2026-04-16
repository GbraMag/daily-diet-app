import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";

import { Home } from "../screens/Home";
import { NewMeal } from "../screens/NewMeal";
import { Feedback } from "../screens/Feedback";
import { MealDetails } from "../screens/MealDetails";
import { EditMeal } from "../screens/EditMeal";
import { Statistics } from "../screens/Statistics";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="newMeal" component={NewMeal} />
      <Screen name="feedback" component={Feedback} />
      <Screen name="mealDetails" component={MealDetails} />
      <Screen name="editMeal" component={EditMeal} />
      <Screen name="statistics" component={Statistics} />
    </Navigator>
  );
}