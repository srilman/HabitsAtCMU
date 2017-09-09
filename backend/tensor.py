import tensorflow as tf
import shutil
import tensorflow.contrib.learn as tflearn
import tensorflow.contrib.layers as tflayers
from tensorflow.contrib.learn.python.learn import learn_runner
import tensorflow.contrib.metrics as metrics
import tensorflow.contrib.rnn as rnn

DEFAULTS = [[0.0] for x in range(0, 12)]
BATCH_SIZE = 20
TIMESERIES_COL = 'rawdata'
N_OUTPUTS = 2  # in each sequence, 1-8 are features, and 9-10 is label
N_INPUTS = 12 - N_OUTPUTS

# read data and convert to needed format
def read_dataset(filename, mode=tf.contrib.learn.ModeKeys.TRAIN):  
    def _input_fn():
        num_epochs = 100 if mode == tf.contrib.learn.ModeKeys.TRAIN else 1
        input_file_names = tf.train.match_filenames_once(filename)
        
        filename_queue = tf.train.string_input_producer(
            input_file_names, num_epochs=num_epochs, shuffle=True)
        reader = tf.TextLineReader()
        _, value = reader.read_up_to(filename_queue, num_records=BATCH_SIZE)

        value_column = tf.expand_dims(value, -1)
        print('readcsv={}'.format(value_column))
        
        all_data = tf.decode_csv(value_column, record_defaults=DEFAULTS)  
        inputs = all_data[:len(all_data)-N_OUTPUTS]  # first few values
        label = all_data[len(all_data)-N_OUTPUTS : ] # last few values
        
        inputs = tf.concat(inputs, axis=1)
        label = tf.concat(label, axis=1)
        print('inputs={}'.format(inputs))
        
        return {TIMESERIES_COL: inputs}, label   # dict of features, label
    return _input_fn

LSTM_SIZE = 3  # number of hidden layers in each of the LSTM cells

def simple_rnn(features, targets, mode):
    x = tf.split(features[TIMESERIES_COL], N_INPUTS, 1)
        
    lstm_cell = rnn.BasicLSTMCell(LSTM_SIZE, forget_bias=1.0)
    outputs, _ = rnn.static_rnn(lstm_cell, x, dtype=tf.float32)
    outputs = outputs[-1]
    
    weight = tf.Variable(tf.random_normal([LSTM_SIZE, N_OUTPUTS]))
    bias = tf.Variable(tf.random_normal([N_OUTPUTS]))
    predictions = tf.matmul(outputs, weight) + bias
        
    if mode == tf.contrib.learn.ModeKeys.TRAIN or mode == tf.contrib.learn.ModeKeys.EVAL:
        loss = tf.losses.mean_squared_error(targets, predictions)
        train_op = tf.contrib.layers.optimize_loss(
            loss=loss,
            global_step=tf.contrib.framework.get_global_step(),
            learning_rate=0.01,
            optimizer="SGD")
        eval_metric_ops = {
        "rmse": tf.metrics.root_mean_squared_error(targets, predictions)
        }
    else:
        loss = None
        train_op = None
        eval_metric_ops = None
  
    predictions_dict = {"predicted": predictions}
    return tflearn.ModelFnOps(
        mode=mode,
        predictions=predictions_dict,
        loss=loss,
        train_op=train_op,
        eval_metric_ops=eval_metric_ops
    )

def get_train():
    return read_dataset('train.csv', mode=tf.contrib.learn.ModeKeys.TRAIN)

def get_valid():
    return read_dataset('test.csv', mode=tf.contrib.learn.ModeKeys.EVAL)

def serving_input_fn():
    feature_placeholders = {
        TIMESERIES_COL: tf.placeholder(tf.float32, [None, N_INPUTS])
    }
  
    features = {
        key: tf.expand_dims(tensor, -1)
        for key, tensor in feature_placeholders.items()
    }
    features[TIMESERIES_COL] = tf.squeeze(features[TIMESERIES_COL], axis=[2])
    
    print('serving: features={}'.format(features[TIMESERIES_COL]))
    
    return tflearn.utils.input_fn_utils.InputFnOps(
        features,
        None,
        feature_placeholders
    )

from tensorflow.contrib.learn.python.learn.utils import saved_model_export_utils
def experiment_fn(output_dir):
    return tflearn.Experiment(
        tflearn.Estimator(model_fn=simple_rnn, model_dir=output_dir),
        train_input_fn=get_train(),
        eval_input_fn=get_valid(),
        eval_metrics={
            'rmse': tflearn.MetricSpec(
                metric_fn=metrics.streaming_root_mean_squared_error
            )
        },
        export_strategies=[saved_model_export_utils.make_export_strategy(
            serving_input_fn,
            default_output_alternative_key=None,
            exports_to_keep=1
        )]
    )

shutil.rmtree('outputdir', ignore_errors=True) # start fresh each time
learn_runner.run(experiment_fn, 'outputdir')