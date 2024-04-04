import { flushSync } from "react-dom";
import PRODUCTS from "./data";
import { useState } from "react";

function ProductTable( {products, textSearch, stocked} ) {
  const productFilter = []

  products.forEach(product => {
      if (product.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1) {
        if (stocked === false){
          productFilter.push(product);
        } else {
          if (product.stocked){
            productFilter.push(product);
          };
        };
      };
  });

  const rows = [];
  const categoryList = new Set();

  //Create a set of category
  productFilter.forEach(product => {
      if (!categoryList.has(product.category)) {
        categoryList.add(product.category);
      };
  });

  const arrObject = [];
  //Create a list of category with product using object
  categoryList.forEach(x => {
    const categoryProduct = {
      category: x,
      productList: [],
    };
    arrObject.push(categoryProduct);
  });
  //Check from product and add to productlist
  productFilter.forEach(product => {
    for (let i = 0; i < arrObject.length; ++i){
      if (product.category == arrObject[i].category) {
        arrObject[i].productList.push(product);
      };
    };
  });
  //From productlist to component
  arrObject.forEach(o => {
    rows.push(<CategoryRow category={o.category} key={o.category} />);
    o.productList.forEach(p => {
      rows.push(< ProductRow product={p} key={p.name} />);
    });
  });


  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CategoryRow({ category }) {
  return (
  <tr>
    <th colSpan="2">
      { category }
    </th>
  </tr>);
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name : 
    <span style={{ color: 'red' }}>
      { product.name }
    </span>;

  return (
  <tr>
    <td>{ name }</td>
    <td>{ product.price }</td>
  </tr>);
}

function SearchBar( { textSearch, stocked , onSetTextSearch, onSetStocked} ) {
  return (
  <>
    <form>
      <input type="text" value = { textSearch } placeholder="Search for product..." onChange={ (e) => onSetTextSearch(e.target.value) } />
      <label>
        <input type="checkbox" checked = { stocked } onChange={ (e) => onSetStocked(e.target.checked) }/> 
          {' '}
          Only show products in stock
      </label>
    </form>
  </>);
}

function TableFull( {products} ) {
  const [textSearch, setTextSearch] = useState('');
  const [stocked, setStocked] = useState(false);

  return (
  <div>
    <SearchBar textSearch = { textSearch } stocked = { stocked } onSetTextSearch = { setTextSearch } onSetStocked = { setStocked } />
    <ProductTable products= { products } textSearch = { textSearch } stocked = { stocked } />
  </div>);
}

export default function Hello() {
  return (
  <>
    <TableFull products={ PRODUCTS }/>
  </>);
}