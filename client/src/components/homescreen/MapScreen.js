import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import {WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol} from 'wt-frontend';

import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import globe from "../icons/logo512.png";
import MapRegionContents from "../mapRegion/MapRegionContents";
import MapRegionEntry from "../mapRegion/MapRegionEntry";

const MapScreen = (props) => {

    return (
        <WLayout wLayout="header" style={{color:"white"}}>
            <WLHeader>

            </WLHeader>

            <WMMain>

                <WRow size="12">
                    Your Maps
                </WRow>
                <WRow>

                </WRow>
                <WRow size="16">
                    <WCol size="6">
                        <MapRegionContents
                            listIDs={props.listIDs} 				activeid={props.activeid} auth={props.auth}
                            handleSetActive={props.handleSetActive} 	createNewList={props.createNewList}
                            updateListField={props.updateListField} 	key={props.key}
                            deleteMapRegion={(_id) => (props.deleteMapRegion(_id))}
                            setShowMapRegion=  {props.setShowMapRegion}
                            setShowRegionTable={(_id)=> props.setShowRegionTable(_id)}
                        />
                    </WCol>
                    <WCol size="6">
                        <WRow size="6">
                            <div className="centerGlobe" >
                                <img width="200"
                                    src={globe} ></img>
                            </div>
                        </WRow>
                        <WRow size="6">

                                <WButton  onClick={props.createNewList} style={{float:"right"}}>Add new Map</WButton>
                        </WRow>
                    </WCol>
                </WRow>

            </WMMain>

        </WLayout>
    );
}

export default MapScreen;
