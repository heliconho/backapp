import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import CategoryPage from './pages/Category';
import NavSideBar from './component/navbar';
import { UserDisplay, Login } from './component/UserCol';
import { app } from './helper/connection';
import React, { useState } from 'react';
import { Grid } from '@material-ui/core'
import ProductListPage from './pages/ProductList';
import ProductCreatePage from './pages/ProductCreate';
import CategoryCreatePage from './pages/CategoryCreate';


function App() {
  const [user, setUser] = useState(app.currentUser);
  return (
    <div className="App">
      <Grid container spacing={0}>
        <Grid item xs={2} md={2} style={{ display: "grid", gridAutoRow: "1fr", gridTemplateColumns: "1fr 1fr 1fr" }}>
          <NavSideBar />
        </Grid>
        <Grid item xs>
          {user ? <UserDisplay user={user} /> : <Login setUser={setUser} />}
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="product" element={<ProductListPage />} />
            <Route exact path="product/create" element={<ProductCreatePage />} />
            <Route exact path="user" element={<UserPage />} />
            <Route exact path="category" element={<CategoryPage />} />
            <Route exact path="category/create" element={<CategoryCreatePage />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;