import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IRecipeCategory} from "../../../interfaces/categories/IRecipeCategory";
import {RecipeCategoryService} from "../../../services/fetches/recipe-category.service";
import {IIngredient} from "../../../interfaces/entities/ingredient/IIngredient";
import {IngredientService} from "../../../services/fetches/ingredient.service";
import {RecipeService} from "../../../services/fetches/recipe.service";
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
              private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.recipeCategoryService.getAll().subscribe(value => {
      this.categories = value
    });
    this.ingredientService.getAll().subscribe(value => {
      this.ingredients = value
    });
  }

  createForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      recipeCategoryId: new FormControl(null, [Validators.required]),

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

      picture: new FormControl(null, [Validators.required])
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
    console.log(rawValue);

    let date1 = new Date();
    const date: string = [
      date1.getDate().toString().padStart(2, '0'),
      (date1.getMonth()+1).toString().padStart(2, '0'),
      date1.getFullYear()
    ].join('-');

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
      rawIngredientWithWeights: [
        {
          weight: rawValue.ingredientWeight1,
          id: rawValue.ingredientId1
        },
        {
          weight: rawValue.ingredientWeight2,
          id: rawValue.ingredientId2
        },
        {
          weight: rawValue.ingredientWeight3,
          id: rawValue.ingredientId3
        },
        {
          weight: rawValue.ingredientWeight4,
          id: rawValue.ingredientId4
        },
        {
          weight: rawValue.ingredientWeight5,
          id: rawValue.ingredientId5
        },
        {
          weight: rawValue.ingredientWeight6,
          id: rawValue.ingredientId6
        },
        {
          weight: rawValue.ingredientWeight7,
          id: rawValue.ingredientId7
        },
        {
          weight: rawValue.ingredientWeight8,
          id: rawValue.ingredientId8
        },
        {
          weight: rawValue.ingredientWeight9,
          id: rawValue.ingredientId9
        },
        {
          weight: rawValue.ingredientWeight10,
          id: rawValue.ingredientId10
        }
      ]
    };

    delete rawValue.picture;
    let ourRecipe = JSON.stringify(recipe);
    formData.append('recipe', ourRecipe);
    let user = localStorage.getItem(this.actualUser);
    if (user) {
      this.recipeService.save(formData, user).subscribe();
      this.router.navigate(['/cabinet/created-recipes']);
    }
  }
}
