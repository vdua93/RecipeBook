import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage-service";
import { RecipeService } from "./recipe.service";
import { Observable } from "rxjs";

@Injectable()
export class RecipeSolverService implements Resolve<Recipe[]>  {

    constructor(private dataStorageService: DataStorageService, private recipeService:RecipeService){}


    resolve(){
        const recipes= this.recipeService.getRecipes();
       
        if(recipes.length===0){
            console.log("Recipes Downloaded from Firebase");
            return this.dataStorageService.downloadRecipes();
        }
        else 
            return recipes;
    }
}