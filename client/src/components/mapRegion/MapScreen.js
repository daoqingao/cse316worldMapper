import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import {WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol} from 'wt-frontend';

import { WLayout, WLHeader, WLMain, WLSide, WNavItem} from 'wt-frontend';
import globe from "../icons/logo512.png";
import MapRegionContents from "./MapRegionContents";
import MapRegionEntry from "./MapRegionEntry";
import CreateMap from "../modals/CreateMap"


const MapScreen = (props) => {




    const handleCreateNewMap = () => {

        props.setShowCreateMap(true)
    }
    return (
        <WLayout wLayout="header" style={{color:"white"}}>
            <WLHeader>

            </WLHeader>

            <WMMain>

<WRow>
    <WCol size={"2"}>
    </WCol>
    <WCol size={"10"}>
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
                    setShowDelete = {props.setShowDelete}
                    showDelete={props.showDelete}
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
                    <WCol size="4">
                        <WButton           shape="pill"
                                           hoverAnimation="darken"
                                           clickAnimation="ripple-light" onClick={() => handleCreateNewMap()} className="create-map">Add New Map</WButton>

                    </WCol>



                </WRow>
            </WCol>
        </WRow>
    </WCol>

</WRow>

            </WMMain>
            {
            props.showCreateMap && (<CreateMap

                setShowCreateMap = { props.setShowCreateMap}
                showCreateMap = {props.showCreateMap}
                updateListField={props.updateListField}
                createNewRegion = {        props.createNewList}
                createNewMapRegionWithName={props.createNewMapRegionWithName}
            />)
            }
        </WLayout>
    );
}

export default MapScreen;
