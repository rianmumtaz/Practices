const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Departure",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      price: {
        adult: {
          twin: {
            type: String,
            default: "Not available",
          },
          single: {
            type: String,
            default: "Not available",
          },
        },
        kids: {
          twin: {
            type: String,
            default: "Not available",
          },
          extra: {
            type: String,
            default: "Not available",
          },
          no_bed: {
            type: String,
            default: "Not available",
          },
        },
        other: {
          airport: {
            type: String,
            default: "Included",
          },
          visa: {
            type: String,
            default: "Not available",
          },
          ppn: {
            type: String,
            default: "Included",
          },
        },
        total: {
          type: String,
          required: true,
        },
      },
      itinerary: [
        {
          day: {
            type: Number,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          eat: {
            breakfast: {
              type: Boolean,
              default: false,
            },
            lunch: {
              type: Boolean,
              default: false,
            },
            dinner: {
              type: Boolean,
              default: false,
            },
          },
        },
      ],
      availability: {
        type: Number,
        required: true,
      },
      recommended: {
        type: Boolean,
        default: false,
      },
      destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
