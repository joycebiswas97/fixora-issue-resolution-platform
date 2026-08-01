const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['Pothole', 'Garbage', 'Broken Streetlight', 'Water Leak', 'Other'],
            required: true
        },
        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Resolved'],
            default: 'Pending'
        },
        location: {
            // GeoJSON format required by MongoDB for spatial queries
            type: {
                type: String,
                enum: ['Point'],
                required: true,
                default: 'Point'
            },
            coordinates: {
                type: [Number], // Must be [longitude, latitude]
                required: true
            },
        },
        imageUrl: {
            type: String, // We will store the Cloudinary URL string here later
            required: false
        },
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Links this complaint to the User model
            required: true
        },
    },
    { timestamps: true }
);

// This index allows us to easily query "Find all complaints near me" later!
complaintSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Complaint', complaintSchema);