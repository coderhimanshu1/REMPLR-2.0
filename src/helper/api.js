import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL || "https://remplr-backend.onrender.com";

class RemplrApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${RemplrApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /*****************************
   * Methods for Authentication
   ******************************/

  /** Authenticate a user
   * Takes a username and password
   * Returns a JWT token for further requests
   * Authorization required: none
   */
  static async login(username, password) {
    const result = await this.request(
      `auth/token`,
      { username, password },
      "post"
    );
    this.token = result.token;
    return result.token;
  }

  /** Add a new client linked to a nutritionist
   * Takes user details and nutritionist username
   * Returns a message confirming the linkage
   * Authorization required: admin or nutritionist
   */
  static async addClient(data, nutritionist_username) {
    data.nutritionist_username = nutritionist_username;
    const result = await this.request(`auth/client/new`, data, "post");
    return result.message;
  }

  /** Register a new nutritionist
   * Takes user details including username, password, firstName, lastName, and email
   * Returns a JWT token for further requests
   * Authorization required: none
   */
  static async registerNutritionist(data) {
    const result = await this.request(`auth/register`, data, "post");
    this.token = result.token;
    return result.token;
  }

  /*****************************
   * Methods for Users
   ******************************/

  /** Add a new user (Admin only)
   * Takes a user object
   * Returns the newly created user and a token
   * Authorization required: admin
   */
  static async addUser(user) {
    const result = await this.request(`users/`, user, "post");
    return result;
  }

  /** Get all users (Admin only)
   * Returns list of all users
   * Authorization required: admin
   */
  static async getAllUsers() {
    const result = await this.request(`users/`);
    return result.users;
  }

  /** Get a specific user by username
   * Takes a username
   * Returns user details including recipes, ingredients, and mealplans
   * Authorization required: admin or same user-as-:username
   */
  static async getUser(username) {
    const result = await this.request(`users/${username}`);
    return result.user;
  }

  /** Update user details by username
   * Takes a username and user data
   * Returns updated user details
   * Authorization required: admin or same user-as-:username
   */
  static async updateUser(username, userData) {
    const result = await this.request(`users/${username}`, userData, "patch");
    return result.user;
  }

  /** Delete a user by username
   * Takes a username
   * Returns a deletion confirmation
   * Authorization required: admin or same user-as-:username
   */
  static async deleteUser(username) {
    const result = await this.request(`users/${username}`, {}, "delete");
    return result["deleted user"];
  }

  /** Associate an ingredient with a user
   * Takes a username and ingredient ID
   * Returns a confirmation message
   * Authorization required: admin or same user-as-:username
   */
  static async saveIngredient(username, ingredientId) {
    const result = await this.request(
      `users/${username}/ingredients/${ingredientId}`,
      {},
      "post"
    );
    return result["Saved ingredient with id"];
  }

  /** Associate a recipe with a user
   * Takes a username and recipe ID
   * Returns a confirmation message
   * Authorization required: admin or same user-as-:username
   */
  static async saveRecipe(username, recipeId) {
    const result = await this.request(
      `users/${username}/recipes/${recipeId}`,
      {},
      "post"
    );
    return result["Saved ingredient with id"];
  }

  /** Associate a meal plan with a user
   * Takes a username and mealPlan ID
   * Returns the mealPlan object
   * Authorization required: admin or nutritionist
   */
  static async saveMealPlan(username, mealPlanId) {
    const result = await this.request(
      `users/${username}/mealplans/${mealPlanId}`,
      {},
      "post"
    );
    return result;
  }

  /*****************************
   * Methods for User's Ingredients
   ******************************/

  /** Get user's saved ingredients by username
   * Takes a username
   * Returns { ingredients: [{id, aisle, image, name, original, amount, unit}, ...] }
   * Authorization required: admin or same-user-as-:username
   */
  static async getUserSavedIngredients(username) {
    const result = await this.request(`users/${username}/ingredients`);
    return result;
  }

  /*****************************
   * Methods for User's Recipes
   ******************************/

  /** Get user's saved recipes by username
   * Takes a username
   * Returns { recipes: [{id, vegetarian, vegan, dairyfree, weightwatchersmartpoints, creditstext, title, readyinminutes, servings, sourceurl, image, imagetype, dishtype, diets, summary}, ...] }
   * Authorization required: admin or same-user-as-:username
   */
  static async getUserSavedRecipes(username) {
    const result = await this.request(`users/${username}/recipes`);
    return result.recipes;
  }

  /*****************************
   * Methods for User's Meal Plans
   ******************************/

  /** Get user's saved meal plans by username
   * Takes a username
   * Returns { mealplans: [{id, name, created_by}, ...] }
   * Authorization required: admin or same-user-as-:username
   */
  static async getUserSavedMealPlans(username) {
    const result = await this.request(`users/${username}/mealplans`);
    return result.mealplans;
  }

  /*****************************
   * Methods for Ingredients
   ******************************/

  /** Create a new ingredient
   * Authorization required: admin or nutritionist
   */
  static async createIngredient(data) {
    return await this.request(`ingredients`, data, "post");
  }

  /** Get all ingredients
   * Can filter on provided search filters (TODO: implement filters if required)
   * Authorization required: admin or logged-in user
   */
  static async getIngredients(query = {}) {
    return await this.request(`ingredients`, query, "get");
  }

  /** Get a single ingredient by ID
   * Authorization required: admin or logged-in user
   */
  static async getIngredient(id) {
    return await this.request(`ingredients/${id}`);
  }

  /** Update an ingredient by ID
   * Data can include: { aisle, image, name, amount, unit, original }
   * Returns the updated ingredient
   * Authorization required: admin
   */
  static async updateIngredient(id, data) {
    return await this.request(`ingredients/${id}`, data, "patch");
  }

  /** Delete an ingredient by ID
   * Authorization required: admin
   */
  static async deleteIngredient(id) {
    return await this.request(`ingredients/${id}`, {}, "delete");
  }

  /*****************************
   * Methods for Recipes
   ******************************/

  /** Create a new recipe
   * Authorization required: admin or nutritionist
   */
  static async createRecipe(data) {
    return await this.request(`recipes`, data, "post");
  }

  /** Get all recipes
   * Can filter on provided search filters (TODO: implement filters if required)
   * Authorization required: admin or logged-in user
   */
  static async getRecipes(query = {}) {
    return await this.request(`recipes`, query, "get");
  }

  /** Get a single recipe by ID, including ingredients and nutrients
   * Authorization required: admin or logged-in user
   */
  static async getRecipe(id) {
    return await this.request(`recipes/${id}`);
  }

  /** Update a recipe by ID
   * Data can include: { id, vegetarian, vegan, dairyfree, weightwatchersmartpoints, creditstext,
   * title, readyinminutes, servings, sourceurl, image, imagetype, dishtype, diets, summary }
   * Returns the updated recipe
   * Authorization required: admin
   */
  static async updateRecipe(id, data) {
    return await this.request(`recipes/${id}`, data, "patch");
  }

  /** Delete a recipe by ID
   * Authorization required: admin
   */
  static async deleteRecipe(id) {
    return await this.request(`recipes/${id}`, {}, "delete");
  }

  /*****************************
   * Methods for meal plans
   ******************************/

  /** Create a new meal plan */
  static async createMealPlan(data) {
    return await this.request(`mealplans`, data, "post");
  }

  /** Get all meal plans */
  static async getMealPlans() {
    return await this.request(`mealplans`);
  }

  /** Get meal plan by ID */
  static async getMealPlan(mealPlanId) {
    return await this.request(`mealplans/${mealPlanId}`);
  }

  /** Update meal plan */
  static async updateMealPlan(mealPlanId, data) {
    return await this.request(`mealplans/${mealPlanId}`, data, "patch");
  }

  /** Add a new recipe to a meal plan */
  static async addRecipeToMealPlan(mealPlanId, recipeId, data) {
    return await this.request(
      `mealplans/${mealPlanId}/recipes/${recipeId}`,
      data,
      "post"
    );
  }

  /** Remove recipe from meal plan */
  static async removeRecipeFromMealPlan(mealPlanId, recipeId) {
    return await this.request(
      `mealplans/${mealPlanId}/recipes/${recipeId}`,
      {},
      "delete"
    );
  }

  /** Delete meal plan */
  static async deleteMealPlan(mealPlanId) {
    return await this.request(`mealplans/${mealPlanId}`, {}, "delete");
  }

  /** Share meal plan */
  static async shareMealPlan(mealPlanId, data) {
    return await this.request(`mealplans/${mealPlanId}/share`, data, "post");
  }

  /** Get shared meal plans for a client */
  static async getSharedMealPlans(clientUsername) {
    return await this.request(`mealplans/shared/${clientUsername}`);
  }
}

export default RemplrApi;
