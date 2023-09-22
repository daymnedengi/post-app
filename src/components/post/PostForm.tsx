import "./PostForm.scss";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, TAppDispatch } from "../../store";
import { postSlice } from "../../store/postSlice";
import { IPost } from "../../types/post";

export default function PostForm(): JSX.Element {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const dispatch: TAppDispatch = useAppDispatch();

    function createPost() {
        if (title != "" && content != "") {
            let post: IPost = {
                id: Math.floor(Math.random() * 1000000),
                userId: Math.floor(Math.random() * 1000000),
                title: title,
                body: content
            }

            dispatch(postSlice.actions.addPost(post));

            setTitle("");
            setContent("");
        }
    }

    return (
        <div className="post-form">
            <Link to="/">На главную</Link>
            <div className="post-form__group">
                <label>Title:</label>
                <input 
                    type="text"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value) } 
                    value={title}
                />
            </div>
            <div className="post-form__group">
                <label>Content:</label>
                <textarea 
                    onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    value={content}
                ></textarea>
            </div>
            <div className="post-form__group">
                <input
                    type="button"
                    value="create"
                    onClick={createPost}
                />
            </div>
        </div>
    )
}