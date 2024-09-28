const appointmentController = require('./appointmentController');

const appointmentRoutes = [];

appointmentRoutes.push(
    {
        method: 'POST',
        path: '/appointments/book',
        handler: appointmentController.bookAppointmentHandler
    },
    {
        method: 'GET',
        path: '/appointments/view',
        handler:  appointmentController.viewAppointmentHandler
    },
    {
        method: 'GET',
        path: '/appointments/doctor/{doctorName}',
        handler:  appointmentController.viewAppointmentsByDoctorHandler
    },
    {
        method: 'DELETE',
        path: '/appointments/cancel',
        handler:  appointmentController.cancelAppointmentHandler
    },
    {
        method: 'PUT',
        path: '/appointments/modify',
        handler:  appointmentController.modifyAppointmentHandler
    }
)

module.exports = appointmentRoutes;