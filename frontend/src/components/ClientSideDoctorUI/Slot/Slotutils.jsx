export const generateSlots = (start, end, interval, breakStart, breakEnd) => {
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
      if (current >= breakStartMin && current < breakEndMin) {
        current = breakEndMin;
      }
  
      const fromH = Math.floor(current / 60);
      const fromM = current % 60+1;
  
      const toH = Math.floor((current + interval) / 60);
      const toM = (current + interval) % 60;
  
      slots.push(
        `${fromH}:${fromM.toString().padStart(2, "0")} - ${toH}:${toM
          .toString()
          .padStart(2, "0")}`
      );
  
      current += interval;
    }
  
    return slots;
  };