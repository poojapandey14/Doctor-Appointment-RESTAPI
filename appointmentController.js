const appointments = [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "timeSlot": "10:00 AM - 11:00 AM",
      "doctorName": "Dr. Smith"
    },
    {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "timeSlot": "11:00 AM - 12:00 PM",
      "doctorName": "Smith"
    },
    {
      "firstName": "Mark",
      "lastName": "Spencer",
      "email": "mark@example.com",
      "timeSlot": "9:00 AM - 10:00 AM",
      "doctorName": "Dr. Brown"
    }
  ];

const bookAppointmentHandler = (request, h) => {
  const { firstName, lastName, email, timeSlot, doctorName } = request.payload;

  if(!email){
    return h.response({ error: "Email is required" });
  }

  const existingAppointment = appointments.find(
    (appointment) =>
      appointment.doctorName === doctorName && appointment.timeSlot === timeSlot
  );

  if (existingAppointment) {
    return h.response({ error: "This time slot is already booked" });
  }

  const newAppointment = { firstName, lastName, email, timeSlot, doctorName };
  appointments.push(newAppointment);

  return h.response({
    message: "Appointment booked successfully",
    appointmentDetails: newAppointment,
  });
};

const viewAppointmentHandler = (request, h) => {
    const { email } = request.query;

    const appointment = appointments.find(appointment => appointment.email === email);
    if (!appointment) {
        return h.response({ error: 'Appointment not found' });
    }

    return h.response({
        appointmentDetails: appointment
    });
};

const viewAppointmentsByDoctorHandler = (request, h) => {
    const { doctorName } = request.params;

    const doctorAppointments = appointments.filter(appointment => appointment.doctorName === doctorName);
    if (doctorAppointments.length === 0) {
        return h.response({ error: 'No appointments found for this doctor' });
    }

    return h.response({
        appointments: doctorAppointments
    });
};

const cancelAppointmentHandler = (request, h) => {
    const { email, timeSlot } = request.payload;

    const index = appointments.findIndex(
        appointment => appointment.email === email && appointment.timeSlot === timeSlot
    );

    if (index === -1) {
        return h.response({ error: 'Appointment not found' });
    }

    appointments.splice(index, 1);

    return h.response({
        message: 'Appointment cancelled successfully'
    });
};


const modifyAppointmentHandler = (request, h) => {
    const { email, originalTimeSlot, newTimeSlot } = request.payload;

    const appointment = appointments.find(appointment => appointment.email === email && appointment.timeSlot === originalTimeSlot);
    if (!appointment) {
        return h.response({ error: 'Appointment not found.' });
    }

    const conflictingAppointment = appointments.find(appt => appt.doctorName === appointment.doctorName && appt.timeSlot === newTimeSlot);
    if (conflictingAppointment) {
        return h.response({ error: 'New time slot is already booked' });
    }

    appointment.timeSlot = newTimeSlot;

    return h.response({
        message: 'Appointment updated successfully',
        updatedAppointment: appointment
    });
};

module.exports = { bookAppointmentHandler, viewAppointmentHandler, viewAppointmentsByDoctorHandler, cancelAppointmentHandler, modifyAppointmentHandler };
