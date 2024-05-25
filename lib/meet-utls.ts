import { useEffect, useState } from 'react';

function CreateMeet( roomId  : string) {
    useEffect(() => {
      let endpoint = `/api/create_meet?roomId=${roomId}`;
      fetch(endpoint).then(async (res) => {
        if (res.ok) {
          const body = await res.json();
          console.log(body);
        } else {
          throw Error('Error create meet, check server logs');
        }
      });
    }, [roomId]); // The dependency array ensures useEffect runs when roomId changes
  
  }
  
  export default CreateMeet;