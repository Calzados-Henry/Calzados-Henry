import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <div>
      <div>
        <ul>
          <h4>Catalog</h4>
          <ul>
            <Link to='addproduct'>
              <li>Create Product</li>
            </Link>

            <Link to='addcategory'>
              <li>Create Category</li>
            </Link>

            <Link to='addatribute'>
              <li>Create atribute</li>
            </Link>
          </ul>
        </ul>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
