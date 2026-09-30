const portfolioModel = require("../../model/portfolio/portfolio")

const params = (req) => ({
 ...req.query,
 ...req.body,
 ...req.params
})

exports.create = async (req, res, next) => {
 try {
  const result = await portfolioModel.create(params(req))
  res.json({ status: true, message: "Portfolio created", id: result.insertedId })
 } catch (e) {
  next(e)
 }
}

exports.update = async (req, res, next) => {
 try {
  const result = await portfolioModel.update(params(req))
  res.json({ status: true, message: "Portfolio updated", data: result })
 } catch (e) {
  next(e)
 }
}

exports.list = async (req, res, next) => {
 try {
  const result = await portfolioModel.list(params(req))
  res.json({ status: true, data: result })
 } catch (e) {
  next(e)
 }
}

exports.details = async (req, res, next) => {
 try {
  const result = await portfolioModel.details(params(req))
  res.json({ status: true, data: result })
 } catch (e) {
  next(e)
 }
}

exports.publicDetails = async (req, res, next) => {
 try {
  const result = await portfolioModel.publicDetails(params(req))
  res.json({ status: true, data: result })
 } catch (e) {
  next(e)
 }
}

exports.publish = async (req, res, next) => {
 try {
  await portfolioModel.update({ portfolio_id: req.body.portfolio_id, published: true })
  res.json({ status: true, message: "Portfolio published" })
 } catch (e) {
  next(e)
 }
}

exports.remove = async (req, res, next) => {
 try {
  const result = await portfolioModel.remove(params(req))
  res.json({ status: true, data: result })
 } catch (e) {
  next(e)
 }
}