import Entry from "../models/EntriesModel.js";
import Coffee from "../models/CoffeeModel.js";


export const createEntry = async (req, res) => {
    try {
        const { coffeeId } = req.body;
        const userId = req.user.id;

        const coffee = await Coffee.findById(coffeeId);
        if (!coffee) {
            return res.status(404).json({ message: "Coffee not found" });
        }

        const newEntry = new Entry({ userId, coffeeId });
        await newEntry.save();

        res.status(201).json({ message: "Entry created successfully", newEntry });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getTodayEntries = async (req, res) => {
    try {
        const userId = req.user.id;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const entries = await Entry.find({
            userId,
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        })
            .populate("userId")
            .populate("coffeeId")
            .sort({ createdAt: -1 });

        res.status(200).json(entries);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteEntryCoffee = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Entry coffee does not exist" });

    try {
        await Entry.findByIdAndDelete(id);
        res.status(200).json({ message: "Entry coffee deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAnalytics = async (req, res) => {
    const userId = req.user.id;

    try {
        const { startDate, endDate } = req.query;

        const today = new Date();
        const start = startDate
            ? new Date(`${startDate}T00:00:00`)
            : new Date(today);
        const end = endDate
            ? new Date(`${endDate}T23:59:59`)
            : new Date(today);

        const entries = await Entry.find({
            userId,
            createdAt: { $gte: start, $lte: end },
        }).populate({ path: "coffeeId", select: "-createdAt -updatedAt" });

        const totalCoffees = entries.length;
        const totalPrice = entries.reduce(
            (sum, entry) => sum + (entry.coffeeId?.price || 0),
            0
        );

        const coffeeCount = {};
        entries.forEach((entry) => {
            const name = entry.coffeeId?.coffeeName;
            if (name) {
                coffeeCount[name] = (coffeeCount[name] || 0) + 1;
            }
        });

        let mostCoffeeUsed = null;
        if (Object.keys(coffeeCount).length > 0) {
            const maxCount = Math.max(...Object.values(coffeeCount));
            const mostUsed = Object.keys(coffeeCount).find(
                (name) => coffeeCount[name] === maxCount
            );
            mostCoffeeUsed = { name: mostUsed, count: maxCount };
        }

        const dailyMap = {};
        entries.forEach((entry) => {
            const date = entry.createdAt.toISOString().split("T")[0];
            if (!dailyMap[date]) dailyMap[date] = 0;
            dailyMap[date] += entry.coffeeId?.price || 0;
        });

        const daily = Object.keys(dailyMap)
            .sort()
            .map((date) => ({ date, totalSpent: dailyMap[date] }));

        res.status(200).json({ totalPrice, totalCoffees, daily, mostCoffeeUsed });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};






