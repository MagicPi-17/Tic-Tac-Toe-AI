
async function loadModel() {
    const model = await tf.loadLayersModel('XO_model/model.json');
    console.log(model);
    model.summary();
    let test = [0, 0, 1,
                0, 0, 0,
                0, 0, 0,
            
                0, 0, 0,
                0, 0, 0,
                0, 0, 0]
    test = tf.tensor([test]);
    test.print();
    prediction = model.predict(test);

    prediction.print();
    prediction = tf.argMax(prediction.flatten());
    prediction.print();
    

}
loadModel();


