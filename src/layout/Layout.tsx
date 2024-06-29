import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../widgets/header/Header";
import Home from "../pages/home/Home";
import Comments from "../pages/commments/Comments";

export enum SoringType {
    topstories,
    newstories,
    beststories
}

const Layout: React.FC = () => {
    const [sortingType, setSortingType] = useState<SoringType>(SoringType.topstories);

    return (
        <Router>
            <>
                <Header sortingType={sortingType} setSortingType={setSortingType} />
                <Routes>
                    <Route path="/" element={<Home sortingType={sortingType} />} />
                    <Route path="/comments/:id" element={<Comments />} />
                </Routes>
            </>
        </Router>
    );
}

export default Layout;