import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import {WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol} from 'wt-frontend';

import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import globe from "../icons/logo512.png";

const MapScreen = (props) => {

    return (
        <WLayout wLayout="header-lside-rside" style={{color:"white"}}>
            <WLHeader>

            </WLHeader>

            <WMMain>

                <WRow size="12">
                    Your Maps
                </WRow>
                <WRow>
                    _______________________________________________________________________
                </WRow>
                <WRow size="6">
                    <WCol size="6">
                        Put list here@@@@@@@@@
                    </WCol>
                    <WCol size="6">
                        <WRow size="6">
                            <div className="centerGlobe" >
                                <img width="200"
                                    src={globe} ></img>
                            </div>
                        </WRow>
                        <WRow size="6">

                                <WButton>Add new Map</WButton>
                        </WRow>
                    </WCol>
                </WRow>

            </WMMain>

        </WLayout>
    );
}

export default MapScreen;
