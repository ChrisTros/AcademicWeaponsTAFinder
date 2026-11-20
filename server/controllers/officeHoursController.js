const { getAllOfficeHours } = require('../services/officeHoursService');

// Handles GET request for TA office-hours
const getOfficeHours = async (req, res) => {
    try {
        // Gets office-hours
        const officeHours = await getAllOfficeHours();

        //Return office-hours, JSON success status
        res.status(200).json(officeHours);

    } catch (error) {
        //log errors
        console.error(error);

        // Return error
        res.status(500).json({
            message: 'Failed to retrieve office hours'
        });
    }
};

//Export to routes
module.exports = { getOfficeHours };