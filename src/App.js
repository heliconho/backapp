import './App.css';
import Clock from './component/clock';
import {BrowserRouter as Router, Route,Routes, Link} from 'react-router-dom';
import HomePage from './pages/Home';
import ProductPage from './pages/Product';
import UserPage from './pages/User';
import CategoryPage from './pages/Category';
import NavSideBar from './component/navbar';
import {UserDisplay,Login} from './component/UserCol';
import {app} from './helper/connection';
import React,{useState} from 'react';
import {Grid} from '@material-ui/core'


function App() {
  const [user, setUser] = useState(app.currentUser);
   return (
    <div className="App">
      <Grid container spacing={0}>
        <Grid item xs={2} md={2} style={{display: "grid",gridAutoRow: "1fr",gridTemplateColumns: "1fr 1fr 1fr"}}>
          <NavSideBar />
        </Grid>
        <Grid item xs md>
        {user ? <UserDisplay user={user} /> : <Login setUser={setUser} />}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="product" element={<ProductPage />} />
          <Route exact path="user" element={<UserPage />} />
          <Route exact path="category" element={<CategoryPage />} />
        </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;