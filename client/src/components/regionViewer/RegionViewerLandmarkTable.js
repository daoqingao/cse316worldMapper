import React            from 'react';
import { WLayout, WLHeader, WLMain, WLSide, WRow, WCol , WMMain, WLFooter}  from 'wt-frontend';

const RegionViewerLandmarkTable = (props) => {


    return (
        <WRow className ='table-entry'>
            {
                props.entry
            }
        </WRow>

    );
};

export default RegionViewerLandmarkTable;