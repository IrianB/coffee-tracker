import Coffee from '../models/CoffeeModel.js'

export const addCoffee = async (req, res) => {
  try {
    const { coffeeName, coffeeShopName, price, size } = req.body
    if (!coffeeName || !coffeeShopName || !price || !size) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalize = (str) => str.trim().replace(/\s+/g, ' ').toLowerCase();

    const existingCoffee = await Coffee.findOne({
      coffeeName: normalize(coffeeName),
      coffeeShopName: normalize(coffeeShopName),
      size: normalize(size),
      price: price
    });

    if (existingCoffee) return res.status(400).json({ message: "Coffee already existed" })

    const newCoffee = new Coffee({ coffeeName, coffeeShopName, price, size, user: req.user.id })
    await newCoffee.save()
    res.status(200).json(newCoffee)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getAllCoffee = async (req, res) => {
  try {
    const coffee = await Coffee.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.status(200).json(coffee)
  } catch (error) {
    res.status(400).json({ message: error.message })
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

export const updateCoffee = async (req, res) => {
  const { id } = req.params
  const { coffeeName, coffeeShopName, size, price } = req.body
  try {
    const response = await Coffee.findByIdAndUpdate(id, {
      coffeeName,
      coffeeShopName,
      size,
      price,
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}
