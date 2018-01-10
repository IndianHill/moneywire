
cl_banks = "bank"

/*
 *  Fetching all banks
 */
function getAllBanks() {
    console.log('Fetching bank data.')
    firestore = firebase.firestore();
    firestore.collection(cl_banks).get().then((querySnapshot) => {
        console.log('Banks data received.')
        allBanks = []
        querySnapshot.forEach((doc) => {
            bankData = doc.data()
            bankData.key = doc.id
            allBanks.push(bankData)
        });
        successfullyFetchedBanks(allBanks)
    });
}

/*
 *  Creating bank 
 */
function createBank(bankData) {
    var user = firebase.auth().currentUser;
    firestore = firebase.firestore();
    currentTime = (new Date).getTime();
    firestore.collection(cl_banks).add({
        "bankName": bankData.name,
        "bankWebsite": bankData.website,
        "bankCustomerCare": bankData.customerCare,
        "bankTollFree": bankData.tollFree,
        "bankFacebook": bankData.fb,
        "bankGooglePlus": bankData.googlePlus,
        "bankTwitter": bankData.twitter,
        "bankLinkedIn": bankData.linkedin,
        "bankCreatedBy": user.uid,
        "bankUpdatedBy": user.uid,
        "bankCreated": firebase.firestore.FieldValue.serverTimestamp(),
        "bankUpdated": firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function(bank) {
        console.log("Bank successfully created with id:"+bank.id);
        bankCreatedSuccessfully(bank);
    })
    .catch(function(error) {
        console.log("Error creating bank: "+error);
        errorWhileCreatingBank(error);
    });
}