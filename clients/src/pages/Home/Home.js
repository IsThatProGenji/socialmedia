import React, { useEffect, useState } from "react";
import "./Home.css";
import { Image } from "cloudinary-react";
import Axios from "axios";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';



function Home() {

    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("loggedIn")) {
            localStorage.setItem("loggedIn", false);
        }
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/upload").then((response) => {
            setUploads(response.data);
        });
    }, []);


    const likePost = (id, key,) => {
        var tempLikes = uploads;
        tempLikes[key].likes = tempLikes[key].likes + 1;

        Axios.post("http://localhost:3001/upload/like", {
            author: localStorage.getItem("username"),
            likesid: id,

        }).then((response) => {
            setUploads(tempLikes);

        });

    }


    return (

        <div className="Background">
            <div className="Home">
                <div className="Border"></div>

                {uploads.map((val, key) => {

                    return (

                        <div className="Post">
                            <div className="Image">
                                <div className="Name"> {val.author}
                                    <div className="Title">
                                        "{val.title}"
                                </div></div>
                                <Image cloudName="dlhqyhr1r" publicId={val.image} />
                            </div>
                            <div className="Content">

                                <div className="Description"> "{val.description}"</div>
                                <div className="Alike">
                                    <div className="Amount">{val.amount} </div>
                                    <div className="Like">

                                        <FavoriteBorderIcon
                                            id="likeButton"
                                            onClick={() => {
                                                likePost(val.id, key)

                                                    ;

                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    );
                })}

            </div>
        </div>
    );
}

export default Home;
