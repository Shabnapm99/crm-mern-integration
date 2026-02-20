import CustomerModel from "../models/CustomerModel.js";


//create a customer

export const createCustomer = async (req, res) => {
    try {
        const customer = req.body;

        const newCustomer = await CustomerModel.create(customer);

        res.status(201).json({
            message: "Customer created successfully",
            customer:newCustomer
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

        const customers = await CustomerModel.find({}).select('-__v');
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
        const customer = await CustomerModel.findById(req.params.id);
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

        const customer = await CustomerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

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
        await CustomerModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Customer deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }

};
