import { ChefHat, Award, Heart } from "lucide-react";

export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  ingredients: { name: string; amount: string; amountMetric: string }[];
  steps: string[];
  creator: {
    id: string;
    name: string;
    avatar: string;
    badges: string[];
  };
  remixes?: Recipe[]; 
  likes: number;
  comments: number;
  tags: string[];
}

export interface Chef {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  joined: string;
  stats: {
    recipesMade: number;
    cuisines: string[];
    badges: string[];
    followers: number;
    following: number;
  };
  recipes: string[];
  specialties: string[];
}

export const getBadgeIcon = (badge: string) => {
  switch (badge) {
    case "Baking Pro":
      return ChefHat;
    case "5-Stars":
      return Award;
    case "Most Loved":
      return Heart;
    default:
      return Award;
  }
};

export const mockChefs: Chef[] = [
  {
    id: "chef1",
    name: "Sophia Anderson",
    avatar: "/placeholder.svg",
    bio: "Passionate home cook specializing in healthy comfort food and fusion cuisine.",
    location: "Stockholm, Sweden",
    joined: "January 2021",
    stats: {
      recipesMade: 42,
      cuisines: ["Italian", "Japanese", "Swedish"],
      badges: ["Baking Pro", "5-Stars", "Most Loved"],
      followers: 1240,
      following: 87
    },
    recipes: ["recipe1", "recipe3", "recipe5"],
    specialties: ["Pasta", "Sushi", "Swedish Desserts", "Vegan Options"]
  },
  {
    id: "chef2",
    name: "Marcus Johnson",
    avatar: "/placeholder.svg",
    bio: "Professional pastry chef with a love for traditional Scandinavian desserts.",
    location: "Copenhagen, Denmark",
    joined: "March 2022",
    stats: {
      recipesMade: 28,
      cuisines: ["Danish", "French", "American"],
      badges: ["5-Stars", "Most Loved"],
      followers: 956,
      following: 124
    },
    recipes: ["recipe2", "recipe4"],
    specialties: ["Pastries", "Danish Desserts", "French Cuisine", "Bread"]
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: "recipe1",
    title: "Cinnamon Cardamom Buns",
    image: "/placeholder.svg",
    description: "Traditional Swedish cardamom buns with a cinnamon twist. Perfect for fika!",
    prepTime: "30 mins",
    cookTime: "15 mins",
    servings: 12,
    difficulty: "Medium",
    cuisine: "Swedish",
    creator: {
      id: "chef1",
      name: "Sophia Anderson",
      avatar: "/placeholder.svg",
      badges: ["Baking Pro"]
    },
    ingredients: [
      { name: "All-purpose flour", amount: "4 cups", amountMetric: "500g" },
      { name: "Active dry yeast", amount: "2¼ tsp", amountMetric: "7g" },
      { name: "Milk", amount: "1 cup", amountMetric: "240ml" },
      { name: "Unsalted butter", amount: "½ cup", amountMetric: "113g" },
      { name: "Granulated sugar", amount: "⅓ cup", amountMetric: "67g" },
      { name: "Ground cardamom", amount: "1 tbsp", amountMetric: "9g" },
      { name: "Ground cinnamon", amount: "2 tbsp", amountMetric: "16g" },
      { name: "Brown sugar", amount: "½ cup", amountMetric: "100g" }
    ],
    steps: [
      "Warm the milk to about 110°F (43°C) and dissolve the yeast in it.",
      "In a large bowl, mix flour, sugar, and cardamom.",
      "Add the milk mixture and knead until a soft dough forms.",
      "Let rise for 1 hour or until doubled in size.",
      "Roll out the dough into a rectangle and spread the softened butter on top.",
      "Sprinkle with a mixture of cinnamon and brown sugar.",
      "Roll into a log and cut into 12 equal pieces.",
      "Place on a baking sheet and let rise for 30 minutes.",
      "Bake at 375°F (190°C) for 12-15 minutes until golden."
    ],
    likes: 128,
    comments: 24,
    tags: ["Breakfast", "Swedish", "Baking"]
  },
  {
    id: "recipe2",
    title: "Nordic Berry Crumble",
    image: "/placeholder.svg",
    description: "A simple yet delicious crumble using seasonal Nordic berries topped with a buttery oat crust.",
    prepTime: "15 mins",
    cookTime: "35 mins",
    servings: 6,
    difficulty: "Easy",
    cuisine: "Nordic",
    creator: {
      id: "chef2",
      name: "Marcus Johnson",
      avatar: "/placeholder.svg",
      badges: ["5-Stars"]
    },
    ingredients: [
      { name: "Mixed berries", amount: "4 cups", amountMetric: "600g" },
      { name: "Rolled oats", amount: "1 cup", amountMetric: "90g" },
      { name: "All-purpose flour", amount: "¾ cup", amountMetric: "95g" },
      { name: "Brown sugar", amount: "½ cup", amountMetric: "100g" },
      { name: "Unsalted butter", amount: "½ cup", amountMetric: "113g" },
      { name: "Cinnamon", amount: "1 tsp", amountMetric: "2.6g" },
      { name: "Vanilla extract", amount: "1 tsp", amountMetric: "5ml" }
    ],
    steps: [
      "Preheat oven to 350°F (175°C).",
      "Place berries in a baking dish and toss with 2 tbsp of sugar and vanilla.",
      "In a separate bowl, mix oats, flour, remaining sugar, and cinnamon.",
      "Cut in cold butter until the mixture resembles coarse crumbs.",
      "Sprinkle the oat mixture over the berries.",
      "Bake for 35-40 minutes until golden and bubbling.",
      "Let cool for 10 minutes before serving with vanilla ice cream."
    ],
    likes: 94,
    comments: 16,
    tags: ["Dessert", "Nordic", "Berries"]
  },
  {
    id: "recipe3",
    title: "Hearty Winter Vegetable Soup",
    image: "/placeholder.svg",
    description: "A warming vegetable soup perfect for cold winter evenings, featuring seasonal root vegetables and herbs.",
    prepTime: "20 mins",
    cookTime: "45 mins",
    servings: 8,
    difficulty: "Easy",
    cuisine: "Scandinavian",
    creator: {
      id: "chef1",
      name: "Sophia Anderson",
      avatar: "/placeholder.svg",
      badges: ["Most Loved"]
    },
    ingredients: [
      { name: "Rutabaga", amount: "1 medium", amountMetric: "500g" },
      { name: "Carrots", amount: "3 large", amountMetric: "300g" },
      { name: "Parsnips", amount: "2 medium", amountMetric: "200g" },
      { name: "Onion", amount: "1 large", amountMetric: "150g" },
      { name: "Garlic", amount: "3 cloves", amountMetric: "9g" },
      { name: "Vegetable broth", amount: "8 cups", amountMetric: "2L" },
      { name: "Thyme", amount: "2 tsp", amountMetric: "2g" },
      { name: "Bay leaves", amount: "2", amountMetric: "2" },
      { name: "Salt and pepper", amount: "To taste", amountMetric: "To taste" }
    ],
    steps: [
      "Dice all vegetables into similar-sized chunks.",
      "In a large pot, sauté onions and garlic until translucent.",
      "Add the root vegetables and cook for 5 minutes.",
      "Pour in the vegetable broth and add the herbs.",
      "Bring to a boil, then reduce heat and simmer for 30-40 minutes until vegetables are tender.",
      "Season with salt and pepper to taste.",
      "Serve hot with crusty bread."
    ],
    likes: 73,
    comments: 11,
    tags: ["Soup", "Winter", "Vegetarian"]
  },
  {
    id: "recipe4",
    title: "Danish Rye Bread (Rugbrød)",
    image: "/placeholder.svg",
    description: "Traditional dense Danish rye bread packed with seeds and grains. A staple of Scandinavian cuisine.",
    prepTime: "24 hours",
    cookTime: "1 hour 30 mins",
    servings: 16,
    difficulty: "Hard",
    cuisine: "Danish",
    creator: {
      id: "chef2",
      name: "Marcus Johnson",
      avatar: "/placeholder.svg",
      badges: ["5-Stars"]
    },
    ingredients: [
      { name: "Rye flour", amount: "4 cups", amountMetric: "500g" },
      { name: "Bread flour", amount: "1 cup", amountMetric: "125g" },
      { name: "Sourdough starter", amount: "1 cup", amountMetric: "240g" },
      { name: "Sunflower seeds", amount: "½ cup", amountMetric: "70g" },
      { name: "Flax seeds", amount: "¼ cup", amountMetric: "35g" },
      { name: "Pumpkin seeds", amount: "¼ cup", amountMetric: "35g" },
      { name: "Salt", amount: "1 tbsp", amountMetric: "18g" },
      { name: "Water", amount: "3 cups", amountMetric: "700ml" },
      { name: "Malt extract or molasses", amount: "3 tbsp", amountMetric: "60g" }
    ],
    steps: [
      "Mix sourdough starter with 2 cups rye flour and water to make a preferment. Let sit overnight.",
      "The next day, add remaining ingredients and mix well.",
      "Transfer to a greased loaf pan and let rise for 2-3 hours.",
      "Preheat oven to 350°F (175°C).",
      "Bake for 1 hour 30 minutes until the internal temperature reaches 205°F (96°C).",
      "Let cool completely before slicing, ideally waiting 24 hours."
    ],
    likes: 62,
    comments: 19,
    tags: ["Bread", "Danish", "Sourdough"]
  },
  {
    id: "recipe5",
    title: "Swedish Meatballs with Lingonberry",
    image: "/placeholder.svg",
    description: "Classic Swedish meatballs in a creamy sauce, served with mashed potatoes and lingonberry jam.",
    prepTime: "30 mins",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Medium",
    cuisine: "Swedish",
    creator: {
      id: "chef1",
      name: "Sophia Anderson",
      avatar: "/placeholder.svg",
      badges: ["Most Loved"]
    },
    ingredients: [
      { name: "Ground beef", amount: "1 lb", amountMetric: "450g" },
      { name: "Ground pork", amount: "½ lb", amountMetric: "225g" },
      { name: "Breadcrumbs", amount: "½ cup", amountMetric: "60g" },
      { name: "Eggs", amount: "1", amountMetric: "1" },
      { name: "Milk", amount: "¼ cup", amountMetric: "60ml" },
      { name: "Onion (finely diced)", amount: "1 small", amountMetric: "75g" },
      { name: "Allspice", amount: "¼ tsp", amountMetric: "0.5g" },
      { name: "Nutmeg", amount: "¼ tsp", amountMetric: "0.5g" },
      { name: "Butter", amount: "3 tbsp", amountMetric: "45g" },
      { name: "All-purpose flour", amount: "3 tbsp", amountMetric: "24g" },
      { name: "Beef broth", amount: "2 cups", amountMetric: "480ml" },
      { name: "Heavy cream", amount: "¼ cup", amountMetric: "60ml" },
      { name: "Lingonberry jam", amount: "To serve", amountMetric: "To serve" }
    ],
    steps: [
      "In a bowl, mix breadcrumbs and milk, let sit for 10 minutes.",
      "Add ground meats, egg, diced onion, allspice, nutmeg, salt, and pepper to the breadcrumb mixture.",
      "Mix well and form into small, 1-inch meatballs.",
      "Heat butter in a large skillet and brown meatballs on all sides. Remove and set aside.",
      "In the same skillet, whisk in flour to make a roux with the remaining butter.",
      "Slowly add beef broth, whisking constantly to avoid lumps.",
      "Add cream and simmer until the sauce thickens.",
      "Return meatballs to the sauce and cook for 8-10 minutes until cooked through.",
      "Serve with mashed potatoes and lingonberry jam."
    ],
    likes: 136,
    comments: 31,
    tags: ["Main Course", "Swedish", "Meat"]
  }
];

export const getCurrentSeason = (): "winter" | "spring" | "summer" | "fall" => {
  const month = new Date().getMonth();
  
  if (month >= 0 && month <= 1) return "winter"; // Jan-Feb
  if (month >= 2 && month <= 4) return "spring"; // Mar-May
  if (month >= 5 && month <= 7) return "summer"; // Jun-Aug
  if (month >= 8 && month <= 10) return "fall";  // Sep-Nov
  return "winter"; // Dec
};

export const getSeasonalClass = (): string => {
  const season = getCurrentSeason();
  return `seasonal-${season}`;
};

export const getSeasonalRecipes = (): Recipe[] => {
  const season = getCurrentSeason();
  let seasonalTag: string;
  
  switch (season) {
    case "winter":
      seasonalTag = "Winter";
      break;
    case "spring":
      seasonalTag = "Spring";
      break;
    case "summer":
      seasonalTag = "Summer";
      break;
    case "fall":
      seasonalTag = "Fall";
      break;
    default:
      seasonalTag = "Winter";
  }
  
  return mockRecipes.filter(recipe => 
    recipe.tags.includes(seasonalTag) || 
    recipe.tags.some(tag => tag.toLowerCase().includes(seasonalTag.toLowerCase()))
  );
};
