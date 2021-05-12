import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import Update from "../modals/Update";

import MainRegionTable 					from '../regionTable/MainRegionTable';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import MapRegionContents 					from '../mapRegion/MapRegionContents';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WRow, WCol, WButton} from 'wt-frontend';
import { UpdateListField_Transaction,
    SortItems_Transaction,
    UpdateListItems_Transaction,
    ModifyLandmark_Transaction,
    DeleteSubregion_Transaction,
    AddSubregion_Transaction,
    ChangeParentSubregion_Transaction,
    ReorderItems_Transaction,
    EditSubregion_Transaction } 				from '../../utils/jsTPS';

import MapScreen from "../mapRegion/MapScreen";
import RegionViewerMain from "../regionViewer/RegionViewerMain";


import globe from "../icons/logo512.png"
import TableEntry from "../regionTable/TableEntry";
import RegionNavigator from "../navbar/RegionNavigator";
import CreateMap from "../modals/CreateMap";

const MainScreen = (props) => {

    const keyCombination = (e, callback) => {
        if(e.key === 'z' && e.ctrlKey) {
            if(props.tps.hasTransactionToUndo()) {
                tpsUndo();
            }
        }
        else if (e.key === 'y' && e.ctrlKey) {
            if(props.tps.hasTransactionToRedo()) {
                tpsRedo();
            }
        }
    }
    document.onkeydown = keyCombination;

    const auth = props.user === null ? false : true;


    let regions 	= [];
    let SidebarData = [];
    const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
    const [activeRegion, setActiveRegion] 		= useState({});
    const [showDelete, toggleShowDelete] 	= useState(false);
    const [showLogin, toggleShowLogin] 		= useState(false);
    const [showCreate, toggleShowCreate] 	= useState(false);
    const [showUpdate, toggleShowUpdate] 	= useState(false);
    const [showDeleteSubregion, toggleShowDeleteSubregion] 	= useState(false);


    const [regionViewerID, setRegionViewerID] = useState({});
    const [showMapRegion, toggleShowMapRegion] 	= useState(false);
    const [showRegionTable, toggleShowRegionTable] 	= useState(false);
    const [showRegionViewer, toggleShowRegionViewer] 	= useState(false);

    const [showCreateMap, setShowCreateMap] 	= useState(false);



    const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
    const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);

    if(loading) { console.log(loading, 'loading'); }
    if(error) { console.log(error, 'error'); }
    if(data) {
        // Assign regions
        for(let region of data.getAllRegions) {
            regions.push(region)
        }
        // if a list is selected, shift it to front of regions
        if(activeRegion._id) {
            let selectedListIndex = regions.findIndex(entry => entry._id === activeRegion._id);
            let removed = regions.splice(selectedListIndex, 1);
            regions.unshift(removed[0]);
        }
        // create data for mapRegion links
        for(let todo of regions) {
            if(todo) {
                SidebarData.push({_id: todo._id, name: todo.name});
            }
        }
    }



    // NOTE: might not need to be async
    const reloadList = async () => {
        if (activeRegion._id) {
            let tempID = activeRegion._id;
            let list = regions.find(list => list._id === tempID);
            setActiveRegion(list);
        }
    }

    const loadRegion = (list) => {
        props.tps.clearAllTransactions();
        setCanUndo(props.tps.hasTransactionToUndo());
        setCanRedo(props.tps.hasTransactionToRedo());
        setActiveRegion(list);

    }

    const mutationOptions = {
        refetchQueries: [{ query: GET_DB_REGIONS }],
        awaitRefetchQueries: true,
        onCompleted: () => reloadList()
    }

    const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS, mutationOptions);
    const [sortTodoItems] 		= useMutation(mutations.SORT_ITEMS, mutationOptions);


    const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM, mutationOptions);
    const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM, mutationOptions);


    const [UpdateSubregionField] 	= useMutation(mutations.UPDATE_ITEM_FIELD, mutationOptions);

    const [AddRegion] 			= useMutation(mutations.ADD_REGION);
    const [DeleteRegion] 			= useMutation(mutations.DELETE_REGION);
    const [UpdateRegionsField] 	= useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);
    const [AddSubregion] 	= useMutation(mutations.ADD_SUBREGION, mutationOptions);
    const [DeleteSubregionArraySingle] 	= useMutation(mutations.DELETE_SUBREGION_ARRAY, mutationOptions);
    const [AddSubregionArraySingle] 	= useMutation(mutations.ADD_SUBREGION_ARRAY, mutationOptions);
    const [SetSubregionArray] 	= useMutation(mutations.SET_SUBREGION_ARRAY, mutationOptions);
    const [changeSubregionArray] 	= useMutation(mutations.CHANGE_SUBREGION_ARRAY, mutationOptions);
    const [AddLandmark] 	= useMutation(mutations.ADD_LANDMARK, mutationOptions);


    const tpsUndo = async () => {
        const ret = await props.tps.undoTransaction();
        if(ret) {
            setCanUndo(props.tps.hasTransactionToUndo());
            setCanRedo(props.tps.hasTransactionToRedo());
        }
        await refetch()
        console.log(props.tps.toString())
    }

    const tpsRedo = async () => {
        const ret = await props.tps.doTransaction();
        if(ret) {
            setCanUndo(props.tps.hasTransactionToUndo());
            setCanRedo(props.tps.hasTransactionToRedo());
        }



    }

    const addItem = async () => {
        let list = activeRegion;
        const items = list.items;
        const newItem = {
            _id: '',
            description: 'No Description',
            due_date: 'No Date',
            assigned_to: 'No One',
            completed: false
        };
        let opcode = 1;
        let itemID = newItem._id;
        let listID = activeRegion._id;
        let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
        props.tps.addTransaction(transaction);
        tpsRedo();
    };


    const deleteList = async (_id) => {
        DeleteRegion({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGIONS }] });
        loadRegion({});
    };

    const updateListField = async (_id, field, value, prev) => {
        let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateRegionsField);
        props.tps.addTransaction(transaction);
        tpsRedo();

    };

    const handleSetActive = (_id) => {
        const selectedList = regions.find(region => region._id === _id);
        loadRegion(selectedList);
    };

    const setShowLogin = () => {
        toggleShowDelete(false);
        toggleShowCreate(false);
        toggleShowLogin(!showLogin);
    };

    const setShowCreate = () => {
        console.log("show create")
        toggleShowDelete(false);
        toggleShowLogin(false);
        toggleShowCreate(!showCreate);
    };

    const setShowDelete = () => {
        toggleShowCreate(false);
        toggleShowLogin(false);
        toggleShowDelete(!showDelete)
    };

    const setShowUpdate = () => {
        console.log("show update")
        toggleShowDelete(false);
        toggleShowLogin(false);
        toggleShowUpdate(!showUpdate);
    };

    const setShowMapRegion = () => {
        console.log("show update")
        toggleShowDelete(false);
        toggleShowLogin(false);
        toggleShowMapRegion(!showMapRegion);
    };

    const setShowRegionTable = (_id) => {
        console.log("show update")
        toggleShowDelete(false);
        toggleShowLogin(false);
        toggleShowRegionTable(!showRegionTable);

        const activeRegion= regions.find(region => region._id === _id);

        props.tps.clearAllTransactions();
        setCanUndo(props.tps.hasTransactionToUndo());
        setCanRedo(props.tps.hasTransactionToRedo());
        setActiveRegion(activeRegion);


    };

    const setShowDeleteSubregion = () => {
        toggleShowCreate(false);
        toggleShowLogin(false);
        toggleShowDeleteSubregion(!showDeleteSubregion)
    };



    const sort = (criteria) => {
        let prevSortRule = sortRule;
        setSortRule(criteria);
        let transaction = new SortItems_Transaction(activeRegion._id, criteria, prevSortRule, sortTodoItems,activeRegion.subregionsID,SetSubregionArray);
        console.log(transaction)
        props.tps.addTransaction(transaction);
        tpsRedo();

    }


    const createNewMapRegion = async () => {
        console.log("NAH ADD")


        let region = {
            _id: '',
            name: 'Untitled',
            owner: props.user._id,

            sortRule: 'task',
            sortDirection: 1,

            capital: "none1",
            leader: "none",
            flag: "none",
            landmark: "none",
            parentRegion: "none",
            subregionNumber: 0,
            regionLandmark: ["none"],

            parentRegionID: '',
            subregionsID: [],
            isRoot: true

        }

        const {data} = await AddRegion({variables: {region: region}, refetchQueries: [{query: GET_DB_REGIONS}]});

        if (data) {
            loadRegion(data.addRegion);
        }

        console.log("FINISH ADD")
    }


    const createNewMapRegionWithName = async (name) => {


        let region = {
            _id: '',
            name: name,
            owner: props.user._id,

            sortRule: 'task',
            sortDirection: 1,

            capital: "none1",
            leader: "none",
            flag: "none",
            landmark: "none",
            parentRegion: "none",
            subregionNumber: 0,
            regionLandmark: [],

            parentRegionID: '',
            subregionsID: [],
            isRoot: true

        }

        const {data} = await AddRegion({variables: {region: region}, refetchQueries: [{query: GET_DB_REGIONS}]});

        if (data) {
            loadRegion(data.addRegion);
        }

    }


    const deleteMapRegion=async (_id) => {
        DeleteRegion({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGIONS }] });
    }




    const editSubregion=async (_id,field,value,prev) => {

        console.log("called to edit")

        // let subregionID=_id
        // let flag = 0;
        // if (field === 'completed') flag = 1;
        // let listID = activeRegion._id;
        // //let transaction = new EditSubregion_Transaction(listID, subregionID, field, prev, value, flag, UpdateSubregionField);
        // //props.tps.addTransaction(transaction);
        // tpsRedo();


        let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateRegionsField);
        props.tps.addTransaction(transaction);
        tpsRedo();

    }
    const addSubregion=async () => {

        let parentID=activeRegion._id


        let transaction = new AddSubregion_Transaction(parentID,props.user._id,AddSubregion,DeleteSubregionArraySingle,AddSubregionArraySingle)
        props.tps.addTransaction(transaction);

        tpsRedo();
    }

    const deleteSubregion=async (subregionID) => {

        let parentID=activeRegion._id


        let transaction = new DeleteSubregion_Transaction(parentID,subregionID,DeleteSubregionArraySingle,SetSubregionArray,activeRegion.subregionsID)

        props.tps.addTransaction(transaction);
        tpsRedo();


        // let _id = subregion._id
        // DeleteRegion({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGIONS }] });

    }

    const changeRegion = async(_id) => {

        toggleShowDelete(false);
        toggleShowLogin(false);

        const activeRegion= regions.find(region => region._id === _id);
        console.log("change to Region")
        console.log(activeRegion)

        props.tps.clearAllTransactions();
        setCanUndo(props.tps.hasTransactionToUndo());
        setCanRedo(props.tps.hasTransactionToRedo());
        setActiveRegion(activeRegion);

    }

    const returnHome=() => {
        console.log("return Home")
        toggleShowRegionTable(false)
        toggleShowMapRegion(true)
        toggleShowRegionViewer (false)
    }

    const showToRegionViewer =(_id) => {
        console.log("show regionViewer")
        toggleShowRegionTable(false)
        toggleShowRegionViewer(true)
        setRegionViewerID(_id)





    }

    const addRegionLandmark = async (landmarkName,regionID,op,index) => {

        let transaction = new ModifyLandmark_Transaction(regionID,landmarkName,index,op,AddLandmark)
        props.tps.addTransaction(transaction);
        tpsRedo();



    }

    const changeParentRegion = async (value,currentRegion) => {

        let unlinkID=currentRegion.parentRegionID
        let linkID=undefined
        let currentID = currentRegion._id

        regions.forEach( region => {
            if(region.name===value)
                linkID=region._id
        })
        if(linkID===undefined)
            return



        // let transaction = new ChangeParentSubregion_Transaction(linkID,unlinkID,currentID)
        // props.tps.addTransaction(transaction);
        // tpsRedo();







        console.log("allow to update")
        console.log(linkID)

        const {data} = await changeSubregionArray({variables: {linkID: linkID, unlinkID:unlinkID , subregionID: currentID}})


    }


    return (
        <WLayout wLayout="header">
            <WLHeader>
                <WNavbar color="colored">


                        <WCol size={"2"}>
                            <WNavItem>
                                <Logo className='logo'
                                      returnHome={returnHome}
                                />
                            </WNavItem>
                        </WCol>


                        <WCol size={"8"}>
                            <RegionNavigator
                                regions ={regions}
                                activeRegion={activeRegion}
                                auth = {auth}

                                showRegionTable = {showRegionTable}
                                showRegionViewer = {showRegionViewer}


                                setShowRegionViewer = {toggleShowRegionViewer}
                                setShowRegionTable={toggleShowRegionTable}

                                showThisRegionViewer = {showToRegionViewer}
                                changeRegion={(_id) => changeRegion(_id)}


                            />


                        </WCol>






                        <WCol size={"2"}>
                            <ul>
                                <NavbarOptions
                                    fetchUser={props.fetchUser} 	auth={auth}
                                    setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
                                    reloadTodos={refetch} 			setActiveList={loadRegion}
                                    setShowUpdate={setShowUpdate}
                                    user={props.user}
                                />
                            </ul>
                        </WCol>




                </WNavbar>
            </WLHeader>



{ !auth &&  <WLMain>
 {
            <div className="centerGlobe">


                <i className="material-icons another" >public</i>
                <br></br>
                Welcome To The World Data Mapper
            </div>}
</WLMain>}

            {(!showRegionTable && !showRegionViewer && auth) && <WLMain>

                {
                    (<MapScreen
                        listIDs={regions} activeid={activeRegion._id} auth={auth}
                        handleSetActive={handleSetActive} createNewList={createNewMapRegion}
                        updateListField={updateListField} key={activeRegion._id}
                        createNewMapRegion={createNewMapRegion}
                        deleteMapRegion={(_id) => (deleteMapRegion(_id))}
                        setShowMapRegion={setShowMapRegion}
                        setShowRegionTable={(_id)=> setShowRegionTable(_id)}

                        setShowCreateMap = { setShowCreateMap}
                        setShowDelete = {setShowDelete}
                        showDelete={showDelete}

                        showCreateMap = {showCreateMap}

                        createNewMapRegionWithName = {createNewMapRegionWithName}
                    />)
                }
            </WLMain>}

            {(showRegionTable && auth) && <WLMain>
                {

                    <div className="container-secondary">
                        <MainRegionTable
                            addItem={addItem}

                            setShowDelete={setShowDelete} 	undo={tpsUndo} redo={tpsRedo}
                            activeRegion={activeRegion}


                            canUndo={canUndo}
                            canRedo={canRedo}
                            sort={sort}


                            allRegionIDs = {SidebarData}
                            allRegions = {regions}

                            editSubregion ={editSubregion}
                            addSubregion ={addSubregion}
                            deleteSubregion ={deleteSubregion}
                            changeRegion={(_id) => changeRegion(_id)}
                            showRegionViewer={(_id) =>  showToRegionViewer(_id)}

                            toggleShowDeleteSubregion = {setShowDeleteSubregion}
                            setShowDeleteSubregion = {toggleShowDeleteSubregion}
                            showDeleteSubregion={showDeleteSubregion}


                        />
                    </div>
                }
            </WLMain>

            }



            {(showRegionViewer && auth ) &&                      <WLMain>
                <RegionViewerMain
                    regionViewerID = {regionViewerID}
                    allRegions = {regions}
                    activeRegion = {activeRegion}

                    addRegionLandmark = {addRegionLandmark}
                    changeParentRegion={changeParentRegion}

                    undo={tpsUndo} redo={tpsRedo}
                    canUndo={canUndo}
                    canRedo={canRedo}


                    setShowRegionViewer = {toggleShowRegionViewer}
                    setShowRegionTable={toggleShowRegionTable}

                    changeRegion={(_id) => changeRegion(_id)}


                />
            </WLMain>          }




            {
                showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
            }

            {
                showLogin && (<Login setShowMapRegion={setShowMapRegion} user={props.user}  fetchUser={props.fetchUser} reloadTodos={refetch}setShowLogin={setShowLogin} />)
            }

            {
                showUpdate && (<Update  user={props.user} fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
            }

        </WLayout>
    );
};



export default MainScreen;