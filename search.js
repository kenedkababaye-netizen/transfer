document.addEventListener('DOMContentLoaded', () => {
    const resultsList = document.getElementById('results-list');
    const searchTitle = document.getElementById('search-title');
    const searchSubtitle = document.getElementById('search-subtitle');

    if (resultsList) {
        const params = new URLSearchParams(window.location.search);
        const from = params.get('from');
        const to = params.get('to');
        const date = params.get('date');

        if (from && to) {
            searchTitle.textContent = `Buses for ${date}`;
            searchSubtitle.textContent = `From ${from} to ${to}`;
            
            // Simulate fetching data with a delay for realism
            setTimeout(() => {
                const mockBuses = [
                    { name: 'Kilimanjaro Express', type: 'Luxury Sleeper', time: '08:30 AM', price: '45,000', seats: 12, img: 'assets/img/bus_ext.png', rating: 4.9 },
                    { name: 'Dar Lux Premium', type: 'Standard A/C', time: '10:00 AM', price: '35,000', seats: 8, img: 'assets/img/standard.png', rating: 4.7 },
                    { name: 'Buffalo Luxury', type: 'Super Luxury', time: '02:00 PM', price: '60,000', seats: 4, img: 'assets/img/interior.png', rating: 5.0 },
                    { name: 'Tanzania Night Rider', type: 'Luxury Sleeper', time: '09:00 PM', price: '50,000', seats: 15, img: 'assets/img/sleeper.png', rating: 4.6 }
                ];

                resultsList.innerHTML = '';

                mockBuses.forEach(bus => {
                    const card = `
                        <div class="bus-card fade-in">
                            <div class="bus-img-container">
                                <img src="${bus.img}" alt="${bus.name}" onerror="this.src='https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069';">
                            </div>
                            <div class="bus-info">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <h3 style="margin: 0;">${bus.name}</h3>
                                    <span style="font-size: 0.85rem; color: #ffd700;"><i class="fa-solid fa-star"></i> ${bus.rating}</span>
                                </div>
                                <p style="color: var(--text-muted); font-size: 0.9rem;">${bus.type}</p>
                                <div style="display: flex; gap: 0.8rem; margin-top: 1rem; color: var(--text-muted); font-size: 0.8rem;">
                                    <span><i class="fa-solid fa-wifi"></i> WiFi</span>
                                    <span><i class="fa-solid fa-plug"></i> USB</span>
                                    <span><i class="fa-solid fa-bottle-water"></i> Water</span>
                                </div>
                            </div>
                            <div class="bus-time">
                                <div class="time">${bus.time}</div>
                                <div class="route" style="font-size: 0.75rem; margin-top: 5px;">
                                    ${from} <i class="fa-solid fa-arrow-right-long" style="transform: scale(0.8); margin: 0 4px;"></i> ${to}
                                </div>
                            </div>
                            <div class="bus-price">
                                <div class="amount" style="font-size: 1.2rem; color: #fff;">TSH ${bus.price}</div>
                                <div class="seats" style="font-size: 0.75rem; color: var(--accent); margin: 5px 0 15px;">Only ${bus.seats} seats left!</div>
                                <a href="book.html?bus=${encodeURIComponent(bus.name)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&price=${bus.price}&time=${encodeURIComponent(bus.time)}" class="btn btn-primary" style="width: 100%; padding: 0.6rem; font-size: 0.9rem;">Select Seat</a>
                            </div>
                        </div>
                    `;
                    resultsList.innerHTML += card;
                });

                // Re-init scroll reveals for new elements
                const revealObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            revealObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                document.querySelectorAll('.bus-card').forEach(el => revealObserver.observe(el));

            }, 1000);
        } else {
            resultsList.innerHTML = `<div style="text-align: center; padding: 5rem;"><p>No search parameters provided. Please <a href="index.html" style="color: var(--primary);">search again</a>.</p></div>`;
        }
    }
});
