// import React from 'react'
// import {useState,useEffect} from 'react';
// import axios from 'axios';
// import { AppContext } from '../../connect_to_blockchain/passAbiAddress';
// import {useContext} from 'react';

// export default function NestedUpload() {
//     const { MyFinalweb3,MyFinalContract, MyCurrAccount } = useContext(
//         AppContext
//     );

//     const [file, setFile] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [uploadResult, setUploadResult] = useState(null);
//     const [error, setError] = useState(null);
  
//     const handleFileChange = (event) => {
//       setFile(event.target.files[0]);
//     };
  
//     const handleUpload = async () => {
//       if (!file) {
//         setError('Please select a file.');
//         return;
//       }
  
//       setUploading(true);
  
//       const formData = new FormData();
//       formData.append('file', file);
  
//       try {
//         const response = await axios.post(
//           'https://api.pinata.cloud/pinning/pinFileToIPFS',
//           formData,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//               pinata_api_key: 'd84df280f768e4b0f769',
//               pinata_secret_api_key: 'e542066a59a3f89a8c77c4cea7832250c686b58466a6f71d02c8af15aa143347',
//             },
//           }
//         );
  
//         setUploadResult(response.data);
//         //block store
//         try {
//             MyFinalweb3.eth.getAccounts().then(function (accounts) {
//                 var acc = accounts[0];
//                 return MyFinalContract.methods.addDataHash("1233",response.data).send({ from: acc });
//             }).then(async function (tx) {
//                 console.log(tx);
//                 console.log(" REQUEST SENT SUCCESSFULLY");;
//             }).catch(function (tx) {
//                 console.log(tx);
//             })

//         }
//         catch (error) {
//             console.error('Error:', error);
//         }
//         //
//         setError(null);
//       } catch (error) {
//         setError('Error uploading file.');
//         console.error('Error uploading file:', error);
//       } finally {
//         setUploading(false);
//       }
//     };
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
//         <div>
//             <div>
//                 <p>Hi</p>
//                 <input type="file" onChange={handleFileChange} />
//                 <button onClick={handleUpload} disabled={uploading}>
//                     {uploading ? 'Uploading...' : 'Upload'}
//                 </button>
//                 {error && <div>{error}</div>}
//                 {uploadResult && (
//                     <div>
//                         <h3>Upload Successful!</h3>
//                         <p>IPFS Ha: {uploadResult.IpfsHash}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//         </div>
//   )
// }
import React, { useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../connect_to_blockchain/passAbiAddress';
import { useDropzone } from 'react-dropzone';
import { useContext } from 'react';

function NestedUpload() {
    const { MyFinalweb3, MyFinalContract, MyCurrAccount } = useContext(
        AppContext
    );
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '/',
  });

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: 'd84df280f768e4b0f769',
            pinata_secret_api_key: 'e542066a59a3f89a8c77c4cea7832250c686b58466a6f71d02c8af15aa143347',
          },
        }
      );

      setUploadResult(response.data);
        /**/
        try {
            var username=sessionStorage.getItem('verifieduseridsession');  
            const currentDate = new Date();
            const formattedDateTime = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
            console.log(formattedDateTime);
            console.log(response.data);
            console.log(username);
            console.log(file.name);
            MyFinalweb3.eth.getAccounts().then(function (accounts) {
                var acc = accounts[0];
                return MyFinalContract.methods.addDataHash(username,response.data.IpfsHash,formattedDateTime,file.name).send({ from: acc });
            }).then(async function (tx) {
                console.log(tx);
                console.log(" REQUEST SENT SUCCESSFULLY");
            }).catch(function (tx) {
                console.log(tx);
            })

        }
        catch (error) {
            console.error('Error:', error);
        }
        /**/



      setError(null);
    } catch (error) {
      setError('Error uploading file.');
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row mt-5 justify-content-center">
        <div className="col-md-6">
          <div className="upload-container p-4 m-4 mx-auto">
            <div {...getRootProps()} className="dropzone" style={{ backgroundColor: '#F5F5F5', border: '2px dashed #CCCCCC', borderRadius: '8px' }}>
              <input {...getInputProps()} />
              <div className="dropzone-content">
                <p className="text-center mt-4">Drag and drop a file here</p>
                <p className='text-center'> or</p>
                <button className="btn btn-secondary mx-auto d-block m-4" onClick={() => document.querySelector('input').click()}>
                  Choose File
                </button>
              </div>
            </div>
            {file && (
              <div className=" text-center mt-3">
                <h5>Selected File:</h5>
                <p>{file.name}</p>
                <button className="btn btn-primary mt-3" onClick={handleUpload} disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            )}
            {error && <div className="mt-3 alert alert-danger">{error}</div>}
            {uploadResult && (
              <div className="mt-3">
                <h3>Upload Successful!</h3>
                <p>IPFS Hash: {uploadResult.IpfsHash}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NestedUpload;