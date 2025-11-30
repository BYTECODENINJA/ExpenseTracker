import React, {useState} from 'react'
import { LuUser, LuUpload, LuTrash} from "react-icons/lu";

const ProfilePhotoSelector = ({image, setImage}) => {

    const inputRef = React.useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            //update image state
            setImage(file);

            //Generate preview url from file object
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile =() => {
        inputRef.current.click();
    }

    return <div className="flex justify-center mb-6">
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        />

        {!image ?(
            <div className="w-20 h-20 flex items-center justify-center border border-gray-300 rounded-full relative cursor-pointer">
                <LuUser className="text-4xl text-primary"/>

                <button
                type="button"
                className="w-8 h-8 flex items-center justify-center right-0 bg-primary rounded-full text-white absolute -bottom-1"
                onClick={onChooseFile}
                >
                    <LuUpload />
                </button>
            </div>
        ) : (
            <div className="relative">
                <img
                    src={previewUrl}
                    alt="profile-pic"
                    className="rounded-full w-20 h-20 object-cover"/>
                <button type="button" className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1" onClick={handleRemoveImage}>
                    <LuTrash />
                </button>
            </div>
        )}

    </div>;

};
export default ProfilePhotoSelector
