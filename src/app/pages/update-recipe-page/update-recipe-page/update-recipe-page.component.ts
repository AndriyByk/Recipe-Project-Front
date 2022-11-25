import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {RecipeService} from "../../../services/fetches/recipes/recipe.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IRecipeCategory} from "../../../interfaces/categories/IRecipeCategory";
import {IIngredient} from "../../../interfaces/entities/ingredient/IIngredient";
import {RecipeCategoryService} from "../../../services/fetches/recipes/recipe-category.service";
import {IngredientService} from "../../../services/fetches/ingredients/ingredient.service";
import {IRecipeForUpdate} from "../../../interfaces/entities/recipe/IRecipeForUpdate";
import {IListOfIngredientsForNewRecipe} from "../../../interfaces/entities/ingredient/IListOfIngredientsForNewRecipe";
import {IIngredientCategory} from "../../../interfaces/categories/IIngredientCategory";

@Component({
  selector: 'app-update-recipe-page',
  templateUrl: './update-recipe-page.component.html',
  styleUrls: ['./update-recipe-page.component.css']
})
export class UpdateRecipePageComponent implements OnInit {
  form: FormGroup;
  categories: IRecipeCategory[];
  ingredients: IIngredient[];

  selectedIngredients: IListOfIngredientsForNewRecipe[] = [];
  ingredientCategories: IIngredientCategory[];

  recipe: IRecipe;

  private actualUser = 'actualUser';

  constructor(private recipeCategoryService: RecipeCategoryService,
              private ingredientService: IngredientService,
              private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({recipe, categories, ingredients, ingredientCategories}) => {
      this.recipe = recipe;
      this.ingredients = ingredients;
      this.categories = categories;
      this.ingredientCategories = ingredientCategories;
    });

    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      description: new FormControl(this.recipe.description, [Validators.required]),
      recipeCategoryId: new FormControl(this.recipe.recipeCategoryDto.id, [Validators.required]),
      rawIngredientWithWeights: new FormArray([
        new FormGroup({
          id: new FormControl(this.recipe.ingredients[0].id),
          weight: new FormControl(this.recipe.ingredients[0].weight),
          category: new FormControl(this.recipe.ingredients[0].ingredientCategoryDto.id)
        })
      ]),
      picture: new FormControl(null, [Validators.required])
    })

    this.selectedIngredients[0] = {
      listOfIngredients: this.ingredients.filter(value => value.ingredientCategoryDto.id == this.recipe.ingredients[0].ingredientCategoryDto.id)
    }

    for (let i = 1; i < this.recipe.ingredients.length; i++) {
      this.getIngredients().push(this.formBuilder.group({
        id: new FormControl(this.recipe.ingredients[i].id),
        weight: new FormControl(this.recipe.ingredients[i].weight),
        category: new FormControl(this.recipe.ingredients[i].ingredientCategoryDto.id)
      }))
      this.selectedIngredients[i] = {
        listOfIngredients: this.ingredients.filter(value => value.ingredientCategoryDto.id == this.recipe.ingredients[i].ingredientCategoryDto.id)
      }
    }

    // this.form = new FormGroup({
    //   // змінювати назву не можна, бо прийдеться змінювати і назву папки на беку,
    //   // а ще по назві відбувається індексація в одній з таблиць
    //   // title: new FormControl(this.recipe.title, [Validators.required]),
    //   description: new FormControl(this.recipe.description, [Validators.required]),
    //   recipeCategoryId: new FormControl(this.recipe.recipeCategoryDto.id, [Validators.required]),
    //   ingredientId1: new FormControl(this.recipe.ingredients[0].id),
    //   ingredientWeight1: new FormControl(this.recipe.ingredients[0].weight),
    //   ingredientId2: new FormControl(this.recipe.ingredients[1].id),
    //   ingredientWeight2: new FormControl(this.recipe.ingredients[1].weight),
    //   ingredientId3: new FormControl(this.recipe.ingredients[2].id),
    //   ingredientWeight3: new FormControl(this.recipe.ingredients[2].weight),
    //   ingredientId4: new FormControl(this.recipe.ingredients[3].id),
    //   ingredientWeight4: new FormControl(this.recipe.ingredients[3].weight),
    //   ingredientId5: new FormControl(this.recipe.ingredients[4].id),
    //   ingredientWeight5: new FormControl(this.recipe.ingredients[4].weight),
    //   ingredientId6: new FormControl(this.recipe.ingredients[5].id),
    //   ingredientWeight6: new FormControl(this.recipe.ingredients[5].weight),
    //   ingredientId7: new FormControl(this.recipe.ingredients[6].id),
    //   ingredientWeight7: new FormControl(this.recipe.ingredients[6].weight),
    //   ingredientId8: new FormControl(this.recipe.ingredients[7].id),
    //   ingredientWeight8: new FormControl(this.recipe.ingredients[7].weight),
    //   ingredientId9: new FormControl(this.recipe.ingredients[8].id),
    //   ingredientWeight9: new FormControl(this.recipe.ingredients[8].weight),
    //   ingredientId10: new FormControl(this.recipe.ingredients[9].id),
    //   ingredientWeight10: new FormControl(this.recipe.ingredients[9].weight),
    //   picture: new FormControl(null)
    // })
  }

  getIngredients() {
    return this.form.get('rawIngredientWithWeights') as FormArray;
  }

  addIngredient() {
    this.getIngredients().push(this.formBuilder.group({
      id: new FormControl(null),
      weight: new FormControl(null),
      category: new FormControl(null)
    }))
    this.selectedIngredients.push({listOfIngredients: this.ingredients})
  }

  removeIngredient(i: number) {
    let length = this.getIngredients().length;
    if (length > 1) {
      this.getIngredients().removeAt(i);
      this.selectedIngredients.splice(i, 1);
    }
  }

  onChange(e: any) {
    let extensionAllowed: any = {"png": true, "jpeg": true, "jpg": true};
    let file = e.target.files[0];
    if (file.size / 1024 / 1024 > 10) {
      alert("File size should be less than 10MB")
      return;
    }
    if (extensionAllowed) {
      let nam = file.name.split('.').pop();
      if (!extensionAllowed[nam]) {
        alert("Please upload " + Object.keys(extensionAllowed) + " file.")
        return;
      }
    }
    this.form.controls["picture"].setValue(file);
  }

  submit(): void {
    let rawValue = this.form.getRawValue();

    for (let i = 0; i < rawValue.rawIngredientWithWeights.length; i++) {
      delete rawValue.rawIngredientWithWeights[i].category;
    }

    let formData = new FormData();
    formData.append('picture', this.form.get('picture')?.value);

    let recipe: IRecipeForUpdate = {
      description: rawValue.description,
      recipeCategoryId: rawValue.recipeCategoryId,
      rawIngredientWithWeights: rawValue.rawIngredientWithWeights

        // [
        // {
        //   weight: rawValue.ingredientWeight1,
        //   id: rawValue.ingredientId1
        // },
        // {
        //   weight: rawValue.ingredientWeight2,
        //   id: rawValue.ingredientId2
        // },
        // {
        //   weight: rawValue.ingredientWeight3,
        //   id: rawValue.ingredientId3
        // },
        // {
        //   weight: rawValue.ingredientWeight4,
        //   id: rawValue.ingredientId4
        // },
        // {
        //   weight: rawValue.ingredientWeight5,
        //   id: rawValue.ingredientId5
        // },
        // {
        //   weight: rawValue.ingredientWeight6,
        //   id: rawValue.ingredientId6
        // },
        // {
        //   weight: rawValue.ingredientWeight7,
        //   id: rawValue.ingredientId7
        // },
        // {
        //   weight: rawValue.ingredientWeight8,
        //   id: rawValue.ingredientId8
        // },
        // {
        //   weight: rawValue.ingredientWeight9,
        //   id: rawValue.ingredientId9
        // },
        // {
        //   weight: rawValue.ingredientWeight10,
        //   id: rawValue.ingredientId10
        // }
      // ]
    }

    delete rawValue.picture;
    let ourRecipe = JSON.stringify(recipe);
    formData.append('recipe', ourRecipe);

    this.recipeService.updateRecipe(formData, this.recipe.id).subscribe();
    this.router.navigate(['/recipe', this.recipe.id]);
  }

  select(category: string, i: number) {
    let strings = category.split(":");
    this.selectedIngredients[i] = {
      listOfIngredients: this.ingredients.filter(value => value.ingredientCategoryDto.id == Number.parseInt(strings[1].trim()))
    }
  }
}
