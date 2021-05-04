import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'searchFilter'})
export class FilterPipe implements PipeTransform{
    /**
   * The transform function takes in 2 parameters namely items array and a text string for search
   * and return the filtered items based on the search text.
   * @param items 
   * @param searchText
   */
    transform(items:any[], searchText:string){
        if(!searchText){
            return items;
        }
        searchText = searchText.toLocaleLowerCase();

        return items.filter(x=>{
            return x.firstname.toLocaleLowerCase().includes(searchText) ||
            x.lastname.toLocaleLowerCase().includes(searchText) ||
            x.email.toLocaleLowerCase().includes(searchText)
        });
    }
}