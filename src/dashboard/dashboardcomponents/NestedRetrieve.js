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

function NestedRetrieve() {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const ipfsHash = 'QmfATEShLHc88BFKaGEPE7tecnwhcckRgsjPJtkRjm6aC2'; 

    // useEffect(()=>{
      
    // },[])
  const handleRetrieve = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`https://ipfs.io/ipfs/${ipfsHash}`);
      setImageUrl(`https://ipfs.io/ipfs/${ipfsHash}`);
      setError(null);
    } catch (error) {
      setError('Error retrieving image.');
      console.error('Error retrieving image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <hr/>
         <hr/>
         <hr/>
         <hr/>
         <hr/>
         <hr/>
         <hr/>
         <hr/>
      <button onClick={handleRetrieve} disabled={loading}>
        {loading ? 'Retrieving...' : 'Retrieve Image'}
      </button>
      {error && <div>{error}</div>}
      {imageUrl && (
        <div>
          <h3>Image:</h3>
          <img src={imageUrl} alt="IPFS Image" />
        </div>
      )}
    </div>
  );
}

export default NestedRetrieve;
