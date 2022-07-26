import React, { useState, useEffect } from 'react'
import './AllFolder.css'
import { auth, storage } from '../firebase'
import { ref, listAll } from 'firebase/storage'
import { onAuthStateChanged } from "firebase/auth";
import { v4 } from 'uuid'
import { NavLink } from 'react-router-dom'
import UploadComponent from './UploadComponent';
import image from './folder.png'

const AllFolder = () => {

    const [folder, setFolder] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {

        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            const imagesListRef = ref(storage, currentUser.email);
            listAll(imagesListRef).then((res) => {
                const AllFolder = res.prefixes.map((val) => val._location.path_.slice(currentUser.email.length + 1))
                setFolder(AllFolder);
            })
        })

    }, []);

    return (
        <>
            <UploadComponent folderdetail={folder} user={user.email} addFolder={setFolder} />
            <div className='allFolderGrid'>
                {
                    folder.length ?
                        <div className='cards'>
                            {
                                folder.map((val) =>

                                    <div key={v4()} className='card' >
                                        <NavLink to="/imageviewer" state={user.email + "/" + val}>
                                            <img src={image} width='80px' alt='Folder : ' /><h4>{val }</h4>
                                        </NavLink>

                                    </div>
                                )
                            }
                        </div>
                        :
                        null
                }
            </div>
            
        </>
    )
}

export default AllFolder