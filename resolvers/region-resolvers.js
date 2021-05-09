const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');
const Sorting = require('../utils/sorting')

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of region objects on success, and an empty array on failure
		**/
		getAllRegions: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const regions = await Region.find({owner: _id}).sort({updatedAt: 'descending'});
			if(regions) {
				return (regions);
			} 

		},
		/** 
		 	@param 	 {object} args - a region id
			@returns {object} a region on success and an empty object on failure
		**/
		getRegionById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const region = await Region.findOne({_id: objectId});
			if(region) return region;
			else return ({});
		},
	},
	Mutation: {
		/** 
		 	@param 	 {object} args - a region id and an empty item object
			@returns {string} the objectID of the item or an error message
		**/
		addItem: async(_, args) => {
			const { _id, item , index } = args;
			const listId = new ObjectId(_id);
			const objectId = new ObjectId();
			const found = await Region.findOne({_id: listId});
			if(!found) return ('Region not found');
			if(item._id === '') item._id = objectId;
			let listItems = found.items;
			if(index < 0) listItems.push(item);
			else listItems.splice(index, 0, item);
			
			
			const updated = await Region.updateOne({_id: listId}, { items: listItems });

			if(updated) return (item._id)
			else return ('Could not add item');
		},
		/** 
		 	@param 	 {object} args - an empty region object
			@returns {string} the objectID of the region or an error message
		**/
		addRegion: async (_, args) => {
			// THIS IS ONLY USE TO ADD ROOT MAPS REGION

			const { region: region } = args;
			const objectId = new ObjectId();

			const parentRegionPlaceholder = new ObjectId();
			const { id, name, owner, items , sortRule, sortDirection,capital,leader,flag,landmark,parentRegion,subregionNumber,parentRegionID,regionLandmark,subregionsID,isRoot} = region;
			const newList = new Region({
				_id: objectId,
				name: name,
				owner: owner,

				sortRule: sortRule,
				sortDirection: sortDirection,

				capital:capital,
				leader: leader,
				flag: flag,
				landmark: landmark,
				parentRegion: parentRegion,
				subregionNumber: subregionNumber,
				regionLandmark: regionLandmark,

				parentRegionID: parentRegionPlaceholder,
				subregionsID:subregionsID,
				isRoot: isRoot
			});
			const updated = await newList.save();
			if(updated) {
				console.log(newList)
				return newList;
			}
		},
		/** 
		 	@param 	 {object} args - a region objectID and item objectID
			@returns {array} the updated item array on success or the initial 
							 array on failure
		**/
		deleteItem: async (_, args) => {
			const  { _id, itemId } = args;
			const listId = new ObjectId(_id);
			const found = await Region.findOne({_id: listId});
			let listItems = found.items;
			listItems = listItems.filter(item => item._id.toString() !== itemId);
			const updated = await Region.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			else return (found.items);

		},
		/** 
		 	@param 	 {object} args - a region objectID
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteRegion: async (_, args) => {

			const { _id } = args;




			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		addSubregionArray: async (_, args) => {

			const {parentID,subregionID } = args;


			const data = await Region.findOne({_id:parentID});
			let newSubregionIDArr = [...data.subregionsID]
			const objectId = new ObjectId(subregionID);
			newSubregionIDArr.push(objectId)
			const updatedPar = await Region.updateOne({_id: parentID}, {["subregionsID"]: newSubregionIDArr});


			return subregionID
		},
		deleteSubregionArray: async (_, args) => {

			const {parentID,subregionID } = args;
			const data = await Region.findOne({_id:parentID});
			let SubregionIDArr = [...data.subregionsID]
			let newSubArr = SubregionIDArr.filter(x => x!=subregionID)
			const updatedPar = await Region.updateOne({_id: parentID}, {["subregionsID"]: newSubArr});



			return subregionID
		},

		setSubregionArray: async (_, args) => {
			const {parentID,subregionID} = args;
			const data = await Region.findOne({_id:parentID});
			const updatedPar = await Region.updateOne({_id: parentID}, {["subregionsID"]: subregionID});
			return parentID
		},


		/** 
		 	@param 	 {object} args - a region objectID, field, and the update value
			@returns {boolean} true on successful update, false on failure
		**/
		updateRegionField: async (_, args) => {

			console.log("update region sub id")
			const { field, value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {[field]: value});

			const data = await Region.findOne({_id: objectId});
			for (const x of data.subregionsID) {
				await Region.updateOne({_id: x}, {["parentRegion"]: data.name});
			}
			if(updated) return value;
			else return "";
		},

		addSubregion: async (_, args) => {

			console.log("add subregion to this id");
			const {_id,userID } = args;
			const ParentRegionObjectId = new ObjectId(_id);
			const SubregionObjectId = new ObjectId();
			const data = await Region.findOne({_id: ParentRegionObjectId});

			const newSubregion = new Region({
				_id: SubregionObjectId,
				name: 'Untitled',
				owner: userID,

				sortRule: 'task',
				sortDirection: 1,

				capital: "none",
				leader: "none",
				flag: "none",
				landmark: "none",
				parentRegion: data.name ,
				subregionNumber: 0,
				regionLandmark: ["a","b","c"],

				parentRegionID: ParentRegionObjectId,
				subregionsID: [],
				isRoot: false
			});


			const addedSub = await newSubregion.save();
			let newSubregionIDArr = [...data.subregionsID]
			newSubregionIDArr.push(addedSub._id)
			const updatedPar = await Region.updateOne({_id: ParentRegionObjectId}, {["subregionsID"]: newSubregionIDArr});

			console.log("finish adding")
			 return SubregionObjectId;
		},
		/** 
			@param	 {object} args - a region objectID, an item objectID, field, and
									 update value. Flag is used to interpret the completed 
									 field,as it uses a boolean instead of a string
			@returns {array} the updated item array on success, or the initial item array on failure
		**/
		updateItemField: async (_, args) => {
			const { _id, itemId, field,  flag } = args;
			let { value } = args
			const listId = new ObjectId(_id);
			const found = await Region.findOne({_id: listId});
			let listItems = found.items;
			if(flag === 1) {
				if(value === 'complete') { value = true; }
				if(value === 'incomplete') { value = false; }
			}
			listItems.map(item => {
				if(item._id.toString() === itemId) {	
					
					item[field] = value;
				}
			});
			const updated = await Region.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			else return (found.items);
		},
		/**
			@param 	 {object} args - contains list id, item to swap, and swap direction
			@returns {array} the reordered item array on success, or initial ordering on failure
		**/
		reorderItems: async (_, args) => {
			const { _id, itemId, direction } = args;
			const listId = new ObjectId(_id);
			const found = await Region.findOne({_id: listId});
			let listItems = found.items;
			const index = listItems.findIndex(item => item._id.toString() === itemId);
			// move selected item visually down the list
			if(direction === 1 && index < listItems.length - 1) {
				let next = listItems[index + 1];
				let current = listItems[index]
				listItems[index + 1] = current;
				listItems[index] = next;
			}
			// move selected item visually up the list
			else if(direction === -1 && index > 0) {
				let prev = listItems[index - 1];
				let current = listItems[index]
				listItems[index - 1] = current;
				listItems[index] = prev;
			}
			const updated = await Region.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			// return old ordering if reorder was unsuccessful
			listItems = found.items;
			return (found.items);

		},

		sortItems: async (_, args) => {
			console.log("sorting")
			const { _id, criteria } = args;
			const listId = new ObjectId(_id);
			const found = await Region.findOne({_id: listId});



			let subregionArr = [];
			let subregionIDArr = found.subregionsID
			for (const x of subregionIDArr) {
				let temp=await Region.findOne({_id: x})
				if (temp!==null){
					subregionArr.push(temp)
				}

			}


			console.log("this is sub arr")
			console.log(subregionArr)


			let sorted=true
			if (criteria==="name")
			{
				for (let a = 0; a < subregionArr.length - 1; a++) {
					if (subregionArr[a].name.localeCompare(subregionArr[a + 1].name) > 0) {
						sorted = false
						break
					}
				}
					for( let i=0;i<subregionArr.length-1;i++)
					{
						for ( let j=0;j<subregionArr.length-1;j++){
							if(!sorted){
								if(subregionArr[j].name.localeCompare(subregionArr[j+1].name)>0){
									let temp = subregionArr[j]
									subregionArr[j]=subregionArr[j+1]
									subregionArr[j+1]=temp
								}
							}
							else{
								if(subregionArr[j].name.localeCompare(subregionArr[j+1].name)<0){
									let temp = subregionArr[j]
									subregionArr[j]=subregionArr[j+1]
									subregionArr[j+1]=temp
								}
							}
						}
					}
			}
			else if (criteria==="capital")
			{
				for (let a = 0; a < subregionArr.length - 1; a++) {
					if (subregionArr[a].capital.localeCompare(subregionArr[a + 1].capital) > 0) {
						sorted = false
						break
					}
				}
				for( let i=0;i<subregionArr.length-1;i++)
				{
					for ( let j=0;j<subregionArr.length-1;j++){
						if(!sorted){
							if(subregionArr[j].capital.localeCompare(subregionArr[j+1].capital)>0){
								let temp = subregionArr[j]
								subregionArr[j]=subregionArr[j+1]
								subregionArr[j+1]=temp
							}
						}
						else{
							if(subregionArr[j].capital.localeCompare(subregionArr[j+1].capital)<0){
								let temp = subregionArr[j]
								subregionArr[j]=subregionArr[j+1]
								subregionArr[j+1]=temp
							}
						}
					}
				}
			}
			else if (criteria==="leader")
			{
				for (let a = 0; a < subregionArr.length - 1; a++) {
					if (subregionArr[a].leader.localeCompare(subregionArr[a + 1].leader) > 0) {
						sorted = false
						break
					}
				}
				for( let i=0;i<subregionArr.length-1;i++)
				{
					for ( let j=0;j<subregionArr.length-1;j++){
						if(!sorted){
							if(subregionArr[j].leader.localeCompare(subregionArr[j+1].leader)>0){
								let temp = subregionArr[j]
								subregionArr[j]=subregionArr[j+1]
								subregionArr[j+1]=temp
							}
						}
						else{
							if(subregionArr[j].leader.localeCompare(subregionArr[j+1].leader)<0){
								let temp = subregionArr[j]
								subregionArr[j]=subregionArr[j+1]
								subregionArr[j+1]=temp
							}
						}
					}
				}
			}







			let newSortedSubregionIDArr=[]
			subregionArr.forEach(x=>{
				newSortedSubregionIDArr.push(x._id)
			})

			console.log(newSortedSubregionIDArr)



			const updatedPar = await Region.updateOne({_id: listId}, {["subregionsID"]: newSortedSubregionIDArr});

			return undefined

		}

	}
}