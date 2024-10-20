const { getDb } = require('../../db-conn/db-conn');
const { ObjectId } = require('mongodb');

exports.create = async (reqParams) => {
 try {
  console.log(reqParams);

  const { portfolio_name } = reqParams;

  if (!portfolio_name) {
   return { status: false, msg: 'Portfolio name is required' };
  }

  const recExists = await checkName(portfolio_name);
  if (recExists) {
   return { status: false, msg: 'Portfolio name already exists' };
  }

  const insertRec = {
   ...reqParams,
   created_by: 'system',
   created_date: new Date(),
   modified_date: null,
   is_private: 0,
   status: 1
  };

  const db = getDb();
  const collection = db.collection(TBL_PORTFOLIOS);
  const result = await collection.insertOne(insertRec);

  return { status: true, msg: 'Portfolio Created Successfully', insertedId: result.insertedId };
 } catch (error) {
  return { status: false, msg: error.message || 'An error occurred' }; 
 }
};

exports.details = async (reqParams) => {
 try {
  const userId = reqParams.user_id || '';
  const portfolio_name = reqParams['portfolio_name'] || ''
  const portfolio_id = reqParams['portfolio_id'] || ''

  const query = {};
  if (userId) {
   query.user_id = userId;
  }
  if (portfolio_name) {
   query.portfolio_name = portfolio_name;
  }
  if (portfolio_id) {
   query._id = new ObjectId(portfolio_id);
  }

  const db = getDb();  
  const collection = db.collection(TBL_PORTFOLIOS);
  const result = await collection.find(query).sort({ portfolio_name: 1 }).toArray();

  result.forEach(e => {
   e.portfolio_id = e._id;
  });

  return { status: true, data: result };
 } catch (error) {
  return { status: false, msg: error.message || 'An error occurred' };
 }
};

async function checkName(portfolio_name) {
 const db = getDb();
 const collection = db.collection(TBL_PORTFOLIOS);
 const user = await collection.findOne({ portfolio_name });
 return user !== null;
}
