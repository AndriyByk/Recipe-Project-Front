import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormArray, FormBuilder} from "@angular/forms";
import {IRecipeCategory} from "../../../interfaces/categories/IRecipeCategory";
import {RecipeCategoryService} from "../../../services/fetches/recipes/recipe-category.service";
import {IIngredient} from "../../../interfaces/entities/ingredient/IIngredient";
import {IngredientService} from "../../../services/fetches/ingredients/ingredient.service";
import {RecipeService} from "../../../services/fetches/recipes/recipe.service";
import {Router} from "@angular/router";
import {IRecipeForPost} from "../../../interfaces/entities/recipe/IRecipeForPost";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.css']
})
export class AddRecipePageComponent implements OnInit {
  form: FormGroup;
  categories: IRecipeCategory[];
  ingredients: IIngredient[];
  private actualUser = 'actualUser';

  constructor(private recipeCategoryService: RecipeCategoryService,
              private ingredientService: IngredientService,
              private recipeService: RecipeService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.recipeCategoryService.getAll().subscribe(value => {
      this.categories = value
    });
    this.ingredientService.getAll().subscribe(value => {
      this.ingredients = value;
    });
  }

  createForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      recipeCategoryId: new FormControl(null, [Validators.required]),
      rawIngredientWithWeights: new FormArray([
        new FormGroup({
          id: new FormControl(null),
          weight: new FormControl(null)
        })
      ]),
      picture: new FormControl(null, [Validators.required])
    })
  }

  getIngredients() {
    return this.form.get('rawIngredientWithWeights') as FormArray;
  }

  addIngredient() {
    this.getIngredients().push(this.formBuilder.group({
      id: new FormControl(null),
      weight: new FormControl(null)
    }))
  }

  removeIngredient(id: number) {
    if (this.getIngredients().length>1) {
      this.getIngredients().removeAt(id)
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

    // час створення рецепта
    let formData = new FormData();
    formData.append('picture', this.form.get('picture')?.value);
    // дата
    let date1 = new Date();
    const date: string = [
      date1.getDate().toString().padStart(2, '0'),
      (date1.getMonth()+1).toString().padStart(2, '0'),
      date1.getFullYear()
    ].join('-');
    // час
    const time: string = [
      date1.getHours().toString().padStart(2, '0'),
      date1.getMinutes().toString().padStart(2, '0'),
      date1.getSeconds().toString().padStart(2, '0')
    ].join('-');
    const fullDate: string = [date, time].join('_');

    let recipe : IRecipeForPost = {
      title: rawValue.title,
      description: rawValue.description,
      dateOfCreation: fullDate,
      recipeCategoryId: rawValue.recipeCategoryId,
      rawIngredientWithWeights: rawValue.rawIngredientWithWeights
    };

    let ourRecipe = JSON.stringify(recipe);
    formData.append('recipe', ourRecipe);
    let user = localStorage.getItem(this.actualUser);
    if (user) {
      this.recipeService.save(formData, user).subscribe();
      this.router.navigate(['/cabinet/created-recipes']);
    }
  }
}
