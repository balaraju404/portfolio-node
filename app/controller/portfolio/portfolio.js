const portfolioModel = require("../../model/portfolio/portfolio")

const getRequestParams = (req) => ({
 ...(req.query || {}),
 ...(req.body || {}),
 ...(req.params || {})
})

exports.create = async (req, res, next) => {
 try {
  const reqParams = getRequestParams(req)
  const result = await portfolioModel.create(reqParams)
  res.status(SUCCESS_CODE).json({ status: true, msg: "Portfolio created successfully", id: result["insertedId"] })
 } catch (error) {
  next(error)
 }
}

exports.list = async (req, res, next) => {
 try {
  const reqParams = getRequestParams(req)
  const result = await portfolioModel.list(reqParams)
  res.status(SUCCESS_CODE).json({ status: true, data: result })
 } catch (error) {
  next(error)
 }
}

exports.details = async (req, res, next) => {
 try {
  const reqParams = getRequestParams(req)
  const result = await portfolioModel.details(reqParams)
  res.status(SUCCESS_CODE).json({ status: true, data: result })
 } catch (error) {
  next(error)
 }
}

exports.update = async (req, res, next) => {
 try {
  const reqParams = getRequestParams(req)
  const result = await portfolioModel.update(reqParams)
  res.status(SUCCESS_CODE).json({ status: true, msg: "Portfolio updated successfully", data: result })
 } catch (error) {
  next(error)
 }
}

exports.remove = async (req, res, next) => {
 try {
  const reqParams = getRequestParams(req)
  const result = await portfolioModel.remove(reqParams)
  res.status(SUCCESS_CODE).json({ status: true, msg: "Portfolio deleted successfully", data: result })
 } catch (error) {
  next(error)
 }
}