// 1. Mock Database of Donors (In a real app, this comes from a server)
const donors = [
    { id: 1, name: "Arjun Mehta", bloodGroup: "O+", location: "Central Park", distance: 1.5 },
    { id: 2, name: "Sara Khan", bloodGroup: "A-", location: "West End", distance: 3.2 },
    { id: 3, name: "David Miller", bloodGroup: "O+", location: "Downtown", distance: 0.8 }
];

/**
 * Core function to find donors based on blood group and distance
 */
function searchDonors() {
    // Get values from your HTML form fields
    const selectedGroup = document.getElementById('bloodGroupInput').value;
    const maxDistance = parseFloat(document.getElementById('distanceRange').value);
    const resultsContainer = document.getElementById('donorResults');
    
    // Filter logic
    const matched = donors.filter(d => d.bloodGroup === selectedGroup && d.distance <= maxDistance);

    // Clear previous results
    resultsContainer.innerHTML = "";

    if (matched.length === 0) {
        // Display "No Donors Available"
        resultsContainer.innerHTML = `
            <div class="p-8 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <i class="fas fa-user-slash text-gray-300 text-4xl mb-3"></i>
                <p class="text-gray-500 font-medium">No donors available in this radius.</p>
            </div>`;
        showNotification("No matches found nearby.", "error");
    } else {
        // Show Matched Donors
        matched.forEach(donor => {
            resultsContainer.innerHTML += `
                <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center mb-4">
                    <div>
                        <h4 class="font-bold text-gray-800">${donor.name}</h4>
                        <p class="text-sm text-gray-500">${donor.distance} km away • ${donor.location}</p>
                    </div>
                    <button onclick="acceptRequest(this)" class="bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition">
                        Request Blood
                    </button>
                </div>`;
        });
        showNotification(`Found ${matched.length} donors!`, "success");
    }
}

/**
 * Changes request status to "Accepted" and notifies user
 */
function acceptRequest(button) {
    // Change button state immediately
    button.innerHTML = '<i class="fas fa-spinner animate-spin"></i> Contacting...';
    button.disabled = true;

    // Simulate donor responding after 2 seconds
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Accepted';
        button.className = "bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-bold cursor-default";
        
        // Update the global request status label if it exists
        const statusLabel = document.getElementById('requestStatus');
        if (statusLabel) {
            statusLabel.innerText = "Status: Accepted";
            statusLabel.className = "text-green-600 font-bold";
        }

        showNotification("Donor has accepted the request!", "success");
    }, 2000);
}

/**
 * Toast Notification System
 */
function showNotification(message, type) {
    const toast = document.createElement('div');
    const color = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    
    toast.className = `fixed bottom-5 right-5 ${color} text-white px-6 py-3 rounded-full shadow-2xl transition-all duration-500 z-50 transform translate-y-20`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i> ${message}`;
    
    document.body.appendChild(toast);

    // Animate In
    setTimeout(() => toast.classList.remove('translate-y-20'), 100);

    // Auto-remove after 3.5 seconds
    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 3500);
}