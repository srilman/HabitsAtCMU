import tensorflow as tf
import pandas as pd
import numpy as np
import os
import matplotlib
import matplotlib.pyplot as plt
import random
import tensorflow as tf
import shutil

random.seed(111)
rng = pd.date_range(start='2000', periods=12, freq='M')

def create_time_series():
    x = pd.Series(np.random.uniform(-10, 10, size=len(rng)), rng).cumsum()
    # print(x)
    return x

t1 = create_time_series()
# t1.plot(c="blue", title="Example")

t = []
for i in range(0, 749):
    x = []
    for j in range(0, 12):
        x.append(np.random.uniform(-15, 15) + t1[j])
    t.append(pd.Series(x, rng))
    # print(t[i])
    # t[i].plot(c="red", title="Example")

t2 = create_time_series()
# t2.plot(c="green", title="Example")

t2arr = []
for i in range(0, 249):
    x = []
    for j in range(0, 12):
        x.append(np.random.uniform(-10, 10) + t2[j])
    t2arr.append(pd.Series(x, rng))
    # print(t2arr[i])
    # t2arr[i].plot(c="yellow", title="Example")

final_array = np.concatenate((np.array([t1, t2]), np.array(t), np.array(t2arr)))
# print(final_array)

new_final = final_array.tolist()
random.shuffle(new_final)
# print('new final', new_final)
# plt.show()

def to_csv(filename, array):
    with open(filename, 'w') as ofp:
        for i in array:
            line = ",".join(map(str, i))
            ofp.write(line + "\n")

to_csv('train.csv', new_final[:950])
to_csv('test.csv', new_final[950:])

