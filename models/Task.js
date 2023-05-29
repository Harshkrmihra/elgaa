const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description: { // Description of the task
    type: String,
    required: true,
  },
  status: { // Status of the task
    type: String,
    enum: ['Peneding', 'In Progress', 'Finished', 'Confirmed'],
    default: 'Pending',
  },
  coach: { // Coach who created the task
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
    required: true,
  },
  customer: { // Customer who the task is assigned to
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  order: { // Order associated with the task (optional)
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Order',
  },
  day: { // Day the task is to be done
    type: String,
    required: true,
  },
  date: { // Date the task is to be done
    type: String,
    required: true,
  },
  time: { // Time the task is to be done
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Task', TaskSchema);
