import React, { useState } from 'react';
import './Uplode.css'
import { Toaster } from 'react-hot-toast';
import { Button } from 'reactstrap';
import icon from '../../../assets/images/uploudfile.svg'

const UplodeStudent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {

        // try {
        //     const formData = new FormData();
        //     formData.append('file', selectedFile);
        //     const response = await axios.post('رابط API الخاص بك هنا', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });
        //     console.log('File uploaded successfully:', response.data);
        //     // هنا يمكنك إضافة رسالة نجاح إلى مكتبة التوست
        // } catch (error) {
        //     console.error('Error uploading file:', error);
        //     // هنا يمكنك إضافة رسالة خطأ إلى مكتبة التوست
        // }
    };


    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // handleFiles(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // handleFiles(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <>
            <Toaster />
            <div className='body-dash-mangment' dir='rtl'>
                <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                    <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                    <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "label-uploud drag-active" : "label-uploud"}>
                        <div>
                            <h3>رفع نموذج Excel</h3>
                            <p>قم بسحب وإسقاط الملف هنا</p>
                            <img className="img-uploud" src={icon} onClick={onButtonClick}/>
                            <br/>
                            <Button className='btn btn-outline-success' variant="primary" onClick={() => handleUpload()}>
                                رفع البيانات
                            </Button>
                        </div>
                    </label>
                            
                    {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                </form>

            </div>
        </>
    );
};

export default UplodeStudent;
