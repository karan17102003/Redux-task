import axios from "axios";
import { dispatch } from "./store/store";
import { setTotalPages } from "./slice/movieSlice";

const token = process.env.REACT_APP_TOKEN;

/********************************************************************************************************************************** 
  
  fetchData function is used to get the data from the server according to the url given and set the data to the redux according to the type of url called by the axios request

  @param {String} url the url from which data is to be requested

  @returns none
  
 ***********************************************************************************************************************************/
  async function fetchData(url){
    try{
      const option = {
        method : "GET",
        url : url,
        headers : {
          accept : "application/json",
          Authorization : `Bearer ${token}`
        }
      }

      const resp = await axios.request(option);
      return resp
    }
    catch(error){
      console.log(error);
    }
  }

  export default fetchData