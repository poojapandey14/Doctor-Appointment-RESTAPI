const Lab = require("lab");
const { expect } = require("code");
const { init } = require("../index");
const { beforeEach, describe, it } = (exports.lab = Lab.script());

describe("Doctor Appointment Booking", () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  it("should book an appointment", async () => {
    const requestPayload = {
      firstName: "Alice",
      lastName: "Wonderland",
      email: "alice@example.com",
      timeSlot: "2:00 AM - 3:00 PM",
      doctorName: "Dr. Smith",
    };

    const res = await server.inject({
      method: "POST",
      url: "/appointments/book",
      payload: requestPayload,
    });

    expect(res.result).to.include({
      message: "Appointment booked successfully",
      appointmentDetails: {
        firstName: "Alice",
        lastName: "Wonderland",
        email: "alice@example.com",
        timeSlot: "2:00 AM - 3:00 PM",
        doctorName: "Dr. Smith",
      },
    });
  });

  it("should throw error when trying to book a taken time slot", async () => {
    const requestPayload = {
      firstName: "Bob",
      lastName: "Builder",
      email: "bob@example.com",
      timeSlot: "2:00 AM - 3:00 PM",
      doctorName: "Dr. Smith",
    };

    const res = await server.inject({
      method: "POST",
      url: "/appointments/book",
      payload: requestPayload,
    });

    expect(res.result.error).to.equal("This time slot is already booked");
  });

  it("should throw an error when the email is missing", async () => {
    const requestPayload = {
      firstName: "Alice",
      lastName: "Wonderland",
      timeSlot: "2:00 AM - 3:00 PM",
      doctorName: "Dr. Smith",
    };

    const res = await server.inject({
      method: "POST",
      url: "/appointments/book",
      payload: requestPayload,
    });

    expect(res.result.error).to.equal("Email is required");
  });

  it("should cancel an appointment", async () => {
    const requestPayload = {
      email: "john@example.com",
      timeSlot: "10:00 AM - 11:00 AM",
    };

    const res = await server.inject({
      method: "DELETE",
      url: "/appointments/cancel",
      payload: requestPayload,
    });

    expect(res.result.message).to.equal("Appointment cancelled successfully");
  });
});
