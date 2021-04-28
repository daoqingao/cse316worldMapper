import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import Update from "../modals/Update";

import MainRegionTable 					from '../main/MainRegionTable';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import MapRegionContents 					from '../mapRegion/MapRegionContents';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateListField_Transaction,
    SortItems_Transaction,
    UpdateListItems_Transaction,
    ReorderItems_Transaction,
    EditItem_Transaction } 				from '../../utils/jsTPS';

import MapScreen from "./MapScreen";
import globe from "../icons/logo512.png"

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

    const [showMapRegion, toggleShowMapRegion] 	= useState(false);

    const [showRegionTable, toggleShowRegionTable] 	= useState(false);

    const [username, setUsername] 	= useState("");

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
    const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD, mutationOptions);

    const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM, mutationOptions);
    const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM, mutationOptions);
    const [AddRegion] 			= useMutation(mutations.ADD_REGION);
    const [DeleteRegion] 			= useMutation(mutations.DELETE_REGION);
    const [UpdateRegionsField] 	= useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);


    const tpsUndo = async () => {
        const ret = await props.tps.undoTransaction();
        if(ret) {
            setCanUndo(props.tps.hasTransactionToUndo());
            setCanRedo(props.tps.hasTransactionToRedo());
        }
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

    const sort = (criteria) => {
        let prevSortRule = sortRule;
        setSortRule(criteria);
        let transaction = new SortItems_Transaction(activeRegion._id, criteria, prevSortRule, sortTodoItems);
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
            items: [],
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
            subregionsID: ["60878bdf8f9efa12d498fee6"],
            isRoot: true

        }

        const {data} = await AddRegion({variables: {region: region}, refetchQueries: [{query: GET_DB_REGIONS}]});





        if (data) {
            loadRegion(data.addRegion);
        }

        console.log("FINISH ADD")
    }

    const deleteMapRegion=async (_id) => {
        DeleteRegion({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGIONS }] });
    }
    const editSubregion=async (_id,type,value,prev) => {

        console.log("edit")
    }
    const addSubregion=async (_id) => {
    }


    return (
        <WLayout wLayout="header-lside-rside">
            <WLHeader>
                <WNavbar color="colored">
                    <ul>
                        <WNavItem>
                            <Logo className='logo' />
                        </WNavItem>
                    </ul>
                    <ul>
                        <NavbarOptions
                            fetchUser={props.fetchUser} 	auth={auth}
                            setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
                            reloadTodos={refetch} 			setActiveList={loadRegion}

                            setShowUpdate={setShowUpdate}
                            user={props.user}



                        />
                    </ul>
                </WNavbar>
            </WLHeader>



{ !auth && <WLMain>
 {
            <div className="centerGlobe">
                <img src={globe}/>
                Welcome To The World Data Mapper
            </div>}</WLMain>}

            {(!showRegionTable && auth) && <WLMain>

                {
                    (<MapScreen
                        listIDs={SidebarData} activeid={activeRegion._id} auth={auth}
                        handleSetActive={handleSetActive} createNewList={createNewMapRegion}
                        updateListField={updateListField} key={activeRegion._id}
                        createNewMapRegion={createNewMapRegion}
                        deleteMapRegion={(_id) => (deleteMapRegion(_id))}
                        setShowMapRegion={setShowMapRegion}
                        setShowRegionTable={(_id)=> setShowRegionTable(_id)}
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

                        />
                    </div>
                }
            </WLMain>

            }



            {
                showDelete && (<Delete deleteList={deleteList} activeid={activeRegion._id} setShowDelete={setShowDelete} />)
            }

            {
                showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
            }

            {
                showLogin && (<Login setShowMapRegion={setShowMapRegion} user={props.user} username = {username} setUsername = {(name) => setUsername((name)) } fetchUser={props.fetchUser} reloadTodos={refetch}setShowLogin={setShowLogin} />)
            }

            {
                showUpdate && (<Update  user={props.user} fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
            }

        </WLayout>
    );
};


export default MainScreen;