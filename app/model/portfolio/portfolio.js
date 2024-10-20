const { getDb } = require('../../db-conn/db-conn');

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
  return { status: false, msg: error.message || 'An error occurred' }; // Consistent error handling
 }
};

exports.details = async (reqParams) => {
 try {
  const userId = reqParams.user_id || '';
  const portfolio_name = reqParams['portfolio_name'] || ''
  const portfolio_id = reqParams['portfolio_id'] || ''


  const query = {};

  if (userId) {
   query.user_id = userId; // Directly assign userId if it exists
  }

  if (portfolio_name) {
   query.portfolio_name = portfolio_name; // Directly assign portfolio_name if it exists
  }

  if (portfolio_id) {
   query._id = portfolio_id; // Directly assign portfolio_id if it exists
  }

  const db = getDb();
  const collection = db.collection(TBL_PORTFOLIOS);
  const result = await collection.find(query).sort({ login_name: 1 }).toArray();

  result.forEach(e => {
   e.portfolio_id = e._id; // Consider using a different field name to avoid confusion with the original
  });

  return { status: true, data: result };
 } catch (error) {
  return { status: false, msg: error.message || 'An error occurred' }; // Consistent error handling
 }
};

async function checkName(portfolio_name) {
 const db = getDb();
 const collection = db.collection(TBL_PORTFOLIOS);
 const user = await collection.findOne({ portfolio_name });
 return user !== null;
}
