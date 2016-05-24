import {Pipe} from '@angular/core';

@Pipe({
  name:'sortBy'
})

export class SortPipe{
  transform(pipeData,pipeModifier){
    if(!pipeModifier){
      return pipeData;
    }
    return pipeData.sort((a,b)=>{
      return Number(a[pipeModifier])-Number(b[pipeModifier])
    })
  }
}
