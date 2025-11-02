import Coffee from '../models/CoffeeModel.js'

export const addCoffee = async (req, res) => {
  try {
    const { coffeeName, coffeeShopName, price, size } = req.body
    if (!coffeeName || !coffeeShopName || !price || !size) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newCoffee = new Coffee({ coffeeName, coffeeShopName, price, size })
    await newCoffee.save()
    res.status(200).json({ message: 'Coffee added successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getAllCoffee = async (req, res) => {
  try {
    const coffee = await Coffee.find({}).sort({ createdAt: -1 })
    res.status(200).json(coffee)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getAnalytics = async (req, res) => {
  try {
    // Get total coffee count
    const totalCoffees = await Coffee.countDocuments();

    // Get total money spent
    const totalSpentAgg = await Coffee.aggregate([
      {
        $group: {
          _id: null,
          totalSpent: { $sum: "$price" },
        },
      },
    ]);
    const totalSpent = totalSpentAgg[0]?.totalSpent || 0;

    // Get most frequently used coffee
    const mostUsedCoffeeAgg = await Coffee.aggregate([
      {
        $group: {
          _id: "$coffeeName",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const mostUsedCoffee = mostUsedCoffeeAgg[0]?._id || "N/A";
    const mostUsedCoffeeCount = mostUsedCoffeeAgg[0]?.count || 0;

    // Optionally: get most visited coffee shop
    const topShopAgg = await Coffee.aggregate([
      {
        $group: {
          _id: "$coffeeShopName",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const mostVisitedShop = topShopAgg[0]?._id || "N/A";
    const mostVisitedShopCount = topShopAgg[0]?.count || 0;

    // Send the response
    res.status(200).json({
      totalCoffees,
      totalSpent,
      mostUsedCoffee,
      mostUsedCoffeeCount,
      mostVisitedShop,
      mostVisitedShopCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
}

export const deleteCoffee = async (req, res) => {
  try {
    const { id } = req.params;
    const coffee = await Coffee.findById(id)

    if (!coffee) {
      return res.status(404).json({ message: 'Coffee not found' })
    }

    await Coffee.findByIdAndDelete(id);
    res.status(200).json({ message: 'Coffee deleted successfully' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' })
  }
}
