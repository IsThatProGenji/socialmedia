
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { TransverseLoading } from 'react-loadingg';
import "./Profile.css";


function Profile() {

    const [yourUploads, setYourUploads] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        Axios.get(
            `http://localhost:3001/upload/byUser/${localStorage.getItem("username")}`
        ).then((response) => {
            setYourUploads(response.data);
        })
            .catch(err => {
                console.error(err);
            }).then(() => {
                setIsLoading(false)
            });
    }, [])
    

    return (
        <div className="outer">
<div className="Back">
        <h1>{localStorage.getItem("username")}</h1>
        <div className="Backgroundp">


            {!isLoading && Object.entries(yourUploads).length ? (
                <>

                   
                    {yourUploads.map((val, key) => {
                        return (
                       
                            <div className="Postp">  
                             
                                <div className="Imagep">
                                <div className="Amountp">{val.amount} </div>
                                    <Image cloudName="dlhqyhr1r" publicId={val.image} />
                                </div>


                             

                            </div>
                      

                        );
                    })}

                </>
            ) : (
                <div className="Post">

                    <TransverseLoading
                        className="spinner"
                        type="spin"
                        color="black"
                        height="50%"
                        width="50%"
                    />
                </div>


            )}

        </div>
        </div>
</div>

    );
}


export default Profile;