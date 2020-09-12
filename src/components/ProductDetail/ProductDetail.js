import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {

    const {productKey} = useParams()
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);

    return (
        <div style={{marginTop: '10%'}}>
            <h1 style={{textAlign: 'center'}}>Your Product Details</h1>
            <Product ShowAddToBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;