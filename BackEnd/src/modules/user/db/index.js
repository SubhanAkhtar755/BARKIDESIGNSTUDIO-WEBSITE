import Model from "../models/index.js";

const getData = async (id) => {
  if (!id) return null;
  return await Model.findById(id).select("-password");
};

const PostData = async (Data) => new Model(Data).save().then((user) => user.toObject());

const deleteData = async (id) => await Model.findByIdAndDelete(id);

const updateData = async (id, data) => await Model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select("-password");

export {
  getData,
  PostData,
  deleteData,
  updateData
};
