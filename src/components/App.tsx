import "./App.scss";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App(): JSX.Element {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/post/create" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    )
}