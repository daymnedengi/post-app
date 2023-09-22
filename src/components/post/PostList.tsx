import "./PostList.scss";

import axios from "axios";
import { useAppDispatch, TAppDispatch } from "../../store";
import { postSlice } from "../../store/postSlice";
import { IPost, IPostListProps } from "../../types/post";

export default function PostList(props: IPostListProps): JSX.Element {

    const dispatch: TAppDispatch = useAppDispatch();

    async function deletePost(post: IPost) {
        try {
            let response = await axios.delete("https://jsonplaceholder.typicode.com/posts/" + post.id);

            if (response.status == 200) {
                dispatch(postSlice.actions.deletePost(post));
            }
            else {
                throw Error();
            }
        } catch {
            alert("Не удалось удалить пост с ID: " + post.id);
        }
    }

    return (
        <div className="post-list">
            <div className="post-list__title">
                Список постов
            </div>
            <div className="post-list__body">
                { props.posts.map((post: IPost) => {
                    return (
                        <div className="post-list__row" 
                             key={post.id}
                        >
                            <div className="post__id">
                                ID: { post.id }
                            </div>
                            <div className="post__title">
                                Title: { post.title }
                            </div>
                            <div className="post__buttons">
                                <input 
                                    className="post__edit-button" 
                                    type="button" 
                                    value="Edit"
                                />
                                <input 
                                    className="post__delete-button" 
                                    type="button" 
                                    value="Delete" 
                                    onClick={() => deletePost(post)}
                                />
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
    );
}