import React from 'react'

export const SlotBookingFrom = ({setActiveSlotForm, selectedDate, activeSlotForm, formData, handleInputChange, handleConfirmBooking}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
                <button
                    onClick={() => setActiveSlotForm(null)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
                >
                    ×
                </button>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Book Slot</h3>
                <input
                    type="text"
                    disabled
                    value={`${selectedDate} - ${activeSlotForm}`}
                    className="w-full mb-2 p-2 border border-gray-300 rounded text-gray-700 bg-gray-100"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Patient Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full mb-2 p-2 border rounded"
                />
                <button
                    onClick={handleConfirmBooking}
                    className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    )
}
