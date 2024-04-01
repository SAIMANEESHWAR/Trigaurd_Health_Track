// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useContext } from 'react';
// import CryptoJS from 'crypto-js';
// import { AppContext } from '../../connect_to_blockchain/passAbiAddress';

// function NestedRetrieve() {
//   const { MyFinalContract } = useContext(AppContext);
//   const [documentt, setDocumentt] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedHash, setSelectedHash] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [saltValue, setSaltValue] = useState('');
//   const [error, setError] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       var username = sessionStorage.getItem('verifieduseridsession');
//       var doc = await MyFinalContract.methods.getDataHash(username).call();
//       console.log(doc);
//       setDocumentt(doc);
//     };
//     fetchData();
//   }, []);

//   const openModal = async (hash) => {
//     setLoading(true);
//     setSelectedHash(hash);
//     setSaltValue('');
//     setImageUrl('');
//     setError('');
//     setModalVisible(true);
//   };

//   const closeAndClearModal = () => {
//     setModalVisible(false);
//     setSaltValue('');
//     setImageUrl('');
//     setError('');
//   };

//   const handleSubmit = async () => {
//     setLoading(true);

//     try {
//       const response = await axios.get(`https://ipfs.io/ipfs/${selectedHash}`);
//       const decrypted = CryptoJS.AES.decrypt(response.data, saltValue).toString(CryptoJS.enc.Utf8);
//       setImageUrl(`data:image/jpeg;base64,${btoa(decrypted)}`);
//       setSaltValue('');
//       setError('');
//     } catch (error) {
//       setError('Error decrypting file.');
//       console.error('Error decrypting file:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadImage = () => {
//     const link = document.createElement('a');
//     link.href = imageUrl;
//     link.download = 'image.jpg';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className='container'>
//       <br />
//       <br />
//       <br />
//       <br />
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>FileName</th>
//             <th>Date</th>
//             <th>View</th>
//           </tr>
//         </thead>
//         <tbody className="table-group-divider">
//           {documentt.map((item, index) => (
//             <tr key={index}>
//               <td>{item.filename}</td>
//               <td>{item.date}</td>
//               <td>
//                 <button type="button" onClick={() => openModal(item.hash)} className="nav-link">
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* <!-- Modal --> */}
//       {modalVisible && (
//         <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">Image </h1>
//                 <button type="button" className="btn-close" onClick={closeAndClearModal} aria-label="Close"></button>
//               </div>
//               <div className="modal-body">
//                 {imageUrl ? (
//                   <img src={imageUrl} alt="IPFS Image" className="img-fluid" />
//                 ) : (
//                   <div className="form-group">
//                     <label htmlFor="saltValue">Enter Salt Value:</label>
//                     <input type="text" className="form-control" id="saltValue" value={saltValue} onChange={(e) => setSaltValue(e.target.value)} />
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 {!imageUrl && (
//                   <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
//                 )}
//                 <button type="button" className="btn btn-secondary" onClick={closeAndClearModal}>Close</button>
//                 {imageUrl && (
//                   <button type="button" className="btn btn-primary" onClick={downloadImage}>Download</button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NestedRetrieve;



// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';
// import { useContext } from 'react';
// import CryptoJS from 'crypto-js';
// import { AppContext } from '../../connect_to_blockchain/passAbiAddress';

// function NestedRetrieve() {
//   const { MyFinalContract } = useContext(AppContext);
//   const [documentt, setDocumentt] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedHash, setSelectedHash] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [saltValue, setSaltValue] = useState('');
//   const [error, setError] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       var username = sessionStorage.getItem('verifieduseridsession');
//       var doc = await MyFinalContract.methods.getDataHash(username).call();
//       console.log(doc);
//       setDocumentt(doc);
//     };
//     fetchData();
//   }, []);

//   const columns = [
//     { field: 'filename', headerName: 'FileName', flex: 1 },
//     { field: 'date', headerName: 'Date', flex: 1 },
//     {
//       field: 'view',
//       headerName: 'View',
//       flex: 1,
//       renderCell: (params) => (
//         <button type="button" onClick={() => openModal(params.row.hash)} className="nav-link">
//           View
//         </button>
//       ),
//     },
//   ];

//   const rows = documentt.map((item, index) => ({
//     id: index,
//     filename: item.filename,
//     date: item.date,
//     hash: item.hash, // Adding hash for modal usage
//   }));

//   const openModal = async (hash) => {
//     setLoading(true);
//     setSelectedHash(hash);
//     setSaltValue('');
//     setImageUrl('');
//     setError('');
//     setModalVisible(true);
//   };

//   const closeAndClearModal = () => {
//     setModalVisible(false);
//     setSaltValue('');
//     setImageUrl('');
//     setError('');
//   };

//   const handleSubmit = async () => {
//     setLoading(true);

//     try {
//       const response = await axios.get(`https://ipfs.io/ipfs/${selectedHash}`);
//       const decrypted = CryptoJS.AES.decrypt(response.data, saltValue).toString(CryptoJS.enc.Utf8);
//       setImageUrl(`data:image/jpeg;base64,${btoa(decrypted)}`);
//       setSaltValue('');
//       setError('');
//     } catch (error) {
//       setError('Error decrypting file.');
//       console.error('Error decrypting file:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadImage = () => {
//     const link = document.createElement('a');
//     link.href = imageUrl;
//     link.download = 'image.jpg';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="container">
//       <br />
//       <br />
//       <br />
//       <br />
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid rows={rows} columns={columns} />
//       </div>
//       {/* <!-- Modal --> */}
//       {modalVisible && (
//         <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">Image </h1>
//                 <button type="button" className="btn-close" onClick={closeAndClearModal} aria-label="Close"></button>
//               </div>
//               <div className="modal-body">
//                 {imageUrl ? (
//                   <img src={imageUrl} alt="IPFS Image" className="img-fluid" />
//                 ) : (
//                   <div className="form-group">
//                     <label htmlFor="saltValue">Enter Salt Value:</label>
//                     <input type="text" className="form-control" id="saltValue" value={saltValue} onChange={(e) => setSaltValue(e.target.value)} />
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 {!imageUrl && (
//                   <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
//                 )}
//                 <button type="button" className="btn btn-secondary" onClick={closeAndClearModal}>Close</button>
//                 {imageUrl && (
//                   <button type="button" className="btn btn-primary" onClick={downloadImage}>Download</button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NestedRetrieve;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import CryptoJS from 'crypto-js';
import { AppContext } from '../../connect_to_blockchain/passAbiAddress';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

function NestedRetrieve() {
  const { MyFinalContract } = useContext(AppContext);
  const [documentt, setDocumentt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHash, setSelectedHash] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [saltValue, setSaltValue] = useState('');
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      var username = sessionStorage.getItem('verifieduseridsession');
      var doc = await MyFinalContract.methods.getDataHash(username).call();
      console.log(doc);
      setDocumentt(doc);
    };
    fetchData();
  }, []);

  const openModal = async (hash) => {
    setLoading(true);
    setSelectedHash(hash);
    setSaltValue('');
    setImageUrl('');
    setError('');
    setModalVisible(true);
  };

  const closeAndClearModal = () => {
    setModalVisible(false);
    setSaltValue('');
    setImageUrl('');
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`https://ipfs.io/ipfs/${selectedHash}`);
      const decrypted = CryptoJS.AES.decrypt(response.data, saltValue).toString(CryptoJS.enc.Utf8);
      setImageUrl(`data:image/jpeg;base64,${btoa(decrypted)}`);
      setSaltValue('');
      setError('');
    } catch (error) {
      setError('Error decrypting file.');
      console.error('Error decrypting file:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { accessorKey: 'filename', header: 'FileName', flex: 1 },
    { accessorKey: 'date', header: 'Date', flex: 1 },
    {
      accessorKey: 'view',
      header: 'View',
      flex: 1,
      Cell: (params) => (
        <button type="button" onClick={() => openModal(params.row.hash)} className="nav-link">
          View
        </button>
      ),
    },
  ];

  const rows = documentt.map((item, index) => ({
    id: index,
    filename: item.filename,
    date: item.date,
    hash: item.hash, // Adding hash for modal usage
  }));

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <div style={{ height: 400, width: '100%' }}>
        <MaterialReactTable table={useMaterialReactTable({ data: rows, columns })} />
      </div>
      {/* <!-- Modal --> */}
      {modalVisible && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Image </h1>
                <button type="button" className="btn-close" onClick={closeAndClearModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {imageUrl ? (
                  <img src={imageUrl} alt="IPFS Image" className="img-fluid" />
                ) : (
                  <div className="form-group">
                    <label htmlFor="saltValue">Enter Salt Value:</label>
                    <input type="text" className="form-control" id="saltValue" value={saltValue} onChange={(e) => setSaltValue(e.target.value)} />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                {!imageUrl && (
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                )}
                <button type="button" className="btn btn-secondary" onClick={closeAndClearModal}>Close</button>
                {imageUrl && (
                  <button type="button" className="btn btn-primary" onClick={downloadImage}>Download</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NestedRetrieve;
