import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			name
			password
			initials
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, password: $password, name: $name) {
			email
			password
			name

		}
	}
`;

export const UPDATE = gql`
	mutation Update($email: String!, $password: String!, $name: String!, $_id:String!) {
		update(email: $email, password: $password, name: $name, _id:$_id) {
			email
			password
			name

		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const ADD_ITEM = gql`
	mutation AddItem($item: ItemInput!, $_id: String!, $index: Int!) {
		addItem(item: $item, _id: $_id, index: $index)
	}
`;

export const DELETE_ITEM = gql`
	mutation DeleteItem($itemId: String!, $_id: String!) {
		deleteItem(itemId: $itemId, _id: $_id) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const UPDATE_ITEM_FIELD = gql`
	mutation UpdateItemField($_id: String!, $itemId: String!, $field: String!, $value: String!, $flag: Int!) {
		updateItemField(_id: $_id, itemId: $itemId, field: $field, value: $value, flag: $flag) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const REORDER_ITEMS = gql`
	mutation ReorderItems($_id: String!, $itemId: String!, $direction: Int!) {
		reorderItems(_id: $_id, itemId: $itemId, direction: $direction) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const SORT_ITEMS = gql`
	mutation SortItems($_id: String!, $criteria: String!) {
		sortItems(_id: $_id, criteria: $criteria) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;


export const ADD_REGION = gql`
	mutation AddRegion($region: RegionInput!) {
		addRegion(region: $region) {
			_id
			name
			owner

			sortRule
			sortDirection
			
            capital
            leader
            flag
            landmark
            parentRegion
            subregionNumber
            regionLandmark
            
            parentRegionID
            subregionsID
            isRoot
		}
	}
`;




export const DELETE_REGION = gql`
	mutation DeleteRegion($_id: String!) {
		deleteRegion(_id: $_id)
	}
`;

export const UPDATE_REGION_FIELD = gql`
	mutation UpdateRegionField($_id: String!, $field: String!, $value: String!) {
		updateRegionField(_id: $_id, field: $field, value: $value)
	}
`;


export const ADD_SUBREGION = gql`
	mutation AddSubregion($_id: String!,$userID: String!) {
		addSubregion(_id: $_id,userID: $userID)
	}
`;

export const DELETE_SUBREGION_ARRAY = gql`
	mutation DeleteSubregionArray($parentID: String!,$subregionID: String!) {
		deleteSubregionArray(parentID: $parentID, subregionID: $subregionID)
	}
`;

export const ADD_SUBREGION_ARRAY = gql`
	mutation AddSubregionArray($parentID: String!,$subregionID: String!) {
		addSubregionArray(parentID: $parentID, subregionID: $subregionID)
	}
`;

