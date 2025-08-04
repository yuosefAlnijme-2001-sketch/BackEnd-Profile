const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      minlength: [3, "Too short name project"],
      unique: [true, "name unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
    UrlProject: {
      type: String,
      required: [true, "UrlProject required"],
    },
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/project/${doc.image}`;
    doc.image = imageUrl;
  }
};
ProjectSchema.post("init", function (doc) {
  setImageUrl(doc);
});
ProjectSchema.post("save", function (doc) {
  setImageUrl(doc);
});

const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel;
