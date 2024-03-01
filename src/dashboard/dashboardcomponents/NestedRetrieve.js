// import React from 'react'

// export default function NestedRetrieve() {
//   return (
//     <div>
//         <hr/>
//         <hr/>
//         <hr/>
//         <hr/>
//         <hr/>
//         <hr/>
//         <hr/>
//         <hr/>
        
//         NestedRetrieve</div>
//   )
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../connect_to_blockchain/passAbiAddress';

function NestedRetrieve() {
  const { MyFinalContract } = useContext(AppContext);
  const [documentt, setDocumentt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHash, setSelectedHash] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error,setError]=useState();
  useEffect(() => {
    const fetchData = async () => {
      var username = sessionStorage.getItem('verifieduseridsession');
      var doc = await MyFinalContract.methods.getDataHash(username).call();
      setDocumentt(doc);
    };
    fetchData();
  }, []);
  const openModal = async(hash) => {
    setLoading(true);

    try {
      // Your axios code to retrieve image
      const response = await axios.get(`https://ipfs.io/ipfs/${hash}`);
      setImageUrl(`https://ipfs.io/ipfs/${hash}`);
      setError(null);
    } catch (error) {
      setError('Error retrieving image.');
      console.error('Error retrieving image:', error);
    } finally {
      setLoading(false);
    }

  };

 
  return (
    <div className='container'>
      <br/>
      <br/>
      <br/>
      <br/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>FileName</th>
            <th>Date</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {documentt.map((item, index) => (
            <tr key={index}>
              <td>{item.filename}</td>
              <td>{item.date}</td>
              <td>
              <button type="button" onClick={() => openModal(item.hash)} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
              View
            </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <!-- Modal --> */}
        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Image </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              
                <img src={imageUrl} alt="IPFS Image Loading ..." className="img-fluid" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary">Download</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default NestedRetrieve;




// import React, { useState } from 'react';
// import axios from 'axios';

// function NestedRetrieve() {
//   const [imageUrls, setImageUrls] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [modalImageUrl, setModalImageUrl] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const ipfsHashes = [
//     'QmfATEShLHc88BFKaGEPE7tecnwhcckRgsjPJtkRjm6aC2',
//     'QmeaLgTeMEzT65rgX1uHuptsqzZtwQjLnDdX5xjehNFrK8',
//     'QmRbgWDuzLbLojSz8rherpv6XZow8qsHHuxDUzj5PSNPDv'
//     // Add more IPFS hashes here if needed
//   ];

//   const handleRetrieve = async () => {
//     setLoading(true);
//     const fetchedImageUrls = [];

//     try {
//       for (const hash of ipfsHashes) {
//         const response = await axios.get(`https://ipfs.io/ipfs/${hash}`);
//         fetchedImageUrls.push(`https://ipfs.io/ipfs/${hash}`);
//       }
//       setImageUrls(fetchedImageUrls);
//       setError(null);
//     } catch (error) {
//       setError('Error retrieving image.');
//       console.error('Error retrieving image:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openModal = (imageUrl) => {
//     setModalImageUrl(imageUrl);
//     setShowModal(true);
//   };

//   return (
//     <div>
//       <hr />
//       <hr />
//       <hr />
//       <hr />
//       <hr />
//       <hr />
//       <hr />
//       <hr />
//       <button onClick={handleRetrieve} disabled={loading}>
//         {loading ? 'Retrieving...' : 'Retrieve Images'}
//       </button>
//       {error && <div>{error}</div>}
//       <table className="table table-success table-striped-columns">
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>Name</th>
//             <th>Data</th>
//           </tr>
//         </thead>
//         <tbody>
//           {documentt.map((data, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>Document {index + 1}</td>
//               <td>{data}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {showModal && (
//         <div className="modal" style={{ display: 'block' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Image</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 {modalImageUrl && <img src={modalImageUrl} alt="IPFS Image" />}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
  
// }

// export default NestedRetrieve;