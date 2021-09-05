Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});


camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri) {

        document.getElementById("result").innerHTML = '<img id="selfie_image" src="' + data_uri + '">';
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/hGtzneD6T/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!")
}

function Check() {
    img = document.getElementById("selfie_image");
    classifier.classify(img, GotResult);
}

function GotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("ObjectName").innerHTML = "Object : " + results[0].label;
        document.getElementById("ObjectAcc").innerHTML = "Accuracy : " + results[0].confidence.toFixed(3);
    }
}