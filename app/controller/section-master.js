const sectionMasterModel = require("../model/section-master")

const getRequestParams = (req) => ({
 ...req.query,
 ...req.body,
 ...req.params
})

exports.create = async (req, res, next) => {
 try {
  const result = await sectionMasterModel.create(getRequestParams(req))
  res.status(SUCCESS_CODE).json({ status: true, message: "Section created successfully", id: result.insertedId })
 } catch (error) {
  next(error)
 }
}

exports.update = async (req, res, next) => {
 try {
  const result = await sectionMasterModel.update(getRequestParams(req))
  res.status(SUCCESS_CODE).json({ status: true, message: "Section updated successfully", data: result })
 } catch (error) {
  next(error)
 }
}

exports.list = async (req, res, next) => {
 try {
  const result = await sectionMasterModel.list(getRequestParams(req))
  res.status(SUCCESS_CODE).json({ status: true, data: result })
 } catch (error) {
  next(error)
 }
}

exports.details = async (req, res, next) => {
 try {
  const result = await sectionMasterModel.details(getRequestParams(req))
  res.status(SUCCESS_CODE).json({ status: true, data: result })
 } catch (error) {
  next(error)
 }
}

exports.remove = async (req, res, next) => {
 try {
  const result = await sectionMasterModel.remove(getRequestParams(req))
  res.status(SUCCESS_CODE).json({ status: true, message: "Section removed", data: result })
 } catch (error) {
  next(error)
 }
}