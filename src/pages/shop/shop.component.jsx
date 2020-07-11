import React, { useState , useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from "react-redux";

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { updateCollections } from '../../redux/shop/shop.action';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, updateCollections }) => {

    const [isLoading , setIsLoading] = useState(true);

   let unsubscribeFromSnapshot = null;

    useEffect(() => {


        const collectionRef = firestore.collection('collections');
        
        collectionRef.get().then(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            setIsLoading(false);
        });
    });

    return (
        <div className='shop-page' >
            <Route exact path={`${match.path}`} render={(props)=> <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />} />
            <Route path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner isLoading={isLoading} {...props} />}  />
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);