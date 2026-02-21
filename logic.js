function isEligible(lastDate) {
    const last = new Date(lastDate);
    const today = new Date();
    const diffTime = Math.abs(today - last);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 90;
}
const hospitalRequest = { blood: "O+", radius: 5 }; // Example

const matchedDonors = donorDataset.filter(donor => {
    return donor.bloodGroup === hospitalRequest.blood && 
           donor.availabilityStatus === "Available" &&
           isEligible(donor.lastDonationDate);
});
matchedDonors.sort((a, b) => a.distance - b.distance);
