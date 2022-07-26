import React, { useState, useEffect } from 'react'
// firebase
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'
import { v4 } from "uuid";


const FileUpload = () => {

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    function uploadImage() {
        
        if (imageUpload == null) return;
        const imageRef = ref(storage, `RohitFamily/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    }

    useEffect(() => {
        const imagesListRef = ref(storage, "RohitFamily/");
    
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
        
    }, []);

    return (
        <div>
            <input type="file" onChange={e => setImageUpload(e.target.files[0])} />
            <button onClick={uploadImage} >Upload</button>

            <div>
                {
                    imageUrls.map((url) =>
                        <img src={url} alt={url} width="300px" />
                    )
                }
            </div>

        </div>
    )
}

export default FileUpload