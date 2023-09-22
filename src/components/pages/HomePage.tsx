import "./HomePage.scss";

import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch, TAppDispatch } from "../../store";
import { fetchPosts } from "../../store/postSlice";
import { IPostSliceState } from "../../types/post";

import PostList from "../post/PostList";
import PostForm from "../post/PostForm";

export default function HomePage(): JSX.Element {

    const postReducer: IPostSliceState = useAppSelector(state => state.postReducer);
    const dispatch: TAppDispatch = useAppDispatch();

    const location = useLocation();

    useEffect(() => {
        if (location.pathname == "/" && postReducer.posts.length == 0) {
            dispatch(fetchPosts());
        }
    }, [location]);

    if (location.pathname == "/post/create") {
        return (
            <div className="home-page">
                <div className="home-page__title">
                    Домашняя страница
                </div>
                <PostForm />
            </div>
        );
    }

    if (postReducer.status == "loading") {
        return (
            <div className="home-page">
                <div className="home-page__title">
                    Домашняя страница
                </div>
                <div className="post-list">
                    <div className="post-list__title">
                        { postReducer.message }
                    </div>
                </div>
            </div>
        );
    }

    if (postReducer.status == "error") {
        return (
            <div className="home-page">
                <div className="home-page__title">
                    Домашняя страница
                </div>
                <div className="post-list">
                    <div className="post-list__title" style={{color: "red"}}>
                        { postReducer.message }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page">
            <div className="home-page__title">
                Домашняя страница
            </div>
            <div className="post-list">
                <div className="post-list__create">
                    <Link to="/post/create">Создать пост</Link>
                </div>
                <div className="post-list__body">
                    <PostList posts={postReducer.posts} />
                </div>
            </div>
        </div>
    );
}