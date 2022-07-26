import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { storage,auth } from '../firebase'
import { onAuthStateChanged} from "firebase/auth";
import {useNavigate } from 'react-router-dom';
import { ref, getDownloadURL, listAll } from 'firebase/storage'
import ImageGallery from 'react-image-gallery';
import './ImageViewer.css'

const ImageViewer = () => {

    const [imageUrls, setImageUrls] = useState([]);
    const location = useLocation();

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser == null) {
                navigate("/login");
                return;
            }
        });
    }, [])

    useEffect(() => {

        const imagesListRef = ref(storage, location.state);

        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, { original: url, thumbnail: url }]);
                });
            });
        });

    }, []);

    return (
        <div className='imageViewerMain' >
            <ImageGallery items={imageUrls} />;
        </div>
    )
}

export default ImageViewer