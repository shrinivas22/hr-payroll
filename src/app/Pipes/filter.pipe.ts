import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'searchFilter'})
export class FilterPipe implements PipeTransform{
    transform(items:any[], searchText:string){
        if(!items){

        }
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