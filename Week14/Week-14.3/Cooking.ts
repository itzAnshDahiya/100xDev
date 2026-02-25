// Types and Interfaces for a Cooking Website

export enum DietaryRestriction {
    Vegan = "Vegan",
    Vegetarian = "Vegetarian",
    GlutenFree = "Gluten Free",
    NutFree = "Nut Free",
    DairyFree = "Dairy Free",
    None = "None"
}

export enum DifficultyLevel {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard"
}

export interface User {
    id: string;
    username: string;
    email: string;
    savedRecipes: string[]; // Array of Recipe IDs
}

export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

export interface Review {
    userId: string;
    rating: number; // 1 to 5
    comment: string;
    date: Date;
}

export interface Recipe {
    id: string;
    title: string;
    description: string;
    authorId: string;
    ingredients: Ingredient[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    difficulty: DifficultyLevel;
    dietaryTags: DietaryRestriction[];
    reviews: Review[];
    imageUrl?: string;
}

// Main Platform Class to handle website features
export class CookingPlatform {
    private users: Map<string, User> = new Map();
    private recipes: Map<string, Recipe> = new Map();

    constructor() { }

    // --- User Features ---

    public registerUser(id: string, username: string, email: string): User {
        if (this.users.has(id)) {
            throw new Error("User already exists");
        }
        const newUser: User = { id, username, email, savedRecipes: [] };
        this.users.set(id, newUser);
        return newUser;
    }

    public getUser(id: string): User | undefined {
        return this.users.get(id);
    }

    public saveRecipeForUser(userId: string, recipeId: string): void {
        const user = this.users.get(userId);
        const recipe = this.recipes.get(recipeId);

        if (!user) throw new Error("User not found");
        if (!recipe) throw new Error("Recipe not found");
        if (user.savedRecipes.includes(recipeId)) throw new Error("Recipe already saved");

        user.savedRecipes.push(recipeId);
    }

    // --- Recipe Features ---

    public addRecipe(recipe: Recipe): void {
        if (this.recipes.has(recipe.id)) {
            throw new Error("Recipe ID already exists");
        }
        this.recipes.set(recipe.id, recipe);
    }

    public getRecipe(id: string): Recipe | undefined {
        return this.recipes.get(id);
    }

    public getAllRecipes(): Recipe[] {
        return Array.from(this.recipes.values());
    }

    // Search recipes by title or description
    public searchRecipes(query: string): Recipe[] {
        const lowerQuery = query.toLowerCase();
        return this.getAllRecipes().filter(
            (r) =>
                r.title.toLowerCase().includes(lowerQuery) ||
                r.description.toLowerCase().includes(lowerQuery)
        );
    }

    // Filter recipes by dietary restrictions
    public filterByDietary(tags: DietaryRestriction[]): Recipe[] {
        return this.getAllRecipes().filter((r) =>
            tags.every((tag) => r.dietaryTags.includes(tag))
        );
    }

    // Filter recipes by ingredients you have
    public findRecipesByIngredients(ingredientNames: string[]): Recipe[] {
        const lowerIngredients = ingredientNames.map((i) => i.toLowerCase());
        return this.getAllRecipes().filter((r) => {
            // Check if all needed ingredients are in the provided list
            return r.ingredients.every((reqIng) =>
                lowerIngredients.includes(reqIng.name.toLowerCase())
            );
        });
    }

    // --- Review & Rating Features ---

    public addReview(recipeId: string, review: Review): void {
        const recipe = this.recipes.get(recipeId);
        if (!recipe) throw new Error("Recipe not found");
        if (!this.users.has(review.userId)) throw new Error("User not found");
        if (review.rating < 1 || review.rating > 5) throw new Error("Rating must be between 1 and 5");

        recipe.reviews.push(review);
    }

    public getAverageRating(recipeId: string): number {
        const recipe = this.recipes.get(recipeId);
        if (!recipe || recipe.reviews.length === 0) return 0;

        const sum = recipe.reviews.reduce((acc, curr) => acc + curr.rating, 0);
        return sum / recipe.reviews.length;
    }
}

// --- Example Usage ---
/*
const platform = new CookingPlatform();

platform.registerUser("u1", "chef_john", "john@example.com");

const pastaRecipe: Recipe = {
  id: "r1",
  title: "Classic Spaghetti Carbonara",
  description: "A rich and creamy Italian pasta dish.",
  authorId: "u1",
  ingredients: [
    { name: "Spaghetti", quantity: 200, unit: "grams" },
    { name: "Pancetta", quantity: 100, unit: "grams" },
    { name: "Eggs", quantity: 2, unit: "whole" },
    { name: "Parmesan Cheese", quantity: 50, unit: "grams" }
  ],
  instructions: [
    "Boil pasta in salted water.",
    "Fry pancetta until crispy.",
    "Whisk eggs and cheese together.",
    "Toss pasta and pancetta, remove from heat, quickly stir in egg mixture."
  ],
  prepTimeMinutes: 10,
  cookTimeMinutes: 15,
  difficulty: DifficultyLevel.Medium,
  dietaryTags: [DietaryRestriction.NutFree],
  reviews: []
};

platform.addRecipe(pastaRecipe);
platform.saveRecipeForUser("u1", "r1");
*/
