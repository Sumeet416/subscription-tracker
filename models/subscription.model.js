import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minLength: [2, 'Subscription name must be at least 2 characters long'],
    maxLength: [100, 'Subscription name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Subscription price is required'],
    min: [0, 'Subscription price must be positive']
  }, 
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD'],
    default: 'INR'
  },
  frequency: {
    type: String,
    enum: ['daily', 'monthly', 'yearly'],
  },
  category: {
    type: String,
    enum: ['Entertainment', 'Utilities', 'Food', 'Health', 'Education', 'Other'],
    required: [true, 'Subscription category is required'],
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Debit Card', 'UPI', 'Bank Transfer', 'Other'],
    required: [true, 'Payment method is required'],
    trim: true
  },
  status:{
    type: String,
    enum: ['active', 'inactive', 'cancelled', 'expired'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value <= new Date(),  
      message: 'Start date must be in the past or today'
    }
  },
  renewalDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'Renewal date must be after the start date'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
}, {timestamps: true});

subscriptionSchema.pre('save', function(next) {
  if(!this.renewalDate){
    const renewalPeriod = {
      daily: 1,
      monthly: 30,
      yearly: 365
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
  }
  if(this.renewalDate < new Date()){
    this.status = 'expired';
  }

  next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
