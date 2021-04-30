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
			console.log("First ")

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
		/** 
		 	@param 	 {object} args - a region objectID, field, and the update value
			@returns {boolean} true on successful update, false on failure
		**/
		updateRegionField: async (_, args) => {

			console.log("update region sub id")
			const { field, value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {[field]: value});
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

			 return "";
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
			const { _id, criteria } = args;
			const listId = new ObjectId(_id);
			const found = await Region.findOne({_id: listId});
			let newDirection = found.sortDirection === 1 ? -1 : 1; 
			console.log(newDirection, found.sortDirection);
			let sortedItems;

			switch(criteria) {
				case 'task':
					sortedItems = Sorting.byTask(found.items, newDirection);
					break;
				case 'due_date':
					sortedItems = Sorting.byDueDate(found.items, newDirection);
					break;
				case 'status':
					sortedItems = Sorting.byStatus(found.items, newDirection);
					break;
				case 'assigned_to':
					sortedItems = Sorting.byAssignedTo(found.items, newDirection);
					break;
				default:
					return found.items;
			}
			const updated = await Region.updateOne({_id: listId}, { items: sortedItems, sortRule: criteria, sortDirection: newDirection })
			if(updated) return (sortedItems);

		}

	}
}