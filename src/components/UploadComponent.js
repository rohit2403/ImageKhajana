import React, { useState } from 'react'
import { storage } from '../firebase'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { MdUploadFile } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UploadCom.css'

const UploadComponent = (props) => {

    const [imageUpload, setImageUpload] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState('');
    const [progress, setProgress] = useState(0);

    function uploadImage() {

        if (imageUpload === null) {
            toast.error('Please select an image!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (selectedFolder === '') {
            toast.error('Please select an folder!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const path = props.user + "/" + selectedFolder + "/" + imageUpload.name;

        const imageRef = ref(storage, path);
        
        uploadBytesResumable(imageRef, imageUpload).on('state_change', (snapshot) => {
            const total = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(parseInt(total));
            if (parseInt(total) === 100) {
                if (!props.folderdetail.includes(selectedFolder)) {
                    props.addFolder([...props.folderdetail, selectedFolder])
                }
            }
        })
    }

    function handleChange(e) {
        setSelectedFolder(e.target.value);
    }

    return (
        <div className='uploadMain'>
            <ToastContainer />
            <div className="folderselection">
                <div className="selectfolder">
                    <select id="folder" name='Choose' onChange={handleChange}>
                        <option hidden>Select Existing Folder</option>
                        {
                            props.folderdetail.map((val) =>
                                <option key={val} value={val}>{val}</option>
                            )
                        }
                    </select>
                </div>
                <div><h1>/</h1></div>
                <div className="createfolder">
                    
                    <input type="text" name='newFolder' onChange={handleChange} placeholder="Create Folder" />
                </div>
            </div>
            <div className='uploadsection'>
                <div className="selector">
                    <input type="file" accept="image/*" onChange={e => setImageUpload(e.target.files[0])} />
                </div>
                <div className="uploadButton">
                    <button onClick={uploadImage} id="upbtn" >
                        <MdUploadFile />
                        {
                            progress > 0 && progress < 100 ? <p>{progress}%</p> : <p>Upload</p>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadComponent