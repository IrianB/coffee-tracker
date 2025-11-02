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
        const coffee = await Coffee.find({})
        res.status(200).json(coffee)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}