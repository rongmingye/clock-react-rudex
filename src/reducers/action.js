export const getUsers = (val) =>{
	return{
		type: "GET_USER",
		val: val
	}
}

export const getRecords = (val) =>{
	return{
		type: "GET_RECORD",
		val: val
	}
}