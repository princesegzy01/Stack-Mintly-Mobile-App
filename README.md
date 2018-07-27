# StackMint Mobile App
A Mobile app written in react-native that predicts currency and also extract the notes serial number plus other information about the notes in json format.

## How it works
The app opens the phone camera, and uses the camera as a background with a moveable bounding box above the camera layer.

The user needs to drag the bounding box above the serial part of the notes, then later click on the capture button which automaticall send the image taken along with the bounding box location to a Flask webserver for prediction.

## Webserver
Web server is written in Flask and its expects an image sent from the app and this will automatically be passed to to an already trained machine learning model which will return an output.

For more information, princesegzy01@gmail.com.
