const filterParam = (param:any)=>{
	return param&&Object.keys(param)&&Object.keys(param).reduce((total:any,currentVal)=>{
		if (param[currentVal] && param[currentVal] !== 'null') {
      total[currentVal] = param[currentVal]
    }
    return total
	},{})
}

export { 
	filterParam
}