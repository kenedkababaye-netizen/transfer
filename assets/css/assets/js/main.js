document.addEventListener('DOMContentLoaded', () => {
    const seatContainer = document.getElementById('seat-container');
    const selectedDisplay = document.getElementById('selected-seat-num');
    const bookingForm = document.getElementById('booking-form');

    if (seatContainer) {
        const params = new URLSearchParams(window.location.search);
        const busName = params.get('bus');
        const from = params.get('from');
        const to = params.get('to');
        const date = params.get('date');
        const price = params.get('price');
        const time = params.get('time');

        let selectedSeat = null;

        // Display search info in booking page if possible
        const pageTitle = document.querySelector('h2');
        if (pageTitle && busName) {
            pageTitle.innerHTML = `${busName} <br><span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 400;">From ${from} to ${to} | ${date} · ${time} | TSH ${price}</span>`;
        }

        // Generate 40 seats (10 rows of 4)
        for (let i = 1; i <= 40; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.textContent = i;
            
            // Randomly mark some seats as booked
            if (Math.random() < 0.2) seat.classList.add('unavailable');
            
            seat.onclick = () => {
                if (seat.classList.contains('unavailable')) {
                    window.showToast('This seat is already booked.', 'error');
                    return;
                }
                
                if (selectedSeat) {
                    selectedSeat.classList.remove('selected');
                }
                
                if (selectedSeat === seat) {
                    selectedSeat = null;
                    selectedDisplay.textContent = 'None';
                } else {
                    seat.classList.add('selected');
                    selectedSeat = seat;
                    selectedDisplay.textContent = i;
                }
            };
            
            seatContainer.appendChild(seat);
            
            // Add aisle after every 2 seats
            if (i % 2 === 0 && i % 4 !== 0) {
                const aisle = document.createElement('div');
                aisle.className = 'aisle';
                seatContainer.appendChild(aisle);
            }
        }

        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!selectedSeat) {
                    window.showToast('Please select a seat before proceeding!', 'error');
                    return;
                }
                
                const name = document.getElementById('pass-name')?.value || 'Guest';
                const phone = document.getElementById('pass-phone')?.value;
                const idNum = document.getElementById('pass-id')?.value;
                const seatNo = selectedSeat.textContent;

                const bookingData = {
                    bus: busName,
                    from,
                    to,
                    date,
                    time,
                    price,
                    seat: seatNo,
                    passenger: name,
                    phone: phone,
                    id: idNum
                };

                localStorage.setItem('current_booking', JSON.stringify(bookingData));
                
                window.showToast('Booking details saved! Redirecting to payment...');
                setTimeout(() => {
                    const payParams = new URLSearchParams({
                        name: name,
                        seat: seatNo,
                        price: price,
                        bus: busName
                    }).toString();
                    window.location.href = `payment.html?${payParams}`;
                }, 1500);
            });
        }
    }
});
