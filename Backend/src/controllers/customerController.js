import CustomerModel from "../models/CustomerModel.js";


//create a customer

export const createCustomer = async (req, res) => {
    try {
        const customer = req.body;
        // Associate the customer with the logged-in user
        customer.createdBy = req.user._id;

        const newCustomer = await CustomerModel.create(customer);

        res.status(201).json({
            message: "Customer created successfully",
            customer: newCustomer
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }
}

//get customers

export const getCustomers = async (req, res) => {
    try {

        const customers = await CustomerModel.find({ createdBy: req.user._id }).select('-__v');// Only fetch customers created by this user
        res.json({ customers });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }

};

//get a customer

export const getACustomer = async (req, res) => {
    try {
        const customer = await CustomerModel.findById({ _id: req.params.id, createdBy: req.user._id });
        res.status(200).json({ customer })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }

}
//update a customer

export const updateCustomer = async (req, res) => {
    try {

        const customer = await CustomerModel.findByIdAndUpdate({ _id: req.params.id, createdBy: req.user._id }, req.body, { new: true });//ensure the task belong to the loggedin user

        res.json({ updated: customer });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }
};

//delete a customer

export const deleteCustomer = async (req, res) => {
    try {
        await CustomerModel.findByIdAndDelete({ _id: req.params.id, createdBy: req.user._id });//ensure the customer belong to the loggedin user
        res.json({ message: "Customer deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while deleting data",
            error: error.message
        })
    }

};
