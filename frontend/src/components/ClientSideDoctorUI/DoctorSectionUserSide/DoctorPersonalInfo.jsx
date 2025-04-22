import React from 'react'

export const DoctorPersonalInfo = ({doctor}) => {
  return (
    <div className="space-y-2 mb-6">
        <p className="text-gray-800">
        📞 <span className="font-medium">Phone:</span> {doctor.phone}
        </p>
        <p className="text-gray-800">
        📧 <span className="font-medium">Email:</span> {doctor.email}
        </p>
        <p className="text-gray-800">
        🎓 <span className="font-medium">Education:</span> {doctor.education}
        </p>
        <p className="text-gray-800">
        🧑‍⚕️ <span className="font-medium">Experience:</span> {doctor.experience}
        </p>
        <p className="text-gray-800">
        🏥 <span className="font-medium">Clinic:</span> {doctor.clinic}
        </p>
        <p className="text-gray-800">
        📍 <span className="font-medium">Location:</span> {doctor.location}
        </p>
    </div>
  )
}
