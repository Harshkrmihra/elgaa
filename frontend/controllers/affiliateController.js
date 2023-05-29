const User = require('../models/User');
const Order = require('../models/Order');

// Generate Affiliate Link
exports.generateAffiliateLink = async (req, res) => {
    try {
      const { user } = req;
  
      // Generate a unique affiliate code for the user
      const affiliateCode = await generateUniqueAffiliateCode(); // Add await here
  
      // Update the user's affiliate code in the database
      user.affiliateCode = affiliateCode.toString(); // Convert to string explicitly
      await user.save();
  
      res.json({
        success: true,
        data: {
          affiliateCode
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };

// Get Affiliate Dashboard
exports.getAffiliateDashboard = async (req, res) => {
  try {
    const { user } = req;

    // Retrieve all the orders associated with the user's affiliate code
    const orders = await Order.find({ affiliateCode: user.affiliateCode });

    // Calculate the total earnings from the orders
    const totalEarnings = orders.reduce((sum, order) => sum + order.commission, 0);

    // Construct the affiliate dashboard data
    const dashboardData = {
      totalOrders: orders.length,
      totalEarnings,
      orders
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Helper function to generate a unique affiliate code
async function generateUniqueAffiliateCode() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 10;
    let code = '';
  
    while (true) {
      for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
  
      // Check if the generated code already exists in the database
      const existingUser = await User.findOne({ affiliateCode: code });
  
      if (!existingUser) {
        // No user with the same affiliate code exists, so the code is unique
        break;
      }
  
      // Reset the code and generate a new one
      code = '';
    }
  
    return code;
  }  