 const handleUpload = () => {

     const uploadTask = storage.ref(`${uid}/${property}/${image.name}`).put(image);
     uploadTask.on(
         "state_changed",
         snapshot => {
             // progress function ...
             const progress = Math.round(
                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
             );
             setProgress(progress);
         },
         error => {
             // Error function ...
             console.log(error);
         },
         async() => {
             // complete function ...
             const db_url = await storage
                 .ref(`${uid}/${property}/`)
                 .child(image.name)
                 .getDownloadURL()
                 .then(url => {
                     setUrl(url);
                     return url
                 });
             updateDoc(db_url)
         }
     )
 }

 const updateDoc = (url) => {
     console.log(url);
     generatePropDocument(user, property, addr, url);
 }