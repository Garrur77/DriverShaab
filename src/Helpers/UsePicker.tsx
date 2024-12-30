
import ImagePicker, { Image, } from 'react-native-image-crop-picker'; 
import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react';


const UsePicker = () => {
  const [PickedImage, setPickedImage] = useState<string | undefined>(undefined);
  const [PickedImageError, setPickedImageError] = useState<string | undefined>(undefined);

  const [PickedVideo, setPickedVideo] = useState<string | undefined>(undefined);
  const [PickedVideoError, setPickedVideoError] = useState<string | undefined>(undefined);

  const openGallery = () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 800,
        height: 900,
        cropping: true,
        includeBase64: true,
        mediaType: 'photo',
      })
        .then((image: Image) => {
        //    UploadToServer(`data:image/jpeg;base64,${image.data}`)
        

        })
        .catch(function (error: any) {
          console.log('Error image :', error);
          setPickedImageError('Error selecting image.');
        });
    }, 1000);
  };



  const OpenGalleryForVideo = () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        mediaType: 'video',
        videoQuality: 'medium',
      })
        .then((video) => {



          setPickedVideo(video.path);
          console.log(PickedVideo, "VideoVideo")
          setPickedVideoError(undefined);
        })
        .catch(function (error: any) {
          console.log('Error image :', error);
          setPickedVideoError('Error selecting image.');
        });
    }, 1000);


  }






  return { PickedImage, PickedImageError, PickedVideo, PickedVideoError, openGallery, OpenGalleryForVideo };
}

export default UsePicker

