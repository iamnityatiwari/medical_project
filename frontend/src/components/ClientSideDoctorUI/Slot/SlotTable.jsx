import React, { useState } from "react";

// Function to generate slots considering break time
const generateSlots = (start, end, interval, breakStart, breakEnd) => {
  const slots = [];
  let [sh, sm] = start.split(":").map(Number);
  let [eh, em] = end.split(":").map(Number);
  let [bh, bm] = breakStart.split(":").map(Number);
  let [be, beMin] = breakEnd.split(":").map(Number);

  const toMinutes = (h, m) => h * 60 + m;

  let current = toMinutes(sh, sm);
  const endMin = toMinutes(eh, em);
  const breakStartMin = toMinutes(bh, bm);
  const breakEndMin = toMinutes(be, beMin);

  while (current + interval <= endMin) {
    // Skip slots during the break period
    if (current >= breakStartMin && current < breakEndMin) {
      current = breakEndMin; // Skip to the end of break
    }

    const fromH = Math.floor(current / 60);
    const fromM = current % 60;

    const toH = Math.floor((current + interval) / 60);
    const toM = (current + interval) % 60;

    slots.push(
      `[${fromH}.${fromM.toString().padStart(2, "0")} - ${toH}.${toM
        .toString()
        .padStart(2, "0")}]`
    );

    current += interval;
  }

  return slots;
};

const SlotTable = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Static data for start time, end time, interval, and break time
  const startTime = "4:00";
  const endTime = "11:00";
  const interval = 20;
  const breakStart = "7:00"; // Example break start time
  const breakEnd = "7:40";  // Example break end time

  const slots = generateSlots(startTime, endTime, interval, breakStart, breakEnd); // Generate slots considering break

  const handleSlotClick = (slot) => {
    console.log("Slot clicked:", slot);
    console.log("Selected date:", selectedDate);
    const newSelectedSlots = [...selectedSlots];
    const slotIndex = newSelectedSlots.findIndex((item) => item.slot === slot && item.date === selectedDate);

    if (slotIndex === -1) {
      // If slot is not already selected, add to the list
      newSelectedSlots.push({ date: selectedDate, slot: slot, time: slot, selected: true });
    } else {
      // If the slot is already selected, remove it
      newSelectedSlots.splice(slotIndex, 1);
    }

    setSelectedSlots(newSelectedSlots);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4 text-red-600">Select a Date</h1>
      <input
        type="date"
        className="border p-2 rounded mb-4"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {selectedDate && (
        <div className="bg-white p-4 border rounded shadow">
          <h2 className="font-medium mb-2 text-gray-700">
            Time Slots for {selectedDate}
          </h2>
          <table className="w-full table-fixed border border-collapse border-gray-300">
            <tbody>
              {Array.from({ length: Math.ceil(slots.length / 4) }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {slots
                    .slice(rowIndex * 4, rowIndex * 4 + 4)
                    .map((slot, index) => (
                      <td
                        key={index}
                        className={`border p-2 text-center cursor-pointer ${
                          selectedSlots.some((item) => item.slot === slot && item.date === selectedDate)
                            ? "bg-green-500 text-white"
                            : ""
                        }`}
                        onClick={() => handleSlotClick(slot)}
                      >
                        {slot}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SlotTable;
