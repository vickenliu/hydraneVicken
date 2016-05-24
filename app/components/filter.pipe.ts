import {Pipe} from '@angular/core';

@Pipe({
  name:'search'
})

export class FilterPipe{
  transform(pipeData,pipeModifier){
    if(!pipeModifier || pipeModifier=='ALL'){
      return pipeData;
    }
    return pipeData.filter(item=>{
      let filtered=false;
      Object.keys(item).map(key=>{
        item[key]==pipeModifier? filtered= true  : filtered
      })
      return filtered
    })
  }
}
