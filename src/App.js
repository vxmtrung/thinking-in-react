import PRODUCTS from "./data";

function ProductTable( {products} ) {

  const rows = [];
  const categoryList = new Set();

  products.forEach(product => {
      if (!categoryList.has(product.category)) {
        categoryList.add(product.category);
      };
  });

  const arrObject = [];

  categoryList.forEach(x => {
    const categoryProduct = {
      category: x,
      productList: [],
    };
    arrObject.push(categoryProduct);
  });

  products.forEach(product => {
    for (let i = 0; i < arrObject.length; ++i){
      if (product.category == arrObject[i].category) {
        arrObject[i].productList.push(product);
      };
    };
  });

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

function SearchBar() {
  return (
  <>
    <form>
      <input type="text" placeholder="Search for product..." />
      <label>
        <input type="checkbox"/> 
          {' '}
          Only show products in stock
      </label>
    </form>
  </>);
}

function TableFull( {products} ) {
  return (
  <div>
    <SearchBar />
    <ProductTable products={ products } />
  </div>);
}

export default function Hello() {
  return (
  <>
    <TableFull products={ PRODUCTS }/>
  </>);
}