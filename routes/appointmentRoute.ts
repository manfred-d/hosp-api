const {
    appointmentDetails,
    eachHospitalAppointment,
    eachAppointmentDetails,
    approveAppointment,
    rejectAppointment,
    getApprovedAppointment,
    userIndividualAppointment,
    followUpAppointment,
    medicineDetails,
} = require('../controllers/appointmentController');

router.post('/:id/appointment/setAppointment', appointmentDetails);
router.get('/:id/appointment/hospitallappointment', eachHospitalAppointment);
router.get('/:id/appointment/oneappointment', eachAppointmentDetails);
router.put('/:id/approve', approveAppointment);
router.put('/:id/reject', rejectAppointment);
router.get('/:id/appointment/approved', getApprovedAppointment); //"id:/approvedList"
router.post('/:id/appointment/followup', followUpAppointment);
router.post('/:id/appointment/medicine', medicineDetails);
router.get('/:id/myAppointments', userIndividualAppointment);


module.exports = router;
