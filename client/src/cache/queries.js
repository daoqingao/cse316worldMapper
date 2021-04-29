import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			name
			email
		}
	}
`;

export const GET_DB_REGIONS = gql`
	query GetDBRegions {
		getAllRegions {
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
