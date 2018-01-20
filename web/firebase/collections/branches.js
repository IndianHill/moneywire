
cl_branches = "branches";

/**
 *  Get branches of Bank
 */
function getBranchesOfBank(bankKey) {
    console.log('Fetching branchs of bank:'+bankKey);
    firestore = firebase.firestore();
    firestore.collection(cl_banks).doc(bankKey).collection(cl_branches).get().then((querySnapshot) => {
        console.log('Branches data received.')
        allBranches = []
        querySnapshot.forEach((doc) => {
            branchData = doc.data()
            branchData.key = doc.id
            allBranches.push(branchData);
        });
        successfullyFetchedBranches(allBranches);
    }).catch(function(error) {
        console.log("Error in fetching branches of bank: "+bankKey+" error: "+error);
        failedToFetchedBranches(error);
    });;
}

/**
 *  Create bank's branch
 */
function createBankBranch(branchData, bankKey) {
    var user = firebase.auth().currentUser;
    firestore = firebase.firestore();
    firestore.collection(cl_banks).doc(bankKey).collection(cl_branches).add({
        "name": branchData.name,
        "street": branchData.street,
        "city": branchData.city,
        "district": branchData.district,
        "state": branchData.state,
        "pinCode": branchData.pinCode,
        "fullAddress": branchData.fullAddress,
        "contactNumber": branchData.contactNumber,
        "ifsc": branchData.ifscCode,
        "micr": branchData.micrCode,
        "createdBy": user.uid,
        "updatedBy": user.uid,
        "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
        "updatedAt": firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function(branch) {
        console.log("Branch successfully created with id:"+branch.id);
        branchCreatedSuccessfully(branch);
    })
    .catch(function(error) {
        console.log("Error creating branch: "+error);
        errorWhileCreatingBranch(error);
    });
}

/**
 *  Update bank's branch
 */
function updateBankBranch(branchData, bankKey, branchKey) {
    var user = firebase.auth().currentUser;
    firestore = firebase.firestore();
    firestore.collection(cl_banks).doc(bankKey).collection(cl_branches).doc(branchKey).update({
        "name": branchData.name,
        "street": branchData.street,
        "city": branchData.city,
        "district": branchData.district,
        "state": branchData.state,
        "pinCode": branchData.pinCode,
        "fullAddress": branchData.fullAddress,
        "contactNumber": branchData.contactNumber,
        "ifsc": branchData.ifscCode,
        "micr": branchData.micrCode,
        "updatedBy": user.uid,
        "updatedAt": firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
        console.log("Branch updated successfully");
        branchUpdatedSuccessfully();
    })
    .catch(function(error) {
        console.log("Error updating branch: "+error);
        errorWhileUpdatingBranch(error);
    });
}