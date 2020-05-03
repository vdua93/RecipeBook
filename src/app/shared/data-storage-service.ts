import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap} from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable()
export class DataStorageService{
    
loadedRecipes=[];

    constructor(private http: HttpClient, private recipeService:RecipeService){}


    storeRecipes(){
        const recipes=this.recipeService.getRecipes();
        return this.http.put(environment.firebaseServer+'recipes.json', recipes)
        .subscribe(response=>{
            console.log(response);
        });

    }

    downloadRecipes(){
       return this.http.get<Recipe[]>(environment.firebaseServer+'recipes.json')
        .pipe(map(recipes=>{
              return recipes.map(recipe=>{
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients :[] };
              });
        }),
        tap(recipes=>{
            this.recipeService.setRecipes(recipes);
        })
        )    

    }

}