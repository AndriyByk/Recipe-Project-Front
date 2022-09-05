import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IRecipeCategory} from "../../../interfaces/categories/IRecipeCategory";
import {RecipeCategoryService} from "../../../services/fetches/recipe-category.service";
import {IIngredient} from "../../../interfaces/entities/ingredient/IIngredient";
import {IngredientService} from "../../../services/fetches/ingredient.service";
import {RecipeService} from "../../../services/fetches/recipe.service";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.css']
})
export class AddRecipePageComponent implements OnInit {
  form: FormGroup;
  categories: IRecipeCategory[];
  ingredients: IIngredient[];

  constructor(private recipeCategoryService: RecipeCategoryService,
              private ingredientService: IngredientService,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeCategoryService.getAll().subscribe(value => {
      console.log(value);
      this.categories = value
    });
    this.ingredientService.getAll().subscribe(value => {
      console.log(value);
      this.ingredients = value
    });
  }

  createForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null),
      cooking: new FormControl(null),
      categoryId: new FormControl(null),

      ingredientId1: new FormControl(null),
      ingredientWeight1: new FormControl(null),
      ingredientId2: new FormControl(null),
      ingredientWeight2: new FormControl(null),
      ingredientId3: new FormControl(null),
      ingredientWeight3: new FormControl(null),
      ingredientId4: new FormControl(null),
      ingredientWeight4: new FormControl(null),
      ingredientId5: new FormControl(null),
      ingredientWeight5: new FormControl(null),
      ingredientId6: new FormControl(null),
      ingredientWeight6: new FormControl(null),
      ingredientId7: new FormControl(null),
      ingredientWeight7: new FormControl(null),
      ingredientId8: new FormControl(null),
      ingredientWeight8: new FormControl(null),
      ingredientId9: new FormControl(null),
      ingredientWeight9: new FormControl(null),
      ingredientId10: new FormControl(null),
      ingredientWeight10: new FormControl(null),

      picture: new FormControl(null)
    })
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
    // час створення рецепта
    // rawValue.dateOfCreation = new Date().toDateString();
    let formData = new FormData();
    formData.append('picture', this.form.get('picture')?.value);
    delete rawValue.picture;
    let ourRecipe = JSON.stringify(rawValue);
    formData.append('recipe', ourRecipe);
    this.recipeService.save(formData);
  }
}
