import React, { useState, useRef, useEffect } from 'react';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef();
    
    const pickImageHandler = () => {
        fileInputRef.current.click();
    };
    
    const clearError = () => {
        setError(null);
    };
    
    useEffect(() => {
        if (!file) {
            return;
        }
        
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
        
        return () => {
            fileReader.onload = null;
        };
    }, [file]);
    
    const fileSelectedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            
            // Check if file size is too large (e.g., > 5MB)
            if (pickedFile.size > 5000000) {
                setError("File is too large. Please select an image under 5MB.");
                setIsValid(false);
                fileIsValid = false;
                return;
            }
            
            // Check if file type is valid
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(pickedFile.type)) {
                setError("Invalid file type. Please select a JPG or PNG image.");
                setIsValid(false);
                fileIsValid = false;
                return;
            }
            
            setFile(pickedFile);
            setIsValid(true);
            setError(null);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
            if (event.target.files && event.target.files.length > 1) {
                setError("Please select only one image.");
            }
        }
        
        props.onInput(props.id, pickedFile, fileIsValid);
    };
    
    return (
        <div className="image-upload">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
                    <span className="block sm:inline">{error}</span>
                    <button
                        className="absolute top-0 right-0 px-4 py-3"
                        onClick={clearError}
                    >
                        <span className="text-red-500">&times;</span>
                    </button>
                </div>
            )}
            
            <input
                id={props.id}
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                style={{ display: 'none' }}
                onChange={fileSelectedHandler}
            />
            
            <div className="image-upload__preview">
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" />
                ) : (
                    <p>Please pick an image.</p>
                )}
            </div>
            
            <button type="button" onClick={pickImageHandler}>
                Pick Image
            </button>
        </div>
    );
};

export default ImageUpload;