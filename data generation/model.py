import tensorflow as tf
from pandas import read_csv
import numpy as np
from tensorflow.keras.models import load_model



def Model(input_shape, output_shape):
    X = tf.keras.Input(shape=input_shape)
    A1 = tf.keras.layers.Dense(units=90, activation='tanh')(X)
    Y = tf.keras.layers.Dense(units=output_shape, activation='softmax')(A1)
    model = tf.keras.Model(inputs=X, outputs=Y)
    return model


if __name__ == '__main__':
    data = np.array(read_csv('data generation\TicTacToe_processed_data.csv'))
    X_train = data[:,:18]
    Y_train = data[:,18:]
    print(X_train.shape, Y_train.shape)



    # model = Model(X_train.shape[1], Y_train.shape[1])
    # model.compile(optimizer='adam',
    #               loss='binary_crossentropy',
    #               metrics=['accuracy'])

    model = load_model('data generation\model.h5')
    model.summary()
    model.evaluate(X_train, Y_train)
    