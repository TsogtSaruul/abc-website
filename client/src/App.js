import React from "react";
import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Navigate 
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from './components/PostDetails/PostDetails';


const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/auth" element={
                        !user ? <Auth /> : <Navigate to="/" />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                </Route> 
            </Routes>
        </Router>
    );
};

export default App;