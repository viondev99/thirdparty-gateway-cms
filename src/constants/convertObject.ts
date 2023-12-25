export const convertObjectForSearch = (obj: any) => {
    if(obj){
        const keys: string[] = Object.keys(obj);
        const newObj: any = {};
        for(let key of keys){
            if(obj[key] != null && obj[key] != '' && obj[key] != undefined && !Number.isNaN(obj[key])){
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }
    return {};
}