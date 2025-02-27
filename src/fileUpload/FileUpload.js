import React from 'react'
import {useState,useEffect} from 'react';
import axios from 'axios';
import { AppContext } from '../connect_to_blockchain/passAbiAddress';
import {useContext} from 'react';

export default function FileUpload() {

    const { MyFinalweb3,MyFinalContract, MyCurrAccount } = useContext(
        AppContext
    );

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState(null);
    const [error, setError] = useState(null);
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
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
        //block store
        try {
            MyFinalweb3.eth.getAccounts().then(function (accounts) {
                var acc = accounts[0];
                return MyFinalContract.methods.addDataHash("1233",response.data).send({ from: acc });
            }).then(async function (tx) {
                console.log(tx);
                console.log(" REQUEST SENT SUCCESSFULLY");;
            }).catch(function (tx) {
                console.log(tx);
            })

        }
        catch (error) {
            console.error('Error:', error);
        }
        //
        setError(null);
      } catch (error) {
        setError('Error uploading file.');
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    };
    return (
        <div>
            <div>
                <p>Hi</p>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
                {error && <div>{error}</div>}
                {uploadResult && (
                    <div>
                        <h3>Upload Successful!</h3>
                        <p>IPFS Ha: {uploadResult.IpfsHash}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
