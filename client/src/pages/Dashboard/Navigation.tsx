import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { PrivatesRoutes } from '../../routes/routes';

export default function Navigation() {
  return (
    <div>
      <div>
        <ul>
          <h4>Catalog</h4>
          <ul>
            <Link to={PrivatesRoutes.addProduct}>
              <li>Create Product</li>
            </Link>

            <Link to={PrivatesRoutes.addCategory}>
              <li>Create Category</li>
            </Link>

            <Link to={PrivatesRoutes.addAttribute}>
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
